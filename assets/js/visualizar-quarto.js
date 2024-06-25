function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
    return null; // Retorna null se o parâmetro não for encontrado
}

var id_quarto = GetURLParameter("id");

function esconderAlert() {
    $('#div-alert-message').html("<a class='close' onclick='esconderAlert()'>×</a>");
    $('#div-alert-message').hide();
}

$(document).ready(function () {
    if (id_quarto !== null) {
        $.ajax({
            url: 'http://localhost:8080/api/quarto/' + id_quarto,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $('#input-identificacao').val(data.identificacao);
                $('#input-tamanho').val(data.tamanho);
                $('#input-status').val(data.status);
                $('#input-tipo-cama').val(data.tipoCama);
                $('#input-quantidade-leito').val(data.quantidadeLeito);
                $('#input-preco').val(data.preco);
                $('#input-vista').val(data.vista);
                $('#input-comodidades').val(data.comodidades);
                $('#input-descricao').val(data.descricao);
                $('#input-hotel').val(data.hotel.nome); // Exibindo o nome do hotel associado ao quarto
            },
            error: function (data) {
                $('#div-alert-message').prepend(data.responseText);
                $('#div-alert-message').fadeIn();
            }
        });
    } else {
        $('#div-alert-message').prepend("ID do quarto não encontrado.");
        $('#div-alert-message').fadeIn();
    }
});
