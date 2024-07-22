<?php

  $host = "10.140.0.13";
  $dbname = "recrutamento";
  $user = "curricul0";
  $pass = '##Klop5!@pQq9#&!?a5';

  try {

    $con = new PDO("mysql:host=$host; port=3306; dbname=$dbname", $user, $pass);

    // Ativar o modo de erros
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  } catch(PDOException $e) {
    // erro na conexão
    $error = $e->getMessage();
    echo "Erro: $error";
  }
