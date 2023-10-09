<script setup>
    import { ref } from 'vue'
    import { zShape } from './game-components/z-shape';
    import { tShape } from './game-components/t-shape';
    import { lShape } from './game-components/l-shape';
    import { oShape } from './game-components/o-shape';
    import { sShape } from './game-components/s-shape';
    import { iShape } from './game-components/i-shape';

    const gameHeight = 25; 
    const gameWidth = 20;
    let gameCurrentRow = ref(-1);
    let gameCurrentColumn = ref(5);
    let currentShapeColour = ref('');

    function createEmptyRow(width){
        let row = [];
        for(let i = 0; i< width; i++) 
            row[i] = 0;

        return row;
    }

    let gameBoard = ref(createBoard())

    function createBoard(){
        let board = [];
        for(let j = 0; j< gameHeight; j++){
            board[j] = createEmptyRow(gameWidth);
        }
        return board;
    }

    let gameShapes = [zShape(), tShape(), lShape(), oShape(), sShape(), iShape()];
    let component = null;
    let currentGameShape = null;

    function moveDown(){
        //if we are back at the top, get a random shape
        if(gameCurrentRow.value === -1){
            component = gameShapes[Math.floor(Math.random() * gameShapes.length)];
        }

        gameCurrentRow.value++;

        if(gameCurrentRow.value === gameHeight) 
            gameCurrentRow.value = -1;
        else{
            if(gameCurrentRow.value > 0) updateBoard(true)

            updateBoard(false);
        }
    }

    function updateBoard(isClear){
        console.log(isClear)
        currentGameShape = component.currentShape.value;
        currentShapeColour.value = component.colour;
        const row = isClear ? gameCurrentRow.value - 1 : gameCurrentRow.value;


        for(let i =0; i < currentGameShape.length; i++){
            let currentShapeRow = []
            if(isClear)  currentShapeRow = createEmptyRow(currentGameShape[i].length);
            else currentShapeRow = currentGameShape[i];

            console.log(currentShapeRow)
            
            let clonedArray = gameBoard.value[row + i].slice(0); //To make sure we are not modifying orignal row
            let firstHalf = clonedArray.splice(0, gameCurrentColumn.value);
            let lastHalf = gameBoard.value[row + i].splice(parseInt(gameCurrentColumn.value)+currentShapeRow.length, gameWidth);

            gameBoard.value[row + i] = firstHalf.concat(currentShapeRow, lastHalf);
        }
    }

    function turnRight(){
        if(gameCurrentRow.value > 0){
            updateBoard(true)
            component.turnRight();
            updateBoard(false);
        }
    }

    function turnLeft(){
        if(gameCurrentRow.value > 0){
            updateBoard(true)
            component.turnLeft();
            updateBoard(false);
        }
    }
    
</script>

<template>
    <div class="container">
        Welcome to Tetris <br> Current Row {{ gameCurrentRow }} <br> Current Column {{ gameCurrentColumn }}

        <!-- Shape -->
        <!-- <div class="board">
            <div v-for="(row, indexRow) in currentGameShape" :key="indexRow" class="row">
                <div v-for="(column, indexColumn) in row" :key="indexColumn" class="column" 
                :style="[(column === 1) ? { backgroundColor : currentShapeColour } : { backgroundColor : 'white' }]"
                :class="{'column--colour' : (column === 1)}">
                </div>
            </div>
        </div> -->

        <!-- Controls -->
        <div class="controls">
            <div class="button" @click="moveDown()">Down</div>
            <div class="button" @click="turnRight()">Right</div>
            <div class="button" @click="turnLeft()">Left</div>
        </div>

        
        <!-- Board -->
        <div class="board">
            <div v-for="(row, indexRow) in gameBoard" :key="indexRow" class="row">
                <div v-for="(column, indexColumn) in row" :key="indexColumn" class="column" 
                :class="{'column--colour' : (column === 1)}">
                </div>
            </div>
        </div>

        
    </div>
</template>

<style scoped>
.container{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.board{
    align-self: center;
}
.row{
    display: flex;
}
.column{
    border: 0.5px solid black;
    width: 20px;
    height: 20px;
}

.column--colour{
    box-shadow: inset 0 0 3px 2px rgba(0, 0, 0, 0.5);
}
.controls{
    margin-top: 10px;
    align-self: center;
}

.button{
    background: pink;
    padding: 10px 25px;
    width: fit-content;
    cursor: pointer;
}
</style>