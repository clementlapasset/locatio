export default function(update = '', action){
    if(action.type === 'update'){
        return action.update
    } else {
        return update
    }
}