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

var id_hotel = GetURLParameter("id");

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
    if (id_hotel !== null) {
        $.ajax({
            url: 'http://localhost:8080/api/hotel/' + id_hotel,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $('#input-hotel').val(data.nome);
                $('#input-end').val(data.endereco);
                $('#input-classificacao').val(data.classificacao);
                $('#input-wifi').val(data.wifi.toString());
                $('#input-estacionamento').val(data.estacionamento.toString());
                $('#input-cafe').val(data.cafe.toString());
                $('#input-almoco').val(data.almoco.toString());
                $('#input-janta').val(data.janta.toString());

                // Formatando a data de fundação para o formato adequado
                var dataFundacao = new Date(data.dataFundacao);
                var formattedDate = dataFundacao.toISOString().substring(0, 10);
                $('#input-data-fundacao').val(formattedDate);
                
            },
            error: function (data) {
                $('#div-alert-message').prepend(data.responseText);
                $('#div-alert-message').fadeIn();
            }
        });
    } else {
        $('#div-alert-message').prepend("ID do hotel não encontrado.");
        $('#div-alert-message').fadeIn();
    }
});
