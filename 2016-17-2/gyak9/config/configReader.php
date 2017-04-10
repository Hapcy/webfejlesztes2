<?php

$f = fopen("config.txt", "r");
$config = [];


if ($f) {
  $cs = '';
  while (!feof($f)) {
    $line = trim(fgets($f));

    if ($line !== '') {

      if ($line[0] === '[') {
        $cs = trim($line, '[]');
        $config[$cs] = [];
      } else {
        list($k, $v) = explode('=', $line);
        $config[$cs][$k] = $v;
      }

    }
  }
}
echo json_encode($config);
