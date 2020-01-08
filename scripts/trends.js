
function carrega_trends(){

    $("#trends").html("")
    $("#trends").append(`          
        <h5 style='font-size:35px;'># Trends</h5>

        <div class='divider'></div>
        <div class='divider'></div>`)


    let url = url_api + "/trends" 
    $.ajax({
        url: url,
        type: "GET",
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
            alert("Erro na busca do feed")
        }else{
            // trend 1
            let verificador = 0
            for(let i = 0; i < res.ideia1.membros.length; i++){
                if(res.ideia1.membros[i].id_usuario == id){
                    verificador = 1
                }
            }
            let classe_like = "material-icons"
            let valor_curtida = 0
            if(res.ideia1.curtidas.length != []){
                for(let i = 0; i < res.ideia1.curtidas.length; i++){
                    if(res.ideia1.curtidas[i].id_usuario == id){
                        classe_like = "material-icons red-text"
                        valor_curtida = 1
                    }
                }
            }
            
            if(verificador == 1){
                $("#trends").append("<div class='row'><div class='col s12 m6 l6'><h6 style='font-size:25px;'>"+`<a style="color: #404f65;" onclick="acessa_ideia(${res.ideia1.id_ideia})"><i class="fas fa-crown gold-text"></i> ${res.ideia1.nm_ideia}`+"</a><br><label style='font-size:15px;'>"+`<a href='${url_web}/perfil_usuario.html?id_usuario=${res.ideia1.id_idealizador}'>`+res.ideia1.nm_idealizador+"</a></label></h6><div id='curtida-coment1' class='left'><i id='curtida_trends_1' value='"+valor_curtida+"' onclick='curtir(curtida_trends_1, texto_curtida_trend1, "+res.ideia1.id_ideia+")' class='"+classe_like+"' name='"+res.ideia1.qt_curtida+"'>favorite</i><text id='texto_curtida_trend1'>"+res.ideia1.qt_curtida+"</text>&nbsp&nbsp&nbsp&nbsp<i id='comentario_trends_1' class='material-icons'>mode_comment</i>"+res.ideia1.qt_comentarios+"</div>&nbsp&nbsp &nbsp&nbsp<br><br></div><div class='col s12 m6 l6 center-align'><a class='btn-floating' id='btn_interesse_trends1' onclick='mostra_interesse_trends(btn_interesse_trends1, icone_interesse_trends1, "+res.ideia1.id_ideia+")' value='1' style='margin-left:43%;margin-top:5%;'><i class='material-icons white-text' id='icone_interesse_trends1'>done</i>Interesse</a></div></div><div class='divider'></div><div class='divider'></div>")
            }else{
                $("#trends").append("<div class='row'><div class='col s12 m6 l6'><h6 style='font-size:25px;'>"+`<a style="color: #404f65;" onclick="acessa_ideia(${res.ideia1.id_ideia})"><i class="fas fa-crown gold-text"></i> ${res.ideia1.nm_ideia}`+"</a><br><label style='font-size:15px;'>"+`<a href='${url_web}/perfil_usuario.html?id_usuario=${res.ideia1.id_idealizador}'>`+res.ideia1.nm_idealizador+"</a></label></h6><div id='curtida-coment1' class='left'><i id='curtida_trends_1' value='"+valor_curtida+"' onclick='curtir(curtida_trends_1, texto_curtida_trend1, "+res.ideia1.id_ideia+")' class='"+classe_like+"' name='"+res.ideia1.qt_curtida+"'>favorite</i><text id='texto_curtida_trend1'>"+res.ideia1.qt_curtida+"</text>&nbsp&nbsp&nbsp&nbsp<i id='comentario_trends_1' class='material-icons'>mode_comment</i>"+res.ideia1.qt_comentarios+"</div>&nbsp&nbsp &nbsp&nbsp<br><br></div><div class='col s12 m6 l6 center-align'><a class='btn' id='btn_interesse_trends1' onclick='mostra_interesse_trends(btn_interesse_trends1, icone_interesse_trends1, "+res.ideia1.id_ideia+")' value='0' style='margin-left:43%;margin-top:5%;'><i class='material-icons white-text' id='icone_interesse_trends1'></i>Interesse</a></div></div><div class='divider'></div><div class='divider'></div>")
            }

            // trend 2
            verificador = 0
            for(let i = 0; i < res.ideia2.membros.length; i++){
                if(res.ideia2.membros[i].id_usuario == id){
                    verificador = 1
                }
            }

            classe_like = "material-icons"
            valor_curtida = 0
            if(res.ideia2.curtidas.length != []){
                for(let i = 0; i < res.ideia2.curtidas.length; i++){
                    if(res.ideia2.curtidas[i].id_usuario == id){
                        classe_like = "material-icons red-text"
                        valor_curtida = 1
                    }
                }
            }

            if(verificador == 1){
                $("#trends").append("<div class='row'><div class='col s12 m6 l6'><h6 style='font-size:25px;'>"+`<a style="color: #404f65;" onclick="acessa_ideia(${res.ideia2.id_ideia})"><i class="fas fa-crown silver-text"></i> ${res.ideia2.nm_ideia}`+"</a><br><label style='font-size:15px;'>"+`<a href='${url_web}/perfil_usuario.html?id_usuario=${res.ideia2.id_idealizador}'>`+res.ideia2.nm_idealizador+"</a></label></h6><div id='curtida-coment2' class='left'><i id='curtida_trends_2' value='"+valor_curtida+"' onclick='curtir(curtida_trends_2, texto_curtida_trend2, "+res.ideia2.id_ideia+")' class='"+classe_like+"' name='"+res.ideia2.qt_curtida+"'>favorite</i><text id='texto_curtida_trend2'>"+res.ideia2.qt_curtida+"</text>&nbsp&nbsp&nbsp&nbsp<i id='comentario_trends_2' class='material-icons'>mode_comment</i>"+res.ideia2.qt_comentarios+"</div>&nbsp&nbsp &nbsp&nbsp<br><br></div><div class='col s12 m6 l6 center-align'><a class='btn-floating' id='btn_interesse_trends2' onclick='mostra_interesse_trends(btn_interesse_trends2, icone_interesse_trends2, "+res.ideia2.id_ideia+")' value='1' style='margin-left:43%;margin-top:5%;'><i class='material-icons white-text' id='icone_interesse_trends2'>done</i>Interesse</a></div></div><div class='divider'></div><div class='divider'></div>")
            }else{
                $("#trends").append("<div class='row'><div class='col s12 m6 l6'><h6 style='font-size:25px;'>"+`<a style="color: #404f65;" onclick="acessa_ideia(${res.ideia2.id_ideia})"><i class="fas fa-crown silver-text"></i> ${res.ideia2.nm_ideia}`+"</a><br><label style='font-size:15px;'>"+`<a href='${url_web}/perfil_usuario.html?id_usuario=${res.ideia2.id_idealizador}'>`+res.ideia2.nm_idealizador+"</a></label></h6><div id='curtida-coment2' class='left'><i id='curtida_trends_2' value='"+valor_curtida+"' onclick='curtir(curtida_trends_2, texto_curtida_trend2, "+res.ideia2.id_ideia+")' class='"+classe_like+"' name='"+res.ideia2.qt_curtida+"'>favorite</i><text id='texto_curtida_trend2'>"+res.ideia2.qt_curtida+"</text>&nbsp&nbsp&nbsp&nbsp<i id='comentario_trends_2' class='material-icons'>mode_comment</i>"+res.ideia2.qt_comentarios+"</div>&nbsp&nbsp &nbsp&nbsp<br><br></div><div class='col s12 m6 l6 center-align'><a class='btn' id='btn_interesse_trends2' onclick='mostra_interesse_trends(btn_interesse_trends2, icone_interesse_trends2, "+res.ideia2.id_ideia+")' value='0' style='margin-left:43%;margin-top:5%;'><i class='material-icons white-text' id='icone_interesse_trends2'></i>Interesse</a></div></div><div class='divider'></div><div class='divider'></div>")
            }
            

            // trend 3
            verificador = 0
            for(let i = 0; i < res.ideia3.membros.length; i++){
                if(res.ideia3.membros[i].id_usuario == id){
                    verificador = 1
                }
            }

            classe_like = "material-icons"
            valor_curtida = 0
            if(res.ideia3.curtidas.length != []){
                for(let i = 0; i < res.ideia3.curtidas.length; i++){
                    if(res.ideia3.curtidas[i].id_usuario == id){
                        classe_like = "material-icons red-text"
                        valor_curtida = 1
                    }
                }
            }

            if(verificador == 1){
                $("#trends").append("<div class='row'><div class='col s12 m6 l6'><h6 style='font-size:25px;'>"+`<a style="color: #404f65;" onclick="acessa_ideia(${res.ideia3.id_ideia})"><i class="fas fa-crown bronze-text"></i> ${res.ideia3.nm_ideia}`+"</a><br><label style='font-size:15px;'>"+`<a href='${url_web}/perfil_usuario.html?id_usuario=${res.ideia3.id_idealizador}'>`+res.ideia3.nm_idealizador+"</a></label></h6><div id='curtida-coment3' class='left'><i id='curtida_trends_3' value='"+valor_curtida+"' onclick='curtir(curtida_trends_3, texto_curtida_trend3, "+res.ideia3.id_ideia+")' class='"+classe_like+"' name='"+res.ideia3.qt_curtida+"'>favorite</i><text id='texto_curtida_trend3'>"+res.ideia3.qt_curtida+"</text>&nbsp&nbsp&nbsp&nbsp<i id='comentario_trends_3' class='material-icons'>mode_comment</i>"+res.ideia3.qt_comentarios+"</div>&nbsp&nbsp &nbsp&nbsp<br><br></div><div class='col s12 m6 l6 center-align'><a class='btn-floating' id='btn_interesse_trends3' onclick='mostra_interesse_trends(btn_interesse_trends3, icone_interesse_trends3, "+res.ideia3.id_ideia+")' value='1' style='margin-left:43%;margin-top:5%;'><i class='material-icons white-text' id='icone_interesse_trends3'>done</i>Interesse</a></div></div><div class='divider'></div><div class='divider'></div>")
            }else{
                $("#trends").append("<div class='row'><div class='col s12 m6 l6'><h6 style='font-size:25px;'>"+`<a style="color: #404f65;" onclick="acessa_ideia(${res.ideia3.id_ideia})"><i class="fas fa-crown bronze-text"></i> ${res.ideia3.nm_ideia}`+"</a><br><label style='font-size:15px;'>"+`<a href='${url_web}/perfil_usuario.html?id_usuario=${res.ideia3.id_idealizador}'>`+res.ideia3.nm_idealizador+"</a></label></h6><div id='curtida-coment3' class='left'><i id='curtida_trends_3' value='"+valor_curtida+"' onclick='curtir(curtida_trends_3, texto_curtida_trend3, "+res.ideia3.id_ideia+")' class='"+classe_like+"' name='"+res.ideia3.qt_curtida+"'>favorite</i><text id='texto_curtida_trend3'>"+res.ideia3.qt_curtida+"</text>&nbsp&nbsp&nbsp&nbsp<i id='comentario_trends_3' class='material-icons'>mode_comment</i>"+res.ideia3.qt_comentarios+"</div>&nbsp&nbsp &nbsp&nbsp<br><br></div><div class='col s12 m6 l6 center-align'><a class='btn' id='btn_interesse_trends3' onclick='mostra_interesse_trends(btn_interesse_trends3, icone_interesse_trends3, "+res.ideia3.id_ideia+")' value='0' style='margin-left:43%;margin-top:5%;'><i class='material-icons white-text' id='icone_interesse_trends3'></i>Interesse</a></div></div><div class='divider'></div><div class='divider'></div>")
            }
            


        }
    })
}

/**mostra interesse na parte dos trends*/
function mostra_interesse_trends(id_elemento, id_icone, id_ideia) {

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
            if ($(id_elemento).attr('value') == 1) {
                $(id_icone).text(" ")
                $(id_elemento).attr('value', 0).attr('class', 'btn')

                
            } else if ($(id_elemento).attr('value') == 0){
                $(id_icone).text("done")
                $(id_elemento).attr('value', 1).attr('class', 'btn-floating')
            }
        }
    })
}