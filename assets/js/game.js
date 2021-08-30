var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Omega Supreme","Superion","Defensor","Computron","Omega Prime"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {
    // Alert players that they are starting the round
    window.alert("Welcome to Robot Gladiators!");

    //Let player choose his/her action
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    while(promptFight.toLowerCase() !== "fight" && promptFight.toLowerCase() !== "skip") {
        promptFight = window.prompt("Incorrect input.  Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    }

    if(promptFight.toLowerCase() === "fight") {
        //Reduce enemy's hitpoints
        enemyHealth -= playerAttack;

        //Log record of player's attack on enemy
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );
        
        //Log enemy's status
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
        } 
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
            //Reduce player's hitpoints
            playerHealth -= enemyAttack;

            //Log enemy attack on player
            console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

            // check player's health
            if (playerHealth <= 0) {
                window.alert(playerName + " has died!");
            } else {
                window.alert(playerName + " still has " + playerHealth + " health left.");
            }
        }
    } else {
        window.alert(playerName + " has chosen to skip the fight!");

        var reallySkip = window.confirm("Do you really want to skip the fight?");
        if(reallySkip) {
            playerMoney -= 2;
            window.alert(playerName + " has skipped the fight and is a total loser.  " + playerName + " has " + playerMoney + " money remaining.");
        } else {
            fight();
        }
    }
};

for(var i = 0; i < enemyNames.length; i++) {
    fight(enemyNames[i]);
}