<?php

require_once('config.php');

$con = new PDO("mysql:host=". DB_SERVER . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if (isset($_POST['user_id'])) {
    // form submit
    
} else if (isset($_GET['user_id'])) {
    // activate link clicked
    if (!isset($_GET['key'])) {
        echo "Error: Activation key is required.";
        exit;
    }
    $user_id = filter_var($_GET['user_id'], FILTER_VALIDATE_INT);
    $user_activate_key = filter_var($_GET['key'], FILTER_SANITIZE_STRING);

    $sql = "SELECT * FROM users WHERE user_id = $user_id AND user_activate_key = '$user_activate_key' LIMIT 1";
    $stmt = $con->prepare($sql);
    $stmt->execute();
    $data = $stmt->fetchAll();

    if (sizeof($data) == 1) {
        // success
        $user_id = $data[0]['user_id'];
        $crew_id = $data[0]['crew_id'];
        $user_activate_key = $data[0]['user_activate_key'];
        $user_name = $data[0]['user_name'];
        $user_name = $data[0]['user_name'];
    }

} else {
    exit;
}

// $sql = "UPDATE users SET user_is_active = 1,
// WHERE user_id = $user_id AND user_activate_key = '$user_activate_key'";

?>
<!DOCTYPE html>
<head>
    <link rel="stylesheet" href="/assets/css/main.css" />
    <link rel="stylesheet" href="/skate/assets/css/main.css" />
    <style>
        .step {
            display: none;
        }
        [data-active="step-one"] .step-one,
        [data-active="step-two"] .step-two {
            display: block;
        }
    </style>
</head>
<body>
    <form class="activate-form" data-active="step-one" action="/" method="POST">
        <input name="user_id" type="hidden" value="<?= $user_id ?>" />
        <input name="crew_id" type="hidden" value="<?= $crew_id ?>" />

        <div class="step step-one">
            <label for="user_name">Choose a Username:</label>
            <input type="text" name="user_name" value="<?= $user_name ?>" placeholder="Enter a username"/>
            <button type="submit">Submit</button>
        </div>

        <div class="step step-two">
            <label for="user_magicword">Choose a Password:</label>
            <input type="password" name="user_magicword" value="" placeholder="Enter password" />
            <input type="password" name="user_magicword_retype" value="" placeholder="Re-type password" />
            <button type="submit">Submit</button> 
        </div>
    </form>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script>
        $('form.activate-form').on('submit', function(event){
            event.preventDefault();
            if ($(this).attr('data-step') == 'step-one') {
                $.ajax("/", {
                    method: "POST",
                    data: {
                        user_id: $('input[name="user_id"]').val(),
                        user_name: $('input[name="user_name"]').val(),
                        crew_id: $('input[name="crew_id"]').val(),
                        check_availability: 'username'
                    }
                }).then(function(response){
                    console.log(response);
                });
            } else {

            }
        });
    </script>
</body>