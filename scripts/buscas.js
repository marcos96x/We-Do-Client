function pesquisa_por_ambos(texto, tecnologia){
    $("#texto_resultado_busca").text(texto + `" e "` + tecnologia[1])
    $("#resultado_pesquisas").html("")
    let url = "http://localhost:3000/ideia/busca_tecnologia_nome/ " + tecnologia[0] + "&" + texto
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/JSON"
    }).done(function(res){
        if(res.err){
            alert(res.err)
        }else{            
            $("#feed").hide()
            $("#div_adicionar_ideia").hide()
            $("#pesquisas").show()
            let buscas = res.ideias
            for(let i = 0; i < buscas.length; i++){ 
                // inserção do conteudo da busca
                $("#resultado_pesquisas").append(` 
                <div onclick="acessa_ideia(${buscas[i].id_ideia})">
                    <div class="divider"></div>               
                        <div class="col s10">
                            <h6>${buscas[i].nm_ideia}</h6>
                        </div>
                    
                        <br><br><br><br>
                    
                    <div class="col s12 " style="margin-top:-4%;">                        
                        <label>${buscas[i].nm_usuario}</label>
                    </div>
                
                    <div class="divider"></div>
                </div>
                `)                 
            }
        }
    })
    return false
}

function pesquisa_por_texto(texto){
    $("#texto_resultado_busca").text(texto)
    $("#resultado_pesquisas").html("")
    let url = "http://localhost:3000/ideia/busca_nome/" + texto
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/JSON"
    }).done(function(res){
        if(res.err){
            alert(res.err)
        }else{            
            $("#feed").hide()
            $("#div_adicionar_ideia").hide()
            $("#pesquisas").show()
            let buscas = res.ideias
            for(let i = 0; i < buscas.length; i++){ 
                // inserção do conteudo da busca
                $("#resultado_pesquisas").append(` 
                <div onclick="acessa_ideia(${buscas[i].id_ideia})">
                    <div class="divider"></div>               
                        <div class="col s10">
                            <h6>${buscas[i].nm_ideia}</h6>
                        </div>
                    
                        <br><br><br><br>
                    
                    <div class="col s12 " style="margin-top:-4%;">                        
                        <label>${buscas[i].nm_usuario}</label>
                    </div>
                
                    <div class="divider"></div>
                </div>
                `)                 
            }
        }
    })
    return false
}

function pesquisa_por_tecnologia(id, nm){
    $("#texto_resultado_busca").text(nm)
    $("#resultado_pesquisas").html("")
    let url = "http://localhost:3000/ideia/busca_tecnologia/" + id
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/JSON"
    }).done(function(res){
        if(res.err){
            alert(res.err)
        }else{            
            $("#feed").hide()
            $("#div_adicionar_ideia").hide()
            $("#pesquisas").show()
            let buscas = res.ideias
            for(let i = 0; i < buscas.length; i++){ 
                // inserção do conteudo da busca
                $("#resultado_pesquisas").append(` 
                <div onclick="acessa_ideia(${buscas[i].id_ideia})">
                    <div class="divider"></div>               
                        <div class="col s10">
                            <h6>${buscas[i].nm_ideia}</h6>
                        </div>
                    
                        <br><br><br><br>
                    
                    <div class="col s12 " style="margin-top:-4%;">                        
                        <label>${buscas[i].nm_usuario}</label>
                    </div>
                
                    <div class="divider"></div>
                </div>
                `)                 
            }

        }
    })
    return false
}

function pesquisa_ideias(){
    if($("#texto_pesquisa").val().trim() != "" && id_tecnologia_da_pesquisa.length != []){
        pesquisa_por_ambos( $("#texto_pesquisa").val().trim(), id_tecnologia_da_pesquisa)
    }else{
        if($("#texto_pesquisa").val().trim() != ""){
            pesquisa_por_texto($("#texto_pesquisa").val().trim())
        }else if(id_tecnologia_da_pesquisa.length != []){
            pesquisa_por_tecnologia(id_tecnologia_da_pesquisa[0], id_tecnologia_da_pesquisa[1])
        }else{
            M.toast({html: "Busca invalida"})
            return false
        }
    }
}

function acessa_ideia(id_ideia){
    window.location.href = "ideia_chat.html?ideia=" + id_ideia
}