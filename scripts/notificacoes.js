var notificacoes_usuario = []
$(document).ready(() => {
    carrega_notificacoes_usuario(id)
})

function aceita_participacao(id_idealizador, __id_usuario, id_ideia){
    let url = "http://localhost:3000/ideia/interesse"

    $.ajax({
        url: url,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
            ideia: {
                id_usuario: id_idealizador,
                id_ideia: id_ideia
            },
            usuario: {
                id_usuario: __id_usuario
            }
        })
    }).done((res) => {
        if(res.err){
            alert(res.err)
        }else{
            M.toast({html: "Solicitação aceita com sucesso!"})
            carrega_notificacoes_usuario(id_idealizador)
        }
    })
}
function recusa_participacao(id_idealizador, id_usuario, id_ideia){
    let url = "http://localhost:3000/ideia/remover"

    $.ajax({
        url: url,
        type: "DELETE",
        contentType: "application/json",
        data: JSON.stringify({
            ideia: {
                id_usuario: id_idealizador,
                id_ideia: id_ideia
            },
            usuario: {
                id_usuario: id_usuario
            }
        })
    }).done((res) => {
        if(res.err){
            alert(res.err)
        }else{
            M.toast({html: "Solicitação rejeitada com sucesso!"})
            carrega_notificacoes_usuario(id_idealizador)
        }
    })
}

function carrega_notificacoes_usuario(id_user){
    
    $("#notifications").html("")
    let url = "http://localhost:3000/notificacoes/" + id_user

    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json"
    }).done((res) => {
        if(res.err){
            alert(res.err)
        }else{
            if(res.notificacoes.length != 0){  
                notificacoes_usuario = res.notificacoes
                for(let i = 0; i < notificacoes_usuario.length; i++){
                    if(notificacoes_usuario[i].tp_notificacao == 1){
                        // curtida
                        $("#notifications").append(`
                        <a href="ideia_chat.html?ideia=${notificacoes_usuario[i].id_ideia}">
                            <li class="collection-item" style='line-height:100%; padding:10%;'>${notificacoes_usuario[i].msg_notificacao}
                                <br>
                                <label>em ${notificacoes_usuario[i].momento_notificacao}</label>
                            </li>
                        </a>
                        `)
                    }else if (notificacoes_usuario[i].tp_notificacao == 2){
                        // comentario
                        $("#notifications").append(`
                        
                        <a href="ideia_chat.html?ideia=${notificacoes_usuario[i].id_ideia}">
                            <li class="collection-item" style='line-height:100%; padding:10%;'>${notificacoes_usuario[i].msg_notificacao}
                                <br>
                                <label>em ${notificacoes_usuario[i].momento_notificacao}</label>
                            </li>
                        </a>
                        `)
                    }else if (notificacoes_usuario[i].tp_notificacao == 3){
                        // interesse
                        $("#notifications").append(`                        
                        <a href="perfil_usuario.html?usuario=${notificacoes_usuario[i].id_usuario_acao}">
                            <li class="collection-item" style='line-height:100%; padding:10%;'>${notificacoes_usuario[i].msg_notificacao}
                                <br>
                                    <button class='btn green' onclick="aceita_participacao(${notificacoes_usuario[i].id_usuario}, ${notificacoes_usuario[i].id_usuario_acao}, ${notificacoes_usuario[i].id_ideia})">Aceitar</button>
                                    <button class='btn red' onclick="recusa_participacao(${notificacoes_usuario[i].id_usuario}, ${notificacoes_usuario[i].id_usuario_acao}, ${notificacoes_usuario[i].id_ideia})">Recusar</button>
                                <br>
                                <label>${notificacoes_usuario[i].momento_notificacao}</label>
                            </li>
                        </a>
                        `)
                    }else if (notificacoes_usuario[i].tp_notificacao == 4){
                        // interesse aceito
                        $("#notifications").append(`                        
                            <a href="ideia_chat.html?ideia=${notificacoes_usuario[i].id_ideia}">
                                <li class="collection-item" style='line-height:100%; padding:10%;'>${notificacoes_usuario[i].msg_notificacao}
                                    <br>                                        
                                    <label>${notificacoes_usuario[i].momento_notificacao}</label>
                                </li>
                            </a>
                        `)
                    }
                    
                }
                
            }else{
                $("#notifications").append(`
                    <li class="collection-item" style='line-height:100%; padding:10%;'>
                        Nenhuma notificação para mostrar
                    </li>
                `)
            }
            
        }
    })
}