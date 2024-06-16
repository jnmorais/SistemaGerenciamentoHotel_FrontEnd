$(document).ready(function () {
    // Processar formulário de inserção de hotel
    $('#form-inserir-hotel').submit(function (event) {
        event.preventDefault();

        var dataFundacao = new Date($('#input-data-fundacao').val());

        // Criar objeto formData com os dados do formulário
        var formData = {
            'nomeHotel': $('#input-hotel').val(),
            'endereco': $('#input-end').val(),
            'classificacao': parseInt($('#input-classificacao').val()),
            'wifi': $('#input-wifi').val() === 'true',
            'estacionamento': $('#input-estacionamento').val() === 'true',
            'cafe': $('#input-cafe').val() === 'true',
            'almoco': $('#input-almoco').val() === 'true',
            'janta': $('#input-janta').val() === 'true',
            'dataFundacao': dataFundacao.toISOString()
        };

        console.log(JSON.stringify(formData)); // Verifique os dados no console (opcional)

        // Enviar os dados via AJAX
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            type: 'POST',
            url: 'http://localhost:8080/api/hotel',
            data: JSON.stringify(formData),
            success: function (data) {
                console.log('Sucesso:', data);
                location.href = 'gerenciar-quartos.html?hotelId=' + data.id; // Redireciona para a página de gerenciamento de quartos com o ID do hotel
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error('Erro:', xhr.responseJSON);
                var message = xhr.responseJSON ? JSON.stringify(xhr.responseJSON) : 'Erro ao processar a solicitação';
                $('#div-alert-message').text(message);
                $('#div-alert-message').fadeIn();
            }
        });
    });
});
