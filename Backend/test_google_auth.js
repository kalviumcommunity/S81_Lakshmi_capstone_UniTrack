import http from 'http';

function makeRequest(path, data) {
    return new Promise((resolve, reject) => {
        const dataString = JSON.stringify(data);
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': dataString.length
            }
        };
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                const response = {
                    status: res.statusCode,
                    data: JSON.parse(body)
                };
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(response);
                } else {
                    reject(response);
                }
            });
        });
        req.on('error', reject);
        req.write(dataString);
        req.end();
    });
}

async function test() {
    try {
        const uniqueEmail = `google_${Date.now()}@example.com`;

        console.log('1. Attempting Google Login with non-existent user...');
        try {
            await makeRequest('/api/auth/google', {
                isLogin: true,
                googleUser: {
                    email: uniqueEmail,
                    name: 'Test Google User',
                    sub: 'test_sub_123'
                }
            });
            console.error('1. FAILED: Login should have failed.');
        } catch (err) {
            console.log(`1. SUCCESS: Expected error received: ${err.status} - ${err.data.message}`);
        }

        console.log('\n2. Attempting Google Signup...');
        try {
            const signupRes = await makeRequest('/api/auth/google', {
                isRegister: true,
                googleUser: {
                    email: uniqueEmail,
                    name: 'Test Google User',
                    sub: 'test_sub_123'
                }
            });
            console.log(`2. SUCCESS: Signup successful. Role: ${signupRes.data.role}, Email: ${signupRes.data.email}`);
        } catch (err) {
            console.error(`2. FAILED: Signup should have succeeded. Error: ${err.status} - ${err.data?.message || err}`);
        }

        console.log('\n3. Attempting Google Signup again with the same user...');
        try {
            await makeRequest('/api/auth/google', {
                isRegister: true,
                googleUser: {
                    email: uniqueEmail,
                    name: 'Test Google User',
                    sub: 'test_sub_123'
                }
            });
            console.error('3. FAILED: Signup should have failed (User exists).');
        } catch (err) {
            console.log(`3. SUCCESS: Expected error received: ${err.status} - ${err.data.message}`);
        }

        console.log('\n4. Attempting Google Login with the newly created user...');
        try {
            const loginRes = await makeRequest('/api/auth/google', {
                isLogin: true,
                googleUser: {
                    email: uniqueEmail,
                    name: 'Test Google User',
                    sub: 'test_sub_123'
                }
            });
            console.log(`4. SUCCESS: Login successful. Token: ${loginRes.data.token ? 'Yes' : 'No'}`);
        } catch (err) {
            console.error(`4. FAILED: Login should have succeeded. Error: ${err.status} - ${err.data?.message || err}`);
        }

    } catch (err) {
        console.error('Unexpected error in test execution:', err);
    }
}

test();
