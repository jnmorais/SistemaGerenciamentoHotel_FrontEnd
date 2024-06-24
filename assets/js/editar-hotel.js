function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

var id_hotel = GetURLParameter("id");

$(document).ready(function () {
    // Buscar dados do hotel para preencher o formulário
    $.ajax({
        url: 'http://localhost:8080/api/hotel/' + id_hotel,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $("#input-hotel").val(data.nome);
            $("#input-end").val(data.endereco);
            $("#input-classificacao").val(data.classificacao);
            $("#input-wifi").val(data.wifi.toString());
            $("#input-estacionamento").val(data.estacionamento.toString());
            $("#input-cafe").val(data.cafe.toString());
            $("#input-almoco").val(data.almoco.toString());
            $("#input-janta").val(data.janta.toString());

            // Verificar se data.qtdQuartos está definido antes de acessar length
            if (data.qtdQuartos !== undefined) {
                $("#input-qtd-quartos").val(data.qtdQuartos.length);
            } else {
                $("#input-qtd-quartos").val(0); // Definir como zero se não estiver definido
            }

            // Formatando a data de fundação para o formato adequado
            var dataFundacao = new Date(data.dataFundacao);
            var formattedDate = dataFundacao.toISOString().substring(0, 10);
            $("#input-data-fundacao").val(formattedDate);
        },
        error: function (data) {
            $('#div-alert-message').prepend(data.responseText);
            $('#div-alert-message').fadeIn();
        }
    });

    // Processar formulário de edição de hotel
    $('#form-editar-hotel').submit(function (event) {
        event.preventDefault();

        // Criar objeto formData com os dados do formulário
        var formData = {
            'id': id_hotel,
            'nome': $('#input-hotel').val(),
            'endereco': $('#input-end').val(),
            'classificacao': $('#input-classificacao').val(),
            'wifi': $('#input-wifi').val() === 'true',
            'estacionamento': $('#input-estacionamento').val() === 'true',
            'cafe': $('#input-cafe').val() === 'true',
            'almoco': $('#input-almoco').val() === 'true',
            'janta': $('#input-janta').val() === 'true',
            'dataFundacao': $('#input-data-fundacao').val()
        };

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            type: 'PUT',
            url: 'http://localhost:8080/api/hotel',
            data: JSON.stringify(formData),
            dataType: 'json',
            success: function (data) {
                location.href = 'listar-hoteis.html';
            },
            error: function (data) {
                $('#div-alert-message').prepend(data.responseText);
                $('#div-alert-message').fadeIn();
            }
        });
    });
});

function esconderAlert() {
    $('#div-alert-message').html("<a class='close' onclick='esconderAlert()'>×</a>");
    $('#div-alert-message').hide();
}
