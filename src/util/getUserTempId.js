import { v4 as uuidv4 } from 'uuid';
export const getUserTempId = ()=>{
    let userTempId = localStorage.getItem('userTempId')

    if(!userTempId){
        localStorage.setItem('userTempId',uuidv4())
    }
    return userTempId
}