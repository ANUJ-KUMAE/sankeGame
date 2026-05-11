let inputDir = {x: 0, y: 0};/*default value of snake*/
const Start = new Audio('Snake_Music.mp3'); /*Audio for start,food and gameover*/
const foodSound = new Audio('snake_food.mp3');
const gameover = new Audio('crash-snake.mp3');
const moveSound = new Audio('snake_move.mp3');
let speed = 4;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
food = {x:6 , y:7};
/*functions */
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed)
    {
        return
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake)
{     // we do collide when snake hits the wall and the part if his body
    for(let i =1; i< snakeArr.length;i++)
    {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        {
            return true;
        }
    }
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y<=0)
    {
        return true;
    }
}

/*part1 updating the snake array */
 function gameEngine(){
    //update snake
    if(isCollide(snakeArr)){
        gameover.play();
        Start.pause();
        inputDir = {x:0,y:0};
        alert("Game Over.press any key to play again");
        snakeArr = [{x:13,y:15}];
        Start.play();
        score = 0;
    }
    // if you have eaten the food then increase the score
   if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval)
        {
            hiscoreval = score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            HighScore.innerHTML = "Hiscore: "+hiscoreval;
        }
        scoreBox.innerHTML= "Score" +score
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y});
        let a =2;
        let b =16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}    //generate random no betwwen a and b
    }
    //Moving snake
    for(let i=snakeArr.length-2;i>=0;i--)
    {
        //const element = array[i];
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
         //Display the Food
     //Display The snake
    block.innerHTML = "";
    snakeArr.forEach((e, index) =>{
        snakeElement = document.createElement('div')     /*new Element is created */
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;          /*Adding Css */
        //snakeElement.classList.add('snake');
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake')
        }
        block.appendChild(snakeElement);
    })
    foodElement = document.createElement('div')    
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;          
    foodElement.classList.add('food');
    block.appendChild(foodElement);
 }

/*game Loop*/
/*For Animination we use requestAnimationFrame*/
/*Main Logic starts */
let hiscore = localStorage.getItem("hiscore")
if(hiscore === null)
{
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}
else
{
    hiscoreval= JSON.parse(hiscore);
    HighScore.innerHTML = "Hiscore: "+hiscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
     inputDir = {x:0, y: 1}
     moveSound.play();
     switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
     }
});

