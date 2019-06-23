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
        $sql = "SELECT 
        user_name, 
        user_id, 
        user_role, 
        crew_id,
        (SELECT crew_name 
            FROM crews 
            WHERE crew_id = (SELECT crew_id FROM users WHERE user_id = $user_id)
        ) AS crew_name
        FROM users 
        WHERE user_id = $user_id";
        $stmt = $con->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll();
        $cookie_value = json_encode([
            'user_name' => $data[0]['user_name'],
            'user_id' => $data[0]['user_id'],
            'user_role' => $data[0]['user_role'],
            'crew_id' => $data[0]['crew_id'],
            'crew_name' => $data[0]['crew_name']
        ]);
        util_set_user_data_cookie($cookie_value);
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
<meta charset="utf-8">
<title>Skate Spots – Create your account</title>

<meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Monoton|Roboto+Condensed&display=swap" rel="stylesheet">
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
    <div id="app">
        <div class="app-wrap Main menu-open-false">
            <header class="header-wrap"><div class="icon-button button-action-main"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" class="svg-inline--fa fa-arrow-left fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path></svg></div><div class="header-title"><span>skate</span></div><div class="icon-button button-action-menu"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" class="svg-inline--fa fa-bars fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg></div><div class="slide-menu"><div class="slide-menu-close"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg></div><div class="slide-menu-item">Logout</div></div></header>
            
            <form class="activate-form" data-active-step="step-one" action="/" method="POST">
                <input name="user_id" type="hidden" value="<?= $user_id ?>" />
                <input name="crew_id" type="hidden" value="<?= $crew_id ?>" />

                <div class="step step-one">
                    <label for="user_name">Choose a Username</label>
                    <div class="input-row">
                        <div class="input-row-input">
                            <input type="text" name="user_name" value="<?= $user_name ?>" placeholder="Enter a username"/>
                            <span class="error-message try-a-different-name">Name already taken. Try a different name.</span>
                        </div>
                        <button type="submit">Next</button>
                    </div>
                </div>

                <div class="step step-two">
                    <div class="welcome-new-user">Welcome <span class="step-two-username"></span></div>
                    <label for="user_magicword">Choose a Password</label>

                    <div class="input-row">
                        <div class="input-row-input">
                            <input type="password" name="user_magicword" value="" placeholder="Enter password" />
                            <input type="password" name="user_magicword_retype" value="" placeholder="Re-type password" />
                            <span class="error-message passwords-do-not-match">Passwords must match.</span>
                            <button type="submit">Submit</button> 
                        </div>
                    </div>
                </div>
            </form>

            <div class="loading-bg" data-visible="false">
                <div class="loading-message"></div>
                <div class="loading-animation">
                    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script>
        $('form.activate-form').on('submit', function(event){
            event.preventDefault();
            if ($(this).attr('data-active-step') == 'step-one') {
                loading(true, 'Checking username...');
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
                    loading(false);
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
                    loading(true, 'Finishing up...');
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
                        loading(false);
                        console.log(response);
                        if (response == 'success') {
                            console.log("<?= APP_HOME_URL ?>");
                            // var cookie_data_string = JSON.stringify({
                            //     user_name: $('input[name="user_name"]').val(),
                            //     user_id: $('input[name="user_id"]').val(),
                            //     user_role: data.user_role,
                            //     crew_id: $('input[name="crew_id"]').val()
                            // });
                            // setCookie('user_data', cookie_data_string);
                            window.location.href = "<?= APP_HOME_URL ?>";
                        } else {
                            console.log(response);
                            alert('An error occurred');
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
        function loading(isLoading, loadingMessage) {
            $('.loading-bg').attr('data-loading', isLoading);
            if (loadingMessage) {
                $('.loading-message').text(loadingMessage);
            }
        }
        updateStepTwoUsername();
    </script>
</body>