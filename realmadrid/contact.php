
<?php
header('Content-Type: application/json; charset=utf-8');

// Thjeshtë validim bazik dhe sanitizim
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

if(!$name || !$email || !$message){
echo json_encode(['success'=>false,'error'=>'Plotësoni të gjitha fushat.']);
exit;
}
if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
echo json_encode(['success'=>false,'error'=>'Email jo valid.']);
exit;
}

$entry = [
'name' => htmlspecialchars($name, ENT_QUOTES, 'UTF-8'),
'email' => htmlspecialchars($email, ENT_QUOTES, 'UTF-8'),
'message' => htmlspecialchars($message, ENT_QUOTES, 'UTF-8'),
'time' => date('c')
];

// File ku ruhen kontaktet (në folderin e projektit)
$file = __DIR__ . '/contacts.json';
$all = [];
if(file_exists($file)){
$json = file_get_contents($file);
$all = json_decode($json, true) ?: [];
}
$all[] = $entry;
file_put_contents($file, json_encode($all, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));

// Sukses
echo json_encode(['success'=>true]);
