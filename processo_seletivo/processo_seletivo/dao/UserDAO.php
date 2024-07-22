<?php
require_once("models/user.php");
require_once("db.php");


class UserDAO implements UserDAOInterface
{

    private $con;
    private $url;

    public function __construct(PDO $con, $url)
    {
        $this->con = $con;
        $this->url = $url;
    }

    public function builUser($data)
    {
        $user = new User();

        $user->id = $data["id"];
        $user->nomecompleto = $data["nomecompleto"];
        $user->email = $data["email"];
        $user->telefone = $data["telefone"];
        $user->observacao = $data["observacao"];
        $user->escolaridade = $data["escolaridade"];
        $user->token = $data["token"];
        $user->deficiencia = $data["deficiencia"];
        $user->bairro = $data["bairro"];
        $user->municipio = $data["municipio"];

        return $user;
    }

    public function const_user($data)
    {
        $user = new User();
        $user->nomecompleto = $data["nomecompleto"];
        $user->email = $data["email"];
        $user->telefone = $data["telefone"];
        $user->observacao = $data["bio"];
        $user->escolaridade = $data["nivel"];
        $user->deficiencia = $data["deficiencia"];
        $user->bairro = $data["bairro"];
        $user->municipio = $data["municipio"];

        return $user;
    }
    public function create(User $user)
    {

        $stmt = $this->con->prepare("INSERT INTO recrutamento.pessoa(nomecompleto, email, telefone, observacao, escolaridade , token, deficiencia, bairro, municipio) VALUES (:nomecompleto, :email, :telefone, :observacao ,:escolaridade ,:token, :deficiencia, :bairro , :municipio)");

        $stmt->bindParam(":nomecompleto", $user->nomecompleto);
        $stmt->bindParam(":email", $user->email);
        $stmt->bindParam(":telefone", $user->telefone);
        $stmt->bindParam(":observacao", $user->observacao);
        $stmt->bindParam(":escolaridade", $user->escolaridade);
        $stmt->bindParam(":token", $user->token);
        $stmt->bindParam(":deficiencia", $user->deficiencia);
        $stmt->bindParam(":bairro", $user->bairro);
        $stmt->bindParam(":municipio", $user->municipio);
        $stmt->execute();


        ///VALIDACAO DO AUTH IGUAL TRUE
        return $user;

    }
    public function update($data, $id, $token)
    {
        $tt = $this->con->prepare("UPDATE recrutamento.pessoa SET 
            nomecompleto = :nomecompleto,
            email = :email,
            telefone = :telefone,
            observacao = :observacao,
            escolaridade = :escolaridade,
            token = :token,
            deficiencia = :deficiencia,
            bairro = :bairro,
            municipio = :municipio
            WHERE id = :id
            ");

        $tt->bindParam(":nomecompleto", $data["nomecompleto"]);
        $tt->bindParam(":email", $data["email"]);
        $tt->bindParam(":telefone", $data["telefone"]);
        $tt->bindParam(":observacao", $data["bio"]);
        $tt->bindParam(":escolaridade", $data["nivel"]);
        $tt->bindParam(":token", $token);
        $tt->bindParam(":id",$id);
        $tt->bindParam(":deficiencia", $data["deficiencia"]);
        $tt->bindParam(":bairro", $data["bairro"]);
        $tt->bindParam(":municipio", $data["municipio"]);

        $tt->execute();
      
    }


    public function findByToken($token)
    {
        //verifica se existe o token no banco 
        if ($token != "") {
            $stm = $this->con->prepare("SELECT * FROM recrutamento.pessoa WHERE token= :token");
            $stm->bindParam(":token", $token);
            $stm->execute();

            ///retorna os elementos encontrados 
            if ($stm->rowCount() > 0) {
                $data = $stm->fetch();
                $user = $this->builUser($data);
                return $user;
            } else {
                return false; ///retornar falso caso nao encontre nada
            }
        } else {
            return false; ///retorna false caso encontre email for parametro vazio
        }
    }

    public function confirmacao($id)
    {
        if ($id != "") {
            $result = $this->con->prepare("update recrutamento.processos inner join recrutamento.pessoa on processos.id_processos = pessoa.id set processos.situacao = '1' where pessoa.id = :ch");
            $result->bindParam(":ch", $id);
            $result->execute();
            return true;

        } else {
            return false;
        }
    }

    /////INSERÇÃO NO BANCO EXPERIENCIAS ////////////
    public function inserir_experiencias($dados, $id)
    {
        try {

            if ($dados != "") {

                foreach ($dados['vet_formacao'] as $i => $vetor) {
                    $result = $this->con->prepare("INSERT INTO recrutamento.experiencias(id_atividade,empresa, atividade, data_inicio, data_fim, descricao, id) VALUE (:id_atividade, :empresa, :atividade,:dt_inicio,:dt_fim, :descricao, :id);");

                    $result->bindParam(":id_atividade", $id);
                    $result->bindParam(":empresa", $dados['vet_formacao'][$i]['empresa']);
                    $result->bindParam(":atividade", $dados['vet_formacao'][$i]['atividade']);
                    $result->bindParam(":dt_inicio", $dados['vet_formacao'][$i]['data_inicio']);
                    $result->bindParam(":dt_fim", $dados['vet_formacao'][$i]['data_fim']);
                    $result->bindParam(":descricao", $dados['vet_formacao'][$i]['descricao']);
                    $result->bindParam(":id", $id);
                    $result->execute();

                }
                return true;

            } else {
                return false;
            }
        } catch (PDOException $e) {
            $error = $e->getMessage();
            echo "Erro: $error";
        }

    }
    //////////////FIM DE INSERCAO EXPERIENCIAS /////////////////

    /////INSERÇÃO NO BANCO CURSOS ////////////
    public function inserir_cursos($dados, $id)
    {
        try {
            if ($dados != "") {
                foreach ($dados['vet_curso'] as $j => $vet) {
                    $result1 = $this->con->prepare("INSERT INTO recrutamento.cursos(id_cursos, nome_curso, data_inicio, data_termino, id) VALUE (:id_cursos, :curso, :data_inicio, :data_termino, :id);");
                    $result1->bindParam(":id_cursos", $id);
                    $result1->bindParam(":curso", $dados['vet_curso'][$j]['nome_curso']);
                    $result1->bindParam(":data_inicio", $dados['vet_curso'][$j]['data_inicio']);
                    $result1->bindParam(":data_termino", $dados['vet_curso'][$j]['data_termino']);
                    $result1->bindParam(":id", $id);
                    $result1->execute();
                }
                return true;

            } else {
                return false;
            }
        } catch (PDOException $e) {
            $error = $e->getMessage();
            echo "Erro: $error";
        }


    }
    //////////////FIM DE INSERCAO CURSOS /////////////////
    //////////////INSERCAO PROCESSOS /////////////////
    public function inserir_processos($dados, $id, $chave)
    {
        $dt = date("Y-m-d");
        try {

            if ($dados != "") {
                $result2 = $this->con->prepare("INSERT INTO recrutamento.processos(id_processos,chave, situacao, dt_envio) VALUE (:id_processos,:chave, 3, :dt_envio)");
                $result2->bindParam(":id_processos", $id);
                $result2->bindParam(":chave", $chave);
                $result2->bindParam(":dt_envio", $dt);
                $result2->execute();
                return true;

            } else {
                return false;
            }

        } catch (PDOException $e) {
            $error = $e->getMessage();
            echo "Erro: $error";
        }

    }

    public function select_users($id)
    {

        try {

            if ($id != "") {

                $data = array();

                $result = $this->con->prepare("SELECT id_atividade, empresa, atividade, data_inicio, data_fim, descricao FROM recrutamento.pessoa INNER JOIN recrutamento.experiencias ON pessoa.id = experiencias.id  where pessoa.id = :id");

                $result->bindParam(":id", $id);
                $result->execute();

                if ($result->rowCount() > 0) {
                    $ret1 = $result->fetchAll();

                    array_push($data, $ret1);
                } else {
                    $ret1 = [];
                    array_push($data, $ret1);

                }
                $result1 = $this->con->prepare("SELECT id_cursos, nome_curso, data_inicio, data_termino  FROM recrutamento.pessoa INNER JOIN recrutamento.cursos ON cursos.id = pessoa.id where pessoa.id = :id");

                $result1->bindParam(":id", $id);
                $result1->execute();

                if ($result1->rowCount() > 0) {
                    $ret2 = $result1->fetchAll();
                    array_push($data, $ret2);
                } else {
                    $ret2 = [];
                    array_push($data, $ret2);
                }

            } else {
                return false;
            }

            return $data;

        } catch (PDOException $e) {
            $error = $e->getMessage();
            echo "Erro: $error";
        }
    }

    /////////FAZENDO O DELETE AQUI //////////

    public function deletando($id)
    {
        try {
            if ($id != "") {
                $result = $this->con->prepare("DELETE FROM recrutamento.pessoa WHERE pessoa.id = :id");
                $result->bindParam(":id", $id);
                $result->execute();
                return true;

            } else {
                return false;
            }

        } catch (PDOException $e) {
            $error = $e->getMessage();
            echo "Erro: $error";
        }
    }

    public function delete_cursos($id)
    {

        if ($id != "") {
            $result1 = $this->con->prepare("DELETE FROM recrutamento.cursos WHERE id = :id ");
            $result1->bindParam(":id", $id);
            $result1->execute();

            return true;

        } else {
            return false;
        }
    }

    public function delete_experiencias($id)
    {
        if ($id != "") {
            $result1 = $this->con->prepare("DELETE FROM recrutamento.experiencias WHERE id = :id ");
            $result1->bindParam(":id", $id);
            $result1->execute();
            return true;

        } else {
            return false;
        }

    }
//FIM DO DELETE

    function getchave($chave)
    {

        if ($chave != "") {
            $result = $this->con->prepare("SELECT * FROM recrutamento.processos INNER JOIN recrutamento.pessoa ON processos.id_processos = pessoa.id WHERE processos.chave = :chave");
            $result->bindParam(":chave", $chave);
            $result->execute();

            if ($result->rowCount() > 0) {
                $data = $result->fetch();
                return $data;

            } else {
                return false; ///retornar falso caso nao encontre nada
            }

        } else {
            return false;
        }

    }


    public function valida_user_hash($token)
    {
        //verifica se existe o token no banco 
        if ($token != "") {
            $stm = $this->con->prepare("SELECT * FROM recrutamento.eventos WHERE chave= :token");
            $stm->bindParam(":token", $token);
            $stm->execute();

            ///retorna os elementos encontrados 
            if ($stm->rowCount() > 0) {
                return true;
            } else {
                return false; ///retornar falso caso nao encontre nada
            }
        } else {
            return false; ///retorna false caso encontre email for parametro vazio
        }
    }






}