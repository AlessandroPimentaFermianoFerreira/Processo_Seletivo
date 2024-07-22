<?php
include_once("globals.php");
include_once("db.php");
include_once("dao/UserDAO.php");
include_once("models/user.php");


$userDAO = new UserDAO($con, $BASE_URL);
$user = new User();
$dt = date('d-m-Y');



$data = filter_var_array($_POST["data"]);


if ($data != "") {

    $telefone = $data["telefone"];
    $email = $data["email"];

    $t = $user->concatoken($email, $telefone);
    $token = $user->getToken($t);
    $us = $userDAO->findByToken($token);


    if ($us) {

        $idd = $us->id;
        $userDAO->update($data, $idd, $token);

        $updatec = $userDAO->delete_cursos($idd);
        $updateexp = $userDAO->delete_experiencias($idd);

        //verifica se o array curso esta vazio e inicializa
        if (count($data["vet_curso"]) > 0 && $data["vet_curso"][0] != "") {
            $insert_cursos = $userDAO->inserir_cursos($data, $idd);
        }
        //verifica se o array formaçao esta vazio e inicializa
        if (count($data["vet_formacao"]) > 0 && $data["vet_formacao"][0] != "") {
            $insert_exp = $userDAO->inserir_experiencias($data, $idd);
        }
      
        echo "success";


    } else {

        $usuario = $userDAO->const_user($data);
        $c = $user->concatoken($usuario->email, $usuario->telefone);
        $chave = $user->getToken($c);
        $usuario->token = $chave;

        $users = $userDAO->create($usuario);

        $ret = $userDAO->findByToken($chave);
        $id = $ret->id;

        //verifica se o array curso esta vazio e inicializa
        if ($data["vet_curso"][0] != "") {
            $insert_cursos = $userDAO->inserir_cursos($data, $id);
        }
        //verifica se o array formaçao esta vazio e inicializa
        if ($data["vet_formacao"][0] != "") {
            $insert_exp = $userDAO->inserir_experiencias($data, $id);
        }
        $insert_proc = $userDAO->inserir_processos($data, $id, $chave);


        if ($insert_proc == true) {
            echo "success";
        } else {
            echo "erro";
        }

    }

} else {
    echo "erro";
}



$con = null;

?>