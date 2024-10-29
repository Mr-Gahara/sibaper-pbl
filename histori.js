document.getElementById("download-pdf").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.text("Histori Berita Perkuliahan", 10, 10);     
    doc.autoTable({ html: "#data-table" });
    doc.save("histori.pdf");
});

const token = localStorage.getItem('token');

if (!token) {
    console.log('Tidak ada token, akses ditolak!');
    alert('Tidak ada token');
    window.location.href = 'index.html';    
} else {
    console.log('Token ditemukan, Pengguna terautentikasi');
    
    fetch('https://apiteam.v-project.my.id/api/sibaper/data/historypage', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Gagal mengambil data!');
        }
        return response.json();
    })
    .then(data => {
        console.log('User data:', data);

        const tableBody = document.querySelector('#data-table tbody');
        tableBody.innerHTML = '';

        data.data.forEach((item, index) => {
            const row = document.createElement('tr');

            const pertemuanCell = document.createElement('td');
            pertemuanCell.textContent = index + 1;
            row.appendChild(pertemuanCell);

            const tanggalCell = document.createElement('td');
            const date = new Date(item.tanggal);
            tanggalCell.textContent = date.toLocaleDateString();
            row.appendChild(tanggalCell);

            const mataKuliahCell = document.createElement('td');
            mataKuliahCell.textContent = item.jadwal.matkul.nama;
            row.appendChild(mataKuliahCell);

            const pokokBahasanCell = document.createElement('td');
            pokokBahasanCell.textContent = item.rps.cp_tahapan_matkul;
            row.appendChild(pokokBahasanCell);

            const subPokokBahasanCell = document.createElement('td');
            subPokokBahasanCell.textContent = item.rps.sub_bahasan_kajian;
            row.appendChild(subPokokBahasanCell);

            const statusCell = document.createElement('td');
            statusCell.classList.add('column-status');

            // Set background berdasarkan status
            if (item.status === 'notstarted') {
                statusCell.textContent = 'Not Started';
                statusCell.classList.add('status-notstarted');

            } else if (item.status === 'onprocess') {
                statusCell.textContent = 'OnProcess'; // abu abu
                statusCell.classList.add('status-onprocess'); // kuning
            } else if (item.status === 'completed') {
                statusCell.textContent = 'Completed';
                statusCell.classList.add('status-completed'); // hijau
            }
            
            row.appendChild(statusCell);
            tableBody.appendChild(row);  // Appends the row to the table body

            // panggil fungsi
            // resetInactivityTimer();
            // document.addEventListener('mousemove', resetInactivityTimer);
            // document.addEventListener('keypress', resetInactivityTimer);
            // document.addEventListener('click', resetInactivityTimer);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });

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
}


function logout() {
    localStorage.clear();
    window.location.href='index.html';
}