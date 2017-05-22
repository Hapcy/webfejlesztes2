<?php
  function fajlbol_betolt($fajlnev) {
    $s = file_get_contents($fajlnev);
    return json_decode($s, true);
  }
  function fajlba_ment($fajlnev, $data) {
    $s = json_encode($data);
    return file_put_contents($fajlnev, $s, LOCK_EX);
  }
