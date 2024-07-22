<?php
include_once("globals.php");
include_once("db.php");
include_once("dao/UserDAO.php");
include_once("models/user.php");


$userDAO = new UserDAO($con, $BASE_URL);
$user = new User();

$pagina = file_get_contents('editprofile.html');


   
    $data = filter_var_array($_POST["data"]);
         

    if ($data != "") {


        $telefone = $data["telefone"];
        $email = $data["email"];

        $t = $user->concatoken($email, $telefone);
        $token = $user->getToken($t);
        $us = $userDAO->findByToken($token);
     

        if ($us != "") {
            $pessoa = $us->id;
            $usuario = $userDAO->select_users($pessoa);
           
            if ($usuario != "") {
                array_push($usuario, $us);
                $json = json_encode($usuario);

            } else {
                $usuario = [];
                $js = json_encode($usuario);
            }
            


            $pagina = str_replace('$("#telefone").val("");', '$("#telefone").val("' . $us->telefone . '");', $pagina);
            $pagina = str_replace('$("#email").val("");', '$("#email").val("' . $us->email . '");', $pagina);
            $pagina = str_replace('$("#nomecompleto").val("");', '$("#nomecompleto").val("' . $us->nomecompleto . '");', $pagina);
            $pagina = str_replace('$("#nivel").val("");', '$("#nivel").html("<option value= ' . $us->escolaridade . '> ' . $us->escolaridade . '</option>");', $pagina);
            $pagina = str_replace('$("#bio").val("");', '$("#bio").val("' . $us->observacao . '");', $pagina);
            $pagina = str_replace('$("#deficiencia").val("");', '$("#deficiencia").val("' . $us->deficiencia . '");', $pagina);
            $pagina = str_replace('$("#bairro").val("");', '$("#bairro").val("' . $us->bairro . '");', $pagina);
            $pagina = str_replace('$("#municipio").val("");', '$("#municipio").val("' . $us->municipio . '");', $pagina);



            $pagina = str_replace('new Array()', $json, $pagina);

      

            echo $pagina;



        } else {

            $pagina = str_replace('$("#telefone").val("");', '$("#telefone").val("' . $telefone . '");', $pagina);
            $pagina = str_replace('$("#email").val("");', '$("#email").val("' . $email . '");', $pagina);
            $pagina = str_replace('new Array()', '[]', $pagina);
           

            echo $pagina;

        }

    } else {
        
        header('Location: '.'index.php');
       
    }

    $con = null;


?>