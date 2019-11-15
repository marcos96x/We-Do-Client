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
if(id_perfil == null){
    window.location.href = "http://127.0.0.1:5500/feed.html?msg=3"
}else if (id_perfil == id){
    let url = "http://127.0.0.1:5500/perfil_config.html?id_usuario=" + id
    if(window.location.href != url)
        window.location.href = "http://127.0.0.1:5500/perfil_config.html?id_usuario=" + id
}



visualiza_usuario(id_perfil)
projetos_atuais_perfil(id_perfil)
portifolio(id_perfil)



function visualiza_usuario(id_user){
    let url = "http://localhost:3000/usuario/perfil/"+id+"&"+id_user

    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json"
    }).done((res) => {
        if(res.err){
            alert(res.err)
        }else{
            console.log(res)
            $("#visualizacao_perfil").html("")            
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
              for(let i2 = 0; i2 < res.perfil_usuario.tecnologias.length; i2++){
                
                  div_chips_tecnologias += `<div class="chip">${res.perfil_usuario.tecnologias[i2].nm_tecnologia}</div>`
                
              }
            let ds_bio_usuario = ""
            if(res.perfil_usuario.ds_bio == null)
              ds_bio_usuario = "Sem biografia"
            else
              ds_bio_usuario = res.perfil_usuario.ds_bio

            $("#visualizacao_perfil").append(`
            <div class="col s10">
                <div class="row" style="margin-top: 2%;">
                    <h5>${res.perfil_usuario.nm_usuario}</h5>
                </div>
                <div class="row" style="margin-top: -3%;">
                    ${div_chips_tecnologias}
                    
                </div>
            </div>

            <div class="row">
                <div class="col s11">
                    <blockquote class='black-text'
                        style='font-family: Arial, Helvetica, sans-serif;text-align: justify;' id='desc_ideia'>
                            ${ds_bio_usuario}
                        </blockquote>
                </div>
            </div>
            `)
            $("#visualizacao_perfil_usuario").append(`
            <div class="col s10">
                <div class="row" style="margin-top: -9%;">
                    <h5>${res.perfil_usuario.nm_usuario}</h5>
                </div>
                <div class="row" style="margin-top: -3%;">
                    ${div_chips_tecnologias}
                    
                </div>
            </div>

            <div class="row">
                <div class="col s11">
                    <blockquote class='black-text'
                        style='font-family: Arial, Helvetica, sans-serif;text-align: justify;' id='desc_ideia'>
                            ${ds_bio_usuario}
                        </blockquote>
                </div>
            </div>
            `)
        }
    })
}