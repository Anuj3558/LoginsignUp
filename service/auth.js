const SessionIdtoUser =new Map();

const setUniqueId =(id,user) =>{
       SessionIdtoUser.set(id,user);
       console.log("Logged in");
       return;
}
const getUserFromId = () =>{
    return SessionIdtoUser.get(id);
}
export {
    setUniqueId,
    getUserFromId
}