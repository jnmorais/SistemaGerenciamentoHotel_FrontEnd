$(document).ready(function () {
    // Processar formulário de inserção de hotel
    $('#form-inserir-quarto').submit(function (event) {
        event.preventDefault();

        var dataFundacao = new Date($('#input-data-fundacao').val());

        // Criar objeto formData com os dados do formulário
        var formData = {
            'identificacao': $('#input-quarto').val(),
            'tamanho': $('#input-tamanho').val(),
            'status': $('#input-status').val(),
            'hotel': $('#input-hotel').val() === 'null',
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
                location.href = 'http://127.0.0.1:5500/listar-hoteis.html'; // Redireciona para a página de gerenciamento de quartos com o ID do hotel
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error('Erro:', xhr.responseJSON);
                var message = xhr.responseJSON ? JSON.stringify(xhr.responseJSON) : 'Erro ao processar a Solicitação';
                $('#div-alert-message').text(message);
                $('#div-alert-message').fadeIn();
            }
        });
    });
});