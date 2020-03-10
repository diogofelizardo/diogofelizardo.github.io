<?php 
require_once('app/class.phpmailer.php'); /* classe PHPMailer */
 
/* Recebe os dados do cliente ajax via POST */
$nome = $_POST['nome'];
$email = $_POST['email'];
 
try {
    $mail = new PHPMailer(true); //New instance, with exceptions enabled
    
    /* CORPO DO E-MAIL */
    $body .= "<h2>Enviando inscrição</h2>";
    $body .= "Nome: $nome <br>";
    $body .= "E-mail: $email <br>";
    $body .= "Mensagem:<br>";
    $body .= "<br>";
    $body .= "----------------------------";
    $body .= "<br>";
    $body .= "Enviado em <strong>".date("h:m:i d/m/Y")." por ".$_SERVER['REMOTE_ADDR']."</strong>"; //mostra a data e o IP
    $body .= "<br>";
    $body .= "----------------------------";
    
    $mail->IsSMTP(); //tell the class to use SMTP
    $mail->SMTPAuth = true; // enable SMTP authentication
    $mail->Port = 587; //SMTP porta (as mais utilizadas são '25' e '587'
    $mail->Host = "smtp.mailtrap.io"; // SMTP servidor
    $mail->Username = "4d68c077c3dcef";  // SMTP  usuário
    $mail->Password = "d4c9729f94de82";  // SMTP senha
    
    $mail->IsSendmail();  
    
    $mail->AddReplyTo($email, $nome); //Responder para..
    $mail->From = $email; //e-mail fornecido pelo cliente
    $mail->FromName   = $nome; //nome fornecido pelo cliente
    
    $to = "felizardo.diogo@gmail.com"; //Enviar para
    $mail->AddAddress($to); 
    $mail->Subject  = "Inscrição Newsletter"; //Assunto
    $mail->WordWrap   = 80; // set word wrap
    
    $mail->MsgHTML($body);
    
    $mail->IsHTML(true); // send as HTML
    
    $mail->Send();
    echo 'Mensagem enviada com sucesso.'; //retorno devolvido para o ajax caso sucesso
} catch (phpmailerException $e) {
    echo $e->errorMessage(); //retorno devolvido para o ajax caso erro
}