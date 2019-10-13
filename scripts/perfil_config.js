// Variaveis globais usadas no index

$(document).ready(function () {

    $('.modal').modal({
 
        dismissible: false, // Modal cannot be closed by clicking anywhere outside
   
      }
   
    );

    $("#cancela").click(function(){
        /* Single line Reset function executes on click of Reset Button */
        $("#alt_dados")[0].reset();
    });

    $("#btn_configuracao_conta").click(function(){
        $(".class='label_modal").attr("class", "label_modal active")
    });

   
})



/**inicialização das funções do materialize */
document.addEventListener('DOMContentLoaded', function () {
    /**dropdown */
    M.Dropdown.init(
        document.querySelectorAll('.dropdown-trigger'));
    /**select */
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
    /**chips */
    var elems = document.querySelectorAll('.chips');
    var instances = M.Chips.init(elems);
    /**sidenav */
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems)
    /**botão fixo add ideia --  mostra apenas no mobile */
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems);
    /**tootip das ideias atuais */
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems, { exitDelay: 20 });
    /** colapsible do menu lateral - projetos atuais */
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);

});
