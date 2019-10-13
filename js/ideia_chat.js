let nome = localStorage.getItem("nome_we_do")
let email = localStorage.getItem("email_we_do")
let token = localStorage.getItem("token_we_do")
let id = localStorage.getItem("id_we_do")


// Variaveis globais usadas no index

var tecnologias = []

$(document).ready(function () {
    /** conta carcateres da descrição da ideia em criação de ideia*/
    $('input#input_text, textarea#textarea2').characterCounter();
    /**esconde primeiramente o select de tecnologias em add tecnologias a ideia */
    $("#add_tecnologia").hide();
    $("#enviar_nm_ideia").hide();
    $("#alterar_desc_ideia").hide()
    /**função que esconde opções qnd o usuario é simples */
    var user = 0;
    if (user == 0) {
        $("#edita_nome, #exclui_tec, #btn_add_tecnologia, #edita_desc,#excluir_part,#exclui_coment").show();
        console.log('valor1');
    }
    else {
        $("#edita_nome, #exclui_tec, #btn_add_tecnologia, #edita_desc,#excluir_part,#exclui_coment").hide();
        console.log('valor2');
    }
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
    mostra_chat(data.ideia)
    mostra_ideia(data.ideia)

})

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
            let nm_idealizador
            for(let i = 0; i < res.ideia.membros.length; i++){
                if(res.ideia.membros[i].idealizador == 1){
                    nm_idealizador = res.ideia.membros[i].nm_usuario
                }
            }

            $("#campo_ideia").append(` <div class='col s1' style='margin-top:5%; margin-right:-3%; '>

            <a class='btn-floating waves-light  btn-small' id='edita_nome' onclick='edita_nome_ideia();' style='margin-right:2%; '>
                <i class='material-icons white-text' value='1' id='iconezinho4'>edit</i>
            </a>
        </div>
        <div class='col s10'>
            <div class='input-field col s12'>
                <input disabled='true' id='nm_ideia' type='text'>
                <label style='font-size: 23px; color:#404f65;' for='nm_ideia' id='label_projeto'>${res.ideia.nm_ideia}
                </label>
            </div>

        </div>
        <div class='col s1' style='margin-top:5%; margin-right:-3%;' id='enviar_nm_ideia'>
            <a class='btn-floating btn-small'>
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

            for(let i = 0; i < res.ideia.tecnologia.length; i++){
                $("#campo_ideia").append(`<div class='chip'>
                    ${res.ideia.tecnologia[i].nm_tecnologia}
                    <i class='close material-icons modal-trigger' id='exclui_tec${i}' href='#confirma_exclusao_ideia'>close</i>
                </div>`)
            }
            // KKKKP ARO AQ

        
            $("#campo_ideia").append(`
                

                <a class='btn-floating waves-light  btn-small' id='btn_add_tecnologia' onclick='mostra_tecnologias()' value='1'>
                    <i class='material-icons white-text' id='iconezinho'>add</i>
                </a>
                <div class='row' id='add_tecnologia'>
                    <div class='col s11'>
                        <div class='input-field col s12 m6 l12 '>

                            <select multiple>
                                <option value='' disabled>Adicione as tecnologias necessárias </option>
                                <option value='1'>Option 1</option>
                                <option value='2'>Option 2</option>
                                <option value='3'>Option 3</option>
                            </select>

                        </div>
                    </div>
                    <div class='col s1' style='margin-top:4.5% ; margin-left:-2% ;'>
                        <a class='btn-floating waves-light  btn-small '>
                            <i class='material-icons white-text'>send</i>
                        </a>
                    </div>
                </div>


            </div>

        </div>

        <div class='row'>
            <div class='col s12'>
                <h5>
                    <a class='btn-floating waves-light  btn-small ' onclick='alt_desc_ideia()' value='0' id='edita_desc' style='margin-right:3% ;'>
                        <i class='material-icons white-text' id='iconezinho5' onclick='aparece_opcao_editar()' value='0'>edit</i>
                    </a>Descrição</h5>
                <blockquote class='black-text' style='font-family: Arial, Helvetica, sans-serif;text-align: justify;' id='desc_ideia'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                    type and scrambled it to make a type specimen book. It has survived not only five centuries,
                </blockquote>

                <div id='alterar_desc_ideia'>
                    <div class='col s12 m11 l11'>
                        <div class='input-field col s11'>
                            <textarea id='desc_ideiaa' class='materialize-textarea' data-length='500'></textarea>
                            <label for='desc_ideiaa'>Descrição da ideia</label>
                        </div>
                    </div>
                    <div class='col s12 m1 l1'>
                        <br>
                        <a class='btn-floating btn-small' id='enviar_desc_ideia' style='margin-top:4.5% ; margin-left:1.4% ;'>
                            <i class='material-icons'>send</i>
                        </a>
                    </div>
                </div>


            </div>

        </div>


        <h5>Integrantes</h5>
        <div class='divider'></div>
        <h6>

            <!--<img class='circle' src='img/perfil.jpg' width='6%' align='center' style='margin-right:3%'>-->Nome do Participante
            <a class='btn-floating red btn-small' id='excluir_part' style='margin-left:65.4%;'>
                <i class='material-icons white-text'>clear</i>
            </a>
        </h6>
        <blockquote style='font-family: Arial, Helvetica, sans-serif;text-align: justify;'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'sstandard
            dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it tomake
            a type specimen book.aaaaaaaaaaaa</blockquote>
        <div class='divider'></div>`)
        }
    })
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
            alert("Erro na busca do char")
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
        $("#alterar_desc_ideia").hide()
        $("#iconezinho5").attr("value", "0")
    } else {
        $("#alterar_desc_ideia").show()
        $("#iconezinho5").attr("value", "1")
    }


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



/**edita nome da ideia */
function edita_nome_ideia() {
    console.log('edita_nome_ideia');
    console.log($("#iconezinho4").attr('value'));
    if ($("#iconezinho4").attr('value') == 1) {
        $("#label_projeto").attr("class", "active")
        $("#iconezinho4").attr('value', 0)
        $("#iconezinho4").html("close")
        $("#nm_ideia").attr('disabled', false)
        $("#enviar_nm_ideia").show()
    } else {
        $("#nm_ideia").attr('disabled', true)
        $("#iconezinho4").attr('value', 1)
        $("#iconezinho4").html("edit")
        $("#label_projeto").attr("class", " ")
        $("#nm_ideia").val(" ")
        $("#enviar_nm_ideia").hide()
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
    /**modal */
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
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
