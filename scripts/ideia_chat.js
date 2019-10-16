let nome = localStorage.getItem("nome_we_do")
let email = localStorage.getItem("email_we_do")
let token = localStorage.getItem("token_we_do")
let id = localStorage.getItem("id_we_do")

// valores oficiais da ideia em questão
var id_ideia_original
var nm_ideia_original
var ds_ideia_original
var status_ideia_original
// Variaveis globais usadas no index
let id_ideia_pagina
var tecnologias_insere_ideia = []
var tecnologia_adicionar_na_ideia = []
var arrayDadosTecnologia = []
function determina_visualizacao(tipo_usuario){
    // se tipo == 0, usuario comum, visitante
    // se tipo == 1, membro da ideia
    // se tipo == 2, idealizador


}


$(document).ready(function () {
    abre_tecnologias_ideiaChat()
    /** conta carcateres da descrição da ideia em criação de ideia*/
    $('input#input_text, textarea#textarea2').characterCounter();


    
    // verifica o id d a ideia passado no parametro
    var objDiv = document.getElementById("chat");
    objDiv.scrollTop = objDiv.scrollHeight;

    // pega o parametro na url de ideia 
    var query = location.search.slice(1);
    var partes = query.split('&');
    var data = {};
    partes.forEach(function (parte) {
        var chaveValor = parte.split('=');
        var chave = chaveValor[0];
        var valor = chaveValor[1];
        data[chave] = valor;
    });
    id_ideia_pagina = data.ideia
    mostra_chat(data.ideia)
    mostra_ideia(data.ideia)

})

function abre_tecnologias_ideiaChat(){
    
    $.ajax({
        url: "http://localhost:3000/tecnologia",
        type: "GET",
        contentType: 'application/json'
    }).done(function (res) {
        let id_tecnologia, nm_tecnologia
        let select_ideia = document.getElementsByTagName("ul")[9]
        let select_add_tecnologia = document.getElementsByTagName("ul")[8]
        let select_tecnologias = document.getElementsByTagName("ul")[3]
        for (let i = 0; i < res.tecnologias.length; i++) {
            id_tecnologia = res.tecnologias[i].id_tecnologia
            nm_tecnologia = "" + res.tecnologias[i].nm_tecnologia + ""
            select_tecnologias.innerHTML += "<li tabindex='0' id='select-options-65a86874-15b3-944b-dd42-68baf34ae3bb" + id_tecnologia + "'><span class='tec' value='" + id_tecnologia + "' ><label><input type='radio' name='tecnologias_pesquisa' value='" + id_tecnologia + "'  ><span onClick='seleciona_tecnologias_pesquisa("+ id_tecnologia + ", \""+nm_tecnologia+"\" )'>" + nm_tecnologia + "</span></label></span></li>"
            select_ideia.innerHTML += "<li tabindex='0' id='select-options-65a86874-15b3-944b-dd42-68baf34ae3bb" + id_tecnologia + "'><span class='tec' value='" + id_tecnologia + "' ><label><input type='checkbox'  ><span onClick='insere_tecnologias_criacao_ideia("+ id_tecnologia + ", \""+nm_tecnologia+"\" )'>" + nm_tecnologia + "</span></label></span></li>"
            select_add_tecnologia.innerHTML += "<li tabindex='0' id='select-options-65a86874-15b3-944b-dd42-68baf34ae3bb" + id_tecnologia + "'><span class='tec' value='" + id_tecnologia + "' ><label><input type='radio' name='tecnologia_para_add' ><span onClick='insere_tecnologia_ideia("+ id_tecnologia + ", \""+nm_tecnologia+"\" )'>" + nm_tecnologia + "</span></label></span></li>"
        }
    })
    
}


function mostra_ideia(id_ideia) {
    let url = "http://localhost:3000/ideia/" + id_ideia + "&" + id
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json"
    }).done(function (res) {
        if (res.err) {
            alert("Erro na busca da ideia")
        } else {
            console.log(res)
            id_ideia_original = id_ideia
            nm_ideia_original = res.ideia.nm_ideia
            status_ideia_original = res.ideia.status_ideia
            ds_ideia_original = res.ideia.ds_ideia
            let nm_idealizador
            for (let i = 0; i < res.ideia.membros.length; i++) {
                if (res.ideia.membros[i].idealizador == 1) {
                    nm_idealizador = res.ideia.membros[i].nm_usuario
                }
            }

            $("#campo_ideia").append(` 

        <div class='col s1'  style='margin-top:5%; margin-right:-3%; '>
            
            <a class='btn-floating waves-light  btn-small' id='edita_nome' onclick='edita_nome_ideia()' style='margin-right:2%; '>
                <i class='material-icons white-text' value='1'  id='iconezinho4'>edit</i>
            </a>
        </div>
        <div class='col s10'>
            <div class='input-field col s12'>
                <input disabled='true' id='nm_ideia' type='text'>
                <label style='font-size: 23px; color:#404f65;' for='nm_ideia' id='label_projeto'>${res.ideia.nm_ideia}
                </label>
            </div>

        </div>
        <div class='col s1' style='margin-top:5%; margin-right:-3%;'hidden id='enviar_nm_ideia'>
            <a class='btn-floating btn-small' id="btn_de_mudar_ideia" onclick="altera_dados_ideia('TI')">
                <i class='material-icons'>send</i>
            </a>
        </div>



        <br>
        <br>
        <br>
        <br>
        <p>Por ${nm_idealizador}</p>
        <div class='row'>
            <div class='col s12'>
            `)

            for (let i = 0; i < res.ideia.tecnologias.length; i++) {
                $("#campo_ideia").append(`<div class='chip'>
                    ${res.ideia.tecnologias[i].nm_tecnologia}
                    <i class='tinny material-icons modal-trigger' onclick="configura_delete_tecnologia(${res.ideia.tecnologias[i].id_tecnologia})" href='#confirma_exclusao_ideia'>close</i>
                </div>`)
                
            }

            $("#campo_ideia").append(`
                

                <a class='btn-floating waves-light  btn-small modal-trigger' id='btn_add_tecnologia' href="#add_tecnologia_ideia" value='1'>
                    <i class='material-icons white-text' id='iconezinho'>add</i>
                </a>
        </div>

        <div class='row'>
            <div class='col s12'>
                <h5>
                    <a class='btn-floating waves-light  btn-small ' onclick='alt_desc_ideia()' value='0' id='edita_desc' style='margin-right:3% ;'>
                        <i class='material-icons white-text' id='iconezinho5' onclick='aparece_opcao_editar()' value='0'>edit</i>
                    </a>Descrição</h5>
                <blockquote class='black-text' style='font-family: Arial, Helvetica, sans-serif;text-align: justify;' id='desc_ideia'>
                ${res.ideia.ds_ideia}
                </blockquote>

                <div id='alterar_desc_ideia' hidden>
                    <div class='col s12 m11 l11'>
                        <div class='input-field col s11'>
                            <textarea id='desc_ideiaa' class='materialize-textarea' data-length='500'></textarea>
                            <label for='desc_ideiaa'>Descrição da ideia</label>
                        </div>
                    </div>
                    <div class='col s12 m1 l1'>
                        <br>
                        <a class='btn-floating btn-small' onclick="altera_dados_ideia('DS')" id='enviar_desc_ideia' style='margin-top:4.5% ; margin-left:1.4% ;'>
                            <i class='material-icons'>send</i>
                        </a>
                    </div>
                </div>


            </div>

        </div>


        <h5>Integrantes</h5>
        <div class='divider'></div>



        `)

        // membros
        for(let i = 0; i < res.ideia.membros.length; i++){
            if(res.ideia.membros[i].id_usuario != id){
                $("#campo_ideia").append(`
                <h6>
                    <div class="row">
                        <div class="col s12 m11 l11">
                            <!--<img class='circle' src='img/perfil.jpg' width='6%' align='center' style='margin-right:3%'>-->
                            ${res.ideia.membros[i].nm_usuario}
                        </div>
                        <div class="col s12 m1 l1">
                            <a class='btn-floating red btn-small right' onclick="remove_usuario(${res.ideia.membros[i].id_usuario})" id='excluir_part' style='margin-left:65.4%;'>
                                <i class='material-icons white-text'>clear</i>
                            </a>
                        </div>
                    </div>
                </h6>
    
    
                <div class='divider'></div>
                
                
                
                `)
            }else{
                $("#campo_ideia").append(`
            <h6>
                <div class="row">
                    <div class="col s12 m11 l11">
                        <!--<img class='circle' src='img/perfil.jpg' width='6%' align='center' style='margin-right:3%'>-->
                        ${res.ideia.membros[i].nm_usuario}
                    </div>
                </div>
            </h6>


            <div class='divider'></div>
            
            
            
            `)
            }
            
        }

            // comentarios
            for(let i = 0; i < res.ideia.comentarios.length; i++){
                $("#comentarios").append(`
                    <div style="line-height:100%;">

                        <p style="font-family: Arial, Helvetica, sans-serif" ;>
                            <label>24 de dezembro de 2019</label>
                            <br>
                            <a style="font-family:'bree-serif';" ;>${res.ideia.comentarios[i].nm_usuario} &nbsp; </a>${res.ideia.comentarios[i].ct_mensagem}</p>
                        <i class="material-icons red-text exclui_coment" onclick="deleta_comentario(${res.ideia.comentarios[i].id_mensagem})" style='margin-left:96%; padding-top:-25%;'
                            id="iconezinho">delete</i>
                    </div>
                    <div class="divider"></div>
                `)
            }
        }
    })
}

// Modifica o modal de excluir ideia, se adequando para cada ideia
function configura_delete_tecnologia(id_tecnologia){
    $("#estrutura_deleta_tecnologia").html(`
    <a style='margin-right: 25%;'
        class="modal-close waves-effect waves-green btn-flat green white-text" onclick="deleta_tecnologia(${id_tecnologia})">Sim</a>
    <a style='margin-right: 25%;'
        class="modal-close waves-effect waves-green btn-flat red white-text">Não</a>
    `)
}

function deleta_tecnologia(id_tecnologia){
    let url = "http://localhost:3000/tecnologia/ideia"

    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            "ideia": {
                "id_ideia": id_ideia_pagina
            },
            "tecnologia": {
                "id_tecnologia": id_tecnologia   
            }
        })
    }).done((res) => {
        if(res.err){
            alert(res.err)
        }else{
            window.location.reload()
        }
    })
}

function deleta_comentario(id_mensagem){
    alert(id_mensagem)
}

function remove_usuario(id){
    alert(id)
}


function mostra_chat(id_ideia) {
    let url = "http://localhost:3000/chat/" + id
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify({
            "ideia": {
                "id_ideia": id_ideia
            }
        }),
        contentType: "application/json"
    }).done(function (res) {
        if (res.err) {
            alert("Erro na busca do chat")
        } else {
            let mensagens = res.chat[0]
            console.log(mensagens)
            for (let i = 0; i < mensagens.length; i++) {
                if (mensagens[i].id_usuario == id) {
                    // mensagem enviada pelo usuario
                    $("#chat").append("<div class='row'><div class='col s12'><div class='col s9 right' style='margin-left: -2%;'><p style='margin-top:-0.5%;padding:3%; background-color:rgb(207, 197, 197); border-radius:20px;border-top-right-radius: 0px; font-family: Arial, Helvetica, sans-serif;'>" + mensagens[i].ct_mensagem + "</p></div></div></div>")
                } else {
                    // mensagem enviada por outro usuario
                    $("#chat").append("<div class='row'><div class='col s12'><div class='col s9 left' style='margin-left: -2%;'><label>" + mensagens[i].nm_usuario + "</label><p style='margin-top:-0.5%;padding:3%; background-color:rgb(207, 197, 197); border-radius:20px;border-top-left-radius: 0px; font-family: Arial, Helvetica, sans-serif;'>" + mensagens[i].ct_mensagem + "</p></div></div></div>")
                }
            }
        }
    })
}









function aparece_opcao_editar() {
    if ($("#iconezinho5").attr("value") == 1) {
        $("#alterar_desc_ideia").slideToggle()
        $("#iconezinho5").attr("value", "0")
    } else {
        $("#alterar_desc_ideia").slideDown()
        $("#iconezinho5").attr("value", "1")
    }


}


/** mostra o select de tecnologias qnd o criador clica no botao '+' transforma o botao em 'x' e vice-versa
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
*/


/**edita nome da ideia*/
function edita_nome_ideia() {
    console.log($("#iconezinho4").attr('value'));
    if ($("#iconezinho4").attr('value') == 1) {
        $("#label_projeto").attr("class", "active")
        $("#iconezinho4").attr('value', 0)
        $("#iconezinho4").html("close")
        $("#nm_ideia").attr('disabled', false)
        $("#enviar_nm_ideia").fadeIn()
    } else {
        $("#nm_ideia").attr('disabled', true)
        $("#iconezinho4").attr('value', 1)
        $("#iconezinho4").html("edit")
        $("#label_projeto").attr("class", " ")
        $("#nm_ideia").val(" ")
        $("#enviar_nm_ideia").fadeOut()
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
    $('.modal').modal({

        dismissible: false, // Modal cannot be closed by clicking anywhere outside

    }

    );
    $("#cancela").click(function () {
        /* Single line Reset function executes on click of Reset Button */
        $("#alt_dados")[0].reset();
        document.getElementById("lista_tecnologias").innerHTML = " "
    });

    $("#cancela_tecnologia").click(function(){
        $("#form_add_tecnologia")[0].reset()
        arrayDadosTecnologia = []
        document.getElementById("lista_tecnologias_add").innerHTML = " "
    })
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
function sair(){
    localStorage.clear()
    window.location.href = "index.html"
}