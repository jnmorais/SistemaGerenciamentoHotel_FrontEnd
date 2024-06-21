$(document).ready(listarQuartos);

function listarQuartos() {
    $.ajax({
        url: 'http://localhost:8080/api/quarto/', // Adicionei a barra ao final da URL
        type: 'GET', // Adicionei o tipo de requisição
        dataType: 'json',
        success: function(result) {
            console.log('Dados retornados pela API:', result);
            var html = '';
            $.each(result, function(i, data) {
                html += `<tr>`;
                html += `<td>${data.identificacao}</td>`;
                html += `<td>${data.status}</td>`;
                html += `<td>${data.quantidadeLeito}</td>`;
                html += `<td>${data.preco}</td>`;
                html += `<td>
                            <a class="btn-action btn btn-primary" href="editar-hotel.html?id=${data.id}"><i class="bi bi-pencil-fill"></i></a>
                            <a class="btn-action btn btn-info" href="visualizar-hotel.html?id=${data.id}"><i class="bi bi-search"></i></a>
                            <a class="btn-action btn btn-success" href="incluir-hotel.html"><i class="bi bi-plus"></i></a>
                            <a class="btn-action btn btn-danger" href="#" onclick="removerHotel(${data.id})"><i class="bi bi-archive-fill"></i></a>
                         </td>`;
                html += `</tr>`;
            });
            console.log('HTML gerado:', html);
            $("#tbListarHoteisBody").html(html);

            // Inicializar o DataTable com opções de linguagem e estilização
            $('#tbListarHoteis').DataTable({
                language: {
                    search: "Pesquisar:",
                    lengthMenu: "Hoteis _MENU_ ",
                    info: "Mostrando _START_ a _END_ de _TOTAL_ entradas",
                    paginate: {
                        first: "Primeiro",
                        last: "Último",
                        next: "Próximo",
                        previous: "Anterior"
                    },
                    zeroRecords: "Nenhum registro encontrado",
                    infoEmpty: "Nenhum registro disponível",
                    infoFiltered: "(filtrado de _MAX_ registros no total)"
                }
            });
        },
        error: function(xhr, status, error) {
            console.error('Erro na requisição AJAX:', status, error);
        }
    });
}
function removerQuarto(id) {
    console.log('Tentando remover o hotel com ID:', id);
    var respostaPergunta = confirm("Confirma a exclusão?");
    if (respostaPergunta == true) {
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/api/quarto/' + id,
            dataType: 'json',
            success: function(result, status, xhr) {
                if (xhr.status == 200) {
                    alert('Hotel removido com sucesso');
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