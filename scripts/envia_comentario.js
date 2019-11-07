
function envia_comentario_ideia(){
    if($("#texto_comentario").val().trim() == ""){
        M.toast({html: "Campo de comentário vazio!"})
    }else{
        let url = "http://localhost:3000/comentario"
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({
                "usuario": {
                    id_usuario: id
                },  
                "mensagem": {
                    "ct_mensagem": $("#texto_comentario").val().trim()
                },
                "ideia": {
                    "id_ideia": id_ideia_original
                }
            }),
            contentType: "application/json"
        }).done(function(res){
            if(res.err){
                alert("Erro na inserção do comentario")
            }else{
                let conteudo = ""
                conteudo += `<div style='line-height:110%;' id="div_do_comentario${res.id_comentario}"><div class="row" style="padding-bottom: -1%;"><div class="col s11">`
                conteudo += "<p style='font-family: Arial, Helvetica, sans-serif';><label>24 de dezembro de 2019</label><br>"
                conteudo += `<a style='font-family:'bree-serif';'>${localStorage.getItem("nome_we_do")} &nbsp;</a>${$("#texto_comentario").val().trim()}</div><div class="col s1" style="padding-top: 3%;"><a href="#!"><i class="material-icons red-text exclui_coment" onclick="deleta_comentario(${res.id_comentario})" id="iconezinho">delete</i></a></p></div></div>`
                conteudo += "<div class='divider'></div>"
                $("#comentarios").append(conteudo)
                $("#texto_comentario").val("")
                M.toast({html: 'Comentário realizado!'})

                let dados_notificacao = {
                    id_usuario: id,
                    id_ideia: id_ideia_original,
                    acao: 2
                }
                socket.emit('notification', dados_notificacao)
            }
        })
    }
}


function envia_comentario(id_comentario, id_ideia, id_texto_comentario_feed, div_comentario){
    
    let msg = $(id_comentario).val().trim()
    let teste = 0
    for(let i = 0; i < msg.length; i++){
        if(msg[i] != " "){
            teste = 1
        }
    }
    if(teste == 1){
        let url = "http://localhost:3000/comentario"
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({
                "usuario": {
                    id_usuario: id
                },
                "mensagem": {
                    "ct_mensagem": msg
                },
                "ideia": {
                    "id_ideia": id_ideia
                }
            }),
            contentType: "application/json"
        }).done(function(res){
            if(res.err){
                alert("Erro na inserção do comentario")
            }else{
                let txt_comentario = $(id_texto_comentario_feed).text()
                let novoValor = Number(txt_comentario) + 1
                $(id_texto_comentario_feed).text(novoValor)
                $(id_comentario).val("")
                let campo = "#" + "bloco_comentarios_ideia" + id_ideia
                let conteudo = ""
                conteudo += `<div style='line-height:100%;' id="div_do_comentario${res.id_comentario}">`
                conteudo += "<p style='font-family: Arial, Helvetica, sans-serif';><label>24 de dezembro de 2019</label><br>"
                conteudo += `<a style='font-family:'bree-serif';>${localStorage.getItem("nome_we_do")} &nbsp;</a>${msg}<i class="material-icons red-text exclui_coment" onclick="deleta_comentario(${res.id_comentario})" style='margin-left:96%; padding-top:-25%;'
                id="iconezinho">delete</i></p>`
                conteudo += "</div><div class='divider'></div>"
                $(campo).append(conteudo)
                M.toast({html: 'Comentário realizado!'})

                let dados_notificacao = {
                    id_usuario: id,
                    id_ideia: id_ideia,
                    acao: 2
                }
                socket.emit('notification', dados_notificacao)
            }
        })
    }else{
        M.toast({html: "Campo de comentário vazio!"})
    }    
}