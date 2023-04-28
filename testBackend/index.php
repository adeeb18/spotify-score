<?php 
    header('Access-Control-Allow-Origin: *');
    $username = $_POST['username'];
    $password = $_POST['password'];
     
    if (!empty($username)){
        $file = fopen("../frontend/src/tempData/user.csv","w");
        $data = array($username, $password);
        fputcsv($file, $data);
        fclose($file);
    }
?>