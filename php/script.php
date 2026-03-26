<?php 
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
?>
<?php
    header('Content-Type: application/json');

    $db = new SQLite3(__DIR__ . "/../database/game_PulseOfHell.db");

    if (isset($_GET['gameID'], $_GET['score'])) {
        $gameID = (int)$_GET['gameID'];
        $score = (int)$_GET['score'];

        if (!$db->exec("INSERT INTO scores (gameID, score) VALUES ($gameID, $score)")) {
            http_response_code(400);
            exit(json_encode(['error' => 'Database error: ' . $db->lastErrorMsg()]));
        }
    }

    $result = $db->query('SELECT gameID, score FROM scores ORDER BY score DESC LIMIT 10');
    if (!$result) {
        http_response_code(400);
        exit(json_encode(['error' => 'Database error: ' . $db->lastErrorMsg()]));
    }

    $scores = [];
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $scores[] = $row;
    }

    echo json_encode($scores);
?>
