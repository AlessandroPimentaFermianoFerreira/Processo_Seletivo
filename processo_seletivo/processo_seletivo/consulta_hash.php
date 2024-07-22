<?php
include_once("globals.php");
include_once("db.php");
include_once("dao/UserDAO.php");
include_once("models/user.php");

$userDAO = new UserDAO($con, $BASE_URL);
$user = new User();

if ($_POST) {
    $data = filter_var_array($_POST["data"]);

    if ($data != "") {

        $telefone = $data["telefone"];
        $email = $data["email"];

        $t = $user->concatoken($email, $telefone);
        $token = $user->getToken($t);
        $usuario = $userDAO->valida_user_hash($token);
        
        if($usuario){
            echo false;

        }else{
            echo true;
        }

    }else{
        echo false;
    }
}




$con = null;

?>