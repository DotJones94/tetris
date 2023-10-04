<script>
    import {ref, reactive} from 'vue';

    import { onMounted } from 'vue'

    export default {
    setup() {
        const gameWidth = 5;
        const gameHeight = 5;
        const gameTemplate = reactive([]);
        const gameStatus = ref(true);

        
        onMounted(() => {
            //create the gameTemplate
            reset()
        })

        

        const currentLine = ref(-1);
        const currentPosition = ref(0);

        function increment(){
            if(currentLine.value === gameHeight) {
                currentLine.value = -1;
            }
            else{
                currentLine.value++;

                if (currentLine.value === (gameHeight-1) || gameTemplate[currentLine.value+1][currentPosition.value] === 1){
                    gameTemplate[currentLine.value][currentPosition.value] = 1
                    if(isFullLine(currentLine.value)){
                        gameTemplate.splice(currentLine.value,1);
                        gameTemplate.unshift(newRow())
                    }
                    if(currentLine.value === -1) gameStatus.value = false;
                    else currentLine.value = -1;
                }
            } 
           
        }

        function left(){
            if(currentPosition.value-1 >= 0) 
                currentPosition.value--;
        }

        function right(){
            if(currentPosition.value+1 < gameWidth) 
                currentPosition.value++;
        }

        function isFullLine(line){
            if(gameTemplate[line].includes(0)) return false;
            else return true;
        }

        function newRow(){
            let row = [];
            for(let j = 0; j< gameWidth; j++){
                row.push(0)
            }
            return row;
        }

        function reset(){
            for(let i = 0; i< gameHeight; i++){
                gameTemplate[i] = newRow();
            }
        }


        // expose the ref to the template
        return {
            currentLine, currentPosition, gameStatus,
            increment,left, right, reset,
            gameTemplate,
        }
    }
  }
</script>

<template>
    <div class="game-board">
        <div>Current Line {{currentLine}}</div>
        <div>Position {{currentPosition}}</div>
        <div>Game Status {{gameStatus}}</div>
        <button @click="increment">Move Down</button>
        <button @click="left">Move left</button>
        <button @click="right">Move right</button>
        <button v-if="!gameStatus" @click="reset">Reset</button>
        <br>
        <div>
            <div v-for="(row, index) in gameTemplate" :key="row.id" class="row" :class="{ 'row--current' : (index === currentLine) }">
                <div v-for="(element, indexBlock) in row" :key="element.id" class="block"
                :class="{ 'block--current' : (index === currentLine && indexBlock === currentPosition) }">
                    {{element}}
                </div>
            </div>
        </div>
        
    </div>
</template>

<style>
.game-board{
    display: flex;
    flex-direction: column;
    width: 250px;
    align-items: center;
}

.row{
    display: flex;
    width: fit-content;
}

.row--current{
    background-color: red;
}

.block {
  width: 20px;
  height: 20px;
  border: 1px solid black;
}

.block--current{
    background-color: pink;
}
</style>