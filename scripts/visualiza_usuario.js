var id = localStorage.getItem("id_we_do")
// pega o parametro na url de id_usuario 
var query = location.search.slice(1);
var partes = query.split('&');
var data = {};
partes.forEach(function (parte) {
    var chaveValor = parte.split('=');
    var chave = chaveValor[0];
    var valor = chaveValor[1];
    data[chave] = valor;
});
var id_perfil = data.id_usuario
if (id_perfil == null) {
    sair()
} else if (id_perfil == id) {
    let url = url_web + "/perfil_config.html?id_usuario=" + id
    if (window.location.href != url)
        window.location.href = url_web + "/perfil_config.html?id_usuario=" + id
}
var tecnologias_gosto_usuario = {}

$(document).ready(() => {
    visualiza_usuario(id_perfil)
    
    projetos_atuais_perfil(id_perfil)
    portifolio(id_perfil)
})

function renderiza_denuncia(nome) {
    let url = url_api + "/usuario/saber_denuncia"

    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            denuncia: {
                id_usuario_acusador: id,
                id_usuario_denunciado: id_perfil
            }
        })
    }).done((res) => {
        if (res.err) {
            M.toast({ html: res.err })
        } else {
            if (res.denuncia == true) {
                // renderiza a denuncia para poder remover
                $("#btn_denuncia").html(`
                    <h5>${nome}<a class="modal-trigger" id="botao_denuncia" href="#modal_remover_denuncia"><i class="material-icons small blue-text" style="float: right;">report</i></a></h5>
                `)
            } else {
                // renderiza a denuncia para poder denunciar
                $("#btn_denuncia").html(`
                    <h5>${nome}<a class="modal-trigger" id="botao_denuncia" href="#modal_denuncia"><i class="material-icons small red-text" style="float: right;">report</i></a></h5>
                `)
            }
        }
    })
}


function visualiza_usuario(id_user) {
    let url = url_api + "/usuario/perfil/" + id + "&" + id_user

    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("token_we_do"))
        }
    })
        .fail((err) => {
            if (err.status == 401) {
                localStorage.clear()
                window.location.href = "index.html?msg=4"
            }else if (err.status == 404){
                window.location.href = "feed.html?msg=3"
            }
        }).done((res) => {
            if (res.err) {
                alert(res.err)
            } else {
                localStorage.setItem("token_we_do", res.token)
                $("#visualizacao_perfil").html("")
                $("#visualizacao_perfil_usuario").html("")
                $("#visualizacao_perfil").append(`
            <div class="col s2" style="margin-top: 2%;">

                <img src="https://image.flaticon.com/icons/png/512/74/74472.png" width="100%" alt="" class="circle responsive-img">
            </div>
            `)

                $("#visualizacao_perfil_usuario").append(`
            <div class="col s2" style="margin-top: 2%;">

                <img src="https://image.flaticon.com/icons/png/512/74/74472.png" width="100%" alt="" class="circle responsive-img">
            </div>
            <div class="col s1 right">
                <div class="row" style="margin-top: 35%; margin-left: 35%;">
                    <i class="material-icons small modal-trigger" href="#config_conta" id="btn_configuracao_conta">
                        settings_applications
                    </i>
                </div>
            </div>
            `)
                let div_chips_tecnologias = ""
                let cont = 0
                tecnologias_gosto_usuario = res.perfil_usuario.tecnologias
                for (let i2 = 0; i2 < res.perfil_usuario.tecnologias.length; i2++) {
                    cont++
                    div_chips_tecnologias += `<div class="chip">${res.perfil_usuario.tecnologias[i2].nm_tecnologia}</div>`
                }
                if (cont == 0)
                    div_chips_tecnologias = "<label>Sem tecnologia de preferência<label>"
                let ds_bio_usuario = ""
                let tel_usuario = ""
                if (res.perfil_usuario.tel_usuario == null)
                    tel_usuario = "Sem telefone"
                else
                    tel_usuario = res.perfil_usuario.tel_usuario

                if (res.perfil_usuario.ds_bio == null)
                    ds_bio_usuario = "Sem biografia"
                else
                    ds_bio_usuario = res.perfil_usuario.ds_bio

                $("#label_descricao").text(ds_bio_usuario)
                $("#label_tel").text(tel_usuario)

                $("#visualizacao_perfil").append(`
            <div class="col s10">
                <div class="row" style="margin-top: 2%;" id="btn_denuncia">
                    
                    
                </div>
                <div class="row" style="margin-top: -3%;">
                    ${div_chips_tecnologias}
                    
                </div>
            </div>

            <div class="row">
                <div class="col s11">
                    <blockquote class='black-text'
                        style='font-family: Arial, Helvetica, sans-serif;text-align: justify;font-size:20px;' id='desc_ideia'>
                            ${ds_bio_usuario}
                        </blockquote>
                </div>
            </div>

            <div class="row">
                <div class="col s11">
                    <i class="material-icons">call</i> ${tel_usuario}
                </div>
            </div>
            `)

                renderiza_denuncia(res.perfil_usuario.nm_usuario)

                $("#visualizacao_perfil_usuario").append(`
            <div class="col s10">
                <div class="row" style="margin-top: -9%;">
                    <h5 style="font-size:35px;">${res.perfil_usuario.nm_usuario}</h5>
                </div>
                <div class="row" style="margin-top: -3%;">
                    ${div_chips_tecnologias}
                    
                </div>
            </div>

            <div class="row">
                <div class="col s11">
                    <blockquote class='black-text'
                        style='font-family: Arial, Helvetica, sans-serif;text-align: justify; font-size:20px;' id='desc_ideia'>
                            ${ds_bio_usuario}
                        </blockquote>
                </div>
            </div>
            <div class="row">
                <div class="col s11" style="font-size:20px;">
                    <i class="material-icons">call</i> ${tel_usuario}
                </div>
            </div>
            `)

                // -------------------- carrega o modal de configuração
                $("#label_nm_usuario").html(res.perfil_usuario.nm_usuario)
                $("#label_email_usuario").html(res.perfil_usuario.email_usuario)
                $("#label_dt_nascimento").html(moment(res.perfil_usuario.dt_nascimento, 'YYYY-MM-DD', 'pt').format("L"))
                url = url_api + "/tecnologia"
                $.ajax({
                    url: url,
                    type: "GET",
                    contentType: 'application/json'
                }).done(function (res) {
                    let id_tecnologia, nm_tecnologia

                    let str_test = url_web + "/perfil_config.html?id_usuario=" + id

                    let select_ideia, select_tecnologias_usuario, select_tecnologias
                    if (window.location.href == str_test) {
                        select_ideia = document.getElementsByTagName("ul")[9]
                        select_tecnologias_usuario = document.getElementsByTagName("ul")[10]
                        select_tecnologias = document.getElementsByTagName("ul")[2]

                    } else {
                        select_ideia = document.getElementsByTagName("ul")[10]
                        select_tecnologias_usuario = document.getElementsByTagName("ul")[11]
                        select_tecnologias = document.getElementsByTagName("ul")[2]
                    }

                    select_ideia.innerHTML = ""
                    if (select_tecnologias_usuario != undefined)
                        select_tecnologias_usuario.innerHTML = ""
                    for (let i = 0; i < res.tecnologias.length; i++) {
                        id_tecnologia = res.tecnologias[i].id_tecnologia
                        nm_tecnologia = "" + res.tecnologias[i].nm_tecnologia + ""
                        select_tecnologias.innerHTML += "<li tabindex='0' id='select-options-65a86874-15b3-944b-dd42-68baf34ae3bb" + id_tecnologia + "'><span class='tec' value='" + id_tecnologia + "' ><label><input type='radio' name='tecnologias_pesquisa' value='" + id_tecnologia + "'  ><span onClick='seleciona_tecnologias_pesquisa(" + id_tecnologia + ", \"" + nm_tecnologia + "\" )'>" + nm_tecnologia + "</span></label></span></li>"
                        select_ideia.innerHTML += "<li tabindex='0' id='select-options-65a86874-15b3-944b-dd42-68baf34ae3bb" + id_tecnologia + "'><span class='tec' value='" + id_tecnologia + "' ><label><input type='checkbox'  ><span onClick='xablau(" + id_tecnologia + ", \"" + nm_tecnologia + "\" )'>" + nm_tecnologia + "</span></label></span></li>"
                        let verificador = 0
                        for (let i2 = 0; i2 < tecnologias_gosto_usuario.length; i2++) {
                            if (tecnologias_gosto_usuario[i2].id_tecnologia == id_tecnologia)
                                verificador = 1
                        }
                        if (select_tecnologias_usuario != undefined) {
                            if (verificador == 1) {
                                // exibe marcado
                                select_tecnologias_usuario.innerHTML += "<li tabindex='0' id='select-options-65a86874-15b3-944b-dd42-68baf34ae3bb" + id_tecnologia + "'><span class='tec' value='" + id_tecnologia + "' ><label><input type='checkbox' checked name='checkbox_tecnologias' value='" + id_tecnologia + "'><span onClick='insere_tecnologias_criacao_ideia(" + id_tecnologia + ", \"" + nm_tecnologia + "\" )'>" + nm_tecnologia + "</span></label></span></li>"
                            } else {
                                // exibe desmarcado
                                select_tecnologias_usuario.innerHTML += "<li tabindex='0' id='select-options-65a86874-15b3-944b-dd42-68baf34ae3bb" + id_tecnologia + "'><span class='tec' value='" + id_tecnologia + "' ><label><input type='checkbox' name='checkbox_tecnologias' value='" + id_tecnologia + "'><span onClick='insere_tecnologias_criacao_ideia(" + id_tecnologia + ", \"" + nm_tecnologia + "\" )'>" + nm_tecnologia + "</span></label></span></li>"
                            }
                        }
                    }

                })
            }
        })
}

function seleciona_tecnologias_pesquisa(id, nm) {
    id_tecnologia_da_pesquisa = [id, nm]
}
function sair() {
    localStorage.clear()
    window.location.href = url_web + "/index.html"
}