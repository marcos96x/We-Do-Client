// pega o parametro ideia na url
var query = location.search.slice(1);
var partes = query.split('&');
var data = {};
partes.forEach(function (parte) {
    var chaveValor = parte.split('=');
    var chave = chaveValor[0];
    var valor = chaveValor[1];
    data[chave] = valor;
});
if(data.token){
    let token = data.token

    
    let url = url_api + "/usuario/valida_conta"
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify({
            "token": token
        }),
        contentType: "application/json"
    }).done(function(res){
        if(res.err){
            M.toast({html: res.err})
            console.log(res.err)
        }else{
            M.toast({html: res.msg})
        }
    })
    
}