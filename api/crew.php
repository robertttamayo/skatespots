<?php

/*
create a new crew:
action=create&crew_name=name

modify crew name:
action=modify&crew_id=id&crew_name=name

delete crew (sets as inactive, doesn't truly delete):
action=delete&crew_id=value
*/

require_once('config.php');

$con = new PDO("mysql:host=". DB_SERVER . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$sql = "";
$insert = false;
$update = false;
$crew_name = '';
$crew_id = '';
$crew_is_active = '';

if (isset($_POST['action'])){
    $action = filter_var($_POST['action'], FILTER_SANITIZE_STRING);
    if ($action == 'create') {
        if (!isset($_POST['crew_name'])) {
            echo "Crew Name must be set";
            die;
        } else {
            $crew_name = filter_var($_POST['crew_name'], FILTER_SANITIZE_STRING);
            $sql = "INSERT INTO crews (crew_name) VALUES ('$crew_name')";
        }
        $insert = true;
    } else if ($action == 'modify') {
        if (!isset($_POST['crew_id'])) {
            echo "Crew ID must be set";
            die;
        } else {
            $crew_id = filter_var($_POST['crew_id'], FILTER_VALIDATE_INT);
            $crew_name = '';
            if (isset($_POST['crew_name'])) {
                $crew_name = filter_var($_POST['crew_name'], FILTER_SANITIZE_STRING);
                $sql = "UPDATE crews SET crew_name = '$crew_name' WHERE crew_id = $crew_id";
            }
        }
        $update = true;
    } else if ($action == 'delete') {
        if (!isset($_POST['crew_id'])) {
            echo "Crew ID must be set.";
            die;
        } else {
            $crew_id = filter_var($_POST['crew_id'], FILTER_VALIDATE_INT);
            $sql = "UPDATE crews SET crew_is_active = 0 WHERE crew_id = $crew_id";
        }
        $update = true;
    }
}

if ($insert) {
    $stmt = $con->prepare($sql);
    $stmt->execute();
    $crew_id = $con->lastInsertId();
    $crew = [
        'crew_id' => $crew_id,
        'crew_name' => $crew_name,
        'crew_is_active' => 1
    ];
    echo json_encode($crew);
} else if ($update) {
    $stmt = $con->prepare($sql);
    $stmt->execute();
    
    $sql = "SELECT * FROM crews WHERE crew_id = $crew_id";
    $stmt = $con->prepare($sql);
    $stmt->execute();
    $data = $stmt->fetchAll();
    $crew = null;
    foreach($data as $datum) {
        $crew = [
            'crew_id' => $datum['crew_id'],
            'crew_name' => $datum['crew_name'],
            'crew_is_active' => $datum['crew_is_active']
        ];
    }
    echo json_encode($crew);
}

exit;
