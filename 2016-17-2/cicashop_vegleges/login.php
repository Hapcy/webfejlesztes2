<?php
  include('./fajl_muvelet.php');

  session_start();

  $hibak = array();
  if ($_POST) {
    $felhnev = trim($_POST['felhnev']);
    $jelszo = $_POST['jelszo'];
    $jelszavak = fajlbol_betolt('jelszavak.db');
    if (!(array_key_exists($felhnev, $jelszavak) && 
          $jelszavak[$felhnev] == md5($jelszo))) {
      $hibak[] = 'Nem jó!';
    }
    if (!$hibak) {
      $_SESSION['belepve'] = true;
      $_SESSION['felhnev'] = $felhnev;
      header('Location: rendeles.php');
      exit();
    }
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CicaShop-Vásárlás</title>
</head>
<body>
  <h1>CicaShop</h1><img src="./img/nyanko_sensei.png" width="200px" />
  <section>
    <?php var_dump($hibak); ?>
    <form action="login.php" method="post">
      Felhasználónév:
      <input type="text" name="felhnev"> <br>
      Jelszó:
      <input type="password" name="jelszo"> <br>
      <input type="submit" name="belep" value="Belép">
    </form>
  </section>
</body>
</html>