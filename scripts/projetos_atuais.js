function projetos_atuais(){
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
                $("#projetos_atuais_lateral").append(`<a class='black-text' style='padding-left:10%;' href='#!'>${res.ideias[i].nm_ideia}</a><br>`)

               $("#projetos_atuais").append(`<li class="collection-item tooltipped" data-position="top">
               <div>${res.ideias[i].nm_ideia}
                 <a href="#!" class="secondary-content">
                   <i class="material-icons black-text">arrow_forward_ios</i>
                 </a>
               </div>
             </li> `)
            }
        }
    })
}