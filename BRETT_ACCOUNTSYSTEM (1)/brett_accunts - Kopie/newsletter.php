<?php

$data = json_decode(file_get_contents("php://input"), true);

$email = $data["email"];

$to = "brett-home@outlook.com"
$subject = "Neue Newsletter Anmeldung";

$message = "Neue Anmeldung für Newsletter:\n\n";
$message .= "Email: " . $email;

$headers = "From: newsletter@deineseite.com";

mail($to,$subject,$message,$headers);

?>
