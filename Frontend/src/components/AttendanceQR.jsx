import { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';

const AttendanceQR = ({ eventId, eventTitle }) => {
    const [timestamp, setTimestamp] = useState(Date.now());

    // Refresh QR every 1 minute to prevent copying long-term
    useEffect(() => {
        const interval = setInterval(() => {
            setTimestamp(Date.now());
        }, 60000); // 60s

        return () => clearInterval(interval);
    }, []);

    const qrData = JSON.stringify({
        eventId,
        timestamp
    });

    return (
        <div className="card" style={{ textAlign: 'center' }}>
            <h2>Attendance for {eventTitle}</h2>
            <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Scan this code to mark attendance</p>

            <div style={{ background: 'white', padding: '1rem', display: 'inline-block', borderRadius: '8px' }}>
                <QRCode value={qrData} size={256} />
            </div>

            <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                QR refreshes automatically. Valid for 10 minutes.
            </p>
        </div>
    );
};

export default AttendanceQR;
