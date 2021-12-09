export default function(chargesFromFront = [], action){
    if(action.type === 'charge'){
        return [...chargesFromFront, action.charge]
    } else {
        return chargesFromFront
    }
}