<?php
if( isset($_POST['userName']) && isset($_POST['userEmail']) && isset($_POST['userPhone']) && isset($_POST['userMessage'])){
	$n = $_POST['userName']; // HINT: use preg_replace() to filter the data
    $e = $_POST['userEmail'];
    $p = $_POST['userPhone'];
	$m = nl2br($_POST['userMessage']);
	$to = "anfalov.s.v@yandex.ru";	
	$from = $e;
	$subject = 'Заявка с Camini-vent.ru';
	$message = '<b>Name:</b> '.$n.' <br><b>Email:</b> '.$e.' <br><b>Phone:</b> '.$p.' <br><p>'.$m.'</p>';
	$headers = "From: $from\n";
	$headers .= "MIME-Version: 1.0\n";
	$headers .= "Content-type: text/html; charset=utf-8\n";
	if( mail($to, $subject, $message, $headers) ){
		echo "success";
	} else {
		echo "The server failed to send the message. Please try again later.";
	}
}
?>