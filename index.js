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
    const gameBoard = document.querySelector(".gameBoard");
    const startScreen = document.querySelector(".startScreen");
    const gameOverScreen = document.querySelector(".gameOverScreen");
    const gameOverTxt = document.querySelector(".gameOverTxt");
    // const startBtn = document.querySelector(".startBtn");
    // const gameOverBtn = document.querySelector(".gameOverBtn");

    //events
    // startBtn.addEventListener("click", game());
    // gameOverBtn.addEventListener("click", game());

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
        playerCreate();
        turnCheck();
        render();
    }


    //Ran into issues where boardSpace and gameOver held previous states during testing.
    //Adding refresh to start of new game to ensure a clean start.
    function refresh(){
        startScreen.style.display = "grid";
        gameOverScreen.style.display = "none";
        gameBoard.style.display = "none";
        // console.clear();
        firstPlayer = true;
        gameOver = false;
        gameBoard.innerHTML = '';
        boardSpace = [];
        newBoard();
    }


    //generates a new board
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
        // console.clear();
        return 1;
    }

    //Verify only a single character is used for a player's token.
    function tokenCheck(player){
            while(player.token.length != 1 || !isNaN(player.token)){
                console.log(`${player.name}, the token must be a single character`);
                player.token = prompt(`${player.name}, try choosing your token again.`)
            }
        return 1;
    }

    //Reads firstPlayer status and sets activePlayer
    function turnCheck(){
        if(firstPlayer){
            activePlayer = player_1;
        }
        else {
            activePlayer = player_2;
        }
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
        let player1Values = [];
        let player2Values = [];

        for (let i = 0; i < boardSpace.length; i++){
            for (let j = 0; j < boardSpace[i].length; j++){
                if (boardSpace[i][j] === `[${player_1.token}]`){
                    player1Values.push(Number(magicSquare[i][j]));
                    ++totalTokens;
                }
                else if (boardSpace[i][j] === `[${player_2.token}]`){
                    player2Values.push(Number(magicSquare[i][j]));
                    ++totalTokens;
                } 
            }
        }
        if (threeSum(player1Values)){
            console.log(`${player_1.name}, you've won the game. \n Congratulations!`);
            gameBoard.style.display = "none";
            gameOverScreen.style.display = "grid";
            gameOverTxt.innerText = `${player_1.name}, you've won the game. \n Congratulations!`;
            gameOver = true;
        }
        else if (threeSum(player2Values)){
            console.log(`${player_2.name}, you've won the game. \n Congratulations!`);            gameBoard.style.display = "none";
            gameOverScreen.style.display = "grid";
            gameOverTxt.innerText = `${player_2.name}, you've won the game. \n Congratulations!`;
            gameOver = true;
        }
        else if(totalTokens === 9){
            console.log("The game has ended in a draw!");
            gameBoard.style.display = "none";
            gameOverScreen.style.display = "grid";
            gameOverTxt.innerText = "The game has ended in a draw!";
            gameOver = true;
        }
        return 1;
    }

//Credit to Urfan G. at https://dev.to/urfan/leetcode-3sum-with-javascript-4b8j 
//modified to meet magic number criteria and return true false rather than array
var threeSum = function(array) {
    array.sort((a,b) => a - b);
   const triplets = [];

   for(let i=0; i < array.length - 2; i++){
       if(array[i] != array[i-1]){ // making sure our solution set does not contain duplicate triplets
           let left = i + 1;
         let right = array.length - 1;

           while (left < right){
               const currentSum = array[i] + array[left] + array[right];
               if (currentSum === 15){
                   triplets.push([array[i], array[left], array[right]]);
                   while(array[left] == array[left + 1]) left ++
                   while(array[right] == array[right - 1]) right -- // making sure our solution set does not contain duplicate triplets
                   left ++;
                   right --;
               } else if(currentSum < 15) {
                   left ++
               } else if(currentSum > 15){
                   right --
               }
           }
       }
   }
   return (triplets.length != 0) ? 1 : 0;
};

    //Attempts to match input to a location within boardSpace. If successful
    //the number at the location will be replaced with player token and will return 1.

    function validateInput(input){
            for (let i = 0; i < boardSpace.length; i++){
                for (let j = 0; j < boardSpace[i].length; j++){
                    if (boardSpace[i][j] === `[${input}]` && boardSpace[i][j] != player_1.token && boardSpace[i][j] != player_2.token){
                        boardSpace[i][j] = `[${activePlayer.token}]`;
                        // console.clear();
                        consoleRender();
                        console.log(`You set a token at "${input}".`);
                        firstPlayer = !firstPlayer;
                        return 1;
                    }
                }
            }
            console.log(input);
            consoleRender();
            console.log("Invalid input.\nPlease enter a value between 1-9\nthat is still available on the board.");
            return 0;
    }


    // Prints out boardSpace to console
    // function render(){
    //     for(let i = 0; i < boardSpace.length; i++){
    //         console.log(boardSpace[i]);
    //     }
    // }

    function render(){
        let tempNum = 0
        for(let i = 0; i < boardSpace.length; i++){
            for(let j = 0; j < boardSpace[i].length; j++){
                ++tempNum;
                const boardSquare = document.createElement("div");
                boardSquare.setAttribute("id", `${tempNum}`);
                boardSquare.setAttribute("class", "boardSquare");
                boardSquare.addEventListener("click", ()=>{
                    const input = Number(boardSquare.id);
                    if(validateInput(input)){
                        boardSquare.innerText = `${activePlayer.token}`;
                        winCheck();
                        turnCheck();
                    }
                });
                gameBoard.appendChild(boardSquare);                
            }
        }
        startScreen.style.display = "none";
        gameOverScreen.style.display = "none";
        gameBoard.style.display = "grid";

    }

    function consoleRender(){
        console.clear();
        for(let i = 0; i < boardSpace.length; i++){
            console.log(boardSpace[i]);
        }
    }


    // methods available to user
    return{
        start:game
    };

})();


