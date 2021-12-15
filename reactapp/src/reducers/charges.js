// eslint-disable-next-line import/no-anonymous-default-export
export default function(update = '', action){
    if(action.type === 'update'){
        return action.update
    } else {
        return update
    }
}