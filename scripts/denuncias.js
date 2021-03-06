

function denuncia(valor){
    if(valor == 1){
        // efetua denuncia
        let desc_denuncia = $("#desc_denuncia").val().trim()
    
        if(desc_denuncia == ""){
            M.toast({html: "Descrição da denuncia vazia!"})
        }else{
            let url = url_api + "/usuario/denuncia"
            $.ajax({
                url: url,
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    denuncia: {
                        descricao_denuncia: desc_denuncia,
                        id_usuario_acusador: id,
                        id_usuario_denunciado: id_perfil
                    }
                }),
                beforeSend: function(xhr){
                    xhr.setRequestHeader('Authorization', localStorage.getItem("token_we_do"))
                }
            })
            .fail((err) => {
                if(err.status == 401){
                    localStorage.clear()
                    window.location.href = "index.html?msg=4"
                }
            }).done((res) => {
                if(res.err){
                    alert(res.err)
                }else{
                    localStorage.setItem("token_we_do", res.token)
                    if(res.msg == 1){
                        $("#botao_denuncia").attr("href", "#modal_remover_denuncia")
                        $("#botao_denuncia").html(`<i class="material-icons small blue-text" style="float: right;">report</i>`)
                        M.toast({html: "Denuncia realizada!"})
                    }
                    else if (res.msg == 2){
                        M.toast({html: "Denuncia retirada!"})
                        $("#botao_denuncia").attr("href", "#modal_denuncia")
                        $("#botao_denuncia").html(`<i class="material-icons small red-text" style="float: right;">report</i>`)
                    }
                }
            })
        }
    }else{
        // remove a denuncia        
        let url = url_api + "/usuario/denuncia"
        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                denuncia: {
                    id_usuario_acusador: id,
                    id_usuario_denunciado: id_perfil
                }
            }),
            beforeSend: function(xhr){
                xhr.setRequestHeader('Authorization', localStorage.getItem("token_we_do"))
            }
        })
        .fail((err) => {
            if(err.status == 401){
                localStorage.clear()
                window.location.href = "index.html?msg=4"
            }
        }).done((res) => {
            if(res.err){
                alert(res.err)
            }else{
                localStorage.setItem("token_we_do", res.token)
                M.toast({html: "Denuncia retirada!"})
                $("#botao_denuncia").attr("href", "#modal_denuncia")
                $("#botao_denuncia").html(`<i class="material-icons small red-text" style="float: right;">report</i>`)
            }
        })  
    }
}
