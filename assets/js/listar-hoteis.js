$(document).ready(function() {
    var currentPage = 1;
    var hotelsPerPage = 10;
    var totalHotels = 0;
    var hotelsData = [];

    function renderTablePage(page) {
        var start = (page - 1) * hotelsPerPage;
        var end = start + hotelsPerPage;
        var pageData = hotelsData.slice(start, end);
        var html = '';
        $.each(pageData, function(i, data) {
            html += `<tr>`;
            html += `<td>${data.nome}</td>`;
            html += `<td>${data.endereco}</td>`;
            html += `<td>${data.classificacao}</td>`;
            html += `<td>${new Date(data.dataFundacao).toLocaleDateString('pt-BR')}</td>`;
            html += `<td>
                        <a class="btn-action btn btn-primary" href="editar-hotel.html?id=${data.id}"><i class="bi bi-pencil-fill"></i></a>
                        <a class="btn-action btn btn-info" href="visualizar-hotel.html?id=${data.id}"><i class="bi bi-search"></i></a>
                        <a class="btn-action btn btn-danger" href="#" onclick="removerHotel(${data.id})"><i class="bi bi-archive-fill"></i></a>
                     </td>`;
            html += `</tr>`;
        });
        $("#tbListarHoteisBody").html(html);
        updatePaginationButtons();
    }

    function updatePaginationButtons() {
        var totalPages = Math.ceil(totalHotels / hotelsPerPage);

        if (currentPage === 1) {
            $("#previousPage").hide();
        } else {
            $("#previousPage").show();
        }

        if (currentPage === totalPages) {
            $("#nextPage").hide();
        } else {
            $("#nextPage").show();
        }
    }

    function fetchHotels() {
        $.ajax({
            url: 'http://localhost:8080/api/hotel',
            type: 'GET',
            dataType: 'json',
            success: function(result) {
                hotelsData = result;
                totalHotels = hotelsData.length;
                renderTablePage(currentPage);
            },
            error: function(xhr, status, error) {
                console.error('Erro na requisição AJAX:', status, error);
            }
        });
    }

    $(".pagination").on("click", ".page-link", function(e) {
        e.preventDefault();
        if ($(this).attr("id") === "previousPage" && currentPage > 1) {
            currentPage--;
        } else if ($(this).attr("id") === "nextPage") {
            var totalPages = Math.ceil(totalHotels / hotelsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
            }
        }
        renderTablePage(currentPage);
    });

    fetchHotels();
});

function removerHotel(id) {
    console.log('Tentando remover o hotel com ID:', id);
    var respostaPergunta = confirm("Confirma a exclusão?");
    if (respostaPergunta == true) {
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/api/hotel/' + id,
            dataType: 'json',
            success: function(result, status, xhr) {
                if (xhr.status == 200) {
                    alert('Hotel removido com sucesso');
                    location.reload();  // Recarregar a página
                } else {
                    alert('Erro ao remover hotel: ' + xhr.responseText);
                }
            },
            error: function(xhr, status, error) {
                alert('Hotel removido ' + xhr.responseText);
            }
        });
    }
}
