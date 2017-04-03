<?php
  $remoteIp = $_SERVER["REMOTE_ADDR"];
  $ipFragments = explode(".", $remoteIp);
  
  if ($ipFragments[0]==="157" && $ipFragments[1]==="181") {
    $uzenet = "Hello ELTE!";
  } else {
    $uzenet = "Nincs hozzáférés!";
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
  <?=$uzenet ?>
</body>
</html>