var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var maxPlayerHealth = 100;
var playerAttack = 10;
var playerMoney = 30;

// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Omega Supreme","Superion","Defensor","Computron","Omega Prime"];
var enemyHealth = 50;
var maxEnemyHealth = 50;
var enemyAttack = 12;

var robotsAnnihilated = 0;
var attackBoost = 5; //Attack boost granted when upgrade is purchased
var victoryPrize = 5; //Money earned for each victory
var refillCost = 15;
var upgradeCost = 10;

var playAgain = true;
var storeMssg = function(currentMoney) {
    return `Would you like to REFILL (${refillCost} money) your health, UPGRADE (${upgradeCost} money) your attack, or LEAVE the store?\n(Current funds: ${currentMoney} money)\nPlease enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.`;
};

// Alert players that they are starting the round
//window.alert("Welcome to Robot Gladiators!");

var shop = function(shopCommand) {
    if(shopCommand.toLowerCase() === 'refill') {
        if(playerMoney >= refillCost) {
            playerHealth = maxPlayerHealth;
            playerMoney -= refillCost;
            window.alert("Refill purchased!");
            console.log("Refill purchased!");
        } else {
            window.alert("Not enough money to refill!");
            console.log("Not enough money to refill!");
        }
    } else if(shopCommand.toLowerCase() === 'upgrade') {
        if(playerMoney >= upgradeCost) {
            playerAttack += attackBoost;
            playerMoney -= upgradeCost;
            window.alert("Upgrade purchased!");
            console.log("Upgrade purchased!");
        } else {
            window.alert("Not enough money to upgrade!");
            console.log("Not enough money to upgrade!");
        }
    }
};

var fight = function(enemyName) {
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
            window.alert(enemyName + " has been reduced to scrap!");
            console.log(enemyName + " has been reduced to scrap!");
        } 
        else {
            //window.alert(enemyName + " still has " + enemyHealth + " health left.");
            console.log(enemyName + " still has " + enemyHealth + " health left.");
            //Reduce player's hitpoints
            playerHealth -= enemyAttack;

            //Log enemy attack on player
            console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

            // check player's health
            if (playerHealth <= 0) {
                window.alert(playerName + " has fallen in battle!  Gameover!");
                console.log(playerName + " has fallen in battle!  Gameover!");
            } else {
                //window.alert(playerName + " still has " + playerHealth + " health left.");
                console.log(playerName + " still has " + playerHealth + " health left.");
            }
        }
    } else {
        //window.alert(playerName + " has chosen to skip the fight!");
        console.log(playerName + " has chosen to skip the fight!");

        var reallySkip = window.confirm("Do you really want to skip the fight?");
        if(reallySkip) {
            playerMoney -= 10;
            window.alert(playerName + " has skipped the fight and is a total loser.  " + playerName + " has " + playerMoney + " money remaining.");
            console.log(playerName + " has skipped the fight and is a total loser.  " + playerName + " has " + playerMoney + " money remaining.");
        } else {
            fight(enemyName);
        }
    }
};

var startGame = function() {
    while(playAgain && playerHealth > 0) {
        var enemyIndex = 0;
        var didSkip = false;
        var startingMoney = playerMoney;
        while(enemyIndex < enemyNames.length && playerHealth > 0) {
            if(enemyHealth === maxEnemyHealth) {
                window.alert("Welcome to Robot Galdiators!\nRound: " + (enemyIndex + 1));
            }
            fight(enemyNames[enemyIndex]);
            window.alert(`P-Health: ${playerHealth}, P-Attack: ${playerAttack}, E-Health: ${enemyHealth}`);
            console.log(`P-Health: ${playerHealth}, P-Attack: ${playerAttack}, E-Health: ${enemyHealth}`);
            if(playerMoney < startingMoney) {
                didSkip = true;
            }
            if(didSkip || enemyHealth <= 0) {
                enemyIndex++; //Increment index to next enemy
                if(enemyHealth <= 0) {
                    robotsAnnihilated++;
                    playerMoney += victoryPrize;
                    startingMoney = playerMoney;
                    window.alert(playerName + "'s brutal victory earns you " + victoryPrize + " money!\n" + playerName + " has annihilated a total of " + robotsAnnihilated + " robot(s)!");
                    console.log(playerName + "'s brutal victory earns you " + victoryPrize + " money!\n" + playerName + " has annihilated a total of " + robotsAnnihilated + " robot(s)!");
                }
                enemyHealth = 50; //Reset enemy hitpoints
                if(didSkip) {
                    startingMoney -= 10; //Penalize for skipping round
                }
                didSkip = false;
                //Give player chance to visit store
                var storeAction = window.prompt(storeMssg(playerMoney));
                while(storeAction.toLowerCase() !== 'leave' && storeAction.toLowerCase() !== 'upgrade' && storeAction.toLowerCase() !== 'refill') {
                    storeAction = window.prompt("Incorrect input. " + storeMssg(playerMoney));
                }
                if(storeAction.toLowerCase() !== 'leave') {
                    shop(storeAction);
                    startingMoney = playerMoney;
                }
            }
        }
        if(playerHealth > 0) {
            playAgain = window.confirm("All of the robots have been defeated!  Would you like to play again?");
        }
    }
};

startGame();
/*
var enemyIndex = 0;
var didSkip = false;
var startingMoney = playerMoney;
while(enemyIndex < enemyNames.length && playerHealth > 0 && playerMoney > 0) {
    if(enemyHealth === maxEnemyHealth) {
        window.alert("Welcome to Robot Galdiators!\nRound: " + (enemyIndex + 1));
    }
    fight(enemyNames[enemyIndex]);
    if(playerMoney < startingMoney) {
        didSkip = true;
    }
    //debugger;
    if(enemyHealth <= 0 || didSkip) {
        enemyIndex++;
        enemyHealth = 50;
        if(didSkip) {
            startingMoney -= 10;
        }
        didSkip = false;
    }
}
*/