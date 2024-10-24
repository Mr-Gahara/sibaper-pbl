         document.getElementById("download-pdf").addEventListener("click", function () {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            doc.text("Histori Berita Perkuliahan", 10, 10);     
            doc.autoTable({ html: "#data-table" });
            doc.save("histori.pdf");
        });

        const token = localStorage.getItem('token');
        const nama = localStorage.getItem('nama');

        if (!token) {
            console.log('tidak ada token, akses ditolak!');
            alert('tidak ada token')
            window.location.href = 'index.html';
        } else {
            console.log('Token ditekuman, Pengguna terautentikasi');
            
            fetch('https://apiteam.v-project.my.id/api/login', {
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
                console.log('User data:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }

        function logout() {
            localStorage.clear();
            window.location.href='index.html';
        }