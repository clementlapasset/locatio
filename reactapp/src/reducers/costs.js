export default function(costsFromFront = [], action){
    if(action.type === 'costs'){
        return [...costsFromFront, action.costs]
    } else {
        return costsFromFront
    }
}