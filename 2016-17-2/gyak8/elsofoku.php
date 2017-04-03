<?php
  //feldolgozo
  function elsofoku($a, $b) {
    return -$b/$a;
  }
  //validacio
  function validate($data, &$errors) {
    $errors = [];
    if (!isset($data["a"])) {
      $errors[] = "Hiányzik az a paraméter!";
    }
    if (!isset($data["b"])) {
      $errors[] = "Hiányzik a b paraméter!";
    }
    if (!is_numeric($data["a"]) || !is_numeric($data["b"])) {
      $errors[] = "Nem számokat kaptam!";
    }
    if ((int)$data["a"] === 0) {
      $errors[] = "Nullával osztás!";
    }
    return count($errors) === 0;
  }

  $posztolva_e = $_SERVER["REQUEST_METHOD"] === "POST";

  if ($posztolva_e) {
    $errors = [];
    $a = $_POST["a"];
    $b = $_POST["b"];
    $validacioEredmeny = validate($_POST, $errors);
    if ($validacioEredmeny) {
      $eredmeny = elsofoku($a, $b);
    }
  }

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>

  <?php if ($posztolva_e && !$validacioEredmeny) : ?>
    <ul>
      <?php foreach($errors as $error) : ?>
        <li><?=$error ?></li>
      <?php endforeach; ?>
    </ul>
  <?php endif; ?>

  <form method="POST" action="elsofoku.php">
    <label for="a">a:</label>
    <input type="number" name="a" value="<?=$a ?>" />
    <label for="b">b:</label>
    <input type="number" name="b" value="<?=$b ?>" />
    <input type="submit" value="Szamold" />
  </form>

  <?php if($posztolva_e && $validacioEredmeny) : ?>
    <div>
      x = <?=$eredmeny ?>
    </div>
  <?php endif; ?>
</body>
</html>