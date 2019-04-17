<?php 

define("DB_SERVER", "localhost");
define("DB_NAME", "robtam10_skate");
define("DB_USERNAME", "robtam10_skate");
define("DB_PASSWORD", "25p!K@25c0dE");

$con = new PDO("mysql:host=". DB_SERVER . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if (isset($_POST['user_name'])) {
    $username = filter_var($_POST['user_name'], FILTER_SANITIZE_STRING);
}
if (isset($_POST['user_magicword'])) {
    $magicword = filter_var($_POST['user_magicword'], FILTER_SANITIZE_STRING);
}

$sql = "SELECT user_name, user_id, user_is_active, crew_id FROM users WHERE user_name = '$username' AND user_magicword = '$magicword' LIMIT 1";
$stmt = $con->prepare($sql);
$stmt->execute();
$data = $stmt->fetchAll();

if (sizeof($data) == 1) {
    $response = [
        'user_name' => $data[0]['user_name'],
        'user_id' => $data[0]['user_id'],
        'user_is_active' => $data[0]['user_is_active'],
        'crew_id' => $data[0]['crew_id'],
        'success' => true
    ];
} else {
    $response = ['success' => false];
}

echo json_encode($response);
