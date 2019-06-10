<?php

require_once('config.php');

$con = new PDO("mysql:host=". DB_SERVER . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// $sql = "SELECT * FROM crews";
$sql = "SELECT *, 
(SELECT COUNT(*) 
    FROM users 
    WHERE users.crew_id = crews.crew_id
    AND users.user_is_active = 1
) AS crew_member_count,
(SELECT COUNT(*) 
    FROM spots 
    WHERE spots.crew_id = crews.crew_id
) AS crew_spot_count
FROM crews WHERE crew_is_active = 1";

$stmt = $con->prepare($sql);
$stmt->execute();
$data = $stmt->fetchAll();

$crews = [];
foreach($data as $datum) {
    $crew = [
        'crew_id' => $datum['crew_id'],
        'crew_name' => $datum['crew_name'],
        'crew_is_active' => $datum['crew_is_active'],
        'crew_member_count' => $datum['crew_member_count'],
        'crew_spot_count' => $datum['crew_spot_count']
    ];
    $crews[] = $crew;
}

echo json_encode($crews);

die;
