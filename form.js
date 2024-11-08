// Menyembunyikan opsi pertama saat dipilih
document.getElementById('pokokBahasan').addEventListener('change', function() {
    if (this.value === "") {
        this.options[0].style.display = 'none'; // Sembunyikan opsi pertama
    }
});

document.getElementById('submitBtn').addEventListener('click', function() {
    const subPokokBahasan = document.getElementById('subPokokBahasan').value;
    const pokokBahasan = document.getElementById('pokokBahasan').value;
    const mediaAjar = document.getElementById('mediaAjar').value;

    alert(`Sub Pokok Bahasan: ${subPokokBahasan}\nPokok Bahasan: ${pokokBahasan}\nMedia Ajar: ${mediaAjar}`);
});

document.addEventListener('DOMContentLoaded', () => {

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
    
    const kelas = localStorage.getItem('kelas');
    const semester = localStorage.getItem('semester');

    const index = 0;

    
    // Update the DOM elements with the retrieved values
    document.querySelector('.info').innerHTML = `
        <p>${hari} ${namaBulan} ${tahun}</p><br>
        <p>Pertemuan ke - ${index + 1}</p><br>
        <p>Kelas ${kelas}</p><br>
        <p>Semester ${semester}</p><br>
    `;

    // Clear the stored data after displaying it
    localStorage.removeItem('kodeMatkul');
    localStorage.removeItem('kelas');
    localStorage.removeItem('semester');


});

