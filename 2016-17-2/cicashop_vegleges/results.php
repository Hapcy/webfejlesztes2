<?php
session_start();
//Segédfüggvények
function fajlbol_betolt($fajlnev) {
  $s = file_get_contents($fajlnev);
  return json_decode($s, true);
}

//Beolvasás

$cicak = fajlbol_betolt("cica.db");
$hiba = '';
//Feldolgozás
if ($_POST) {
  if (isset($_POST['vasaroltCicak'])) {
    if (!isset($_SESSION['kosar'])) {
      $_SESSION['kosar'] = [];
    }
    foreach($_POST['vasaroltCicak'] as $cicaNev) {
      if (!in_array($cicaNev, $_SESSION['kosar'])) {
        $_SESSION['kosar'][] = $cicaNev;
      }
    }
  } else {
    $hiba = 'Nem választottál cicát';
  }
}

function chosen_breed($cicaLista) {
  $megfelelo_cicak = [];
  foreach($cicaLista as $cica) {
    $unspacedBreed = str_replace(" ", "_", $cica['breed']);
    if (isset($_GET[$unspacedBreed])) {
      $megfelelo_cicak[] = $cica;
    }
  }
  return $megfelelo_cicak;
}

$jocicak = chosen_breed($cicak);

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CicaShop-Result</title>
  <script src="ajax.js"></script>
</head>
<body>
  <h1>CicaShop</h1><img src="./img/nyanko_sensei.png" width="200px" />
  <section>
    <h3>Fajták</h3>
    <?php if(count($jocicak) === 0) : ?>
      <h4>Nincs találat</h4>
    <?php else : ?>
      <div id="hibalista">
        <?php if ($hiba !== '') : ?>
          <p><?=$hiba?></p>
        <?php endif; ?>
      </div>
      <form action="" method="POST" id="vasarlasForm">
        <input type="hidden" name="posted" />
        <?php foreach($jocicak as $cica) : ?>
          <div style="position: relative;">
            <div>
              <span>Név:</span><span><?=$cica['name']?></span>
            </div>
            <div>
              <span>Kor:</span><span><?=$cica['age']?></span>
            </div>
            <div>
              <span>Fajta:</span><span><?=$cica['breed']?></span>
            </div>
            <div>
              <label for="<?=$cica['name']?>">Vásárlás</label>
              <input 
                type="checkbox"
                name="vasaroltCicak"
                id="<?=$cica['name']?>"
                value="<?=$cica['name']?>"
              />
            </div>
            <img src="./img/<?=$cica['picture']?>" style="position: absolute; left: 400px; top: 0;" height="80px" />
          </div>
          <br />
        <?php endforeach; ?>
        <input type="submit" value="Kosárba" />
      </form>
    <?php endif; ?>
    <br />
    <h2>Kosár</h2>
    <div id="kosarTartalom">
      <?php if(isset($_SESSION['kosar'])) : ?>
        <ul>
          <?php foreach($_SESSION['kosar'] as $cicaNev) : ?>
            <li><?=$cicaNev?></li>
          <?php endforeach; ?>
        </ul>
      <?php else : ?>
        A kosár még üres.
      <?php endif; ?>
    </div>
    <a href="./rendeles.php" 
      <?php if(!isset($_SESSION['kosar'])) : ?>
        style="display: none;"
      <?php endif; ?>
      id="rendelesLink"
    >Rendelés leadása</a>
  </section>
  <script src="./kosarba.js"></script>
</body>
</html>