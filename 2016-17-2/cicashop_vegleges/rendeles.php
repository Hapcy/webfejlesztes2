<?php
  include('./fajl_muvelet.php');
  //oldal
  session_start();

  if (!isset($_SESSION['kosar'])) {
    header("Location: breeds.php");
    die();
  }

  $belepve = false;
  if (isset($_SESSION['belepve'])){
    $belepve = $_SESSION['belepve'];
  }

  //validate

  function validate($adatok) {
    $hiba = [];

    if (!isset($adatok['name'])) {
      $hiba[] = 'Hiányzik a név!';
    } else {
      if (trim($adatok['name']) === '') {
        $hiba[] = 'Üres a név!';
      }
    }

    if (!isset($adatok['address'])) {
      $hiba[] = 'Hiányzik a cím!';
    } else {
      if (trim($adatok['address']) === '') {
        $hiba[] = 'Üres a cím!';
      }
    }

    return $hiba;
  }

  //feldolgozás
  $hibak = [];
  $name = '';
  $address = '';
  if ($_POST) {
    $hibak = validate($_POST);
    if (isset($_POST['name'])) {
      $name = trim($_POST['name']);
    }
    if (isset($_POST['address'])) {
      $address = trim($_POST['address']);
    }
    if (count($hibak) === 0) {
      header("Location: siker.php");
      $adat = [
        "name" => $name,
        "address" => $address,
        "order" => $_SESSION['kosar'],
        "date" => date('Y-m-d G:i')
      ];
      $rendelesek = fajlbol_betolt("rendelesek.db");
      $rendelesek[] = $adat;
      fajlba_ment("rendelesek.db", $rendelesek);
      die();
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
    <h2>Kosár</h2>
    <ul>
    <?php foreach($_SESSION['kosar'] as $cicaNev) : ?>
        <li><?=$cicaNev?></li>
    <?php endforeach; ?>
    </ul>
    <?php if(count($hibak) !== 0) : ?>
      <ul>
        <?php foreach($hibak as $hiba) : ?>
          <li><?=$hiba?></li>
        <?php endforeach; ?>
      </ul>
    <?php endif; ?>
    <?php if($belepve): ?>
      <form action="" method="POST">
        <div>
          <label for="name">Név</label>
          <input type="text" id="name" name="name" value="<?=$name?>" />
        </div>
        <div>
          <label for="address">Cím</label>
          <input type="text" id="address" name="address" value="<?=$address?>" />
        </div>
        <input type="submit" value="Rendelés leadása" />
      </form>
    <?php else: ?>
      <div><a href="registration.php">Regisztrálj!</a></div>
      <div><a href="login.php">Jelentkezz be!</a></div>
    <?php endif; ?>
  </section>
</body>
</html>