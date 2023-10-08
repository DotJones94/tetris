import {ref, reactive } from 'vue'

export function oShape() {
    const colour = 'pink'; 

    const shape = reactive({
        'top' : [
            [1,1],
            [1,1],
        ],
    })

    let position = ref('top');

    let currentShape = ref(shape[position.value]);

    const turnRight = () => {
        currentShape.value = shape[position.value]
    }

    const turnLeft = () => {
        currentShape.value = shape[position.value]
    }


    
    return { currentShape, colour, turnRight, turnLeft }
}