
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