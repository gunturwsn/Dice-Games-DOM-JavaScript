var scores, roundScore, activePlayer, dice, gamePLaying;
init();

document.querySelector('.btn-roll').addEventListener('click', function(){

    if(gamePLaying){
        //1. random number 1 - 6
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOm = document.querySelector('.dice');
        diceDOm.style.display = 'block';
        diceDOm.src = 'img/dice-'+dice+'.png';

        //3.update teh round score
        if(dice !== 7){
            //add score
            roundScore +=dice;
            document.querySelector('#current-'+activePlayer).textContent = roundScore;   
        }else{
            //next player
            nextPlayer();
        }

    }
});

document.querySelector('.btn-change').addEventListener('click', function(){
    if(gamePLaying){
        //add current score to global score
        scores[activePlayer] += roundScore;

        //update the ui
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

        //input score final to win
        var input = document.querySelector('.final-score').value;
        var finalScore;

        if(input){
            finalScore = input;
        }else{
            finalScore = 50;
        }
        
        //check if player won the game
        if(scores[activePlayer] >= finalScore){
            document.querySelector('#name-'+activePlayer).textContent = 'Winner !';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+activePlayer).classList.add('winner')
            document.querySelector('.player-'+activePlayer).classList.remove('active');
            gamePLaying = false;
        }else{
            //next player
            nextPlayer();
        }

    }
});

function nextPlayer(){
    //next player
    activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0').classList.toggle('active');
    document.querySelector('.player-1').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-restart').addEventListener('click',init);

function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePLaying = true;
    
    document.querySelector('.dice').style.display = 'none';
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0').classList.remove('winner');
    document.querySelector('.player-1').classList.remove('winner');
    document.querySelector('.player-0').classList.remove('active');
    document.querySelector('.player-1').classList.remove('active');
    document.querySelector('.player-0').classList.add('active');
    

}