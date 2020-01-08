var insere_tecnologias_criacao_ideia = []
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
        $("#campo_dt_nascimento").attr("disabled", true)
        $("#campo_dt_nascimento").attr("type", "text")
        document.getElementById("lista_tecnologias").innerHTML = " "
    });
})

$(document).ready(() => {
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

    if(id_perfil != id){
        window.location.href = url_web + "/perfil_usuario.html?id_usuario=" + id_perfil
    }
})

/** mostra interesse no feed */
function mostra_interesse(id_elemento, id_icone, id_ideia) {

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
            localStorage.setItem("token_we_do", res.token)
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

function xablau(id, nm){
    let verificador = 0

    for (let i = 0; i <= tecnologias_insere_ideia.length; i++) {
        if (tecnologias_insere_ideia[i] == id) {
            tecnologias_insere_ideia.splice(i, 1)
            tecnologias_insere_ideia.splice(i, 1)
            verificador = 1
        }
    }

    if (verificador == 0) {
        tecnologias_insere_ideia.push(id)
        tecnologias_insere_ideia.push(nm)
    }
    document.getElementById("lista_tecnologias").innerHTML = " "
    for (var i = 1; i < tecnologias_insere_ideia.length; i+= 2) {
        
        document.getElementById("lista_tecnologias").innerHTML += "<div class='chip' > " + tecnologias_insere_ideia[i] + " </div>";
        

    }  
}

function altera_dados_usuario_key(){
    if(event.keyCode == 13){
        altera_dados_usuario()
    }
}


function altera_dados_usuario(){
    let nova_data
    let novo_nome 
    let nova_desc
    let novo_tel
    let tecnologias_alterar = []
    let senha_antiga = $("#senha_antiga").val().trim()
    let nova_senha = $("#nv_senha").val().trim()
    let nova_senha_confirm = $("#nv_senha_confirm").val().trim()

    if($("#campo_descricao").val().trim() == ""){
        nova_desc = $("#label_descricao").text()
    }else{
        nova_desc = $("#campo_descricao").val()
    }

    if($("#campo_tel").val().trim() == ""){
        novo_tel = $("#label_tel").text().replace("(", "").replace(")", "").replace(" ", "").replace("-", "")
    }else{
        novo_tel = $("#campo_tel").val().replace("(", "").replace(")", "").replace(" ", "").replace("-", "")
    }

    if($("#campo_dt_nascimento").val().trim() == ""){
        let data_cortada = $("#label_dt_nascimento").text().split("/")
        nova_data = data_cortada[2] + "-" + data_cortada[1] + "-" + data_cortada[0]
    }
    else{
        let data_cortada = $("#campo_dt_nascimento").val().split("/")
        let data_atual = new Date()
        if(data_cortada[2] > data_atual.getFullYear() || data_cortada[1] > 12 || data_cortada[0] > 31){
            M.toast({html: "Data inválida"})
            return false
        }else
            nova_data = data_cortada[2] + "-" + data_cortada[1] + "-" + data_cortada[0]

    }

    if($("#campo_nm_usuario").val().trim() == "")
        novo_nome = $("#label_nm_usuario").text().trim()
    else
        novo_nome = $("#campo_nm_usuario").val().trim()
    let checkbox_tecnologia = document.getElementsByName("checkbox_tecnologias")

    for(let i = 0; i < checkbox_tecnologia.length; i++){
        if(checkbox_tecnologia[i].checked == true)
            tecnologias_alterar.push(checkbox_tecnologia[i].value)
    }
    // troca os dados do usuario
    let url = url_api + "/usuario/alterar/" + id
    $.ajax({
        url: url,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
            usuario: {
                nm_usuario: novo_nome,
                dt_nascimento: nova_data,
                ds_bio: nova_desc,
                tel_usuario: novo_tel
            },
            tecnologias: tecnologias_alterar
        }),
        beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', localStorage.getItem("token_we_do"))
        }
    })
    .fail((err) => {
        if(err.status == 401){
            localStorage.clear()
            window.location.href = "index.html?msg=4"
        }
    }).done((res) => {
        if(res.err){
            alert(res.err)
        }else{
            localStorage.setItem("token_we_do", res.token)
            localStorage.setItem("nome_we_do", novo_nome)
            $("#nm_usuario").html(novo_nome)
            if(senha_antiga != "" && nova_senha != "" && nova_senha_confirm != ""){
                // muda senha
                if(nova_senha != nova_senha_confirm){
                    M.toast({html: "Dados pessoais alterados, porém não foi possível alterar sua senha, pois as senhas são diferentes."})

                    $("#visualizacao_perfil_usuario").html("")
                    visualiza_usuario(id)
                }else{
                    url = url_api + "/usuario/alterar_senha/" + id
                    $.ajax({
                        url: url,
                        type: "PUT",
                        contentType: "application/json",
                        data: JSON.stringify({
                            usuario: {
                                senha_antiga: senha_antiga,
                                senha_nova: nova_senha
                            }
                        }),
                        beforeSend: function(xhr){
                            xhr.setRequestHeader('Authorization', localStorage.getItem("token_we_do"))
                        }
                    })
                    .fail((err) => {
                        if(err.status == 401){
                            localStorage.clear()
                            window.location.href = "index.html?msg=4"
                        }
                    }).done((res2) => {
                        if(res2.err){
                            M.toast({html: res2.err})
                        }else{
                            M.toast({html: "Seus dados e sua senha foram atualizados com sucesso!"})

                            $("#visualizacao_perfil_usuario").html("")
                            visualiza_usuario(id)
                        }
                    })
                }
        
            }else{
                M.toast({html: "Dados pessoais alterados com sucesso!"})

                $("#visualizacao_perfil_usuario").html("")
                visualiza_usuario(id)
            }
        }
    }) 
}

function abre_nome(){
    $("#campo_nm_usuario").attr("disabled", false)
    $("#campo_nm_usuario").focus()
}

function abre_data(){
    $("#campo_dt_nascimento").attr("disabled", false)
    $("#campo_dt_nascimento").focus()
}

function abre_senha(){
    $("#senha_antiga").attr("disabled", false)
    $("#nv_senha").attr("disabled", false)
    $("#nv_senha_confirm").attr("disabled", false)
    $("#senha_antiga").focus()
}

function abre_desc(){
    $("#campo_descricao").attr("disabled", false)
    $("#campo_descricao").focus()
}

function abre_tel(){
    $("#campo_tel").attr("disabled", false)
    $("#campo_tel").focus()
}

function aparece_deletar_conta(){
    $("#deletar_conta").slideDown()
}

function deleta_conta(){
    let url = url_api + "/usuario"

    $.ajax({
        url: url,
        type: "DELETE",
        contentType: "application/json",
        data: JSON.stringify({
            usuario: {
                id_usuario: id
            }
        }),
        beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', localStorage.getItem("token_we_do"))
        }
    })
    .fail((err) => {
        if(err.status == 401){
            localStorage.clear()
            window.location.href = "index.html?msg=4"
        }
    }).done((res) => {
        if(res.err){
            alert(res.err)
        }else{
            sair_sistema()
        }
    })
}

function sair() {
    localStorage.clear()
    window.location.href = url_web + "/index.html"
}

function sair_sistema() {
    localStorage.clear()
    var msg = 5
    window.location.href = url_web + "/index.html?msg=" + msg
    return false
}