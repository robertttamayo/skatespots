<?php

require_once('config.php');

$con = new PDO("mysql:host=". DB_SERVER . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if (!isset($_GET['user_id'])) {
    echo "Error: User ID is required.";
    exit;
}
if (!isset($_GET['key'])) {
    echo "Error: Activation key is required.";
    exit;
}

$user_id = filter_var($_GET['use r_id'], FILTER_VALIDATE_INT);
$user_activate_key = filter_var($_GET['key'], FILTER_SANITIZE_STRING);

$sql = "UPDATE users SET user_is_active = 1,
WHERE user_id = $user_id AND user_activate_key = '$user_activate_key'";

?>
<!DOCTYPE html>
<head>
</head>
<body>
    <form action="/" method="POST">
        <?= $user_id ?>
    </form>
</body>