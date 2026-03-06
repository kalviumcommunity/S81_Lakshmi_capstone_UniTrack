import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import api from '../api/axios';

const QRScanner = ({ onScanSuccess }) => {
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
        );

        async function onScanSuccessCallback(decodedText) {
            // Handle the scanned code
            try {
                scanner.clear(); // Stop scanning once found
                const data = JSON.parse(decodedText);

                if (!data.eventId || !data.timestamp) {
                    throw new Error("Invalid QR Code");
                }

                setMsg('Processing...');

                // Call API
                const res = await api.post('/attendance/mark', data);
                setMsg(res.data.message || 'Attendance Marked!');
                if (onScanSuccess) onScanSuccess();

            } catch (err) {
                console.error(err);
                setError('Failed to mark attendance: ' + (err.response?.data?.message || err.message));
                // Restart scanner? Maybe not, show error first.
            }
        }

        function onScanFailure(error) {
            // handle scan failure, usually better to ignore and keep scanning.
        }

        scanner.render(onScanSuccessCallback, onScanFailure);

        return () => {
            scanner.clear().catch(error => {
                console.error("Failed to clear html5-qrcode scanner. ", error);
            });
        };
    }, [onScanSuccess]);

    return (
        <div className="card" style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
            <h2>Scan Attendance</h2>
            {msg && <div style={{ color: 'var(--accent)', fontSize: '1.2rem', margin: '1rem' }}>{msg}</div>}
            {error && <div style={{ color: 'var(--secondary)', margin: '1rem' }}>{error}</div>}

            {!msg && !error && <div id="reader" style={{ width: '100%' }}></div>}

            {(msg || error) && (
                <button onClick={() => window.location.reload()} style={{ marginTop: '1rem' }}>Scan Again</button>
            )}
        </div>
    );
};

export default QRScanner;
