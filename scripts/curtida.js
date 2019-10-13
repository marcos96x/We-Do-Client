
/** função que muda a cor do coração qnd ele é curtido e faz a requisição na API */
function curtir(id_feed, id_texto, id_ideia) {
    let qt_curtida = Number($(id_feed).attr("name"))
    if ($(id_feed).attr('value') == 0) {
        // curte
        let url = "http://localhost:3000/curtida"
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
            contentType: "application/json"
        }).done(function(res){
            if(res.err){
                alert("Erro na curtida")
            }else{
                $(id_feed).html("favorite")
                $(id_feed).attr('value', 1)
                $(id_feed).attr('class', 'material-icons red-text')
                $(id_texto).html((qt_curtida + 1))
                $(id_feed).attr("name", (qt_curtida + 1))
                carrega_trends()
            }
        })     
        
    } else if ($(id_feed).attr('value') == 1) {
        // descurte
        let url = "http://localhost:3000/curtida"
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
            contentType: "application/json"
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