
var counter = 1;
var counter2 = 1;
var vet_curso = [];
var vet_formacao = [];
var t;
var t2;

//tabela cursos
function tablecursos() {
    t = $('#tbfp').DataTable({
        paging: false,
        orderCellsTop: false,
        retrieve: false,
        paging: false,
        info: false,
        select: false,
        searching: false,

        "language": {
            "emptyTable": " ",
        },
    });
}

//funcao que criar as row da tabela cursos
function criandorowscursos(nomecurso, data1, data2) {

    let b1 = '<button type="button" class="btn btn-danger" onclick="apagarcursos();" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"> <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg></button>';
    if ((nomecurso.toUpperCase() != "") & (data1.toUpperCase() != "") & (data2.toUpperCase() != "")) {
        let tamcursos = tabelacursos().length;
        counter = tamcursos + 1;
        t.row.add([counter, nomecurso, data1, data2, b1]).draw(false);
        counter++;
      
        $('#CAD_FP').modal("hide");
        setTimeout(() => {
            fechandomodal("textoCAD_FP");
        }, 1000);


    } else {
        let cc = '<div class="alert alert-danger" role="alert">Todos os campos de FORMAÇÃO PROFISSIONAL são obrigatórios!</a></div>';
        $("#error").html(cc);
        $('#myModal').modal("show");
    }

}


// tabela de experiencia
function tableformacao() {

    t2 = $('#tbep').DataTable({
        paging: false,
        orderCellsTop: false,
        retrieve: false,
        paging: false,
        info: false,
        select: false,
        searching: false,
        "language": {
            "emptyTable": " ",
        },
    });
}

//funcao para criar as rows da tabela experiencias
function criandorowsformacao(nomeempresa, atividade, data1, data2, bio) {

    let b2 = '<button type="button" class="btn btn-danger"  onclick="apagarformacao();" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"> <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg></button>';

    if ((nomeempresa != "") & (atividade != "") & (data1 != "") & (data2 != "") & (bio != "")) {
        let tamformacao = tabelaformacao().length;
        counter2 = tamformacao + 1;

        t2.row.add([counter2, nomeempresa, atividade, data1, data2, bio, b2]).draw(false);
        counter2++;

        document.getElementById("textoCAD_EP").reset();
        $('#CAD_EP').modal("hide");
        setTimeout(() => {
            fechandomodal("textoCAD_EP");
        }, 1000);



    } else {
        let bb = '<div class="btn btn-danger" role="alert">Todos os campos de EXPERIÊNCIA PROFISSIONAL são obrigatórios!</a></div>';
        $("#error").html(bb);
        $('#myModal').modal("show");
    }

}

//funcao limite o texto em resumo do usuario
function limite_textarea(valor) {
    quant = 300;
    total = valor.length;
    if (total <= quant) {
        resto = quant - total;
        document.getElementById('cont').innerHTML = resto;
    } else {
        document.getElementById('bio').value = valor.substr(0, quant);
    }
}

///funcao apaga elementos do modal cursos/experiencias
function fechandomodal(id_modal) {
    $(".modal-backdrop").remove();
    document.getElementById(`${id_modal}`).reset();
    $("body").attr({ "style": "overflow: auto;" });
    

}

//funcao que desabilita o input DEFICIENCIA
function desabilitar(valor) {
    var status = document.getElementById('deficiencia').disabled;


    if (valor === 'nao' && !status) {
        document.getElementById('deficiencia').disabled = true;
        $('#deficiencia').val("");
    } else {
        document.getElementById('deficiencia').disabled = false;
        $('#deficiencia').val("");

    }

}

//funcao que verificar limite de experiências profissionais
function validacaocamposformacao(counter2) {
    let counterr = counter2 + 1
    if (counterr > 3) {

        let md = '<div class="alert alert-danger" role="alert"> Favor inserir apenas as 3 ultimas EXPERIÊNCIAS PROFISSIONAIS</div>';
        $('#error').html(md);
        $('#mess').html("");
        $('#myModal').modal("show");
        $('#CAD_EP').modal("hide");

    }


}