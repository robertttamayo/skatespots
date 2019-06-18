<?php

require_once('config.php');

if (isset($_POST['crew_id'])) {
    // post a new message, then get all messages

    $con = new PDO("mysql:host=". DB_SERVER . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $user_id = filter_var($_POST['user_id'], FILTER_VALIDATE_INT);
    $crew_id = filter_var($_POST['crew_id'], FILTER_VALIDATE_INT);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
    $message_date = date("Y-m-d H:i:s");
    
    $sql = "INSERT INTO messages (message_text, user_id, crew_id, message_date)
    VALUES (:message_text, $user_id, $crew_id, '$message_date')";
    $stmt = $con->prepare($sql);
    $stmt->bindParam(':message_text', $message);
    $stmt->execute();

    $sql = "SELECT message_id, message_text AS 'message', user_id, crew_id, message_date, 
    (SELECT u.user_name from users u where m.user_id = u.user_id) as user_name
    FROM messages m WHERE m.crew_id = $crew_id ORDER BY message_date";
    $stmt = $con->prepare($sql);
    $stmt->execute();
    
    $data = $stmt->fetchAll();
    $messages = getMessagesArray($data);
    echo json_encode($messages);
    exit;
    
} else if (isset($_GET['crew_id'])) {
    $crew_id = filter_var($_GET['crew_id']);

    $con = new PDO("mysql:host=". DB_SERVER . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT message_id, message_text AS 'message', user_id, crew_id, message_date, 
    (SELECT u.user_name from users u where m.user_id = u.user_id) as user_name
    FROM messages m WHERE m.crew_id = $crew_id ORDER BY message_date";
    $stmt = $con->prepare($sql);
    $stmt->execute();
    $data = $stmt->fetchAll();
    $messages = getMessagesArray($data);
    echo json_encode($messages);
    exit;
} else {
    echo json_encode(["status" => "fail", "message" => "Error: Crew ID required"]);
    exit;
}

function getMessagesArray($data){
    $messages = [];
    foreach ($data as $datum) {
        $message = [
            'message_id' => $datum['message_id'],
            'crew_id' => $datum['crew_id'],
            'user_id' => $datum['user_id'],
            'message' => $datum['message'],
            'message_date' => $datum['message_date'],
            'user_name' => $datum['user_name']
        ];
        $messages[] = $message;
    }
    return $messages;
}


