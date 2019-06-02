<?php

/*
create a new user:
action=create&user_name=name

modify user name:
action=modify&user_id=id&user_name=name

delete user (sets as inactive, doesn't truly delete):
action=delete&user_id=value
*/

require_once('config.php');

$con = new PDO("mysql:host=". DB_SERVER . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$sql = "";
$insert = false;
$update = false;
$user_name = '';
$user_id = '';
$user_is_active = '';
$user_magicword = '';
$user_role = 2;
$crew_id = '';

if (!isset($_POST['crew_id'])) {
    echo "Error: Crew ID is required.";
    exit;
}

$crew_id = filter_var($_POST['crew_id'], FILTER_VALIDATE_INT);

if (isset($_POST['action'])){
    $action = filter_var($_POST['action'], FILTER_SANITIZE_STRING);
    if ($action == 'create') {
        if (!isset($_POST['user_name'])) {
            echo "Error: User Name must be set";
            die;
        } 
        if (isset($_POST['user_magicword'])) {
            $user_magicword = filter_var($_POST['user_magicword'], FILTER_SANITIZE_STRING);
        }
        if (isset($_POST['user_role'])) {
            $user_role = filter_var($_POST['user_role'], FILTER_VALIDATE_INT);
        }
        $key = md5(rand());
        $user_name = filter_var($_POST['user_name'], FILTER_SANITIZE_STRING);
        $date = date("Y-m-d");
        $sql = "INSERT INTO users (user_name, crew_id, user_magicword, user_role, user_is_active, user_activate_key, user_create_date) 
        VALUES ('$user_name', $crew_id, '', $user_role, 0, '$key', '$date')";

        $insert = true;
    } else if ($action == 'modify') {
        if (!isset($_POST['user_id'])) {
            echo "Error: User ID must be set";
            die;
        } else {
            $user_id = filter_var($_POST['user_id'], FILTER_VALIDATE_INT);
            $user_name = '';
            if (isset($_POST['user_name'])) {
                $user_name = filter_var($_POST['user_name'], FILTER_SANITIZE_STRING);
                $sql = "UPDATE users SET user_name = '$user_name' WHERE user_id = $user_id";
            }
        }
        $update = true;
    } else if ($action == 'delete') {
        if (!isset($_POST['user_id'])) {
            echo "Error: User ID must be set.";
            die;
        } else {
            $user_id = filter_var($_POST['user_id'], FILTER_VALIDATE_INT);
            $sql = "UPDATE users SET user_is_active = 0 WHERE user_id = $user_id";
        }
        $update = true;
    }
}

if ($insert) {
    $stmt = $con->prepare($sql);
    $stmt->execute();
    $user_id = $con->lastInsertId();
    $user = [
        'user_id' => $user_id,
        'user_name' => $user_name,
        'user_is_active' => 0,
        'user_activate_key' => $key
    ];
    echo json_encode($user);
} else if ($update) {
    $stmt = $con->prepare($sql);
    $stmt->execute();
    
    $sql = "SELECT * FROM users WHERE user_id = $user_id";
    $stmt = $con->prepare($sql);
    $stmt->execute();
    $data = $stmt->fetchAll();
    $user = null;
    foreach($data as $datum) {
        $user = [
            'user_id' => $datum['user_id'],
            'user_name' => $datum['user_name'],
            'user_is_active' => $datum['user_is_active'],
            'user_role' => $datum['user_role'],
            'user_activate_key' => $datum['user_activate_key']
        ];
    }
    echo json_encode($user);
}

exit;
