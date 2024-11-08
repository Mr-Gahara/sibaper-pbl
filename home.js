document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    const nama = localStorage.getItem('nama');
    const namaUser = document.getElementById('nama');

    if (namaUser && nama) {
        namaUser.textContent = nama;
    } else {
        console.log('Nama tidak ditemukan');
    }

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
            const currentTime = new Date(); // ambil waktu sekarang
            
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

            const infoParagraph = document.getElementById('info-mengajar');


            if (data.data && data.data.length > 0) {

                const kelasList = data.data.map(jadwal => `Kelas ${jadwal.abjad_kelas}`).join(' dan ');

                infoParagraph.textContent = `Anda hari ini memiliki kelas mengajar pada ${kelasList}. silahkan mengisi berita perkuliahan pada kelas yang tersedia.`;

                // menampilkan card jadwal perkuliahan tiap kelas berdasarkan jadwal hari ini
                data.data.forEach(jadwal => {
                    const startTime = new Date(`1970-01-01T${jadwal.start}`);
                    const finishTime = new Date(`1970-01-01T${jadwal.finish}`);

                    const card = document.createElement('div');
                    card.classList.add('card');

                    card.innerHTML = `
                        <div class="card-info">
                            <p>Kelas ${jadwal.abjad_kelas}</p>
                            <p>${jadwal.nama_matkul}</p>
                            <p>${jadwal.start.slice(0, 5)} - ${jadwal.finish.slice(0, 5)}</p>
                        </div>
                    `;

                    const button = document.createElement('button');
                    button.textContent = 'isi kelas';
                    button.setAttribute('data-nama-matkul', jadwal.nama_matkul);
                    button.setAttribute('data-kelas', jadwal.abjad_kelas);
                    button.onclick = () => {
                        const namaMatkul = button.getAttribute('data-nama-matkul');
                        const kelas = button.getAttribute('data-kelas');

                        localStorage.setItem('namaMatkul', namaMatkul);
                        localStorage.setItem('kelas', kelas);

                        window.location.href = 'formpage.html';
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
            } else {
                infoParagraph.textContent = "Anda tidak memiliki jadwal mengajar pada hari ini.";
            }
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
