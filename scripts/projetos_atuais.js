function projetos_atuais(){
    $("#projetos_atuais_lateral").html("")
    $("#projetos_atuais").html("")
    let url = "http://localhost:3000/ideia/projetos_atuais/" + id
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json"
    }).done(function(res){
        if(res.err){
            M.toast({html: res.err})
        }else if(res.msg){
            $("#projetos_atuais_lateral").append(`<a class='black-text' style='padding-left:10%;' href='#!'>${res.msg}</a><br>`)
            $("#projetos_atuais").append(`<li class="collection-item tooltipped" data-position="top">
            <div>${res.msg}
              <a href="#!" class="secondary-content">
              </a>
            </div>
          </li> `)
        }else{
            for(let i = 0; i < res.ideias.length; i++){
                $("#projetos_atuais_lateral").append(`<a class='black-text' style='padding-left:10%;' href="ideia_chat.html?ideia=${res.ideias[i].id_ideia}">${res.ideias[i].nm_ideia}</a><br>`)

               $("#projetos_atuais").append(`<li class="collection-item tooltipped" data-position="top">
               <div><a style="color: #404f65;" href="ideia_chat.html?ideia=${res.ideias[i].id_ideia}">${res.ideias[i].nm_ideia}</a>
                 <a href="ideia_chat.html?ideia=${res.ideias[i].id_ideia}" class="secondary-content">
                   <i class="material-icons black-text">arrow_forward_ios</i>
                 </a>
               </div>
             </li> `)              
            }
        }
    })
}

function projetos_atuais_perfil(id_user){
  $("#projetos_atuais_perfil").html("")
  $("#projetos_atuais_perfil").append(`<li class="collection-header">
  <h5>
      <div class="material-icons">code</div> Projetos Atuais
  </h5>
</li>`)
  let url = "http://localhost:3000/ideia/projetos_atuais/" + id_user
  $.ajax({
      url: url,
      type: "GET",
      contentType: "application/json"
  }).done(function(res){
      if(res.err){
          M.toast({html: res.err})
      }else if(res.msg){
          $("#projetos_atuais_lateral").append(`<a class='black-text' style='padding-left:10%;' href='#!'>${res.msg}</a><br>`)

      }else{
          for(let i = 0; i < res.ideias.length; i++){
            let div_chips_tecnologias = ""
            for(let i2 = 0; i2 < res.ideias[i].tecnologias.length; i2++){
              if(res.ideias[i].tecnologias[i2].id_ideia == res.ideias[i].id_ideia){
                div_chips_tecnologias += `<div class="chip">${res.ideias[i].tecnologias[i2].nm_tecnologia}</div>`
              }
            }
            let div_membros_ideia = ""
            let membros = res.ideias[i].membros
            if(membros.length == 1){
              div_membros_ideia += `${membros[0].nm_usuario}.`
            }else if (membros.length == 2){
              div_membros_ideia += `${membros[0].nm_usuario} e ${membros[1].nm_usuario}.`
            }else if (membros.length == 3){
              div_membros_ideia += `${membros[0].nm_usuario}, ${membros[1].nm_usuario} e ${membros[2].nm_usuario}.`
            }else{
              let qtd = membros.length - 3
              div_membros_ideia += `${membros[0].nm_usuario}, ${membros[1].nm_usuario} e +${qtd}.`
            }

            // saber se o usuario ja curtiu essa ideia ou se ele ja se interessou
            let div_interesse = ""
            let div_curtida = ""
            let verificador = 0
            for(let i2 = 0; i2 < res.ideias[i].curtidas.length; i2++){
              if(res.ideias[i].curtidas[i2].id_usuario == id_user)
                verificador = 1
            }

            if(verificador == 1){
              div_curtida += `
              <i class='material-icons red-text' id="icone_curtida_projeto${res.ideias[i].id_ideia}" value="1" name="${res.ideias[i].curtidas.length}" onclick="curtir('icone_curtida_projeto${res.ideias[i].id_ideia}', 'txt_curtida_projeto${res.ideias[i].id_ideia}', ${res.ideias[i].id_ideia})">favorite</i><text id="txt_curtida_projeto${res.ideias[i].id_ideia}">${res.ideias[i].curtidas.length}</text>
                       &nbsp&nbsp&nbsp
              `
            }else{
              div_curtida += `
              <i class='material-icons' id="icone_curtida_projeto${res.ideias[i].id_ideia}" value="0" name="${res.ideias[i].curtidas.length}" onclick="curtir('icone_curtida_projeto${res.ideias[i].id_ideia}', 'txt_curtida_projeto${res.ideias[i].id_ideia}', ${res.ideias[i].id_ideia})">favorite</i><text id="txt_curtida_projeto${res.ideias[i].id_ideia}">${res.ideias[i].curtidas.length}</text>
                       &nbsp&nbsp&nbsp
              `
            }
            verificador = 0
            for(let i2 = 0; i2 < res.ideias[i].membros.length; i2++){
              if(res.ideias[i].membros[i2].id_usuario == id_user)
                verificador = 1
            }
            if(verificador == 1){
              div_interesse += `
              <a class="btn-floating" id="campo_interesse_projeto${res.ideias[i].id_ideia}" onclick="mostra_interesse('campo_interesse_projeto${res.ideias[i].id_ideia}', 'icone_interesse_projeto${res.ideias[i].id_ideia}', ${res.ideias[i].id_ideia})" value="1"
                  style='margin-right: -2%;'>
                  <i class="material-icons white-text" id="icone_interesse_projeto${res.ideias[i].id_ideia}">done</i></a>
              `
            }else{
              div_interesse += `
              <a class="btn" id="campo_interesse_projeto${res.ideias[i].id_ideia}" onclick="mostra_interesse('campo_interesse_projeto${res.ideias[i].id_ideia}', 'icone_interesse_projeto${res.ideias[i].id_ideia}', ${res.ideias[i].id_ideia})" value="0"
                  style='margin-right: -2%;'>
                  <i class="material-icons white-text" id="icone_interesse_projeto${res.ideias[i].id_ideia}"></i>Interesse</a>
              `
            }


           $("#projetos_atuais_perfil").append(`
           <li>
           <div class="collapsible-header">${res.ideias[i].nm_ideia}</div>
           <div class="collapsible-body" >
              <div class="row">
                <div class="col s10 m10 l10">
               ${div_chips_tecnologias}
                </div>
                <div class="col s2 m2 l2">
                  ${div_interesse}
                </div>
              </div>
               <blockquote class='black-text' style='font-family: Arial, Helvetica, sans-serif;'>${res.ideias[i].ds_ideia}</blockquote>

               <p>
                   <labeL>Com</labeL> ${div_membros_ideia}
                   <br>
                   <div id="curtida-coment" class='left'>
                       ${div_curtida}
                       <i class="material-icons">
                           mode_comment
                       </i> ${res.ideias[i].comentarios.length}
                   </div>&nbsp&nbsp &nbsp&nbsp

           </div>
           </li>
           `)
          }
      }
  })
}

function mostra_interesse(id_elemento, id_icone, id_ideia) {

  let url = "http://localhost:3000/interesse"
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
      contentType: "application/json"
  }).done(function(res){
      if(res.err){
          alert("Erro na inserção do interesse")
      }else{
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