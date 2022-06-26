//declare global variables to track game board size 
const LINE_PIXEL_COUNT = 40
const TOTAL_PIXEL_COUNT = LINE_PIXEL_COUNT**2

//track score to display
let totalFoodEaten = 0
let totalDistanceTraveled = 0

//refrence game board
const gameContainer = document.getElementById('gameContainer')

//generate the game board
const createGameBoardPixels = () => {
    for(let i = 1; i <= TOTAL_PIXEL_COUNT;i++){
        gameContainer.innerHTML = `${gameContainer.innerHTML} <div class="gameBoardPixel" id="pixel${i}"></div>`;
    }
}

//shorten refrence to game pixels 
const gameBoardPixels = document.getElementsByClassName('gameBoardPixel')
let currentFoodPositon = 0
//crete the food items
const createFood = () => {
    gameBoardPixels[currentFoodPositon].classList.remove('food')
currentFoodPositon = Math.floor(Math.random()*TOTAL_PIXEL_COUNT)
gameBoardPixels[currentFoodPositon].classList.add('food')
}


//snake behavior

const LEFT_DIR = 37
const UP_DIR = 38
const RIGHT_DIR = 39
const DOWN_DIR = 40

let snakeCurrentDirection = RIGHT_DIR
//input validation
const changeDirecton = newDirectionCode => {
    if(newDirectionCode == snakeCurrentDirection) return;

    if(newDirectionCode == LEFT_DIR && snakeCurrentDirection !== RIGHT_DIR){
        snakeCurrentDirection = newDirectionCode
    } 
    else if(newDirectionCode == UP_DIR && snakeCurrentDirection !== DOWN_DIR){
        snakeCurrentDirection = newDirectionCode
    } 
    else if(newDirectionCode == RIGHT_DIR && snakeCurrentDirection !== LEFT_DIR){
        snakeCurrentDirection = newDirectionCode
    }
    else if(newDirectionCode == DOWN_DIR && snakeCurrentDirection !== UP_DIR){
        snakeCurrentDirection = newDirectionCode
    }
}
// set starting point
let currentHeadPosition = TOTAL_PIXEL_COUNT /2

//set snanke length
let snakeLength =200

//move snake
const moveSnake = () => {
    switch(snakeCurrentDirection) {
        case LEFT_DIR:
            --currentHeadPosition
            const isHeadAtLeft = currentHeadPosition % LINE_PIXEL_COUNT == 
            LINE_PIXEL_COUNT - 1 || currentHeadPosition < 0
            if(isHeadAtLeft){
                currentHeadPosition = currentHeadPosition + LINE_PIXEL_COUNT
            }
            break;
             case RIGHT_DIR:
            ++currentHeadPosition
            const isHeadAtRight = currentHeadPosition % LINE_PIXEL_COUNT == 0
            if(isHeadAtRight){
                currentHeadPosition = currentHeadPosition - LINE_PIXEL_COUNT
            }
            break;
        case UP_DIR :
            currentHeadPosition = currentHeadPosition - LINE_PIXEL_COUNT
            const isHeadAtTop = currentHeadPosition < 0 
            if(isHeadAtTop){
                currentHeadPosition= currentHeadPosition + TOTAL_PIXEL_COUNT
            }
            break;
        case DOWN_DIR:
            currentHeadPosition = currentHeadPosition + LINE_PIXEL_COUNT
            const isHeadAtBottom = currentHeadPosition > TOTAL_PIXEL_COUNT - 1
            if(isHeadAtBottom){
                currentHeadPosition = currentHeadPosition - TOTAL_PIXEL_COUNT 
            }
            break;
            default:
            break;
    }
    let nextSnakeHeadPixel = gameBoardPixels[currentHeadPosition]

    if(nextSnakeHeadPixel.classList.contains('snakeBodyPixel')) {
        clearInterval(moveSnakeInterval)
        alert(`you have eaten ${totalFoodEaten} food and traveld ${totalDistanceTraveled} blocks.`)
        window.location.reload()
    }
    nextSnakeHeadPixel.classList.add('snakeBodyPixel')
    //remove snake style
    setTimeout(()=>{
        nextSnakeHeadPixel.classList.remove("snakeBodyPixel")
    }, snakeLength)
//add pixel to snake after eating food
    if(currentHeadPosition == currentFoodPositon){
        totalFoodEaten++
        document.getElementById("pointsEarned").innerText = totalFoodEaten
        snakeLength= snakeLength + 100
        createFood()
    }
    totalDistanceTraveled++
    document.getElementById("pointsTraveled").innerText= totalDistanceTraveled
}


createGameBoardPixels();

createFood();

let moveSnakeInterval = setInterval(moveSnake,100)

addEventListener('keydown', e => changeDirecton(e.keyCode))

const leftButton = document.getElementById('leftButton')
const rightButton = document.getElementById('rightButton')
const upButton = document.getElementById('upButton')
const downButton = document.getElementById('downButton')

leftButton.onclick = () => changeDirecton(LEFT_DIR)
rightButton.onclick = () => changeDirecton(RIGHT_DIR)
upButton.onclick = () => changeDirecton(UP_DIR)
downButton.onclick = () => changeDirecton(DOWN_DIR)
