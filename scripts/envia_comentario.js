
function envia_comentario(id_comentario, id_ideia, id_texto_comentario_feed){
    
    let msg = $(id_comentario).val()
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
                M.toast({html: 'Comentário realizado!'})
            }
        })
    }else{
        console.log("Sem mensagem")
    }
    
}