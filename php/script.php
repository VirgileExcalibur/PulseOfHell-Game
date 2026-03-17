<?php 
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
?>
<?php
    $db = new SQLite3(__DIR__ . "/../database/game_PulseOfHell.db");
    
    $gameID = $_GET['gameID'];
    $score = $_GET['score'];

    $db->exec("INSERT INTO scores (gameID, score) VALUES ($gameID, $score)");

    $result = $db->query('SELECT * FROM scores');
?>
