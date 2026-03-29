import fetch from 'node-fetch';

async function createAdmin() {
  try {
    const response = await fetch('http://localhost:2000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Admin',
        email: 'admin@hexasteel.sa',
        password: 'Admin@123',
      }),
    });

    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

createAdmin();
