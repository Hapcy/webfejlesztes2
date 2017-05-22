<?php
session_start();

//Segédfüggvények
function fajlbol_betolt($fajlnev) {
  $s = file_get_contents($fajlnev);
  return json_decode($s, true);
}

//Beolvasás

$cicak = fajlbol_betolt("cica.db");

//Feldolgozás

function egyedi_fajtak($cicaLista, &$cicaFajtak) {
  $cicaFajtak = [];
  foreach ($cicaLista as $cica) {
    if (!in_array($cica['breed'], $cicaFajtak)) {
      $cicaFajtak[] = $cica['breed'];
    }
  }
}

$fajtak = [];
egyedi_fajtak($cicak, $fajtak);

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CicaShop-Breeds</title>
</head>
<body>
  <h1>CicaShop</h1><img src="./img/nyanko_sensei.png" width="200px" />
  <form method="GET" action="results.php">
    <h3>Fajták</h3>
    <ul>
      <?php foreach($fajtak as $fajta) : ?>
        <li>
          <label for="<?=$fajta?>"><?=$fajta?></label>
          <input type="checkbox" name="<?=$fajta?>" id="<?=$fajta?>" />
        </li>
      <?php endforeach; ?>
    </ul>
    <input type="submit" value="Keres" />
  </form>
</body>
</html>