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
    
        fetch('https://apiteam.v-project.my.id/api/sibaper/data/homepage', {
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
            // console.log('User Data: ', data);
            
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
                        <p>${jadwal.jadwal.matkul.nama}</p>
                        <p>${jadwal.jadwal.start.slice(0, 5)} - ${jadwal.jadwal.finish.slice(0, 5)}</p>
                    </div>
                `;

                const button = document.createElement('button');
                button.textContent = 'isi kelas';
                button.setAttribute('data-kode-matkul', jadwal.jadwal.matkul.kode_matkul);
                button.onclick = () => {
                    const kodeMatkul = button.getAttribute('data-kode-matkul');
                    window.location.href = 'formpage.html';
                    document.body.appendChild(button);
                };

                // validasi waktu untuk mengisi berita perkuliahan
                if (currentTime < startTime) {
                    button.disabled = true;
                    button.style.opacity = '0.5';
                    button.style.cursor = 'not-allowed';
                }

                card.appendChild(button);
                cardList.appendChild(card);
            });

            // panggil fungsi
            // resetInactivityTimer();
            // document.addEventListener('mousemove', resetInactivityTimer);
            // document.addEventListener('keypress', resetInactivityTimer);
            // document.addEventListener('click', resetInactivityTimer);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // fungsi timer jika user afk
    // function resetInactivityTimer() {
    //     clearTimeout(inactivityTimeout);
    //     inactivityTimeout = setTimeout(() => {
    //         localStorage.removeItem('token');
    //         alert('Anda telah logout otomatis karena tidak ada aktivitas selama 5 menit.');
    //         window.location.href = 'index.html';
    //     }, 300000);
    // }

    // window.addEventListener('beforeunload', () => {
    //     localStorage.removeItem('token');
    // });
});

function logout() {
    localStorage.clear();
    window.location.href='index.html';
}
