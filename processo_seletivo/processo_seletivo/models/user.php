<?php


class User
{
  public $id;
  public $nomecompleto;
  public $telefone;
  public $observacao;
  public $email;
  public $escolaridade;
  public $token;
  public $deficiencia;
  public $bairro;
  public $municipio;



  public function getToken($token)
  {
    return md5($token);
  }

  public function concatoken($email, $telefone)
  {
    $x = $email . '=' . $telefone;
    return $x;
  }

  function alezin($data)
  {

    $token = array();
    $vetor = str_split("!@#$%&*()_123456789zxcvbnmkjhgft");
    foreach ($data as $value) {
      foreach ($vetor as $i => $vet) {
        if ($value == $i)
          array_push($token, $vet);
      }
    }
    return implode("", $token);
  }

  function descriptalezin($token)
  {
    $vetor = str_split("!@#$%&*()_123456789zxcvbnmkjhgft");
    $tk = array();
    foreach (str_split($token) as $chave) {
      foreach ($vetor as $i => $vv) {
        if ($chave == $vv) {
          array_push($tk, $i);
        }
      }
    }

    return implode("", $tk);
  }




}




interface UserDAOInterface
{


  public function builUser($data); //construir o objeto
  public function create(User $user); //criar o usuario
  public function update($data, $id, $token); //atualizar o usuario
  public function findByToken($token); //encontra o usuario pelo token
  public function confirmacao($chave);
  public function const_user($data);
  public function select_users($id);
  public function deletando($dados);
  public function inserir_experiencias($dados, $id);
  public function inserir_cursos($dados, $id);
  public function delete_cursos($id);
  public function delete_experiencias($id);

  public function valida_user_hash($token);

}






?>