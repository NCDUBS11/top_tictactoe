/*TIC TAC TOE GAME
--Components--
-Players
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
    

    //If player = true, game will prompt to "Player 1" and drop an "X".
    //False will prompt to "Player 2" and drop an "O"
    let player = true;
    let boardSpace = [];
    let currentPlayer;

    //Generates a new, blank, board and initiates the game.
    //Play continues until desired round score is met .
    //winner is declared and play again prompt shows.
    function game(){
        newBoard();
        render();
    }

    //REQUIRES creation of players and corresponding token style
    //Checks validity of player input and then iterates through boardspace.
    //If match is found, relevant board space will be replaced by
    //the current players token. Returns 1 or 0 for selection function.

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

    // function convertInput(input){

    //     if (typeof input === "number" && 0 < input < 10){
    //         for (let i = 0; i < boardSpace.length; i++){
    //             for (let j = 0; j < boardSpace[i].length; j++){
    //                 if (boardSpace[i][j] === `[${input}]`)
    //                     boardSpace[i][j] = `${player.token}`;
    //                     return 1;}
    //         }}
    //     else {
    //         console.log("Invalid input.\n Please enter a value between 1-9\n that is still available on the board.");
    //         return 0;
    //     }
    // };

    
    // function promptInput(){
    //     console.log(`${currentPlayer}. Please enter a location for your token.:`);
    //     let input = window.addEventListener("keydown", (event) => {
    //           input = event;
    //     });
    //     console.log(`you chose ${input}`);
    //     return;
    // };

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