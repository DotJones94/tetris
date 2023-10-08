import {ref, reactive } from 'vue'

export function zShape() {
    const colour = 'blue'; 

    const shape = reactive({
        'top' : [
            [0,1,1],
            [0,1,0],
            [1,1,0],
        ],
        'right' : [
            [1,0,0],
            [1,1,1],
            [0,0,1],
        ],
    })

    let position = ref('top');

    let currentShape = ref(shape[position.value]);

    const turnRight = () => {
        turn()
    }

    const turnLeft = () => {
        turn();
    }

    const turn = () => {
        switch(position.value){
            case 'top' : position.value = 'right'; break;
            case 'right' : position.value = 'top'; break;
        }

        currentShape.value = shape[position.value]
    }
    
    
    return { currentShape, colour, turnRight, turnLeft }
}