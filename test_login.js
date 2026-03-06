const http = require('http');

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
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(JSON.parse(body));
                } else {
                    reject(JSON.parse(body));
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
        const email = `test_${Date.now()}@Example.com`;
        console.log('Registering', email);
        const resReg = await makeRequest('/api/auth/register', {
            name: 'test user',
            email: email,
            password: 'password123'
        });
        console.log('Register success:', resReg.email);

        console.log('Logging in Exact', email);
        const resLogExact = await makeRequest('/api/auth/login', {
            email: email,
            password: 'password123'
        });
        console.log('Login exact success:', resLogExact.email);

        const lower = email.toLowerCase();
        console.log('Logging in Lower', lower);
        const resLogLower = await makeRequest('/api/auth/login', {
            email: lower,
            password: 'password123'
        });
        console.log('Login lower success:', resLogLower.email);

    } catch (err) {
        console.error('Error:', err);
    }
}

test();
