$('#form-inserir-hotel').submit(function (event) {
    event.preventDefault();

    // Criando o objeto formData
    var formData = {
        'nomeHotel': $('#input-hotel').val(),
        'endereco': $('#input-end').val(),
        'classificacao': parseInt($('#input-classificacao').val()),
        'wifi': $('#input-wifi').val() === 'true',
        'estacionamento': $('#input-estacionamento').val() === 'true',
        'cafe': $('#input-cafe').val() === 'true',
        'almoco': $('#input-almoco').val() === 'true',
        'janta': $('#input-janta').val() === 'true',
        'dataHoraCadastro': new Date().toISOString()
    };

    console.log(JSON.stringify(formData));

    // Enviando os dados via AJAX
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: 'POST',
        url: 'http://localhost:8080/api/hotel',
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function (data) {
            location.href = 'listar-hoteis.html';
        },
        error: function (data) {
            var response = data.responseJSON;
            var message = response ? JSON.stringify(response) : 'Erro ao processar a solicitação';
            $('#div-alert-message').text(message);
            $('#div-alert-message').fadeIn();
        }
    });
});
