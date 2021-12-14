export default function(costsFromFront = [], action){
    if(action.type === 'cost'){
        return [...costsFromFront, action.cost]
    } else {
        return costsFromFront
    }
}