<?php

require_once('config.php');

$con = new PDO("mysql:host=". DB_SERVER . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$valid = true;

if (isset($_POST['user_id'])) {
    // form submit
    if (isset($_POST['check_username'])) {
        $user_name = filter_var($_POST['user_name'], FILTER_SANITIZE_STRING);
        $crew_id = filter_var($_POST['crew_id'], FILTER_VALIDATE_INT);
        $user_id = filter_var($_POST['user_id'], FILTER_VALIDATE_INT);
        $sql = "SELECT COUNT(user_name) AS username_count
        FROM users 
        WHERE user_name = '$user_name' 
        AND crew_id = $crew_id 
        AND user_id <> $user_id";
        $stmt = $con->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll();
        
        $count = $data[0]['username_count'];
        if ($count == 0) {
            $sql = "UPDATE users SET user_name = '$user_name' WHERE user_id = $user_id";
            $stmt = $con->prepare($sql);
            $stmt->execute();
            echo "success";
        } else {
            echo "Name already taken. Try a different name";
        }
        die;
    } else if (isset($_POST['activate_with_magicword'])) {
        $user_id = filter_var($_POST['user_id'], FILTER_VALIDATE_INT);
        $user_magicword = filter_var($_POST['user_magicword'], FILTER_SANITIZE_STRING);
        $sql = "UPDATE users SET user_magicword = '$user_magicword', user_is_active = 1, user_activate_key = '' WHERE user_id = $user_id";
        $stmt = $con->prepare($sql);
        $stmt->execute();
        echo "success";
        $sql = "SELECT user_name, user_id, user_role, crew_id FROM users WHERE user_id = $user_id";
        $stmt = $con->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll();
        $cookie_value = json_encode([
            'user_name' => $data[0]['user_name'],
            'user_id' => $data[0]['user_id'],
            'user_role' => $data[0]['user_role'],
            'crew_id' => $data[0]['crew_id']
        ]);
        setcookie('user_data', $cookie_value, time() + (86400 * 365), "/");
        exit;
    }
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
    } else {
        $valid = false;
    }
} else {
    exit;
}

if (!$valid) {
    echo "Invalid user id or activation key";
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
        [data-active-step="step-one"] .step-one,
        [data-active-step="step-two"] .step-two {
            display: block;
        }
        .error-message {
            display: none;
        }
        .error-message.visible {
            display: inline-block;
        }
        .step-two-username {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <form class="activate-form" data-active-step="step-one" action="/" method="POST">
        <input name="user_id" type="hidden" value="<?= $user_id ?>" />
        <input name="crew_id" type="hidden" value="<?= $crew_id ?>" />

        <div class="step step-one">
            <label for="user_name">Choose a Username:</label>
            <input type="text" name="user_name" value="<?= $user_name ?>" placeholder="Enter a username"/>
            <span class="error-message try-a-different-name">Name already taken. Try a different name.</span>
            <button type="submit">Submit</button>
        </div>

        <div class="step step-two">
            <div class="">Welcome <span class="step-two-username"></span></div>
            <label for="user_magicword">Choose a Password:</label>
            <input type="password" name="user_magicword" value="" placeholder="Enter password" />
            <input type="password" name="user_magicword_retype" value="" placeholder="Re-type password" />
            <span class="error-message passwords-do-not-match">Passwords must match.</span>
            <button type="submit">Submit</button> 
        </div>
    </form>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script>
        $('form.activate-form').on('submit', function(event){
            event.preventDefault();
            if ($(this).attr('data-active-step') == 'step-one') {
                let data = {
                    user_id: $('input[name="user_id"]').val(),
                    user_name: $('input[name="user_name"]').val(),
                    crew_id: $('input[name="crew_id"]').val(),
                    check_username: 'username'
                }
                $.ajax(window.location.href.split('?')[0], {
                    method: "POST",
                    data: data
                }).then(function(response){
                    console.log(response);
                    if (response == 'success') {
                        // move on to step two, choose a password
                        updateStepTwoUsername();
                        $('.try-a-different-name').removeClass('visible');
                        $('form.activate-form').attr('data-active-step', 'step-two');
                    } else {
                        console.log('name is taken');
                        $('.try-a-different-name').addClass('visible');
                    }
                });
            } else {
                if (passwordsAreMatching()) {
                    let data = {
                        user_id: $('input[name="user_id"]').val(),
                        user_magicword: $('input[name="user_magicword"]').val(),
                        activate_with_magicword: true
                    }
                    $.ajax(window.location.href.split('?')[0], {
                        method: "POST",
                        data: data,
                        withCredentials: true
                    }).then(function(response){
                        console.log(response);
                        if (response == 'success') {
                            $('form.activate-form').attr('data-active-step', 'step-two');
                        } else {
                            console.log(response);
                            console.log("<?= APP_HOME_URL ?>");
                            window.location.href = "<?= APP_HOME_URL ?>";
                            // there was some kind of server error
                        }
                    });
                } else {
                    $('.passwords-do-not-match').addClass('visible');
                }
            }
        });
        function updateStepTwoUsername(){
            console.log($('input[name="user_name"]').val());
            $('span.step-two-username').text($('input[name="user_name"]').val());
        }
        function passwordsAreMatching(){
            return $('input[name="user_magicword"]').val() == $('input[name="user_magicword_retype"]').val();
        }
        updateStepTwoUsername();
    </script>
</body>