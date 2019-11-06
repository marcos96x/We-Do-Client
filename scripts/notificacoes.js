$(document).ready(() => {
    carrega_notificacoes_usuario(id)
})

function carrega_notificacoes_usuario(id_user){
    let url = "http://localhost:3000/notificacoes/" + id_user

    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json"
    }).done((res) => {
        if(res.err){
            alert(res.err)
        }else{
            console.log(res.notificacoes)
        }
    })
}