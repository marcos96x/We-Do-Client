// Variaveis globais usadas no index

var tecnologias = []

$(document).ready(function () {
    /** conta carcateres da descrição da ideia em criação de ideia*/
    $('input#input_text, textarea#textarea2').characterCounter();
    /**esconde primeiramente o select de tecnologias em add tecnologias a ideia */
    $("#add_tecnologia").hide();
    $("#enviar_nm_ideia").hide();

    $('.modal').modal({

        dismissible: false, // Modal cannot be closed by clicking anywhere outside

    }

    );

    $("#cancela").click(function () {
        /* Single line Reset function executes on click of Reset Button */
        $("#alt_dados")[0].reset();

    });
    // pega o parametro ideia na url
    var query = location.search.slice(1);
    var partes = query.split('&');
    var data = {};
    partes.forEach(function (parte) {
        var chaveValor = parte.split('=');
        var chave = chaveValor[0];
        var valor = chaveValor[1];
        data[chave] = valor;
    });

    if (data.msg) {
        let msg = data.msg
        if (msg == 1) {
            M.toast({ html: "Você tentou acessar uma pagina restrita!" })
        }


    }

    /**função que esconde opções qnd o usuario é simples */
    var user = 0;
    if (user == 0) {
        $("#edita_nome, #exclui_tec, #btn_add_tecnologia, #edita_desc,#excluir_part,#exclui_coment").show();
    }
    else {
        $("#edita_nome, #exclui_tec, #btn_add_tecnologia, #edita_desc,#excluir_part,#exclui_coment").hide();
    }

    $.ajax({
        url: "http://localhost:3000/tecnologia",
        type: "GET",
        contentType: 'application/json'
    }).done(function (res) {

        let id_tecnologia, nm_tecnologia

        for (let i = 0; i < res.tecnologias.length; i++) {
            id_tecnologia = res.tecnologias[i].id_tecnologia
            nm_tecnologia = "" + res.tecnologias[i].nm_tecnologia + ""

            $("ul").append("<li tabindex='0' id='select-options-65a86874-15b3-944b-dd42-68baf34ae3bb" + id_tecnologia + "'><span class='tec' value='" + id_tecnologia + "' ><label><input type='checkbox'  ><span onClick='insere_tecnologias_cadastro(" + id_tecnologia + ", \"" + nm_tecnologia + "\" )'>" + nm_tecnologia + "</span></label></span></li>")
        }
    })
})

function insere_tecnologias_cadastro(id, nm) {
    let verificador = 0

    for (let i = 0; i <= tecnologias.length; i++) {
        if (tecnologias[i] == id) {
            tecnologias.splice(i, 1)
            tecnologias.splice(i, 1)
            verificador = 1
        }
    }

    if (verificador == 0) {
        tecnologias.push(id)
        tecnologias.push(nm)
    }
    document.getElementById("lista_interesses").innerHTML = " "
    for (var i = 1; i < tecnologias.length; i += 2) {

        document.getElementById("lista_interesses").innerHTML += "<div class='chip' > " + tecnologias[i] + " </div>";


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
    var instances = M.Sidenav.init(elems);
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





function login() {
    let email = $("#email_login").val()
    let senha = $("#senha_login").val()

    let url = "http://localhost:3000/usuario/login"
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify({
            "usuario": {
                "email_usuario": email,
                "senha_usuario": senha
            }

        }),
        contentType: 'application/json'
    }).done(function (res) {
        if (res.err) {
            M.toast({ html: res.err })
        } else {
            console.log(res)

            let id = res.usuario.id_usuario
            let token = res.token
            let nome = res.usuario.nm_usuario


            localStorage.setItem("id_we_do", id)
            localStorage.setItem("email_we_do", email)
            localStorage.setItem("nome_we_do", nome)
            localStorage.setItem("token_we_do", token)
            localStorage.setItem("id_ultima_curtida", res.usuario.id_ultima_curtida)
            localStorage.setItem("id_ultima_participacao", res.usuario.id_ultima_participacao)
            localStorage.setItem("id_ultimo_comentario", res.usuario.id_ultimo_comentario)

            //window.location.href = "feed.html"

        }

    })
}

function cadastrar() {

    if ($("#confirma_senha_cad").val() == $("#senha_cad").val()) {
        let nome = $("#nome_cad").val()
        let email = $("#email_cad").val()
        let senha = $("#senha_cad").val()
        let dt_nascimento = $("#dt_nascimento").val()
        dt_nascimento = dt_nascimento.split("/")
        dt_nascimento = dt_nascimento[2] + "-" + dt_nascimento[1] + "-" + dt_nascimento[0]
        let id_tecnologias_usuario = []

        // Receber todos os ID de tecnologias que o usuário selecionou
        for (let i = 0; i < tecnologias.length; i += 2) {
            id_tecnologias_usuario.push(tecnologias[i])
        }

        let url = "http://localhost:3000/usuario/cadastro"
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({
                "usuario": {
                    "email_usuario": email,
                    "senha_usuario": senha,
                    "nm_usuario": nome,
                    "dt_nascimento": dt_nascimento,
                    "tecnologias_usuario": id_tecnologias_usuario
                }
            }),
            contentType: 'application/json'
        }).done(function (res) {
            console.log(res)
            if (res.err) {
                M.toast({ html: res.err })
            } else {
                $.ajax({
                    url: "http://localhost:3000/tecnologia",
                    type: "GET",
                    contentType: 'application/json'
                }).done(function (res2) {

                    let id_tecnologia, nm_tecnologia
                    $("ul").html("")
                    for (let i = 0; i < res2.tecnologias.length; i++) {
                        id_tecnologia = res2.tecnologias[i].id_tecnologia
                        nm_tecnologia = "" + res2.tecnologias[i].nm_tecnologia + ""

                        $("ul").append("<li tabindex='0' id='select-options-65a86874-15b3-944b-dd42-68baf34ae3bb" + id_tecnologia + "'><span class='tec' value='" + id_tecnologia + "' ><label><input type='checkbox'  ><span onClick='insere_tecnologias_cadastro(" + id_tecnologia + ", \"" + nm_tecnologia + "\" )'>" + nm_tecnologia + "</span></label></span></li>")
                    }
                    $("#nome_cad").val("")
                    $("#sobre_cad").val("")
                    $("#email_cad").val("")
                    $("#senha_cad").val("")
                    $("#confirma_senha_cad").val("")
                    $("#dt_nascimento").val("")
                    document.getElementById("lista_interesses").innerHTML = ""
                    M.toast({ html: res.msg })
                })

            }
        })
    } else {
        M.toast({ html: "As senhas devem ser iguais" })
    }

}