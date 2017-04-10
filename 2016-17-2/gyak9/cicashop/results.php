<?php
//Segédfüggvények
function fajlbol_betolt($fajlnev) {
  $s = file_get_contents($fajlnev);
  return json_decode($s, true);
}

//Beolvasás

$cicak = fajlbol_betolt("cica.db");

//Feldolgozás

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
</head>
<body>
  <h1>CicaShop</h1>
  <section>
    <h3>Fajták</h3>
    <?php if(count($jocicak) === 0) : ?>
      <h4>Nincs találat</h4>
    <?php else : ?>
      <?php foreach($jocicak as $cica) : ?>
        <div>
          <div>
            <span>Név:</span><span><?=$cica['name']?></span>
          </div>
          <div>
            <span>Kor:</span><span><?=$cica['age']?></span>
          </div>
          <div>
            <span>Fajta:</span><span><?=$cica['breed']?></span>
          </div>
        </div>
        <br />
      <?php endforeach; ?>
    <?php endif; ?>
  </section>
</body>
</html>