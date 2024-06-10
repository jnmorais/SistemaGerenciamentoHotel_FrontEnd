function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

var id_aluno = GetURLParameter("id");

//Processar formulário
$('#form-editar-aluno').submit(function (event) {

    event.preventDefault();

    nascimento = new Date($('#input-nascimento').val());

    //Criar formData
    var formData = {
        'id': id_aluno,
        'matricula': $('#input-matricula').val(),
        'nome': $('#input-nome').val(),
        'nascimento': nascimento.toISOString(),
        'dataHoraCadastro': new Date().toISOString()
    };

    console.log(JSON.stringify(formData));

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: 'PUT',
        url: 'http://localhost:8080/api/aluno',
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function (data) {
            location.href = 'listar-alunos.html';
        },
        error: function (data) {
            $('#div-alert-message').prepend(data.responseText);
            $('#div-alert-message').fadeIn();
        }
    });
 });

 function esconderAlert() {
    $('#div-alert-message').html("<a class='close' onclick='esconderAlert()'>×</a>");
    $('#div-alert-message').hide();
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getUTCMonth() + 1),
        day = '' + d.getUTCDate(),
        year = d.getUTCFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:8080/api/aluno/' + id_aluno,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $("#input-nome").val(data.nome);
            $("#input-matricula").val(data.matricula);
            $("#input-nascimento").val(formatDate(new Date(data.nascimento)));
        }
    })

});