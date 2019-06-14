<?php

require_once('config.php');

if (!isset($_POST['crew_id'])) {
    echo 'No crew id set';
    exit;
}

$crew_id = filter_var($_POST['crew_id'], FILTER_VALIDATE_INT);

$con = new PDO("mysql:host=". DB_SERVER . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$sql = "SELECT * FROM spots
WHERE crew_id = $crew_id";

$stmt = $con->prepare($sql);
$stmt->execute();
$data = $stmt->fetchAll();

$spots = [];
foreach($data as $datum) {
    $spot = [
        'spot_id' => $datum['spot_id'],
        'spot_name' => $datum['spot_name'],
        'spot_description' => $datum['spot_description'],
        'spot_lat' => $datum['spot_lat'],
        'spot_lng' => $datum['spot_lng'],
        'spot_image_url' => $datum['spot_image_url']
    ];
    $spots[] = $spot;
}
echo json_encode($spots);

die;
