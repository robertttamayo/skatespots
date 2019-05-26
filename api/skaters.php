<?php

require_once('config.php');

if (!isset($_POST['crew_id'])) {
    echo 'No crew id set';
    exit;
}

$crew_id = filter_var($_POST['crew_id'], FILTER_VALIDATE_INT);

$con = new PDO("mysql:host=". DB_SERVER . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$sql = "SELECT * FROM users
WHERE crew_id = $crew_id";

$stmt = $con->prepare($sql);
$stmt->execute();
$data = $stmt->fetchAll();

$users = [];
foreach($data as $datum) {
    $user = [
        'user_id' => $datum['user_id'],
        'user_name' => $datum['user_name'],
        'user_is_active' => $datum['user_is_active'],
        'user_role' => $datum['user_role'],
        'crew_id' => $datum['crew_id']
    ];
    $users[] = $user;
}

echo json_encode($users);

die;
