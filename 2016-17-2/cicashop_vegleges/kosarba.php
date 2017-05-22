<?php

  include('./fajl_muvelet.php');

  session_start();

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
      echo json_encode($_SESSION['kosar']);
    } else {
      $hiba = 'Nem választottál cicát';
      echo $hiba;
      die();
    }
  }
?>
