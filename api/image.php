<?php

require_once('config.php');

$dateSuffix = date("Y/m/");
$imgDir = MEDIA_DIR . $dateSuffix;
if (!file_exists($imgDir)) {
    mkdir($imgDir, 0777, true);
}

$data = [];

foreach ($_FILES["image_file"]["error"] as $key => $error) {
    
    if ($error == UPLOAD_ERR_OK) {
        $tmp_name = $_FILES["image_file"]["tmp_name"][$key];
        $name = $_FILES["image_file"]["name"][$key];
        $original_name = $name;
        $name = $imgDir . $name;
        
        if (file_exists($name)) {
            $regex = "/\(([0-9])\)/";
            $nameparts = explode(".", $name);
            
            $shortname = "";
            $extension = "";
            if (sizeof($nameparts) > 1) {
                $shortname = $nameparts[0];
                for ($i = 1; $i < sizeof($nameparts); $i++) {
                    $extension = $extension . "." . $nameparts[$i];
                }
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
            $data["success"] = true;
            $data["img_url"] = $img_url;
            $data["message"] = "Success!";
            
            move_uploaded_file($tmp_name, "$name");
            echo json_encode($data);
        } else {
            $img_url = MEDIA_URL . $dateSuffix . $original_name;
            $data["success"] = true;
            $data["img_url"] = $img_url;
            $data["message"] = "Success!";
            move_uploaded_file($tmp_name, "$name");
            echo json_encode($data);
        }
    } else {
        echo "we gotted here. this the else";
        $data["success"] = false;
        $data["message"] = "One or more images did not upload successfully.";
        echo json_encode($data);
    }
}