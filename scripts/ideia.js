//chamando a funcao do chip
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.chips');
    var instances = M.Chips.init(elems);
});
var tags = [];
var tags_para_add = []
var tecnologias_insere_ideia = []
function coloca_tag(){
    if(event.keyCode == "13" || event.keyCode == "32"){
        if($("#texto_tags").val().trim() != ""){
            
            // verifica se ja existe a tag na inserção
            let verificaTagRepetida = 0
            for(let i = 0; i < tags_para_add.length; i++){
                if(tags_para_add[i] == $("#texto_tags").val().trim())
                    verificaTagRepetida = 1
            }
            if(verificaTagRepetida == 0){
                // verifica se a tag já existe na ideia
                for(let i = 0; i < tags_ideia.length; i++){
                    if(tags_ideia[i] == $("#texto_tags").val().trim())
                        verificaTagRepetida = 1
                }
                if(verificaTagRepetida == 0){
                    tags_para_add.push($("#texto_tags").val().trim())
                    $("#texto_tags").val("")
                    $("#tags_mostradas_ideia").html("")
                    for(let i = 0; i < tags_para_add.length; i++){
                        $("#tags_mostradas_ideia").append(`{${tags_para_add[i]}}, `)
                    }
                }else{
                    M.toast({html: "Esta tag existe na sua ideia!"})
                }
                
            }else{
                M.toast({html: "Esta tag já foi inserida!"})
            }
            
        }
        
    }
}

function btn_edita_status(estado){
    if(estado == 1){
        // abre a opçao
        $("#opcoes_status").slideToggle()

        $("#btn_edita_status").attr("onclick", "btn_edita_status(0)")
    }else{
        // fecha a opção
        $("#btn_edita_status").attr("onclick", "btn_edita_status(1)")
        $("#opcoes_status").slideDown()
    }
}

function add_tag(){
    if(tags_para_add.length == 0){
        M.toast({html: "Sem tag inserida!"})
    }else{
        let url = url_api + "/ideia/tags"

        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                usuario: {
                    id_usuario: id
                },
                ideia: {
                    id_ideia: id_ideia_original,
                    tags_ideia: tags_para_add
                }
            })
        }).done((res) => {
            if(res.err){
                alert(res.err)
            }else{
                mostra_ideia(id_ideia_original)
                if(tags_para_add.length < 2){
                    M.toast({html: "Tag inserida com sucesso"})
                }else{
                    M.toast({html: "Tags inseridas com sucesso"})
                }
            }
        })
    }
}

function edita_tags(estado){
    if(estado == 1){
        // abre a opçao
        $("#campo_edita_tags").slideToggle()

        $("#btn_edita_tag").attr("onclick", "edita_tags(0)")
    }else{
        // fecha a opção
        $("#btn_edita_tag").attr("onclick", "edita_tags(1)")
        $("#campo_edita_tags").slideDown()
    }
}

function cria_ideia(){

    let nm_ideia = document.getElementById("titulo_ideia").value

    let ideia_quebrada = []
    ideia_quebrada.push(nm_ideia.split(" "))
    
    
    let desc = $("#textarea2").val()
    let tecnologias = []
    for(let i = 0; i < tecnologias_insere_ideia.length; i+= 2){
        tecnologias.push(tecnologias_insere_ideia[i])
    }
    if(tecnologias.length == 0){
        M.toast({html: "Insira uma tecnologia"})
    }else{
        let url = url_api + "/ideia"
        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                ideia: {
                    nm_ideia: nm_ideia,
                    ds_ideia: desc,
                    tecnologias_ideia: tecnologias,
                    tags_ideia: ideia_quebrada
                },
                usuario: {
                    id_usuario: id
                }
            })
        }).done((res) => {
            if(res.err){
                alert(res.err)
            }else{                
                M.toast({html: "Ideia criada com sucesso!"})
                carrega_feed(id)
                projetos_atuais()
            }
        })
    }

}

function insere_tecnologia_ideia(id, nm) {
    arrayDadosTecnologia = [id, nm]

    $("#lista_tecnologias_add").html(`
        <h3>Deseja adicionar <text style="color: red;">"${arrayDadosTecnologia[1]}"</text> à lista de técnologias ligadas à sua ideia? </h3>
    `)
}



function adiciona_tecnologia_na_ideia(){

    if(arrayDadosTecnologia.length == []){
        M.toast({html: "Selecione uma tecnologia para ser adicionada"})
        return false
    }else{

        let url =  url_api + "/tecnologia/ideia"

        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                "ideia": {
                    "id_ideia": id_ideia_pagina
                },
                "usuario": {
                    "id_usuario": id
                },
                "tecnologia": {
                    "id_tecnologia": arrayDadosTecnologia[0]    
                }
            })
        }).done((res) => {
            if(res.err){
                alert(res.err)
            }else{
                if(res.msg){
                    M.toast({html: res.msg})
                    
                    mostra_ideia(id_ideia_pagina)
                    return false
                }
            }
        })
    }

}


function insere_tecnologias_criacao_ideia(id, nm) {   
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

function altera_dados_ideia(dado){
    if(dado == "TI"){
        // altera o titulo
        if($("#nm_ideia").val().trim() == ""){
            M.toast({html: "Campo do novo nome da ideia vazio!"})
        }else{
            let url = url_api + "/ideia"
            
            $.ajax({
                url: url,
                type: "PUT",
                contentType: "application/json",
                data: JSON.stringify({
                    "ideia": {
                        "id_ideia": id_ideia_original,
                        "nm_ideia": $("#nm_ideia").val().trim(),
                        "ds_ideia": ds_ideia_original,
                        "status_ideia": status_ideia_original
                    },
                    "usuario": {
                        "id_usuario": id
                    }
                })
            }).done((res) => {
                if(res.err){
                    M.toast({html: res.err})
                    return false
                }else{
                    if(res.msg == "OK"){
                        M.toast({html: "Nome da ideia atualizado com sucesso!"})                        
                        mostra_ideia(id_ideia_pagina)
                    }else{
                        M.toast({html: res.msg})
                        return false
                    }
                }
            })
        }
    }else if (dado == "DS"){
        // altera a descrição
        if($("#desc_ideiaa").val().trim() == ""){
            M.toast({html: "Campo da nova descrição vazio!"})
        }else{
            let url = url_api + "/ideia"
            
            $.ajax({
                url: url,
                type: "PUT",
                contentType: "application/json",
                data: JSON.stringify({
                    "ideia": {
                        "id_ideia": id_ideia_original,
                        "nm_ideia": nm_ideia_original,
                        "ds_ideia": $("#desc_ideiaa").val(),
                        "status_ideia": status_ideia_original
                    },
                    "usuario": {
                        "id_usuario": id
                    }
                })
            }).done((res) => {
                if(res.err){
                    M.toast({html: res.err})
                    return false
                }else{
                    if(res.msg == "OK"){
                        M.toast({html: "Descrição da ideia atualizada com sucesso!"})                        
                        mostra_ideia(id_ideia_pagina)
                    }else{
                        M.toast({html: res.msg})
                        return false
                    }
                }
            })
        }
    }else if (dado == "CO"){
        // muda o status da ideia concluída
        let url = url_api + "/ideia/status"

        $.ajax({
            url: url,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify({
                ideia: {
                    id_ideia: id_ideia_original,
                    status_ideia: 2
                },
                usuario: {
                    id_usuario: id
                }
            })
        }).done((res) => {
            if(res.err){
                alert(res.err)
            }else{
                M.toast({html: "Sua ideia foi marcada como concluída!"})
                mostra_ideia(id_ideia_original)
            }
        })
    }else if (dado == "DE"){
        // muda o status da ideia para em desenvolvimento
        let url = url_api + "/ideia/status"

        $.ajax({
            url: url,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify({
                ideia: {
                    id_ideia: id_ideia_original,
                    status_ideia: 1
                },
                usuario: {
                    id_usuario: id
                }
            })
        }).done((res) => {
            if(res.err){
                alert(res.err)
            }else{
                M.toast({html: "Sua ideia foi marcada como em desenvolvimento!"})
                mostra_ideia(id_ideia_original)
            }
        })
    }else if (dado == "AB"){
        // muda o status da ideia para aberta
        let url = url_api + "/ideia/status"

        $.ajax({
            url: url,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify({
                ideia: {
                    id_ideia: id_ideia_original,
                    status_ideia: 0
                },
                usuario: {
                    id_usuario: id
                }
            })
        }).done((res) => {
            if(res.err){
                alert(res.err)
            }else{
                M.toast({html: "Sua ideia foi marcada como Aberta à participações!"})
                mostra_ideia(id_ideia_original)
            }
        })
    }
}

