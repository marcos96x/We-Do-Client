
$(document).ready(()=>{

})

function cria_ideia(){
    let nm_ideia = document.getElementById("titulo_ideia").value
    let desc = $("#textarea2").val()
    let tecnologias = []
    for(let i = 0; i < tecnologias_insere_ideia.length; i+= 2){
        tecnologias.push(tecnologias_insere_ideia[i])
    }
    /**
     * Faltando apenas colocar a parte de inserir tags
     */
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
                    "id_tecnologia": arrayDadosTecnologia[0]    
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

function altera_dados_ideia(dado){
    if(dado == "TI"){
        // altera o titulo
        if($("#nm_ideia").val().trim() == ""){
            M.toast({html: "Campo do novo nome da ideia vazio!"})
        }else{
            let url = "http://localhost:3000/ideia"
            
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
                        window.location.reload()
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
            alert("Altera descricao - " + ds_ideia_original + " Para: " + $("#desc_ideiaa").val())
        }
    }else if (dado == "CO"){
        // muda o status para concluída
        alert("Altera pra ideia concluída")
    }else if (dado == "DE"){
        // muda o status para em desenvolvimento
    }else if (dado == "PR"){
        // muda o status para a procura de pessoas
    }
}

