
(function ($) {
    "use strict";

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    
    $('#btnEnvia').click( function(){ /* Quando clicar em #btn */
        /* Coletando dados */
        var nome  = $('#nome').val();
        var email = $('#email').val();
 
        /* Validando */
        if(nome.length <= 3){
            alert('Informe seu nome');
            return false;
        }
        if(email.length <= 5){
            alert('Informe seu email');
            return false;
        }
 
        /* construindo url */
        var urlData = "&nome=" + nome +
        "&email=" + email;
 
        /* Ajax */
        $.ajax({
             type: "POST",
             url: "app/sendMail.php", /* endereço do script PHP */
             async: true,
             data: urlData, /* informa Url */
             success: function(data) { /* sucesso */
                 $('#retornoHTML').html(data);
             },
             beforeSend: function() { /* antes de enviar */
                 $('.loading').fadeIn('fast'); 
             },
             complete: function(){ /* completo */
                 $('.loading').fadeOut('fast'); //wow!
             }
         });
    });

})(jQuery);