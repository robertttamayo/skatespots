<?php

require_once('config.php');

$dateSuffix = date("Y/m/");
$imgDir = MEDIA_DIR . $dateSuffix;
if (!file_exists($imgDir)) {
    mkdir($imgDir, 0777, true);
}

$response = [];
// echo json_encode($_POST);die;
if (isset($_POST['imgBase64'])) {
    $name = $_POST['fileName'];
    $image_data = $_POST['imgBase64'];
    $extension = ".jpg";
    $test_name = $imgDir . $name . $extension;
    if (file_exists($test_name)) {
        $prefix = $imgDir . $name;
        $suffix = ' (1)';
        if (file_exists($prefix . $suffix . $extension)) {
            $count = 2;
            $badname = true;
            while($badname) {
                $suffix = " ($count)";
                $test = $prefix . $suffix . $extension;
                if (!file_exists($test)){
                    $badname = false;
                } else {
                    $count++;
                }
            }
            $name .= $suffix;
        } 

        $test_name = $prefix . $suffix . $extension;
    } 
    
    $img_url = MEDIA_URL . $dateSuffix . $name . $extension;
    $response["status"] = "success";
    $response["img_url"] = $img_url;
    $response["message"] = "Success!";
    $response["test_name"] = $test_name;

    list($type, $image_data) = explode(';', $image_data);
    list(, $image_data)      = explode(',', $image_data);
    $bits = base64_decode($image_data);
    file_put_contents($test_name, $bits);
    echo json_encode($response);
} else {
    fail();
}
exit;
foreach ($_FILES["image_file"]["error"] as $key => $error) {
    
    if ($error == UPLOAD_ERR_OK) {
        $tmp_name = $_FILES["image_file"]["tmp_name"][$key];
        $name = $_FILES["image_file"]["name"][$key];
        $original_name = $name;
        $name = $imgDir . $name;
        // echo "Name: $name\n\n";
        if (file_exists($name)) {
            $regex = "/\(([0-9])\)/";
            $nameparts = explode(".", $name);
            // echo json_encode($nameparts);
            // echo "\n\n";
            // echo "size of nameparts: " . sizeof($nameparts) . "\n\n";
            $shortname = "";
            $extension = "";
            // $extension = $nameparts[sizeof($nameparts) - 1];
            if (sizeof($nameparts) > 1) {
                $extension = '.' . $nameparts[sizeof($nameparts) - 1];
                $shortname = $nameparts[0];
                for ($i = 1; $i < (sizeof($nameparts) - 1); $i++) {
                    // $extension = $extension . "." . $nameparts[$i];
                    $shortname = $shortname . '.' . $nameparts[$i];
                }
                // echo $shortname . "\n\n" . $extension . "\n\n";
            } else {
                $shortname = $name;
            }
            
            $testname = $shortname . " (1)";
            if (file_exists($testname . $extension)) {
                $shortname = $testname;
                
                $count = 2;
                $badname = true;
                while($badname) {
                    $shortname = substr($shortname, 0, -3);
                    $shortname = $shortname . "($count)";
                    $testname = $shortname . $extension;
                    if (!file_exists($testname)){
                        $badname = false;
                    } else {
                        $count++;
                    }
                }
                $name = $shortname . $extension;
                
            } else { // file name with " (1)" does not exist
                $name = $testname . $extension;
            }
            
            $parts = explode("/", $name);
            $imgFileName = $parts[sizeof($parts) - 1];
            $img_url = MEDIA_URL . $dateSuffix . $imgFileName;
            
            $data["original_name"] = $original_name;
            $data["saved_as_name"] = $name;
            $data["status"] = "success";
            $data["img_url"] = $img_url;
            $data["message"] = "Success!";
            
            move_uploaded_file($tmp_name, "$name");
            echo json_encode($data);
        } else {
            $img_url = MEDIA_URL . $dateSuffix . $original_name;
            $data["status"] = "success";
            $data["img_url"] = $img_url;
            $data["message"] = "Success!";
            move_uploaded_file($tmp_name, "$name");
            echo json_encode($data);
        }
    } else {
        $data["status"] = "fail";
        $data["message"] = "One or more images did not upload successfully. Error Status: $error";
        echo json_encode($data);
    }
}
function fail(){
    $data["status"] = "fail";
    $data["message"] = "One or more images did not upload successfully. Error Status: $error";
    echo json_encode($data);
}