$(document).ready(function () {
    // Carregar opções de hotéis
    carregarOpcoesHoteis();

    // Processar formulário de inserção de quarto
    $('#form-inserir-quarto').submit(function (event) {
        event.preventDefault();

        // Criar objeto formData com os dados do formulário
        var formData = {
            'identificacao': $('#input-quarto').val(),
            'tamanho': $('#input-tamanho').val(),
            'status': $('#input-status').val(),
            'tipoCama': $('#input-tipo-cama').val(),
            'quantidadeLeito': $('#input-quantidade-leito').val(),
            'preco': $('#input-preco').val(),
            'vista': $('#input-vista').val(),
            'comodidades': $('#input-comodidades').val(),
            'descricao': $('#input-descricao').val(),
            'hotel': $('#input-hotel').val(),
        };

        console.log(JSON.stringify(formData)); // Verifique os dados no console (opcional)

        // Enviar os dados via AJAX
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            type: 'POST',
            url: 'http://localhost:8080/api/quarto',
            data: JSON.stringify(formData),
            success: function (data) {
                console.log('Sucesso:', data);
                location.href = 'http://127.0.0.1:5500/listar-quartos.html'; // Redireciona para a página de gerenciamento de quartos com o ID do hotel
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error('Erro:', xhr.responseJSON);
                var message = xhr.responseJSON? JSON.stringify(xhr.responseJSON) : 'Erro ao processar a Solicitação';
                $('#div-alert-message').text(message);
                $('#div-alert-message').fadeIn();
            }
        });
    });
});

function carregarOpcoesHoteis() {
    $.ajax({
        url: 'http://localhost:8080/api/hotel',
        type: 'GET',
        dataType: 'json',
        success: function(result) {
            console.log('Hotéis retornados pela API:', result);
            var options = '<option value="">Selecione um Hotel</option>';
            $.each(result, function(i, hotel) {
                options += `<option value="${hotel.id}">${hotel.nome}</option>`;
            });
            $('#input-hotel').html(options);
        },
        error: function(xhr, status, error) {
            console.error('Erro ao carregar as opções de hotéis:', status, error);
        }
    });
}