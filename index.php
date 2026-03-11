<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pulse Of Hell Game</title>
    <link rel="icon" type="image/x-icon" href="/assets/favicon.ico">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <h1 class="error_message"></h1>
    <canvas id="game"></canvas>
    <script type="module" src="js/game.js"></script>
    <?php
        $pdo = new PDO("sqlite:database/game.db");
    ?>
</body>
</html>