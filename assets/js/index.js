$(document).ready(onInit);

function onInit() {
    $.ajax({
        url: "http://localhost:8080/api/hotel/total",
        type: "get",
        dataType: "json",
        success: function (res) {
            console.log('Resposta da API:', res);
            if (typeof res === 'number') {
                $("#div-total-hoteis").html(res);
            } else {
                console.error('Estrutura de resposta inesperada:', res);
            }
        },
        error: function (err) {
            console.error('Erro ao buscar a quantidade de hotéis:', err);
        }
    });
}
