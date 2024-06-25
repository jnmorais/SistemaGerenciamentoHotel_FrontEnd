$(document).ready(onInit);

function onInit() {
    var currentPage = 1;
    var quartosPerPage = 10;
    var totalQuartos = 0;
    var quartosData = [];

    function renderTablePage(page) {
        var start = (page - 1) * quartosPerPage;
        var end = start + quartosPerPage;
        var pageData = quartosData.slice(start, end);
        var html = '';
        $.each(pageData, function(i, data) {
            html += `<tr>`; 
            html += `<td>${data.identificacao}</td>`;
            html += `<td>${data.status}</td>`;
            html += `<td>${data.quantidadeLeito}</td>`;
            html += `<td>${data.hotelid}</td>`; // Acessa o nome do hotel
            html += `<td>R$ ${data.preco.toFixed(2).replace('.', ',')}</td>`;
            html += `<td>
                        <a class="btn-action btn btn-primary" href="editar-quarto.html?id=${data.id}"><i class="bi bi-pencil-fill"></i></a>
                        <a class="btn-action btn btn-info" href="visualizar-quartos.html?id=${data.id}"><i class="bi bi-search"></i></a>
                        <a class="btn-action btn btn-danger" href="#" onclick="removerQuarto(${data.id})"><i class="bi bi-trash"></i></a>
                     </td>`;
            html += `</tr>`;
        });
        $("#tbListarQuartosBody").html(html);
        updatePaginationButtons();
    }

    function updatePaginationButtons() {
        var totalPages = Math.ceil(totalQuartos / quartosPerPage);

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

    function fetchQuartos() {
        $.ajax({
            url: 'http://localhost:8080/api/quarto',
            type: 'GET',
            dataType: 'json',
            success: function(result) {
                quartosData = result;
                totalQuartos = quartosData.length;
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
            var totalPages = Math.ceil(totalQuartos / quartosPerPage);
            if (currentPage < totalPages) {
                currentPage++;
            }
        }
        renderTablePage(currentPage);
    });

    fetchQuartos();
}

function removerQuarto(id) {
    console.log('Tentando remover o quarto com ID:', id);
    var respostaPergunta = confirm("Confirma a exclusão?");
    if (respostaPergunta == true) {
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/api/quarto/' + id,
            dataType: 'json',
            success: function(result, status, xhr) {
                if (xhr.status == 200) {
                    alert('Quarto removido com sucesso');
                    location.reload();  // Recarregar a página
                } else {
                    alert('Erro ao remover quarto: ' + xhr.responseText);
                }
            },
            error: function(xhr, status, error) {
                alert('Erro ao remover quarto: ' + xhr.responseText);
            }
        });
    }
}
