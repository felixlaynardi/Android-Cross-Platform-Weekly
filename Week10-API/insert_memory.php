<?php

if(isset($_SERVER['HTTP_ORIGIN'])){
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS, GET');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
}

$response = array();

if (isset($_POST['imagePath']) && isset($_POST['title']) && isset($_POST['type']) && isset($_POST['base64Url']) && isset($_POST['lat']) && isset($_POST['lng'])){
    $imagePath = $_POST['imagePath'];
    $title = $_POST['title'];
    $type = $_POST['type'];
    $base64Url = $_POST['base64Url'];
    $lat = $_POST['lat'];
    $lng = $_POST['lng'];

    require_once __DIR__ . '/dbconfig.php';

    $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or die(mysqli_connect_error());

    $result = mysqli_query($db, "INSERT INTO memories(imagePath, title, type, base64Url, lat, lng) VALUES('$imagePath', '$title', '$type', '$base64Url', '$lat', '$lng')");

    if ($result) {
        $response['success'] = 1;
        $response['message'] = 'Data has been successfuly inserted to db';
    } else {
        $response['success'] = 0;
        $response['message'] = 'There is a problem in db query';
    }
} else {
    $response['success'] = 0;
    $response['message'] = 'Form data is not complete';
}

echo json_encode($response)

?>

