// Variaveis globais usadas no index

var tecnologias = []
var token_recuperacao
var id_usuario

function pega_token() {
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
    token_recuperacao = data.token
    if (token_recuperacao) {
        let url = url_api + "/usuario/saber_id"
        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                token: token_recuperacao
            })
        }).done((res) => {
            if (res.err) {
                alert(res.err)
            } else {
                id_usuario = res.id_usuario
            }
        })
    } else {
        window.location.href = url_web + "/index.html?msg=2"
    }
}

function troca_senha() {
    let senha = $("#nv_senha").val().trim()
    let senha_confirm = $("#nv_senha_confirm").val().trim()
    if (senha == "" || senha_confirm == "") {
        M.toast({ html: "Campos de senha vazios!" })
    } else {
        if (senha != senha_confirm) {
            M.toast({ html: "As senhas devem ser iguais!" })
        } else {
            if (senha.length < 6) {
                M.toast({ html: "A senha precisa ter no mínimo 6 digitos." })
            } else {
                let url = url_api + "/usuario/troca_senha"
                $.ajax({
                    url: url,
                    type: "PUT",
                    contentType: "application/json",
                    data: JSON.stringify({
                        usuario: {
                            id_usuario: id_usuario,
                            senha_nova: senha
                        }
                    })
                }).done((res) => {
                    if (res.err) {
                        alert(res.err)
                    } else {
                        window.location.href = url_web + "/index.html?msg=3"
                    }
                })
            }
        }
    }
}
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
        } else if (msg == 2) {
            M.toast({ html: "Para recuperar sua senha você deve solicitar o recurso clicando em 'Esqueceu sua senha'!" })
        } else if (msg == 3) {
            M.toast({ html: "Sua senha foi alterada com sucesso!" })
        }else if (msg == 4){
            M.toast({ html: "Erro de autenticação. Favor logar-se novamente" })
        } else if (msg == 5) {
            M.toast({ html: "Agradecemos pela sua presença em nossa plataforma!" })
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
    let url = url_api + "/tecnologia"
    $.ajax({
        url: url,
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

    let url = url_api + "/usuario/login"
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
            let id = res.usuario.id_usuario
            let token = res.token
            let nome = res.usuario.nm_usuario
            localStorage.setItem("id_we_do", id)
            localStorage.setItem("email_we_do", email)
            localStorage.setItem("nome_we_do", nome)
            localStorage.setItem("token_we_do", token)

            window.location.href = url_web + "/feed.html"
        }

    })
}

function cadastrar() {

    if ($("#confirma_senha_cad").val() == $("#senha_cad").val()) {
        let nome = $("#nome_cad").val()
        let email = $("#email_cad").val()
        let senha = $("#senha_cad").val()
        let dt_nascimento = $("#dt_nascimento").val()
        if (senha.length < 6) {
            M.toast({ html: "A senha precisa ter no mínimo 6 digitos." })
        } else {
            dt_nascimento = dt_nascimento.split("/")
            let data_atual = new Date()
            if (dt_nascimento[2] > data_atual.getFullYear() || dt_nascimento[1] > 12 || dt_nascimento[0] > 31) {
                M.toast({ html: "Data inválida" })
                return false
            } else
                dt_nascimento = dt_nascimento[2] + "-" + dt_nascimento[1] + "-" + dt_nascimento[0]
            let id_tecnologias_usuario = []

            // Receber todos os ID de tecnologias que o usuário selecionou
            for (let i = 0; i < tecnologias.length; i += 2) {
                id_tecnologias_usuario.push(tecnologias[i])
            }

            let url = url_api + "/usuario/cadastro"
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
                if (res.err) {
                    M.toast({ html: res.err })
                } else {
                    let url2 = url_api + "/tecnologia"
                    $.ajax({
                        url: url2,
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
                        $("#email_login").val($("#email_cad").val())
                        $("#senha_login").val($("#senha_cad").val())
                        $("#nome_cad").val("")
                        $("#sobre_cad").val("")
                        $("#email_cad").val("")
                        $("#senha_cad").val("")
                        $("#confirma_senha_cad").val("")
                        $("#dt_nascimento").val("")
                        document.getElementById("lista_interesses").innerHTML = ""
                        login()
                    })

                }
            })
        }

    } else {
        M.toast({ html: "As senhas devem ser iguais" })
    }

}