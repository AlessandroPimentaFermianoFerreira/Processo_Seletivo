<?php
include_once("globals.php");
include_once("db.php");
include_once("dao/UserDAO.php");
include_once("models/user.php");


$userDAO = new UserDAO($con, $BASE_URL);
$user = new User();
$dt = date('d-m-Y');

if($_POST){
   
    $data = filter_var_array($_POST["data"]);
    
    if($data != ""){

        $telefone = $data["telefone"];
        $email = $data["email"];
       
        $t = $user->concatoken($email, $telefone);
        $token = $user->getToken($t);
        $us = $userDAO->findByToken($token);
        $pessoa = $us->id;
                
        if($us){
            echo "1";
        }else{
            echo "0";
        }
    }else{
        echo "erro";
    }
}

$con = null;