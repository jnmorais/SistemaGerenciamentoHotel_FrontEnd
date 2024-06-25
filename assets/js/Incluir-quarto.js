$(document).ready(function () {
    carregarOpcoesHoteis();

    $('#form-inserir-quarto').submit(function (event) {
        event.preventDefault();

        var formData = {
            'identificacao': $('#input-quarto').val(),
            'tamanho': parseFloat($('#input-tamanho').val()),
            'status': $('#input-status').val(),
            'tipoCama': $('#input-tipo-cama').val(),
            'quantidadeLeito': parseInt($('#input-quantidade-leito').val()), 
            'preco': parseFloat($('#input-preco').val()),
            'vista': $('#input-vista').val(),
            'hotel': $('#input-hotel').val() ? {"id": parseInt($('#input-hotel').val())} : null
        };

        console.log(JSON.stringify(formData)); 

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
                location.href = 'listar-quartos.html';
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error('Erro: LINHA 35 NÃO SEI', xhr.responseJSON);
                var message = xhr.responseJSON ? JSON.stringify(xhr.responseJSON) : 'Erro ao processar a Solicitação';
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
