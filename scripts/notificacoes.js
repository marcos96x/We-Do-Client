var notificacoes_usuario = []
$(document).ready(() => {
    $("#links_notificacoes").click(() => {
        // muda o estado das notificações para "visto"
        let url = "http://localhost:3000/notificacoes/" + id

        $.ajax({
            url: url,
            type: "PUT",
            contentType: "application/json"
        }).done((res) => {
            if(res.err){
                alert(res.err)
            }else{
                $("#qtd_notificacoes").fadeOut()
                $("#qtd_notificacoes").val("")
                
            }
        })
    })
    carrega_notificacoes_usuario(id)
    socket.on("notification", (dados) => {
        if(dados.id_usuario == id){
            if(dados.tp_notificacao == 1){
                // curtida
                $("#notifications").append(`
                <a href="ideia_chat.html?ideia=${dados.id_ideia}">
                    <li class="collection-item" style='line-height:100%; padding:10%;'>${dados.msg_notificacao}
                        <br>
                        <label>em ${dados.momento_notificacao}</label>
                    </li>
                </a>
                `)
                let html = `<a style="color: white;" href="ideia_chat.html?ideia=${dados.id_ideia}">${dados.msg_notificacao}</a>`
                M.toast({html: html, displayLength: 6000, classes: 'rounded'})
            }else if (dados.tp_notificacao == 2){
                // comentario
                $("#notifications").append(`
                <a href="ideia_chat.html?ideia=${dados.id_ideia}">
                    <li class="collection-item" style='line-height:100%; padding:10%;'>${dados.msg_notificacao}
                        <br>
                        <label>em ${dados.momento_notificacao}</label>
                    </li>
                </a>
                `)
                let html = `<a style="color: white;" href="ideia_chat.html?ideia=${dados.id_ideia}">${dados.msg_notificacao}</a>`
                M.toast({html: html, displayLength: 6000, classes: 'rounded'})
            }else if (dados.tp_notificacao == 3){
                // solicitação de ideia
                $("#notifications").append(`                        
                
                    <li class="collection-item" style='line-height:100%; padding:10%;'>${dados.msg_notificacao}
                        <br>
                            <button class='btn blue' onclick="visualiza_perfil(${dados.id_usuario_acao})">Visitar</button>
                            <button class='btn green' onclick="aceita_participacao(${dados.id_usuario}, ${dados.id_usuario_acao}, ${dados.id_ideia})">Aceitar</button>
                            <button class='btn red' onclick="recusa_participacao(${dados.id_usuario}, ${dados.id_usuario_acao}, ${dados.id_ideia})">Recusar</button>
                        <br>
                        <label>${dados.momento_notificacao}</label>
                    </li>
                
                `)
                let html = `
                    <a style="color: white;" href="ideia_chat.html?ideia=${dados.id_ideia}">${dados.msg_notificacao}</a>&nbsp&nbsp
                        <button class='btn blue' onclick="visualiza_perfil(${dados.id_usuario_acao})">Visitar</button>
                        <button class='btn-floating green' onclick="aceita_participacao(${dados.id_usuario}, ${dados.id_usuario_acao}, ${dados.id_ideia})"><i class="material-icons">check</i></button>
                        <button class='btn-floating red' onclick="recusa_participacao(${dados.id_usuario}, ${dados.id_usuario_acao}, ${dados.id_ideia})"><i class="material-icons">close</i></button>
                    `
                M.toast({html: html, displayLength: 6000, classes: 'rounded'})
            }else if (dados.acao){
                if(dados.acao == 4){
                    // manda pra quem solicitou um respaudo se foi aceito
                    if(dados.id_usuario == id){
                        let html = `<a style="color: white;" href="ideia_chat.html?ideia=${dados.id_ideia}">Você foi aceito na ideia "${dados.nm_ideia}". Clique aqui para interagir com sua nova equipe!</a>`
                        M.toast({html: html, displayLength: 6000, classes: 'rounded'})
                    }
                }                
            }
        }
    })
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
            let dados_notificacao = {
                id_usuario: __id_usuario,
                id_ideia: id_ideia,
                acao: 4
            }
            socket.emit('notification', dados_notificacao)
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
                let qtd_notificacoes = 0
                for(let i = 0; i < notificacoes_usuario.length; i++){
                    if(notificacoes_usuario[i].visualizada == 0)
                        qtd_notificacoes++
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
                            <li class="collection-item" style='line-height:100%; padding:10%;'>${notificacoes_usuario[i].msg_notificacao}
                                <br>
                                    <button style="max-width: 50%;" class='btn blue' onclick="visualiza_perfil(${notificacoes_usuario[i].id_usuario_acao})">Visitar</button>
                                    <button style="max-width: 50%;" class='btn green' onclick="aceita_participacao(${notificacoes_usuario[i].id_usuario}, ${notificacoes_usuario[i].id_usuario_acao}, ${notificacoes_usuario[i].id_ideia})">Aceitar</button>
                                    <button style="max-width: 50%;" class='btn red' onclick="recusa_participacao(${notificacoes_usuario[i].id_usuario}, ${notificacoes_usuario[i].id_usuario_acao}, ${notificacoes_usuario[i].id_ideia})">Recusar</button>
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
                if(qtd_notificacoes > 0){
                    $("#qtd_notificacoes").html(qtd_notificacoes)
                    $("#qtd_notificacoes").show()
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

function visualiza_perfil(id_user){
    window.location.href = "http://127.0.0.1:5500/perfil_usuario.html?usuario=" + id_user
}