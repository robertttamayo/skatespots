<?php

define("DB_SERVER", "localhost");
define("DB_NAME", "robtam10_skate");
define("DB_USERNAME", "robtam10_skate");
define("DB_PASSWORD", "25p!K@25c0dE");

$con = new PDO("mysql:host=". DB_SERVER . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$sql = "SELECT * FROM spots";
$stmt = $con->prepare($sql);
$stmt->execute();
$data = $stmt->fetchAll();

$spots = [];
foreach($data as $datum) {
    $spot = [
        'spot_id' => $datum['spot_id'],
        'spot_name' => $datum['spot_name'],
        'spot_lat' => $datum['spot_lat'],
        'spot_lng' => $datum['spot_lng']
    ];
    $spots[] = $spot;
}

echo json_encode($spots);

die;
