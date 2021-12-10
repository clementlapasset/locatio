// eslint-disable-next-line import/no-anonymous-default-export
export default function(token = '', action){
    if(action.type === 'addToken'){
        console.log("reducer token :",action.token)
        return action.token
    } else {
        return token
    }
}