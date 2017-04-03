<?php
  if(isset($_GET["rgb"])){
    $szin = $_GET["rgb"];
  } else {
    $szin = "FFFFFF";
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
<body style="background-color: #<?=$szin ?>">
  <a href="?rgb=0000FF">kék</a>
  <a href="szin.php?rgb=00FF00">zöld</a>
  <a href="/hallgatok/hapcy/masodik/szin.php?rgb=FF0000">piros</a>

  <form method="GET" action="szin.php">

    <label for="rgb">Szín:</label>
    <input type="text" value="<?=$szin ?>" name="rgb" />

    <input type="submit" value="Mutasd" />

  </form>
</body>
</html>