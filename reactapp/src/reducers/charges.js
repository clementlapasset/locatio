// eslint-disable-next-line import/no-anonymous-default-export
export default function(chargesFromFront = [], action){
    if(action.type === 'charge'){
        return [...chargesFromFront, action.charge]
    } else {
        return chargesFromFront
    }
}