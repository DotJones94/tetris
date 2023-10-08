import {ref, reactive } from 'vue'

export function iShape() {
    const colour = 'pink'; 

    const shape = reactive({
        'top' : [
           
            [0,0,0,0],
            [1,1,1,1],
            [0,0,0,0],
            [0,0,0,0],
        ],
        'right' : [
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
        ],
        'bottom' : [
            [0,0,0,0],
            [1,1,1,1],
            [0,0,0,0],
            [0,0,0,0],
        ],
        'left' : [
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
        ],
    })

    let position = ref('top');

    let currentShape = ref(shape[position.value]);

    const turnRight = () => {
        switch(position.value){
            case 'top' : position.value = 'right'; break;
            case 'right' : position.value = 'bottom'; break;
            case 'bottom' : position.value = 'left'; break;
            case 'left' : position.value = 'top'; break;
        }

        currentShape.value = shape[position.value]
    }

    const turnLeft = () => {
        switch(position.value){
            case 'top' : position.value = 'left'; break;
            case 'left' : position.value = 'bottom'; break;
            case 'bottom' : position.value = 'right'; break;
            case 'right' : position.value = 'top'; break;
        }

        currentShape.value = shape[position.value]
    }


    
    return { currentShape, colour, turnRight, turnLeft }
}