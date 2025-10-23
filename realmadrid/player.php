
<?php
header('Content-Type: application/json; charset=utf-8');

// Në një projekt real, të dhënat do vinin nga DB.
// Këtu vendosim array statik për shembull.
$players = [
["id"=>"1","name"=>"Thibaut Courtois","number"=>"1","position"=>"Portier","photo"=>"img/players/courtois.jpg","bio"=>"Portier i shquar..."],
["id"=>"2","name"=>"Karim Benzema","number"=>"9","position"=>"Sulmues","photo"=>"img/players/benzema.jpg","bio"=>"Sulmues me eksperiencë..."],
["id"=>"3","name"=>"Luka Modrić","number"=>"10","position"=>"Mesfushor","photo"=>"img/players/modric.jpg","bio"=>"Mesfushor i klasit botëror..."],
["id"=>"4","name"=>"Vinícius Júnior","number"=>"7","position"=>"Sulmues","photo"=>"img/players/vini.jpg","bio"=>"Futbollist i shpejtë dhe teknik..."],
["id"=>"5","name"=>"Eduardo Camavinga","number"=>"12","position"=>"Mesfushor","photo"=>"img/players/camavinga.jpg","bio"=>"Mesfushor mllefosës..."],
// shtoni më shumë sipas dëshirës
];

echo json_encode($players, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);