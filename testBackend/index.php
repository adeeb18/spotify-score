<?php 
    header('Access-Control-Allow-Origin: *');
    $username = "temp";
    $password = "temp";
    if ($_SERVER['REQUEST_METHOD'] === 'POST'){
        $username = $_POST['username'];
        $password = $_POST['password'];
        $file = fopen("./tempData/user.csv","w");
        $data = array($username, $password);
        fputcsv($file, $data);
        fclose($file);
    }
    if ($_SERVER['REQUEST_METHOD'] === 'GET'){
        $file = fopen("./tempData/user.csv","r");
        if (($line = fgetcsv($file)) !== FALSE) {
            if(!empty($line[0]) && !empty($line[1])){
                echo($line[0]);
            echo("\n");
            echo($line[1]);
            }
            else{
                echo("No user");
            }
        }
        else{
            echo("No user");
        }
        fclose($file);
    }
?>