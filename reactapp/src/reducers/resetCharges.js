export default function(chargesResetFromFront = [], action){
    if(action.type === 'reset'){
        return [...chargesResetFromFront, action.reset]
    } else {
        return chargesResetFromFront
    }
}