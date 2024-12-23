<?php
// Mulai session untuk menggunakan data session
session_start();

// Jika sudah ada session, tampilkan pesan selamat datang
if (!isset($_SESSION['username'])) {
    $_SESSION['username'] = "ChelseaFan";  // Menyimpan username pada session
}

include('db_config.php');

// Ambil data penggemar Chelsea dari database
$sql = "SELECT * FROM fans";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chelsea FC - Fans Form</title>
    <script src="script.js"></script>
</head>
<body>
    <h1>Selamat datang, <?php echo $_SESSION['username']; ?>!</h1>

    <h2>Form Penggemar Chelsea FC</h2>
    <form id="chelseaForm" action="submit.php" method="POST">
        <label for="name">Nama:</label>
        <input type="text" id="name" name="name" required><br><br>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required><br><br>

        <label for="favoritePlayer">Pemain Favorit:</label>
        <input type="text" id="favoritePlayer" name="favoritePlayer" required><br><br>

        <label for="VIP">Daftar VIP:</label>
        <input type="checkbox" id="VIP" name="VIP"><br><br>

        <label for="team">Tim Favorit:</label>
        <input type="radio" id="team1" name="team" value="Chelsea" checked>Chelsea
        <input type="radio" id="team2" name="team" value="Lainnya">Lainnya<br><br>

        <input type="submit" value="Kirim">
    </form>

    <h2>Penggemar Chelsea</h2>
    <table id="fansTable">
        <thead>
            <tr>
                <th>Nama</th>
                <th>Email</th>
                <th>Pemain Favorit</th>
                <th>VIP</th>
                <th>Tim Favorit</th>
            </tr>
        </thead>
        <tbody>
            <?php
            // Menampilkan data penggemar yang ada di database
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td>" . htmlspecialchars($row['name']) . "</td>";
                    echo "<td>" . htmlspecialchars($row['email']) . "</td>";
                    echo "<td>" . htmlspecialchars($row['favorite_player']) . "</td>";
                    echo "<td>" . ($row['VIP'] ? "Ya" : "Tidak") . "</td>";
                    echo "<td>" . htmlspecialchars($row['team']) . "</td>";
                    echo "</tr>";
                }
            } else {
                echo "<tr><td colspan='5'>Tidak ada data penggemar</td></tr>";
            }
            ?>
        </tbody>
    </table>

</body>
</html>

<?php
// Menutup koneksi database
$conn->close();
?>
