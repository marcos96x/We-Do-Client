
function envia_comentario(id_comentario, id_ideia, id_texto_comentario_feed, div_comentario){
    
    let msg = $(id_comentario).val().trim()
    let teste = 0
    for(let i = 0; i < msg.length; i++){
        if(msg[i] != " "){
            teste = 1
        }
    }
    if(teste == 1){
        let url = "http://localhost:3000/comentario/" + id
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({
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
                conteudo += `<div style='line-height:110%;'>`
                conteudo += "<p style='font-family: Arial, Helvetica, sans-serif';><label>24 de dezembro de 2019</label><br>"
                conteudo += `<a style='font-family:'bree-serif';';>${localStorage.getItem("nome_we_do")} &nbsp;</a>${msg}</p></div>`
                conteudo += "<div class='divider'></div>"
                $(campo).append(conteudo)
                M.toast({html: 'Comentário realizado!'})
            }
        })
    }else{
        M.toast({html: "Campo de comentário vazio!"})
    }
    
}