document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    const nama = localStorage.getItem('nama');
    // const cardList = document.getElementById('card-list');

    if (!token) {
        console.log('tidak ada token, akses ditolak!');
        alert('tidak ada token');
        window.location.href = 'index.html';
    } else {
        console.log('Token ditemukan, Pengguna terautentikasi');
    
        fetch('http://127.0.0.1:8000/api/sibaper/data/homepage', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('gagal mengambil data!');
            }
            return response.json();
        })
        .then(data => {
            // ambil data nama dosen dari JSON
            const namaUser = document.getElementById('nama');

            if (namaUser && nama) {
                namaUser.textContent = nama;
            } else {
                console.log('Nama tidak ditemukan');
            }

            currentTime = new Date(); // ambil waktu sekarang
            
            // ambil format tanggal sekarang
            const hari = currentTime.getDate();
            const tahun = currentTime.getFullYear();
            
            // array bulan dalam indonesia
            const bulan = [
                "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
                "Juli", "Agustus", "September", "Oktober", "November", "Desember"
            ];
            
            const namaBulan = bulan[currentTime.getMonth()];
            
            document.getElementById('date-now').innerText = `${hari} ${namaBulan} ${tahun}`;

            // ambil data jadwal dari JSON
            const cardList = document.querySelector('.card-list');
            cardList.innerHTML = ''; 

            // menampilkan card jadwal perkuliahan tiap kelas berdasarkan jadwal hari ini
            data.data.forEach(jadwal => {
                const startTime = new Date(`1970-01-01T${jadwal.jadwal.start}`);
                const finishTime = new Date(`1970-01-01T${jadwal.jadwal.finish}`);

                const card = document.createElement('div');
                card.classList.add('card');

                card.innerHTML = `
                    <div class="card-info">
                        <p>Semester ${jadwal.jadwal.semester}</p>
                        <p>Kelas ${jadwal.jadwal.kelas.abjad_kelas}</p>
                        <p>Pemrograman web</p>
                        <p>${jadwal.jadwal.start.slice(0, 5)} - ${jadwal.jadwal.finish.slice(0, 5)}</p>
                    </div>
                `;

                const button = document.createElement('button');
                button.textContent = 'isi kelas';
                button.onclick = () => window.location.href = 'formpage.html';

                // validasi waktu untuk mengisi berita perkuliahan
                if (currentTime > finishTime || currentTime < startTime) {
                    button.disabled = true;
                    button.style.opacity = '0.5';
                    button.style.cursor = 'not-allowed';
                }

                card.appendChild(button);
                cardList.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});

function logout() {
    localStorage.clear();
    window.location.href='index.html';
}
