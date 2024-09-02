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

    //If firstPlayer = true, game will prompt to "Player 1" and drop an "X".
    //False will prompt to "Player 2" and drop an "O"
    let firstPlayer = true;
    let gameOver = false;
    let player_1;
    let player_2;
    let activePlayer;
    let boardSpace = [];


    //New Player Constructor. Prompt for these values to be implemented in newBoard function.

    function Player(name, token) {
        this.name = name;
        this.token = token;
      }

    
    //Generates a new, blank, board and initiates the game.
    //Play continues until desired round score is met .
    //winner is declared and play again prompt shows.
    function game(){
        refresh();
        newBoard();
        playerCreate();
        render();

        while(!gameOver){
            turnCheck();
            promptInput();
            winCheck();
        }
    }


    //Ran into issues where boardSpace and gameOver held previous states during testing.
    //Adding refresh to start of new game to ensure a clean start.
    function refresh(){
        console.clear();
        firstPlayer = true;
        gameOver = false;
        boardSpace = [];
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

    //Player prompts for name and token
    function playerCreate(){
        console.log("Welcome to Tic-Tac-Toe Game! \n Please enter player names and select a token");
        player_1 = new Player();
        player_2 = new Player();
        player_1.name = prompt("Player_1, please choose a name.");
        player_1.token = prompt("Player_1, please choose a single-character token");
        tokenCheck(player_1);
        player_2.name = prompt("Player_2, please choose a name.");
        player_2.token = prompt("Player_2, please choose a token");
        tokenCheck(player_2);
        console.clear();
        return 1;
    }
    

    //Verify only a single character is used for a player's token.
    function tokenCheck(player){
            while(player.token.length != 1){
                console.log(`${player.name}, the token must be a single character`);
                player.token = prompt(`${player.name}, try choosing your token again.`)
            }
        return 1;
    }

    //Reads firstPlayer status and sets activePlayer
    function turnCheck(){
        if(firstPlayer) activePlayer = player_1;
        else activePlayer = player_2;

        return 1;
    }

    //Looked into various methods on implementing a win check and settled on using a "magic square".
    function winCheck(){
        const magicSquare =[
            [2,7,6],
            [9,5,1],
            [4,3,8]
        ];
        let totalTokens = 0;
        let player1Score = 0;
        let player2Score = 0;

        for (let i = 0; i < boardSpace.length; i++){
            for (let j = 0; j < boardSpace[i].length; j++){
                if (boardSpace[i][j] === `[${player_1.token}]`){
                    player1Score += magicSquare[i][j];
                    ++totalTokens;
                }
                else if (boardSpace[i][j] === `[${player_2.token}]`){
                    player2Score += magicSquare[i][j];
                    ++totalTokens;
                } 
            }
        }
        if (player1Score === 15){
            console.log(`${player_1.name}, you've won the game. \n Congratulations!`)
            gameOver = true;
        }
        else if (player2Score === 15){
            console.log(`${player_2.name}, you've won the game. \n Congratulations!`)
            gameOver = true;
        }
        else if(totalTokens === 9){
            console.log("The game has ended in a draw!");
            gameOver = true;
        }
        return 1;
    }

    //get player input and validate
    function promptInput(){
        let input;

        console.log(`${activePlayer.name}, please enter a location for your token.:`);
        input = Number(prompt(`${activePlayer.name}, where do you want to set a token? (1-9)`));
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