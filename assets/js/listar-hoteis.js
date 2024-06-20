$(document).ready(listarHoteis);

function listarHoteis() {
    $.ajax({
        url: 'http://localhost:8080/api/hotel',
        type: 'GET',
        dataType: 'json',
        success: function(result) {
            console.log('Dados retornados pela API:', result);
            var html = '';
            $.each(result, function(i, data) {
                html += `<tr>`;
                html += `<td>${data.nome}</td>`;
                html += `<td>${data.endereco}</td>`;
                html += `<td>${data.classificacao}</td>`;
                html += `<td>${new Date(data.dataFundacao).toLocaleDateString('pt-BR')}</td>`;
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
                alert('Erro ao remover hotel: ' + xhr.responseText);
            }
        });
    }
}
