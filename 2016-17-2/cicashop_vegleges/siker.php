<?php
  session_start();
  if(!isset($_SESSION['kosar'])) {
      header("Location: breeds.php");
      die();
  } else {
      unset($_SESSION['kosar']);
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Cicashop-Siker</title>
</head>
<body>
    <h1>CicaShop</h1><img src="./img/nyanko_sensei.png" width="200px" />
    <section>
        <h2>A rendelés leadása sikerült</h2>
        <a href="breeds.php">Főoldal</a>
    </section>
</body>
</html>