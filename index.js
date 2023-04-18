//DIRECTION OF GAME INITIALY NO MOVE
let inputDir = {
  x: 0,
  y: 0
};

//SOUNDS(AGME CONSTANTS)
let gameover = new Audio('sounds/end.mp3');
let movingsound = new Audio('sounds/moving.mp3');
let musicsound = new Audio('sounds/musics.mp3');
let eaingsound = new Audio('sounds/eating.mp3');
let speed = 4;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{
  x: 13,
  y: 15
}]
food = {
  x: 6,
  y: 7
};

//GAME FUNCTIONS
function main(ctime) { //ctime is current time
  window.requestAnimationFrame(main); //CREATES A LOOP FROM MAIN LOGIC PART
  //CONTROL FPS
  //console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}
//COLLIDE FUNCTION WHEN IT HITS IT OWN BODY AND HIT ON WALLS
function isCollide(snake){
  for(let i=1 ; i<snake.length ; i++){
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
      return true;
      gameover.play();
    }
  }

  //WHEN COLLIDE ON WALLS
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y<=0){
      return true;
      gameover.play();
    }
}

function gameEngine() {
  // PART 1 : UPDATING THE SNAKE ARRAY
if(isCollide(snakeArr)){
  gameover.play();
  inputDir={x: 0,y: 0};
  alert("GAME OVER! . PRESS EN KEY TO PLAY AGAIN ...");
  snakeArr = [{x: 13,y: 15}];
  score = 0;
}

//IF WE HAVE EATEN THE FOOD THEN INCREMENT THE SIZE AND REGENERATE THE FOOD
if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
  eaingsound.play();
  score += 1;
  if(score>highScoreVal){
    highScoreVal = score;
    localStorage.setItem("highScore", JSON.stringify(highScoreVal));
    highScoreBox.innerHTML = "HIGH SCORE :" + highScoreVal;
  }
  scoreBox.innerHTML = "score :" + score ;
  snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y});
  let a = 2;
  let b = 16;
  food = {x: Math.round (a + (b-a)* Math.random()) ,   y: Math.round (a + (b-a)* Math.random() )}
}

//MOVING THE SNAKE
for(let i = snakeArr.length - 2 ; i>=0 ;i--){
  snakeArr[i+1] = {...snakeArr[i]};
}
snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;








  //PART 2 : DISPLAY THE SNAKE
  board.innerHTML = "";
  snakeArr.forEach((e, index) => { //e IS ELEMENT
    snakeElement = document.createElement('div'); //CERATE NEW ELEMENT
    snakeElement.style.gridRowStart = e.y; // ADD CSS THROUGH JS...... y REPRESENTS ROW
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add('head');
    } else {
      snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);
  });
  //DISPLAY THE FOOD
  foodElement = document.createElement('div'); //CERATE NEW ELEMENT
  foodElement.style.gridRowStart = food.y; // ADD CSS THROUGH JS...... y REPRESENTS ROW
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  board.appendChild(foodElement);
}









//MAKING GAME LOOP WHICH CONTINUOUSLY PAINT AND REFRESH THE GAME(MAIN LOGIC)..........
let highScore = localStorage.getItem("highScore");
if(highScore === null){
  highScoreVal = 0;
  localStorage.setItem("highScore", JSON.stringify(highScoreVal));
}
else{
  highScoreVal = JSON.parse(highScore);
  highScoreBox.innerHTML = "HIGH SCORE :" + highScore;
}




window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
  inputDir = {//INPUT DIRECTION
    x: 0,
    y: 1
  }; //START THE gameEngine
//  movingsound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x= 0;
      inputDir.y= -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x= 0;
      inputDir.y= 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x= -1;
      inputDir.y= 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x= 1;
      inputDir.y= 0;
      break;

    default:

  }
})
