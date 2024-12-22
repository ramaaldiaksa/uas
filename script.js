// script.js

// Menambahkan event listener pada form untuk menangani submit
document.getElementById('chelseaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form untuk dikirim

    // Ambil nilai dari form
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let favoritePlayer = document.getElementById('favoritePlayer').value;
    let newsletter = document.getElementById('newsletter').checked;
    let team = document.querySelector('input[name="team"]:checked').value;

    // Validasi form: Pastikan semua field wajib diisi
    if (!name || !email || !favoritePlayer) {
        alert("Semua field wajib diisi!");
        return;
    }

    // Validasi format email
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert("Alamat email tidak valid!");
        return;
    }

    // Validasi pemain favorit (setidaknya 3 karakter)
    if (favoritePlayer.length < 3) {
        alert("Nama pemain favorit harus lebih dari 3 karakter!");
        return;
    }

    // Menambahkan data ke tabel
    let table = document.getElementById('fansTable').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();
    newRow.insertCell(0).textContent = name;
    newRow.insertCell(1).textContent = email;
    newRow.insertCell(2).textContent = favoritePlayer;
    newRow.insertCell(3).textContent = newsletter ? "Ya" : "Tidak";
    newRow.insertCell(4).textContent = team;

    // Simpan data ke localStorage (untuk penggunaan lokal)
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('favoritePlayer', favoritePlayer);
    localStorage.setItem('team', team);
    localStorage.setItem('newsletter', newsletter ? 'Ya' : 'Tidak');

    // Reset form setelah data ditambahkan
    document.getElementById('chelseaForm').reset();
});

// Fungsi untuk memuat data yang disimpan dari localStorage ke dalam tabel
function loadStoredData() {
    let name = localStorage.getItem('name');
    let email = localStorage.getItem('email');
    let favoritePlayer = localStorage.getItem('favoritePlayer');
    let newsletter = localStorage.getItem('newsletter') === 'Ya';
    let team = localStorage.getItem('team');

    // Menambahkan data ke tabel jika ada data yang tersimpan
    if (name && email && favoritePlayer) {
        let table = document.getElementById('fansTable').getElementsByTagName('tbody')[0];
        let newRow = table.insertRow();
        newRow.insertCell(0).textContent = name;
        newRow.insertCell(1).textContent = email;
        newRow.insertCell(2).textContent = favoritePlayer;
        newRow.insertCell(3).textContent = newsletter ? "Ya" : "Tidak";
        newRow.insertCell(4).textContent = team;
    }
}

// Memuat data dari localStorage saat halaman dimuat
window.onload = loadStoredData;
