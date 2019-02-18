<?php

define("DB_SERVER", "localhost");
define("DB_NAME", "robtam10_skate");
define("DB_USERNAME", "robtam10_skate");
define("DB_PASSWORD", "25p!K@25c0dE");

if (!isset($_POST['spot_name'])) {
    $response = ['success'=>false];
} else {
    $spot_name = filter_var($_POST['spot_name'], FILTER_SANITIZE_STRING);
    $spot_lat = filter_var($_POST['lat'], FILTER_SANITIZE_STRING);
    $spot_lng = filter_var($_POST['lng'], FILTER_SANITIZE_STRING);
    // $spot_added_by = filter_var($_POST['spot_lng'], FILTER_SANITIZE_STRING);
    
    $con = new PDO("mysql:host=". DB_SERVER . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "INSERT INTO spots (spot_name, spot_lat, spot_lng) VALUES ('$spot_name', '$spot_lat', '$spot_lng')";
    $stmt = $con->prepare($sql);
    $stmt->execute();
    $id = $con->lastInsertId();
    $response = [
        'success' => true,
        'spot_id' => $id
    ];
}

echo json_encode($response);
