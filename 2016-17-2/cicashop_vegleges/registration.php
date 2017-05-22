<?php
  include('./fajl_muvelet.php');
  $hibak = array();
  if ($_POST) {
    $felhnev = trim($_POST['felhnev']);
    $jelszo = $_POST['jelszo'];
    $jelszavak = fajlbol_betolt('jelszavak.db');
    if (strlen($felhnev) == 0) {
      $hibak[] = 'Nincs felhnev!';
    }
    if (strlen($jelszo) == 0) {
      $hibak[] = 'Nincs jelszo!';
    }
    if (array_key_exists($felhnev, $jelszavak)) {
      $hibak[] = 'Letezo felhnev!';
    }
    if (!$hibak) {
      $jelszavak[$felhnev] = md5($jelszo);
      fajlba_ment('jelszavak.db', $jelszavak);
      header('Location: login.php');
      exit();
    }
  }
?>
<?php include('./header.php') ?>
<?php var_dump($hibak) ?>
<form action="registration.php" method="post">
  Felhasználónév:
  <input type="text" name="felhnev"> <br>
  Jelszó:
  <input type="password" name="jelszo"> <br>
  <input type="submit" name="reg" value="Regisztrál">
</form>
<?php include('./footer.php') ?>