<?php

require_once('config.php');

$con = new PDO("mysql:host=". DB_SERVER . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$sql = "SELECT * FROM crews";

$stmt = $con->prepare($sql);
$stmt->execute();
$data = $stmt->fetchAll();

$crews = [];
foreach($data as $datum) {
    $crew = [
        'crew_id' => $datum['crew_id'],
        'crew_name' => $datum['crew_name'],
        'crew_is_active' => $datum['crew_is_active']
    ];
    $crews[] = $crew;
}

echo json_encode($crews);

die;
