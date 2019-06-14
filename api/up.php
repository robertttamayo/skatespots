<?php

require_once('config.php');

if (!isset($_POST['spot_name'])) {
    $response = ['success'=>false];
} else {
    $spot_name = filter_var($_POST['spot_name'], FILTER_SANITIZE_STRING);
    $spot_lat = filter_var($_POST['lat'], FILTER_SANITIZE_STRING);
    $spot_lng = filter_var($_POST['lng'], FILTER_SANITIZE_STRING);
    $spot_description = filter_var($_POST['spot_description'], FILTER_SANITIZE_STRING);
    $spot_image_url = filter_var($_POST['spot_image_url'], FILTER_SANITIZE_STRING);
    $crew_id = filter_var($_POST['crew_id'], FILTER_VALIDATE_INT);
    $spot_added_by = filter_var($_POST['spot_added_by'], FILTER_VALIDATE_INT);
    
    $con = new PDO("mysql:host=". DB_SERVER . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "INSERT INTO spots (spot_name, spot_lat, spot_lng, crew_id, spot_added_by, spot_description, spot_image_url) 
    VALUES (:spot_name, '$spot_lat', '$spot_lng', $crew_id, $spot_added_by, :spot_description, :spot_image_url)";

    $stmt = $con->prepare($sql);

    $stmt->bindParam(':spot_name', $spot_name);
    $stmt->bindParam(':spot_description', $spot_description);
    $stmt->bindParam(':spot_image_url', $spot_image_url);

    $stmt->execute();
    $id = $con->lastInsertId();
    $response = [
        'success' => true,
        'spot_id' => $id
    ];
}

echo json_encode($response);
