// Função para obter parâmetros da URL
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

// Variável global para armazenar o id do quarto
var id_quarto = GetURLParameter("id");

$(document).ready(function () {
    // Verificar se o id do quarto foi obtido corretamente
    if (!id_quarto) {
        console.error('ID do quarto não encontrado na URL.');
        return;
    }

    // Carregar opções de hotéis no select
    carregarOpcoesHoteis();

    // Buscar dados do quarto para preencher o formulário
    $.ajax({
        url: 'http://localhost:8080/api/quarto/' + id_quarto,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $("#input-identificacao").val(data.identificacao);
            $("#input-tamanho").val(data.tamanho);
            $("#input-status").val(data.status);
            $("#input-tipo-cama").val(data.tipoCama);
            $("#input-quantidade-leito").val(data.quantidadeLeito);
            $("#input-preco").val(data.preco);
            $("#input-vista").val(data.vista);
            $("#input-comodidades").val(data.comodidades);
            $("#input-descricao").val(data.descricao);
            $("#input-hotel").val(data.hotel.id);
        },
        error: function (xhr, status, error) {
            console.error('Erro ao buscar dados do quarto:', status, error);
            $('#div-alert-message').text('Erro ao buscar dados do quarto.');
            $('#div-alert-message').fadeIn();
        }
    });

    // Processar formulário de edição de quarto
    $('#form-editar-quarto').submit(function (event) {
        event.preventDefault();

        // Criar objeto formData com os dados do formulário
        var formData = {
            'id': parseInt(id_quarto), // Garantir que o id seja enviado como número
            'identificacao': $('#input-identificacao').val(),
            'tamanho': $('#input-tamanho').val(),
            'status': $('#input-status').val(),
            'tipoCama': $('#input-tipo-cama').val(),
            'quantidadeLeito': $('#input-quantidade-leito').val(),
            'preco': parseFloat($('#input-preco').val()), // Garantir que o preço seja enviado como número decimal
            'vista': $('#input-vista').val(),
            'comodidades': $('#input-comodidades').val(),
            'descricao': $('#input-descricao').val(),
            'hotel': { 'id': parseInt($('#input-hotel').val()) } // Garantir que o id do hotel seja enviado como número
        };

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: 'PUT',
            url: 'http://localhost:8080/api/quarto',
            data: JSON.stringify(formData),
            success: function (data) {
                console.log('Quarto atualizado com sucesso:', data);
                location.href = 'http://127.0.0.1:5500/listar-quartos.html';
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error('Erro:', xhr.responseJSON);
                var message = xhr.responseJSON ? JSON.stringify(xhr.responseJSON) : 'Erro ao atualizar quarto';
                $('#div-alert-message').text(message);
                $('#div-alert-message').fadeIn();
            }
        });
    });
});

// Função para carregar opções de hotéis no select
function carregarOpcoesHoteis() {
    $.ajax({
        url: 'http://localhost:8080/api/hotel',
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            console.log('Hotéis retornados pela API:', result);
            var options = '<option value="">Selecione um Hotel</option>';
            $.each(result, function (i, hotel) {
                options += `<option value="${hotel.id}">${hotel.nome}</option>`;
            });
            $('#input-hotel').html(options);

            // Preencher o select com o hotel do quarto, se já estiver carregado
            if ($('#input-hotel').val() === '') {
                $('#input-hotel').val($('#input-hotel').data('hotel-id'));
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', status, error);
        }
    });
}


