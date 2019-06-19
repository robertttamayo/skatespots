<?php

require_once('config.php');

if (isset($_POST['crew_id'])) {
    // post a new message, then get all messages

    $con = new PDO("mysql:host=". DB_SERVER . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if (isset($_POST['mode'])) {
        $mode = filter_var($_POST['mode'], FILTER_SANITIZE_STRING);
        if ($mode == 'edit') {
            
            $user_id = filter_var($_POST['user_id'], FILTER_VALIDATE_INT);
            $crew_id = filter_var($_POST['crew_id'], FILTER_VALIDATE_INT);
            $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
            // echo html_entity_decode($message);die;
            $message_id = filter_var($_POST['message_id'], FILTER_VALIDATE_INT);
            
            $sql = "UPDATE messages SET message_text = :message_text, message_edited = 1
            WHERE user_id = $user_id AND crew_id = $crew_id AND message_id = $message_id";

            $stmt = $con->prepare($sql);
            $stmt->bindParam(':message_text', $message);
            $stmt->execute();

        } else if ($mode == 'delete') {

            $user_id = filter_var($_POST['user_id'], FILTER_VALIDATE_INT);
            $crew_id = filter_var($_POST['crew_id'], FILTER_VALIDATE_INT);
            $message_id = filter_var($_POST['message_id'], FILTER_VALIDATE_INT);

            $sql = "UPDATE messages SET message_deleted = 1, message_text = '' 
            WHERE message_id = $message_id AND crew_id = $crew_id AND user_id = $user_id";

            $stmt = $con->prepare($sql);
            $stmt->execute();

        }
    } else {
        $user_id = filter_var($_POST['user_id'], FILTER_VALIDATE_INT);
        $crew_id = filter_var($_POST['crew_id'], FILTER_VALIDATE_INT);
        $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
        $message_date = date("Y-m-d H:i:s");
        
        $sql = "INSERT INTO messages (message_text, user_id, crew_id, message_date)
        VALUES (:message_text, $user_id, $crew_id, '$message_date')";
        $stmt = $con->prepare($sql);
        $stmt->bindParam(':message_text', $message);
        $stmt->execute();
    }
    
    $sql = sqlSelectMessages($crew_id);
    $stmt = $con->prepare($sql);
    $stmt->execute();
    
    $data = $stmt->fetchAll();
    $messages = getMessagesArray($data);
    echo json_encode($messages);
    exit;
    
} else if (isset($_GET['crew_id'])) {
    $crew_id = filter_var($_GET['crew_id'], FILTER_VALIDATE_INT);

    $con = new PDO("mysql:host=". DB_SERVER . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = sqlSelectMessages($crew_id);
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
            'user_name' => $datum['user_name'],
            'message_deleted' => $datum['message_deleted'],
            'message_edited' => $datum['message_edited']
        ];
        $messages[] = $message;
    }
    return $messages;
}

function sqlSelectMessages($crew_id) {
    return "SELECT 
        message_id, 
        message_text AS 'message', 
        user_id, 
        crew_id, 
        message_date, 
        message_edited, 
        message_deleted,
        (SELECT u.user_name from users u where m.user_id = u.user_id) as user_name
    FROM messages m WHERE m.crew_id = $crew_id AND m.message_deleted = 0 ORDER BY message_date DESC";
}

