export default function(depensesFromFront = [], action){
    if(action.type === 'depenses'){
        return [...depensesFromFront, action.depenses]
    } else {
        return depensesFromFront
    }
}