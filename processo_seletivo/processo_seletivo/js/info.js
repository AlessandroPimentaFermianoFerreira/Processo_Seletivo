var ver = false;
var valida = false;
var vet_curso = [];
var vet_formacao = [];
var validafor = false;
var counter;
var counter2;
var colunas;
var colunas1;
var pedido;
var pedido1;
var datacursos = new Array();
var dataformacao = new Array();
var pedidos = new Array();
var pedidos1 = new Array();


$("#mail").on("input", function () {
	$(this).val($(this).val().toUpperCase());
});

function validacaoEmail(field) {
	usuario = field.value.substring(0, field.value.indexOf("@"));
	dominio = field.value.substring(field.value.indexOf("@") + 1, field.value.length);

	if ((usuario.length >= 1) &&
		(dominio.length >= 3) &&
		(usuario.search("@") == -1) &&
		(dominio.search("@") == -1) &&
		(usuario.search(" ") == -1) &&
		(dominio.search(" ") == -1) &&
		(dominio.search(".") != -1) &&
		(dominio.indexOf(".") >= 1) &&
		(dominio.lastIndexOf(".") < dominio.length - 1)) {

		ver = true;
		$("#alerta").html("");
	} else {

		$('.alert').alert(chamar());
		ver = false;

	}
}

function validPhone(telefone) {
	//retira todos os caracteres menos os numeros
	telefone = telefone.replace(/\D/g, '');

	//verifica se tem a qtde de numero correto
	if (!(telefone.length >= 10 && telefone.length <= 11)) return false;

	//Se tiver 11 caracteres, verificar se começa com 9 o celular
	if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9) return false;

	//verifica se não é nenhum numero digitado errado (propositalmente)
	for (var n = 0; n < 10; n++) {
		//um for de 0 a 9.
		//estou utilizando o metodo Array(q+1).join(n) onde "q" é a quantidade e n é o
		//caractere a ser repetido
		if (telefone == new Array(11).join(n) || telefone == new Array(12).join(n)) return false;
	}
	//DDDs validos
	var codigosDDD = [11, 21, 22, 24, 27, 28, 31];
	//verifica se o DDD é valido (sim, da pra verificar rsrsrs)
	if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1) return false;

	if (new Date().getFullYear() < 2017) return true;
	if (telefone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1) return false;

	//se passar por todas as validações acima, então está tudo certo
	return true;
}

function mascaraTelefone(event) {
	let tecla = event.key;
	let telefone = event.target.value.replace(/\D+/g, "");

	if (/^[0-9]$/i.test(tecla)) {
		telefone = telefone + tecla;
		let tamanho = telefone.length;

		if (tamanho >= 12) {
			return false;
		}
		if (tamanho > 10) {
			telefone = telefone.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
		} else if (tamanho > 5) {
			telefone = telefone.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
		} else if (tamanho > 2) {
			telefone = telefone.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
		} else {
			telefone = telefone.replace(/^(\d*)/, "($1");
		}
		event.target.value = telefone;
	}

	if (!["Backspace", "Delete"].includes(tecla)) {
		return false;

	}
}

function chamar() {
	let dd = '<div class="alert alert-danger" role="alert">Erro! Favor informar Email válido</a></div>';
	$("#erro").html(dd);
	$('#modal2').modal("show");
}
function chamar1() {

	let ff = '<div class="alert alert-danger" role="alert">Erro! Favor informar Número de Telefone Fixo/Celular válido</a></div>';
	$("#erro").html(ff);
	$('#modal2').modal("show");
}

function chamar2() {
	let cc = '<div class="alert alert-danger" role="alert">Erro! Todos os campos são obrigatórios!</a></div>';
	$("#error").html(cc);
	$('#myModal').modal("show");
}


var reg = /^[\w.\+]+@\w+.\w{2,}(?:.\w{2})?$/;

function isValidEmail(email) {
	return reg.test(email);
}


document.onkeydown = function (e) {

	// disable F12 key
	if (e.keyCode == 123) {
		return false;
	}

	// disable I key
	if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
		return false;
	}

	// disable J key
	if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
		return false;
	}

	// disable U key
	if (e.ctrlKey && e.keyCode == 85) {
		return false;
	}
}

//VALIDACAO DE EMAIL E TELEFONE 
function validan(email, telefone) {

	let valid_email = isValidEmail(email); // true
	let valid_phone = validPhone(telefone); // true

	if (telefone != "" && email != "" && valid_phone == true && valid_email == true) {
		var continuar = { telefone: telefone, email: email };
		$('#modal3').modal("show");
		$("#confr").on("click", function () {
			$('#modal3').modal("hide");
			$.post("auth_process.php", { data: continuar }, function (dtt) {
				var separar = dtt.split("</head>");

				$('head').html(separar[0]);
				var myVar = separar[1].toString("");
				var myarr = myVar.split("<alezin>");

				$('body').html(myarr[0]);
				$('alezin').html(myarr[1]);

			});
		});
		$("#fex").on("click", function () {
			fechar();
		});
	} else {
		chamar1();
	}
}

//CHAMA A VALIDACAO
$("#continuar").on("click", function () {

	validan($("#mail").val(), $("#pass").val());
	valida_hash($("#mail").val(), $("#pass").val());

});

//REGISTRA O USUARIO - SENDO UDPATE OU INSERT 
$("#registrar").on("click", async function () {

	datacursos = tabelacursos();
	dataformacao = tabelaformacao();

	//verifica retorno array curso for vazio inicializa vazio
	if (datacursos.length === 0) {
		datacursos = [''];
	}
	//verifica retorno array formacao for vazio inicializa vazio
	if (dataformacao.length === 0) {
		dataformacao = [''];
	}

	var validador = validaformacao(dataformacao);

	var select = document.getElementById("nivel");

	var nivel = select.options[select.selectedIndex].text;


	if (validador == 0) {

		if ($("#telefone").val() != "" && $("#email").val() != "" && $("#nomecompleto").val() != "" && nivel != "" && $("#bio").val() != "" && $("#bairro").val() != "" && $("#municipio").val() != "") {

			var verifica = { telefone: $("#telefone").val(), email: $("#email").val() };

			//ABRIR MODAL, Passar como parametro o id do modal.
			abrirModal("infoload");

			//ATRIBUIR URL DO POST NA VARIAVEL URLEMAIL
			let urlEmail = "verifica.php";

			//ATRIBUIR REQUEST A VARIAVEL REQUEST (PARAMETRO DO POST) 
			let request = { data: verifica }


			//FAZER POST E ATRIBUIR RESULTADO NA VARIAVEL "RESULTADOEMAIL"
			let resultadoEmail = await new Promise(resolve => $.post(urlEmail, request, function (dtt) {

				//FAZER UM TIMEOUT DE 2 SEGUNDOS
				setTimeout(() => {

					//RETORNAR RESOLVE A PROMISE
					resolve(dtt);

					//verifico se tem update 

					//NESSE RESILTADO DO POST VERIFICA SE POSSUI USUARIO CADASTRADO

					var vet1 = { telefone: $("#telefone").val(), email: $("#email").val().toUpperCase(), nomecompleto: $("#nomecompleto").val().toUpperCase(), nivel, bio: $("#bio").val().toUpperCase(), deficiencia: $("#deficiencia").val().toUpperCase(), bairro: $("#bairro").val().toUpperCase(), municipio: $("#municipio").val().toUpperCase(), vet_curso: datacursos, vet_formacao: dataformacao }

					if (dtt == 1) {

						// AE TRABALHO UM UPDATE SE ENCONTRAR USUARIO
						let md = '<div class="alert alert-success" role="alert"> Deseja confirmar o envio dos seus dados curriculares?</div>';
						let mm = '<button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="confir">Confirmar</button>';
						let ms = '<div class="alert alert-info" role="alert">Enviaremos email avisando sobre seleção, favor verificar a caixa de SPAM (Lixo Eletrônico)</a></div>';

						$('#error').html(md);
						$('#mess').html(mm);
						$('#myModal').modal("show");

						$("#confir").on("click", async function () {
							$('#myModal').modal("hide");
							$('#error').html("");
							$('#mess').html("");

							abrirModal("infoload");
							let urlEmail = "profile.php";
							let request = { data: vet1 }


							let resultadoEmail = await new Promise(resolve => $.post(urlEmail, request, function (data) {

								//FAZER UM TIMEOUT DE 2 SEGUNDOS
								setTimeout(() => {

									//RETORNAR RESOLVE A PROMISE
									resolve(data);

									if (data == "success") {
										let er = '<div  class="alert alert-success" role="alert">Cadastro atualizado com sucesso!</a></div>';
										$('#informativo').html(er);
										$("#confirmacao").remove();
										$('#mensageria').html(ms);
										$('#modal3').modal("show");
										fechando();

									} else {
										let at = '<div class="alert alert-danger" role="alert">Erro em realizar atualização do curriculo!</a></div>';
										$('#informativo').html(at);
										$("#comunicado").remove();
										$("#confirmacao").remove();
										$('#modal3').modal("show");
										fechando();
									}

									fecharModal("infoload");
									//TEMPO DO TIME OUT
								}, 2000);

							}));
						});

						// RODA ESSE ELSE QUANDO NAO ENCONTRAR USUARIO (CRIAR USUARIO)
					} else {
						let md = '<div class="alert alert-success" role="alert"> Deseja confirmar o envio dos seus dados curriculares?</div>';
						let mm = '<button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="confir">Confirmar</button>';
						let er = '<div class="alert alert-success" role="alert">Curriculo enviado com sucesso ao nosso banco de recrutamento!</div>';
						let at = '<div class="alert alert-danger" role="alert">Erro em realizar cadastro do curriculo!</a></div>';

						let ms = '<div class="alert alert-info" role="alert">Enviaremos email avisando sobre seleção, favor verificar a caixa de SPAM (Lixo Eletrônico)</a></div>';

						$('#error').html(md);
						$('#mess').html(mm);
						$('#myModal').modal("show");

						$("#confir").on("click", async function () {
							$('#myModal').modal("hide");
							$('#mess').html("");
							$('#error').html("");

							abrirModal("infoload");
							let urlEmail = "profile.php";

							let request = { data: vet1 }

							let resultadoEmail = await new Promise(resolve => $.post(urlEmail, request, function (data) {

								//FAZER UM TIMEOUT DE 2 SEGUNDOS
								setTimeout(() => {

									//RETORNAR RESOLVE A PROMISE
									resolve(data);

									if (data == "success") {
										$('#informativo').html(er);
										$("#confirmacao").remove();
										$('#mensageria').html(ms);
										$('#modal3').modal("show");
										fechando();

									} else {
										$('#informativo').html(at);
										$("#comunicado").remove();
										$("#confirmacao").remove();
										$('#modal3').modal("show");
										fechando();

									}
									fecharModal("infoload");
								}, 2000);

							}));
						});

					}
					fecharModal("infoload");

				}, 2000);

			}));

		} else {
			chamar2();
		}
	} else {
		let md = '<div class="alert alert-danger" role="alert"> Favor inserir apenas as 3 ultimas EXPERIÊNCIAS PROFISSIONAIS</div>';

		$('#error').html(md);
		$('#mess').html("");
		$('#myModal').modal("show");
	}

});


// AQUI DELETA O USUARIO DO BASE - JA EXISTE UMA VALIDACAO QUE HABILITA ESSE BOTAO QUANDO ENCONTRA USUARIO CADASTRADO
$("#deletar").on("click", function () {
	let suc = '<div class="alert alert-success" role="alert">Cadastro deletado com sucesso</a></div>';
	let del = '<div class="alert alert-success" role="alert">Deseja realmente apagar seu CURRICULO no nosso banco de recrutamento?</a></div>';
	let mm = '<button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="confir">Confirmar</button>';
	let er = '<div class="alert alert-danger" role="alert">Erro ao fazer o delete do seu cadastro!</a></div>';
	let tt = "";

	var vet2 = { telefone: $("#telefone").val(), email: $("#email").val() }
	$('#error').html(del);
	$('#mess').html(mm);
	$('#myModal').modal("show");
	$("#confir").on("click", async function () {
		$('#myModal').modal("hide");
		abrirModal("infoload");

		let urlEmail = "deletar.php";
		let request = { data: vet2 }

		let resultadoEmail = await new Promise(resolve => $.post(urlEmail, request, function (data) {

			setTimeout(() => {
				resolve(data);
				if (data == "success") {
					$('#informativo').html(suc);
					$("#confirmacao").remove();
					$('#comunicado').remove();
					$('#modal3').modal("show");
					fechando();

				} else {
					$('#informativo').html(er);
					$("#comunicado").remove();
					$("#confirmacao").remove();
					$("#frase").remove();
					$('#modal3').modal("show");

				}
				fecharModal("infoload");
			}, 2000);

		}));

	});
});

// $("#fechar").on("click", function () {
// 	$(".modal-backdrop").remove();
// });


function fechando() {
	$("#fec").on("click", function () {
		fechar();
	});
	$("#fex").on("click", function () {
		fechar();
	});
}

function fechar() {
	location.reload(true);
}


function abrirModal(id) {
	$(`#${id}`).modal("show");
}

function fecharModal(id) {
	$(`#${id}`).modal("hide");

}

function desabilitadeletar(telefone, email) {
	
	var verificar = { telefone: telefone, email: email };

	$.post('verifica.php', { data: verificar }, function (dtt) {

		if (dtt == 1) {

			document.getElementById("deletar").disabled = false;
		} else {

			document.getElementById("deletar").disabled = true;
		}
	});
}

function apagarcursos() {
	$('#tbfp tbody').on('click', 'button', function () {
		$($(this).parents('tr')).addClass('selected');
		t.row('.selected').remove().draw(false);
		counter = counter - 1;

	});

}

function apagarformacao() {
	$('#tbep tbody').on('click', 'button', function () {
		$($(this).parents('tr')).addClass('selected');
		t2.row('.selected').remove().draw(false);
		counter2 = counter2 - 1;

	});

}

function tabelacursos() {
	pedidos = [];
	pedido = [];
	$('#tbfp tbody tr').each(function () {

		// Recuperar todas as colunas da linha percorida
		colunas = $(this).children();

		// Criar objeto para armazenar os dados
		pedido = {
			'id': $(colunas[0]).text(), // valor da coluna Produto
			'nome_curso': $(colunas[1]).text().toUpperCase(), // Valor da coluna nome curso
			'data_inicio': formatandodata($(colunas[2]).text().toUpperCase()), // Valor da coluna data inicio
			'data_termino': formatandodata($(colunas[3]).text().toUpperCase()) // Valor da coluna data termino
		};

		// Adicionar o objeto pedido no array
		//if verifica se existe alguma row preenchida, caso não adiciona no array de cursos
		if ($(colunas[1]).text() != "") {
			pedidos.push(pedido);
		}

	});

	return pedidos;

}

function tabelaformacao() {
	pedidos1 = [];
	pedido1 = [];
	$('#tbep tbody tr').each(function () {

		// Recuperar todas as colunas da linha percorida
		colunas1 = $(this).children();

		// Criar objeto para armazenar os dados
		pedido1 = {
			'id': $(colunas1[0]).text().toUpperCase(), // valor da coluna Produto
			'empresa': $(colunas1[1]).text().toUpperCase(), // Valor da coluna nome empresa
			'atividade': $(colunas1[2]).text().toUpperCase(), // Valor da coluna atividade
			'data_inicio': formatandodata($(colunas1[3]).text().toUpperCase()), // Valor da coluna data inicio
			'data_fim': formatandodata($(colunas1[4]).text().toUpperCase()), // Valor da coluna data termino
			'descricao': $(colunas1[5]).text().toUpperCase() // Valor da coluna descricao
		};

		// Adicionar o objeto pedido no array
		//if verifica se existe alguma row preenchida, caso não adiciona no array de experiencias
		if ($(colunas1[1]).text() != "") {
			pedidos1.push(pedido1);

		}

	});

	return pedidos1;

}

function formatandodata(date) {
	var newdate = date.split("/").reverse().join("-");
	return newdate;
}

function validaformacao(data) {

	if (data.length > 3) {
		return 1;
	} else {
		return 0;
	}
}


function valida_hash(email, telefone) {

	let dados = { telefone: telefone, email: email };

	$.post("consulta_hash.php", { data: dados }, function (retorno) {
		if (retorno == false) {
			let at = '<div class="alert alert-danger" role="alert">Usuário REPROVADO do processo de seleção recente! Logo você poderá se cadastrar novamente.</a></div>';
			$("#comunica").html(at);
			$("#confr").remove();
			$('#modal3').modal("show");
			fechando();
		}

	});


}

function myFunction1() {
	if (document.getElementById("exampleInputdate1").value != "") {
		let x = document.getElementById("exampleInputdate1").value;
		let maxDate = new Date(x).toISOString().split('T')[0];
		document.getElementById("exampleInputdate2").min = maxDate;
	}
}

function myFunction2() {
	if(document.getElementById("dtep1").value != ""){
	let x = document.getElementById("dtep1").value;
	let maxDate = new Date(x).toISOString().split('T')[0];
	document.getElementById("dtep2").min = maxDate;
	}

}