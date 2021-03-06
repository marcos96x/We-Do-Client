
/** função que muda a cor do coração qnd ele é curtido e faz a requisição na API */
function curtir(id_feed, id_texto, id_ideia) {
    let qt_curtida = Number($(id_feed).attr("name"))
    if ($(id_feed).attr("value") == 0) {
        // curte        
        let url = url_api + "/curtida"
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
                alert("Erro na curtida")
            }else{
                
                $(id_feed).attr('class', 'material-icons red-text')
                $(id_feed).html("favorite")
                $(id_feed).attr('value', 1)
                $(id_texto).html((qt_curtida + 1))
                $(id_feed).attr("name", (qt_curtida + 1))
                carrega_trends()
                
                let dados_notificacao = {
                    id_usuario: id,
                    id_ideia: id_ideia,
                    acao: 1
                }
                socket.emit('notification', dados_notificacao)
            }
        })     
        
        
    } else if ($(id_feed).attr('value') == 1) {
        // descurte
        let url = url_api + "/curtida"
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
                alert("Erro na curtida")
            }else{
                $(id_feed).attr('class', 'material-icons ')
                $(id_feed).html("favorite")
                $(id_feed).attr('value', 0)
                $(id_texto).html((qt_curtida - 1))
                $(id_feed).attr("name", (qt_curtida - 1))
                carrega_trends()
            }
        })         
    }
}

function curtir_ideia(id_feed, id_texto, id_ideia) {
    id_feed = `#${id_feed}`
    id_texto = `#${id_texto}`
    let qt_curtida = Number($(id_feed).attr("name"))
    if ($(id_feed).attr("value") == 0) {
        // curte        
        let url = url_api + "/curtida"
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
                alert("Erro na curtida")
            }else{
                
                $(id_feed).attr('class', 'material-icons red-text')
                $(id_feed).html("favorite")
                $(id_feed).attr('value', 1)
                $(id_texto).html((qt_curtida + 1))
                $(id_feed).attr("name", (qt_curtida + 1))
                carrega_trends()
                
                let dados_notificacao = {
                    id_usuario: id,
                    id_ideia: id_ideia,
                    acao: 1
                }
                socket.emit('notification', dados_notificacao)
            }
        })     
        
        
    } else if ($(id_feed).attr('value') == 1) {
        // descurte
        let url = url_api + "/curtida"
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
                alert("Erro na curtida")
            }else{
                $(id_feed).attr('class', 'material-icons ')
                $(id_feed).html("favorite")
                $(id_feed).attr('value', 0)
                $(id_texto).html((qt_curtida - 1))
                $(id_feed).attr("name", (qt_curtida - 1))
                carrega_trends()
            }
        })         
    }
}