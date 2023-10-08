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

    function createEmptyRow(){
        let row = [];
        for(let i = 0; i< gameWidth; i++) 
            row[i] = 0;

        return row;
    }

    let gameBoard = ref(createBoard())

    function createBoard(){
        let board = [];
        for(let j = 0; j< gameHeight; j++){
            board[j] = createEmptyRow();
        }
        return board;
    }

    let gameShapes = [zShape(), tShape(), lShape(), oShape(), sShape(), iShape()];
    let component = gameShapes[5];
    currentShapeColour.value = component.colour;
    let currentGameShape = component.currentShape;

    function moveDown(){
        //if we are back at the top, get a random shape

        console.table(gameBoard.value)
        gameCurrentRow.value++;

        if(gameCurrentRow.value === gameHeight) gameCurrentRow.value = -1

        //Add currentGameShape at currentRow
        for(let i =0; i < currentGameShape.length; i++){
            let gameRow = gameBoard.value[gameCurrentRow.value + i];
            //first half
            let firstHalf = gameRow.splice(0, gameCurrentColumn.value);
            let currentShapeRow = currentGameShape[i];
            //last half 
            console.log(gameRow.length)
            console.log('Start point:')
            console.log( gameCurrentColumn.value+4)
            console.log('End point:')
            console.log( gameWidth - parseInt(gameCurrentColumn.value))
            let lastHalf = gameRow.splice(parseInt(gameCurrentColumn.value)+3, gameWidth - parseInt(gameCurrentColumn.value));
            console.log(lastHalf)
            let newRow = firstHalf.concat(currentShapeRow, lastHalf);
            gameBoard.value[gameCurrentRow.value + i] = newRow;
        }
    }

    function turnRight(){
        component.turnRight();
        currentGameShape = component.currentShape;
    }

    function turnLeft(){
        component.turnLeft();
        currentGameShape = component.currentShape;
    }
    
</script>

<template>
    <div class="container">
        Welcome to Tetris <br> Current Row {{ gameCurrentRow }} <br> Current Column {{ gameCurrentColumn }}

        <!-- Shape -->
        <div class="board">
            <div v-for="(row, indexRow) in currentGameShape" :key="indexRow" class="row">
                <div v-for="(column, indexColumn) in row" :key="indexColumn" class="column" 
                :style="[(column === 1) ? { backgroundColor : currentShapeColour } : { backgroundColor : 'white' }]"
                :class="{'column--colour' : (column === 1)}">
                </div>
            </div>
        </div>

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