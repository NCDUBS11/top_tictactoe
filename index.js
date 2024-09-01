/*TIC TAC TOE GAME
--Components--
-Player
    -Turn Based?
-Board
-Rounds
-Score
-Win

--Methods--
-Cache DOM Elements
-Bind DOM Elements to Events
-StartGame/GenerateBoard
-Turn/Select mark location
-Score/Check current round status ie 3 in a row?
-Round/ 3 in a row? update score and new round
-EndGame/score checker to end game
*/

//create board is complete.  Need: method to replace areas of board.
//along with a method to 'refresh' the board after a choice was made.

//Game Module 
let tttGame = (function(){

    //Cache DOM Elements
    $body = document.querySelector("body");

    //If player = true, game will prompt to "Player 1" and drop an "X".
    //False will prompt to "Player 2" and drop an "O"
    let firstPlayer = true;
    let boardSpace = [];
    let player_1 = new Player("Player_1", "X");
    let player_2 = new Player("Player_2", "O");
    let activePlayer;
    let gameOver = false;
    //New Player Constructor. Will eventually be able to prompt for name and token.

    function Player(name, token) {
        this.name = name;
        this.token = token;
      }

    
    //Generates a new, blank, board and initiates the game.
    //Play continues until desired round score is met .
    //winner is declared and play again prompt shows.
    function game(){
        newBoard();

        render();

        while(!gameOver){
            turnCheck();
            promptInput();
            // winCheck();

        }
    }

    //REQUIRES creation of Player and corresponding token style
    //Checks validity of player input and then iterates through boardspace.
    //If match is found, relevant board space will be replaced by
    //the current Player token. Returns 1 or 0 for selection function.

    function newBoard(){
        let count = 0;
        for (let i = 0; i < 3; i++){
            let row = [];
            for (let j = 0; j < 3; j++){
                row.push(`[${count+1}]`);
                ++count;
            }
            boardSpace.push(row);
        }
        return 1;
    }
    

    //Reads firstPlayer status and sets activePlayer
    function turnCheck(){
        if(firstPlayer) activePlayer = player_1;
        else activePlayer = player_2;

        return 1;
    }

    //get player input and validate
    function promptInput(){
        let input;

        console.log(`${activePlayer.name}, please enter a location for your token.:`);
        input = Number(prompt(`${activePlayer.name},Where do you want to set a token? (1-9)`));
        validateInput(input);
    }
    

    //Attempts to match input to a location within boardSpace. If successful
    //the number at the location will be replaced with player token and will return 1.

    function validateInput(input){
            for (let i = 0; i < boardSpace.length; i++){
                for (let j = 0; j < boardSpace[i].length; j++){
                    if (boardSpace[i][j] === `[${input}]` && boardSpace[i][j] != player_1.token && boardSpace[i][j] != player_2.token){
                        boardSpace[i][j] = `[${activePlayer.token}]`;
                        console.clear();
                        render();
                        console.log(`You set a token at "${input}".`);
                        firstPlayer = !firstPlayer;
                        return 1;
                    }
                }
            }
            console.log("Invalid input.\n Please enter a value between 1-9\n that is still available on the board.");
            return 0;
    }


    //Prints out boardSpace to console
    function render(){
        for(let i = 0; i < boardSpace.length; i++){
            console.log(boardSpace[i]);
        }
    }


    //methods available to user
    return{
        start:game
    };

})();