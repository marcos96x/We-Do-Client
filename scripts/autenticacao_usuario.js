// Verificação se o usuário está apto para continuar logado
function valida_usuario(){
    if(!localStorage.getItem("nome_we_do") || 
        !localStorage.getItem("email_we_do") || 
        !localStorage.getItem("token_we_do") || 
        !localStorage.getItem("id_we_do")){
            localStorage.clear()
            let msg = 1
            window.location.href = "index.html?msg=" + msg
            return false
    }else{
        return true
    }
}