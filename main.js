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
