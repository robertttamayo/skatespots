<?php 

require_once('config.php');

$con = new PDO("mysql:host=". DB_SERVER . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if (isset($_POST['user_name'])) {
    $username = filter_var($_POST['user_name'], FILTER_SANITIZE_STRING);
}
if (isset($_POST['user_magicword'])) {
    $magicword = filter_var($_POST['user_magicword'], FILTER_SANITIZE_STRING);
}

$sql = "SELECT user_name, 
user_id, 
user_is_active, 
crew_id, 
user_role,
(SELECT crew_name
    FROM crews
    WHERE crew_id = 
        (SELECT crew_id 
            FROM users 
            WHERE user_name = '$username' 
            AND user_magicword = '$magicword' 
            AND user_is_active = 1
        )
) AS crew_name
FROM users WHERE user_name = '$username' AND user_magicword = '$magicword' AND user_is_active = 1 LIMIT 1";
$stmt = $con->prepare($sql);
$stmt->execute();
$data = $stmt->fetchAll();

if (sizeof($data) == 1) {
    $response = [
        'user_name' => $data[0]['user_name'],
        'user_id' => $data[0]['user_id'],
        'user_is_active' => $data[0]['user_is_active'],
        'crew_id' => $data[0]['crew_id'],
        'crew_name' => $data[0]['crew_name'],
        'user_role' => $data[0]['user_role'], // must check user role again on api actions
        'status' => 'success'
    ];
    $cookie_value = json_encode([
        'user_name' => $data[0]['user_name'],
        'user_id' => $data[0]['user_id'],
        'user_role' => $data[0]['user_role'],
        'crew_id' => $data[0]['crew_id'],
        'crew_name' => $data[0]['crew_name']
    ]);
    // util_set_user_data_cookie($cookie_value);
    setcookie('user_data', $cookie_value, time() + (86400 * 365), COOKIE_PATH, COOKIE_DOMAIN, COOKIE_SECURE, COOKIE_HTTP_ONLY);
} else {
    $response = ['status' => 'fail'];
}

echo json_encode($response);