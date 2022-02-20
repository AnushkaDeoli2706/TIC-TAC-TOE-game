const X_CLASS='x';
const CIRCLE_CLASS='circle';
const WINNING_COMBINATIONS=[       // ARRAY OF WINNING COMINATIONS
     //horizontal combinations
      [0,1,2],
      [3,4,5],
      [6,7,8],
      //vertical combinations
      [0,3,6],
      [1,4,7],
      [2,5,8],
      //diagonal combinations
      [0,4,8],
      [2,4,6]
]

const winningMessageTextElement=document.querySelector('[data-winning-message-text]')
const cellElements=document.querySelectorAll('[data-cell]')
const board=document.getElementById('board');
const winningMessageElement=document.getElementById('winningMessage');
const restartButton=document.getElementById('restartButton');

//for restart button:
restartButton.addEventListener('click',StartGame)

let circleTurn;      //if true then circle turn else cross's turn

StartGame();  

function StartGame()
{
  circleTurn=false;
  cellElements.forEach(CELL => {
    CELL.classList.remove(X_CLASS)
    CELL.classList.remove(CIRCLE_CLASS)
    CELL.removeEventListener('click',handleClick)
    CELL.addEventListener('click',handleClick,{once :true})
    })
   setBoardHoverClass();
   winningMessageElement.classList.remove('show');
}

function handleClick(e)            //e is event
{
    const cell=e.target    //cell is the cell which we clicked on
    const currentClass=circleTurn ? CIRCLE_CLASS : X_CLASS;      //if it is circle's turn then current class shall be circle else X 
   
    placeMark(cell,currentClass);     //place mark

    if(checkWin(currentClass))          //Check for win
    {
        endgame(false);     
    }
    else if(isDraw())     //check for draw
    {
        endgame(true);
    }
    else{

    swapTurns();       //switch turn

    setBoardHoverClass();        //to add hover to cell 
    }
}
function isDraw()
{
     return [...cellElements].every(cell =>
        {
            return cell.classList.contains(X_CLASS)||
            cell.classList.contains(CIRCLE_CLASS)
        })
}

function endgame(draw)
{
    if(draw)
    {
        winningMessageTextElement.innerText= `Draw!`
    }
    else{     //if it is not a draw then what to do
        winningMessageTextElement.innerText= `${ circleTurn ? "0's" : "X's" } Wins!`;     //printing text
    }
    winningMessageElement.classList.add('show');
}

function placeMark(cell,currentClass)
{
          cell.classList.add(currentClass);   //used to add class to element    
}

function swapTurns()
{
    circleTurn=!circleTurn;
}

function setBoardHoverClass()
{
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    //thus we removed both the classes
    if(circleTurn)
        board.classList.add(CIRCLE_CLASS);
    else
        board.classList.add(X_CLASS);

}

function checkWin(currentClass)
{
  return WINNING_COMBINATIONS.some(combination =>{
      return combination.every(index => {
          return cellElements[index].classList.contains(currentClass);
      })
  })    //return true if any of combination is met with winning comb list

}