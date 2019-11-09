let nome = localStorage.getItem("nome_we_do")
let email = localStorage.getItem("email_we_do")
let token = localStorage.getItem("token_we_do")
let id = localStorage.getItem("id_we_do")

let tecnologias_insere_ideia = []
let id_tecnologia_da_pesquisa = []

$(document).ready(function(){
    carrega_feed()
    carrega_trends()
    projetos_atuais()
    abre_tecnologias()
    $("#pesquisas").hide()
})


function revela_feed_apos_busca(){
    $("#pesquisas").hide()
    $("#feed").show()
    $("#div_adicionar_ideia").show()
    $("#texto_pesquisa").val("")
    id_tecnologia_da_pesquisa = []
}

function seleciona_tecnologias_pesquisa(id, nm){
    id_tecnologia_da_pesquisa = [id, nm]
}



// -------------------------------- Funções usadas no sistema
function abre_tecnologias(){
    
    $.ajax({
        url: "http://localhost:3000/tecnologia",
        type: "GET",
        contentType: 'application/json'
    }).done(function (res) {
        let id_tecnologia, nm_tecnologia
        let select_ideia = document.getElementsByTagName("ul")[9]
        let select_tecnologias = document.getElementsByTagName("ul")[3]
        for (let i = 0; i < res.tecnologias.length; i++) {
            id_tecnologia = res.tecnologias[i].id_tecnologia
            nm_tecnologia = "" + res.tecnologias[i].nm_tecnologia + ""
            select_tecnologias.innerHTML += "<li tabindex='0' id='select-options-65a86874-15b3-944b-dd42-68baf34ae3bb" + id_tecnologia + "'><span class='tec' value='" + id_tecnologia + "' ><label><input type='radio' name='tecnologias_pesquisa' value='" + id_tecnologia + "'  ><span onClick='seleciona_tecnologias_pesquisa("+ id_tecnologia + ", \""+nm_tecnologia+"\" )'>" + nm_tecnologia + "</span></label></span></li>"
            select_ideia.innerHTML += "<li tabindex='0' id='select-options-65a86874-15b3-944b-dd42-68baf34ae3bb" + id_tecnologia + "'><span class='tec' value='" + id_tecnologia + "' ><label><input type='checkbox'  ><span onClick='insere_tecnologias_criacao_ideia("+ id_tecnologia + ", \""+nm_tecnologia+"\" )'>" + nm_tecnologia + "</span></label></span></li>"
            
        }
    })
    
}


function sair(){
    localStorage.clear()
    window.location.href = "index.html"
}


function carrega_feed(){
    $("#feed").html("")
    valida_usuario()
    $("#nm_usuario").html(nome)
    $("#email_usuario").html(email)
    let content

    let url = "http://localhost:3000/feed/" + id
    $.ajax({
        url: url,
        type: "GET",
        contentType: 'application/json'
    }).done(function(res){
        if(res.err){
            alert("Erro na busca do feed")
        }else{
            let ideias = res.ideias
            let nm_ideia, ds_ideia, id_ideia, qtcomentarios, curtidas, tecnologias, membros, idealizador
            let verificacao_interesse, id_icone_interesse_feed, id_icone_curtida_feed, id_texto_curtida_feed, id_texto_comentario_feed
            for(let i = 0; i < ideias.length; i++){
                id_ideia = ideias[i].id_ideia
                nm_ideia = ideias[i].nm_ideia
                ds_ideia = ideias[i].ds_ideia
                if(ideias[i].comentarios.length == []){
                    qtcomentarios = 0
                }else{
                    qtcomentarios = ideias[i].comentarios.length
                }
                
                curtidas = ideias[i].curtidas.length
                membros = ideias[i].membros
                tecnologias = ideias[i].tecnologias
                
                
                verificacao_interesse = 0
                // saber quem é o idealizador e remove-lo dos membros
                for(let i2 = 0; i2 < membros.length; i2++){
                    if(membros[i2].idealizador == 1){
                        idealizador = membros[i2]
                    }                     
                }
                let nm_id_interesse = "btn_add_tecnologia_feed"+id_ideia
                content = "<div class='col s12 m12 l12 z-depth-1' style=' border-color:rgb(210, 214, 223); border-style: solid; margin-top:2%;border-width: 1px; border-radius: 2px;'><div class='col s12 m12 l12'><div class='row right'>"
                
                // verifica se o usuario já se interessou pela ideia
                for(let i2 = 0; i2 < membros.length; i2++){     
                    if(membros[i2].id_usuario == id){
                        if(membros[i2].status_solicitacao == 1){
                            // ja faz parte
                            verificacao_interesse = 2
                        }else{
                            // ja se interessou
                            verificacao_interesse = 1
                        }
                        
                    }  
                }
                id_icone_interesse_feed = "icone_interesse_feed" + id_ideia
                id_icone_curtida_feed = "icone_curtida_feed" + id_ideia
                id_texto_comentario_feed = "texto_comentario_feed" + id_ideia
                
                if(verificacao_interesse == 0){
                    // imprime sem interesse clicado
                    content += "<a class='btn' id='"+nm_id_interesse+"' onclick='mostra_interesse("+nm_id_interesse+", "+id_icone_interesse_feed+", "+id_ideia+")' value='0' style='margin-top:13%;'><i class='material-icons white-text' id='"+id_icone_interesse_feed +"'></i>Interesse</a></div>"
                }else if (verificacao_interesse == 2){
                    content += "</div>"
                }else{
                    // imprime com interesse clicado
                    content += "<a class='btn-floating' id='"+nm_id_interesse+"' onclick='mostra_interesse("+nm_id_interesse+", "+id_icone_interesse_feed+", "+id_ideia+")' value='1' style='margin-top:13%;'><i class='material-icons white-text' id='"+id_icone_interesse_feed +"'>done</i>Interesse</a></div>"
                }

                
                content += `<h5><a style="color: #404f65;" onclick="acessa_ideia(${id_ideia})">`+nm_ideia+"</a><label> - "+idealizador.nm_usuario+"</label></h5><div style='width: 101%;' class='divider'></div><br>"
                
                for(let i2 = 0; i2 < tecnologias.length; i2++){
                    content += "<div class='chip'>"+tecnologias[i2].nm_tecnologia+"</div>"
                }

                content += "<blockquote class='black-text' style='font-family: Arial, Helvetica, sans-serif;'>"+ds_ideia+"</blockquote>"

                if(membros.length == 1){
                    content+= "<p><labeL>Com</labeL> &nbsp&nbsp"+membros[0].nm_usuario+".<br><br>"
                }else if (membros.length == 2){
                    content+= "<p><labeL>Com</labeL> &nbsp&nbsp"+membros[0].nm_usuario+" e "+membros[1].nm_usuario+".<br><br>"
                }else if (membros.length == 3){
                    content+= "<p><labeL>Com</labeL> &nbsp&nbsp"+membros[0].nm_usuario+", "+membros[1].nm_usuario+" e "+membros[2].nm_usuario+".<br><br>"
                }else{
                    let qt_membros = membros.length - 3
                    content+= "<p><labeL>Com</labeL> &nbsp&nbsp"+membros[1].nm_usuario+", "+membros[2].nm_usuario+", "+membros[3].nm_usuario+" e +"+qt_membros+".<br><br>"
                }

                let teste_curtida = 0
                for(let i2 = 0; i2 < ideias[i].curtidas.length; i2++){
                    if(ideias[i].curtidas[i2].id_usuario == id){
                        teste_curtida = 1
                    }
                }
                id_texto_curtida_feed = "id_texto_curtida_feed" + id_ideia
                if(teste_curtida == 0){
                    // nao curtiu
                    content += "<i class='material-icons' id='"+id_icone_curtida_feed+"' onclick='curtir("+id_icone_curtida_feed+", "+id_texto_curtida_feed+", "+id_ideia+")' value='0' name='"+curtidas+"'>favorite</i><text id='"+id_texto_curtida_feed+"'>"+curtidas+"</text> &nbsp&nbsp&nbsp&nbsp<i class='material-icons'>mode_comment</i><text id='"+id_texto_comentario_feed+"'>"+qtcomentarios+"</text></p>"
                }else{
                    // curtiu
                    content += "<i class='material-icons red-text' id='"+id_icone_curtida_feed+"' onclick='curtir("+id_icone_curtida_feed+", "+id_texto_curtida_feed+", "+id_ideia+")' value='1' name='"+curtidas+"'>favorite</i><text id='"+id_texto_curtida_feed+"'>"+curtidas+"</text> &nbsp&nbsp&nbsp&nbsp<i class='material-icons'>mode_comment</i><text id='"+id_texto_comentario_feed+"'>"+qtcomentarios+"</text></p>"
                }
                
                let icone_comentario = "icone_comentario" + id_ideia
                let id_comentario = "id_comentario_enviado" + id_ideia
                content += "<div class='row' style='margin-bottom:-1%;padding:2%;border-radius:10px; background-color:#aec1df2d;'>"
                content += "<h6>Comentários</h6>"
                
                let nm_id_comentario = "bloco_comentarios_ideia" + id_ideia
                content += `<div  id="${nm_id_comentario}">`
                ideias[i].comentarios.reverse()
                for(let i2 = 1; i2 >= 0; i2--){
                    if(ideias[i].comentarios[i2]){
                        if(ideias[i].comentarios[i2].id_usuario == id){
                            content += `<div style='line-height:110%;' id="div_do_comentario${ideias[i].comentarios[i2].id_mensagem}">`
                            content += `<div class='row'>
                            <div class='col s11'>
                            <p style='font-family: Arial, Helvetica, sans-serif';><label>${moment(ideias[i].comentarios[i2].hr_mensagem, 'YYYY-MM-DD hh:mm:ss', 'pt').fromNow()}                       </label></p>
                            <a style='font-family:'bree-serif';';>${ideias[i].comentarios[i2].nm_usuario} &nbsp;</a>${ideias[i].comentarios[i2].ct_mensagem}
                            </div>`
                            content += `<div class='col s1' style="padding-top: 3%;">`
                            content += `<a href="#!"><i class="material-icons red-text exclui_coment" onclick="deleta_comentario(${ideias[i].comentarios[i2].id_mensagem})" id="iconezinho">delete</i></a>`
                            content += `</div>`
                            content += `</div>`
                            content += `</div>`
                            content += "<div class='divider'></div>"
                        }else{
                            content += `<div style='line-height:110%;'>`
                            content += `<div class='row'>
                            <div class='col s11'>
                            <p style='font-family: Arial, Helvetica, sans-serif';><label>${moment(ideias[i].comentarios[i2].hr_mensagem, 'YYYY-MM-DD hh:mm:ss', 'pt').fromNow()}</label></p>
                            <a style='font-family:'bree-serif';';>${ideias[i].comentarios[i2].nm_usuario} &nbsp;</a>${ideias[i].comentarios[i2].ct_mensagem}
                            </div>`
                            content += `</div>`
                            content += `</div>`
                            content += "<div class='divider'></div>"
                        }
                    }                    
                }

                content +="</div></div>"
                content += "<div class='row' style='margin-top:-1%; margin-left:-2%;'><div class='input-field col s12' id='feed_comentario'><textarea id='"+id_comentario+"' class='materialize-textarea' onfocusout='mudaIcone2("+icone_comentario+")'  onfocus='mudaIcone1("+icone_comentario+")' ></textarea><label for='"+id_comentario+"'>Comente</label><i class='material-icons right icone_comentario' id='"+icone_comentario+"' onclick='envia_comentario("+id_comentario+", "+id_ideia+", "+id_texto_comentario_feed+", "+`${nm_id_comentario}`+")'>mode_comment</i></div></div>"
                
                content += "</div></div>"
                $("#feed").append(content)
            }

        }
    })
}

// Muda icones dos comentarios
function mudaIcone1(classe){
    $(classe).html("send")
}
function mudaIcone2(classe){
    $(classe).html("mode_comment")
}

/** mostra interesse no feed */
function mostra_interesse(id_elemento, id_icone, id_ideia) {

    let url = "http://localhost:3000/interesse"
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
            alert("Erro na inserção do interesse")
        }else{
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

/** mostra o select de tecnologias qnd o criador clica no botao '+' transforma o botao em 'x' e vice-versa*/
function mostra_tecnologias() {
    if ($("#btn_add_tecnologia").attr('value') == 1) {

        $("#add_tecnologia").show()
        $("#iconezinho").html("close")
        $("#btn_add_tecnologia").attr('value', 0)
    } else {

        $("#add_tecnologia").hide()
        $("#iconezinho").html("add")
        $("#btn_add_tecnologia").attr('value', 1)
    }
}

/**inicialização das funções do materialize */
document.addEventListener('DOMContentLoaded', function () {
    /**dropdown */
    M.Dropdown.init(
        document.querySelectorAll('.dropdown-trigger'));
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
    
    $('.modal').modal({
 
        dismissible: false, // Modal cannot be closed by clicking anywhere outside
   
      }
   
    );

    

    $("#cancela").click(function(){
        /* Single line Reset function executes on click of Reset Button */
        $("#alt_dados")[0].reset();
        document.getElementById("lista_tecnologias").innerHTML = " "
});


});

function deleta_comentario(id_mensagem){
    let url = "http://localhost:3000/comentario" 
    $.ajax({
        url: url,
        type: "DELETE",
        contentType: "application/json",
        data: JSON.stringify({
            usuario: {
                id_usuario: id
            },
            comentario: {
                id_mensagem: id_mensagem
            }
        })
    }).done(function(res){
        if(res.err){
            alert(res.err)
        }else if (res.msg_erro){
            M.toast({html: res.msg_erro})
        }else{
            let nome_da_div_do_comentario_a_ser_excluido = "#div_do_comentario" + id_mensagem
            $(nome_da_div_do_comentario_a_ser_excluido).hide()
            M.toast({html: "Comentário excluido com sucesso!"})
        }
    })
}