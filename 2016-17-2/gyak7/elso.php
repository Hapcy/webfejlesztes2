<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <h1>
    <?php
      echo 'Hello world!';
      $nev = 'Tibi';
      //echo 'Hello ' . $nev;
      echo "Hello {$nev}";
    ?>
  </h1>
  <hr />
  <?php
    echo date('Y-m-d');
  ?>  
  <hr />
  <?php

    function faktorialis($n) {
      if ($n <= 1) {
        return 1;
      } else {
        return $n * faktorialis($n - 1);
      }
    }

    echo faktorialis(10);

  ?>
  <hr />
  <?php
    for($i = 0; $i < 10; $i++) {
      $meret = $i * 10 + 5;
      echo "<span style='font-size: {$meret}px'>HelloWorld!</span>";
    }
  ?>
  <hr />
  <ul>
    <?php
      $hibalista = [
        'Nem vagy elég idős',
        'Hülye vagy'
      ];
      $hibalista[] = 'Hiányzik a jelszó';
      
      //var_dump($hibalista);

      foreach($hibalista as $hiba) {
        echo "<li>{$hiba}</li>";
      }

    ?>
  </ul>
  <select>
    <?php

      $filmKategoriak = [
        4 => 'Akció',
        5 => 'Dráma',
        8 => 'Vígjáték'
      ];

      foreach($filmKategoriak as $szam => $nev) {
        echo "<option value='{$szam}'>{$nev}</option>";
      }

    ?>
  </select>
  <hr />
  <?php
    $termekek = [
      23 => 'Pendrive',
      46 => 'Floppy'
    ];
  ?>

  <?php foreach($termekek as $termekszam => $termeknev) : ?>
    <label for="<?=$termekszam?>"><?=$termeknev?></label>
    <input type="checkbox" value="<?=$termekszam?>" id="<?=$termekszam?>"/>
  <?php endforeach; ?>
  
</body>
</html>
