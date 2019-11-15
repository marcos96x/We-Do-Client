function portifolio(id_usuario) {
    let url = "http://localhost:3000/ideia/portifolio/" + id_usuario

    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json"
    }).done((res) => {
        if (res.err) {
            alert(res.err)
        } else {
            $("#portfolio").html("")
            $("#portfolio").append(`
            <li class="collection-header">
                <h5>
                    <div class="material-icons">menu_book</div> Portfólio
                </h5>
            </li>
            `)
            if(res.ideias.length == []){
                $("#portfolio").append(`<li class="collection-header">
                <p>
                    Sem ideias no portifolio
                </p>
            </li>`)
            }else{
                for (let i = 0; i < res.ideias.length; i++) {
                    let div_linguagens = ""
                    for (let i2 = 0; i2 < res.ideias[i].tecnologias.length; i2++) {
                        div_linguagens += `<div class="chip">${res.ideias[i].tecnologias[i2].nm_tecnologia}</div>`
                    }
                    let div_membros_ideia = ""
                    let membros = res.ideias[i].membros
                    if (membros.length == 1) {
                        div_membros_ideia += `${membros[0].nm_usuario}.`
                    } else if (membros.length == 2) {
                        div_membros_ideia += `${membros[0].nm_usuario} e ${membros[1].nm_usuario}.`
                    } else if (membros.length == 3) {
                        div_membros_ideia += `${membros[0].nm_usuario}, ${membros[1].nm_usuario} e ${membros[2].nm_usuario}.`
                    } else {
                        let qtd = membros.length - 3
                        div_membros_ideia += `${membros[0].nm_usuario}, ${membros[1].nm_usuario} e +${qtd}.`
                    }
                    let div_curtida = ""
                    let verificador = 0
                    for (let i2 = 0; i2 < res.ideias[i].curtidas.length; i2++) {
                        if (res.ideias[i].curtidas[i2].id_usuario == id)
                            verificador = 1
                    }
    
                    if (verificador == 1) {
                        div_curtida += `
                    <i class='material-icons red-text' id="icone_curtida_projeto${res.ideias[i].id_ideia}" value="1" name="${res.ideias[i].curtidas.length}" onclick="curtir('icone_curtida_projeto${res.ideias[i].id_ideia}', 'txt_curtida_projeto${res.ideias[i].id_ideia}', ${res.ideias[i].id_ideia})">favorite</i><text id="txt_curtida_projeto${res.ideias[i].id_ideia}">${res.ideias[i].curtidas.length}</text>
                             &nbsp&nbsp&nbsp
                    `
                    } else {
                        div_curtida += `
                    <i class='material-icons' id="icone_curtida_projeto${res.ideias[i].id_ideia}" value="0" name="${res.ideias[i].curtidas.length}" onclick="curtir('icone_curtida_projeto${res.ideias[i].id_ideia}', 'txt_curtida_projeto${res.ideias[i].id_ideia}', ${res.ideias[i].id_ideia})">favorite</i><text id="txt_curtida_projeto${res.ideias[i].id_ideia}">${res.ideias[i].curtidas.length}</text>
                             &nbsp&nbsp&nbsp
                    `
                    }
                        $("#portfolio").append(`
                    <li>
                        <div class="collapsible-header">${res.ideias[i].nm_ideia}</div>
                        <div class="collapsible-body">                
    
                            <blockquote class='black-text' style='font-family: Arial, Helvetica, sans-serif;'>${res.ideias[i].ds_ideia}</blockquote>
    
                            <p>
                                <labeL>Por</labeL> &nbsp&nbsp ${div_membros_ideia}
                                <br>
                                <div id="curtida-coment" class='left'>
                                    <i class="material-icons">
                                        mode_comment
                                    </i> ${res.ideias[i].comentarios.length}
                                </div>&nbsp&nbsp &nbsp&nbsp
    
                        </div>
                    </li>
                        `)
    
                    }
    
            }
            

            
            }
        })
}