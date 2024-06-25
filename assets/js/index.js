$(document).ready(onInit);

function onInit() {
    // Busca a quantidade de hotéis cadastrados
    $.ajax({
        url: "http://localhost:8080/api/hotel/total",
        type: "GET",
        dataType: "json",
        success: function(res) {
            console.log('Resposta da API de hotéis:', res);
            if (typeof res === 'number') {
                $("#div-total-hoteis").html(res);
            } else {
                console.error('Estrutura de resposta inesperada da API de hotéis:', res);
            }
        },
        error: function(err) {
            console.error('Erro ao buscar a quantidade de hotéis:', err);
        }
    });

    // Busca a quantidade de quartos cadastrados
    $.ajax({
        url: "http://localhost:8080/api/quarto/total",
        type: "GET",
        dataType: "json",
        success: function(res) {
            console.log('Resposta da API de quartos:', res);
            if (typeof res === 'number') {
                $("#div-total-quartos").html(res);
            } else {
                console.error('Estrutura de resposta inesperada da API de quartos:', res);
            }
        },
        error: function(err) {
            console.error('Erro ao buscar a quantidade de quartos:', err);
        }
    });
}
