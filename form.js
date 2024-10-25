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