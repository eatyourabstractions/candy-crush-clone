import { useState, useEffect } from "react";
import ScoreBoard  from "./components/ScoreBoard";


const WIDTH = 8;
const BLANK_SQUARE = ''
const candyColors = ['blue','green','orange','purple','red','yellow'];



const App = () =>  {

  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++){
      const colOfThree = [i, i + WIDTH, i + (WIDTH * 2)];
      const decidedColor = currentColorArrangement[i];
      const isBlank = decidedColor === BLANK_SQUARE;

      if(colOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)){
        setScoreDisplay((score) => score + 3);
        colOfThree.forEach(square => currentColorArrangement[square] = BLANK_SQUARE);
        return true
      }
    }
  }

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++){
      const rowOfThree = [i, i + 1, i +  2];
      const decidedColor = currentColorArrangement[i];
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64];
      const isBlank = decidedColor === BLANK_SQUARE;

      if(notValid.includes(i)){
        continue;
      }

      if(rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)){
        setScoreDisplay((score) => score + 3);
        rowOfThree.forEach(square => currentColorArrangement[square] = BLANK_SQUARE);
        return true
      }
    }
  }

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++){
      const colOfFour = [i, i + WIDTH, i + (WIDTH * 2), i + (WIDTH * 3)];
      const decidedColor = currentColorArrangement[i];
      const isBlank = decidedColor === BLANK_SQUARE;

      if(colOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)){
        setScoreDisplay((score) => score + 4);
        colOfFour.forEach(square => currentColorArrangement[square] = BLANK_SQUARE);
        return true
      }
    }
  }

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++){
      const rowOfFour = [i, i + 1, i +  2, i + 4];
      const decidedColor = currentColorArrangement[i];
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
      const isBlank = decidedColor === BLANK_SQUARE;
      if(notValid.includes(i)){
        continue;
      }

      if(rowOfFour.every(square => currentColorArrangement[square] === decidedColor  && !isBlank)){
        setScoreDisplay((score) => score + 4 );
        rowOfFour.forEach(square => currentColorArrangement[square] = BLANK_SQUARE);
        return true
      }
    }
  }

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55 ; i++){

      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i); 
      if(isFirstRow && currentColorArrangement[i] === BLANK_SQUARE){  
        const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
        currentColorArrangement[i] = randomColor;
      }
      const squareBelow = i + WIDTH;
      const decidedColor = currentColorArrangement[i];

      if(currentColorArrangement[squareBelow] === BLANK_SQUARE){
        currentColorArrangement[squareBelow] = decidedColor;
        currentColorArrangement[i] = BLANK_SQUARE;
      }
    }
  }

  console.log('score', scoreDisplay);

  const dragStart = (e) => {
    
    setSquareBeingDragged(e.target);
  } 

  const dragEnd = (e) => {
   const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))
   const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))

  //  currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.style.backgroundColor;
  //  currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.style.backgroundColor;

   const validMoves = [
      squareBeingDraggedId + WIDTH,
      squareBeingDraggedId - WIDTH,
      squareBeingDraggedId + 1,
      squareBeingDraggedId - 1
   ]

    const validMove = validMoves.includes(squareBeingReplacedId)

    // const isAColOfFour = checkForColumnOfFour()
    // const isARowOfFour = checkForRowOfFour()
    // const isAColOfThree = checkForColumnOfThree()
    // const isARowOfThree =  checkForRowOfThree()

    // if(squareBeingReplacedId && validMove 
    //   && ( isAColOfThree || isARowOfThree || isAColOfFour || isARowOfFour)){
    //   setSquareBeingDragged(null);
    //   setSquareBeingReplaced(null);
    // } else {
    //   currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.style.backgroundColor;
    //   currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.style.backgroundColor;
    //   setCurrentColorArrangement([...currentColorArrangement])
    // }

    if(squareBeingReplacedId && validMove ){
      currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.style.backgroundColor;
      currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.style.backgroundColor;

      const isAColOfFour = checkForColumnOfFour()
      const isARowOfFour = checkForRowOfFour()
      const isAColOfThree = checkForColumnOfThree()
      const isARowOfThree =  checkForRowOfThree()

      if( isAColOfThree || isARowOfThree || isAColOfFour || isARowOfFour){
        setSquareBeingDragged(null);
        setSquareBeingReplaced(null);
      } else{
        currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.style.backgroundColor;
        currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.style.backgroundColor;
        setCurrentColorArrangement([...currentColorArrangement])
      }
    }
  

  }

  const dragDrop = (e) => {
    
    setSquareBeingReplaced(e.target);
  }

  const createBoard = () =>{
    const randomColorArrangement = [];
    for (let i = 0; i < WIDTH * WIDTH; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]; 
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);

   
  }

      useEffect(() => {
          createBoard();
        }, []);

      useEffect(() => {
       const timer =  setInterval(() => {
         checkForColumnOfFour();
         checkForRowOfFour();
         checkForColumnOfThree();
         checkForRowOfThree();
         moveIntoSquareBelow();
         setCurrentColorArrangement([...currentColorArrangement]);
        }, 100);

        return () => clearInterval(timer);

      }, [checkForColumnOfFour,checkForRowOfFour, checkForColumnOfThree,moveIntoSquareBelow,checkForRowOfThree, currentColorArrangement]);
     


  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((color, index) => (
          <img key={index} style={{backgroundColor: color}} 
             alt={color}
             data-id={index}
             draggable="true"
             onDragOver={(e) => e.preventDefault()}
             onDragEnter={(e) => e.preventDefault()}
             onDragLeave={(e) => e.preventDefault()}
             onDragEnd={dragEnd }
             onDragStart={dragStart}
             onDrop={dragDrop}
             />
        ))}
      </div>
      <ScoreBoard score={scoreDisplay}/>
    </div>
  );
}

export default App;
