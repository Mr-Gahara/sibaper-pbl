document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const id = document.getElementById('id').value;
    const Password = document.getElementById('password').value;

    const data = {
        id: id,
        password: Password 
    };

    console.log("mencoba mengirim request ke URL...");

    try {
        const response = await fetch('https://apiteam.v-project.my.id/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('Success:', result);

            const token = localStorage.setItem('token', result.data.token);
            const name = localStorage.setItem('nama', result.data.nama)
            window.location.href="homepage.html";
        } else {
            console.log('HTTP error status:', response.status);
            document.getElementById('errorMessage').textContent = 'NIP atau Password salah!';
        }
    } catch (error) {
        console.error('Error:', error); 
    }});