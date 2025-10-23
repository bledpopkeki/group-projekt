<?php
// Ky është vetëm demo. Mos përdorni këtë metodë si siguri reale.
$pw = $_POST['pw'] ?? '';
if($pw !== 'admin123'){
// formulari i login-it
echo '<form method="POST"><h2>Admin - shiko kontaktet</h2><input type="password" name="pw" placeholder="Password"><button>Hyr</button></form>';
exit;
}
$file = __DIR__ . '/contacts.json';
$contacts = [];
if(file_exists($file)){
$contacts = json_decode(file_get_contents($file), true) ?: [];
}
echo '<h1>Kontaktet</h1><a href="index.html">Kthehu</a><table border="1" cellpadding="6"><tr><th>Koha</th><th>Emri</th><th>Email</th><th>Mesazhi</th></tr>';
foreach($contacts as $c){
echo '<tr><td>'.htmlspecialchars($c['time']).'</td><td>'.htmlspecialchars($c['name']).'</td><td>'.htmlspecialchars($c['email']).'</td><td>'.nl2br(htmlspecialchars($c['message'])).'</td></tr>';
}
echo '</table>';
