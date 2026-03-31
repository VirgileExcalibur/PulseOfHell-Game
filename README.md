# Pulse Of Hell

Bienvenue sur mon site développé en PHP/JS/CSS, qui est une recréation de Binding of Isaac en web, sans la partie ou on doit attaquer le boss.

## WARNING ! les extensions pdo_sqlite et sqlite3 doivent être activés dans la configuration php pour que le backend php fonctionne

### Comment jouer :
#### Ecran de sélection du personnage : flèches gauche et droite pour changer
#### En jeu : ZQSD pour bouger, Echap pour mettre en pause

Fonctionnalités :
- Système de vie pour le joueur avec coeurs dans l'IU (Possibilité de changer le type de coeurs, voir la variable whichTex dans tunable.js)
- Animations pour le joueur, boss et balles (vitesse pouvant être ajustée dans le code)
- Limite de FPS pour éviter que le jeu soit incontrollable sur des appareils avec une fréquence de raffraîchissement trop haute (peut être ajustée par la variable fps dans game.js, défaut à 60)
- Pause manuelle et/ou automatique si on change de page
- Ecran principal pour la sélection de personnages (On peut en ajouter autant de personnages que l'on veut, voir le tableau characterSprites dans assetsloader.js)
- Ecran Game Over avec le leaderboard contenant les 10 meilleurs scores disponibles dans la BDD (voir script.php pour le code qui lie le js à la base de données)
- Score calculé par rapport au temps de la partie

## Polices d'écriture utilisées :

https://github.com/AssisrMatheus/font-souls/releases
https://www.dafont.com/fr/upheaval.font?text=THE+BINDING+OF+ISAAC+REBIRTH