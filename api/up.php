<?php

require_once('config.php');

if (!isset($_POST['spot_name'])) {
    $response = ['success'=>false];
} else {
    $spot_name = filter_var($_POST['spot_name'], FILTER_SANITIZE_STRING);
    $spot_lat = filter_var($_POST['lat'], FILTER_SANITIZE_STRING);
    $spot_lng = filter_var($_POST['lng'], FILTER_SANITIZE_STRING);
    $crew_id = filter_var($_POST['crew_id'], FILTER_VALIDATE_INT);
    // $spot_added_by = filter_var($_POST['spot_lng'], FILTER_SANITIZE_STRING);
    
    $con = new PDO("mysql:host=". DB_SERVER . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "INSERT INTO spots (spot_name, spot_lat, spot_lng, crew_id) 
    VALUES ('$spot_name', '$spot_lat', '$spot_lng', $crew_id)";
    $stmt = $con->prepare($sql);
    $stmt->execute();
    $id = $con->lastInsertId();
    $response = [
        'success' => true,
        'spot_id' => $id
    ];
}

echo json_encode($response);
