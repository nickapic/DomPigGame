/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


//for the scores of the players and the score of the respective round and also active player for the game so 0 is gonna be player one and player 2 is gonna be 1
var scores,roundScore,activePlayer,gamePlaying,prevscore;

init();


//console.log(dice);

//document.querySelector('#current-'+ activePlayer).textContent = dice;
//document.querySelector('#current-'+ activePlayer).innerHTML = '<em>'+ dice +' </em>';

//var x = document.querySelector('#score-0').textContent;



document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){

    
    //1.Random Number
    var dice1 = Math.floor(Math.random()*6) + 1;
    var dice2 = Math.floor(Math.random()*6) + 1;

    //2.Display the result
   // var diceDom= document.querySelector('.dice');
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
   //diceDom.style.display='block';
   document.getElementById('dice-1').src = 'dice-'+ dice1 + '.png';
   document.getElementById('dice-2').src = 'dice-'+ dice2 + '.png';
    //3.Update the round score If the rooled number is not a 1
    if(dice1 !== 1 && dice2 !== 1){
        //Add Score
        
                                                                                        //better thansomething like roundScore =roundScore+ dice;
                                                                                    /*   if(prevscore == 6 && dice == 6 ){
                                                                                        activePlayer  === 0 ? activePlayer = 1 : activePlayer = 0;
                                                                                        //As if we dont do the roundscore as zero it will just add it to the previous one
                                                                                        roundScore = 0;
                                                                                        document.getElementById('current-0').textContent = '0';
                                                                                        document.getElementById('current-1').textContent = '0';

                                                                                        
                                                                                        document.querySelector('.player-0-panel').classList.toggle('active');
                                                                                        document.querySelector('.player-1-panel').classList.toggle('active');
                                                                                        }
*/        roundScore += dice1 + dice2;
        document.querySelector('#current-'+ activePlayer).textContent = roundScore;
       // console.log(prevscore); used it for debugging
    }
    else{
        //Next Player
        nextPlayer();
    }
}});

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying){
        //Add current score to the Global Score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-'+ activePlayer).textContent = scores[activePlayer];
        var input=document.querySelector('.final-score').value;
        //if Undefinded,0,null or ' are coerced to false
        if(input){
            var winningScore = input;
        }
        else{
            winningScore=100;
        }

       // console.log(input)
        //Check if player won a game 
        if(scores[activePlayer] >= winningScore){
            document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
            gamePlaying = false;

        }
        else{
            nextPlayer();
        }
    } 
        //Next Player    
});

function nextPlayer(){
        //Next Player
        //called a ternary operator much ebtter than a if else statement much cleaner and simpler
        activePlayer  === 0 ? activePlayer = 1 : activePlayer = 0;
        //As if we dont do the roundscore as zero it will just add it to the previous one
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';   
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.dice').style.display="none";

}
function init(){

    scores= [0,0];
    activePlayer = 0;
    roundScore =0;
    gamePlaying= true;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    prevscore = 0;

}

document.querySelector('.btn-new').addEventListener('click',init);