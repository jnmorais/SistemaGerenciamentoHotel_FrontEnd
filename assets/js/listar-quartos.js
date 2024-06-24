$(document).ready(function() {
    listarQuartos();
});

function listarQuartos() {
    $.ajax({
        url: 'http://localhost:8080/api/quarto/', // URL da API para buscar os quartos
        type: 'GET',
        dataType: 'json',
        success: function(result) {
            console.log('Dados retornados pela API:', result);
            var html = '';
            $.each(result, function(i, data) {
                html += `<tr>`;
                html += `<td>${data.numero}</td>`;
                html += `<td>${data.status}</td>`;
                html += `<td>${data.quantidade}</td>`;
                html += `<td>${data.preco}</td>`;
                html += `<td>
                            <a class="btn-action btn btn-primary" href="editar-quarto.html?id=${data.id}"><i class="bi bi-pencil-fill"></i></a>
                            <a class="btn-action btn btn-info" href="visualizar-quarto.html?id=${data.id}"><i class="bi bi-search"></i></a>
                            <a class="btn-action btn btn-danger" href="#" onclick="removerQuarto(${data.id})"><i class="bi bi-trash"></i></a>
                         </td>`;
                html += `</tr>`;
            });
            console.log('HTML gerado:', html);
            $("#tbListarQuartosBody").html(html);

            // Inicializar o DataTable
            $('#tbListarQuartos').DataTable({
                "language": {
                    "search": "Pesquisar:",
                    "lengthMenu": "Mostrar _MENU_ registros por página",
                    "zeroRecords": "Nenhum registro encontrado",
                    "info": "Mostrando página _PAGE_ de _PAGES_",
                    "infoEmpty": "Nenhum registro disponível",
                    "infoFiltered": "(filtrado de _MAX_ registros no total)",
                    "paginate": {
                        "first": "Primeiro",
                        "last": "Último",
                        "next": "Próximo",
                        "previous": "Anterior"
                    }
                }
            });
        },
        error: function(xhr, status, error) {
            console.error('Erro na requisição AJAX:', status, error);
        }
    });
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
