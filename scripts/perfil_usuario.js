// Variaveis globais usadas no index
let nome = localStorage.getItem("nome_we_do")
let email = localStorage.getItem("email_we_do")
let token = localStorage.getItem("token_we_do")
var id = localStorage.getItem("id_we_do")

$(document).ready(function () {
    carrega_trends()

    $('.modal').modal({
 
        dismissible: false, // Modal cannot be closed by clicking anywhere outside
   
      }
   
    );

    $("#cancela").click(function(){
        /* Single line Reset function executes on click of Reset Button */
        $("#alt_dados")[0].reset();
    });

    $("#btn_configuracao_conta").click(function(){
        $(".class='label_modal").attr("class", "label_modal active")
    });

   
})


function mostra_interesse(id_elemento, id_icone, id_ideia) {

    let url = url_api + "/interesse"
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify({
            "usuario": {
                "id_usuario": id
            },
            "ideia": {
                "id_ideia": id_ideia
            }
        }),
        contentType: "application/json",
        beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', localStorage.getItem("token_we_do"))
        }
    })
    .fail((err) => {
        if(err.status == 401){
            localStorage.clear()
            window.location.href = "index.html?msg=4"
        }
    }).done(function(res){
        if(res.err){
            alert("Erro na inserção do interesse")
        }else{
            localStorage.setItem("token_we_do", res.token)
            if ($(id_elemento).attr('value') == 1) {
                $(id_icone).text(" ")
                $(id_elemento).attr('value', 0).attr('class', 'btn')

                M.toast({html: "Interesse removido!"})

                
            } else if ($(id_elemento).attr('value') == 0){
                $(id_icone).text("done")
                $(id_elemento).attr('value', 1).attr('class', 'btn-floating')
                
                let dados_notificacao = {
                    id_usuario: id,
                    id_ideia: id_ideia,
                    acao: 3
                }
                socket.emit('notification', dados_notificacao)
                M.toast({html: "Interesse demonstrado!"})
            }
        }
    })
}



/**inicialização das funções do materialize */
document.addEventListener('DOMContentLoaded', function () {
    /**dropdown */
    M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'));
    /**select */
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
    /**chips */
    var elems = document.querySelectorAll('.chips');
    var instances = M.Chips.init(elems);
    /**sidenav */
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems)
    /**botão fixo add ideia --  mostra apenas no mobile */
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems);
    /**tootip das ideias atuais */
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems, { exitDelay: 20 });
    /** colapsible do menu lateral - projetos atuais */
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);

});
