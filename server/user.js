const users = [];

const addUser= ({id, name, room})=>{
    name=name.trim().toLowerCase();
    room=room.trim().toLowerCase();
    const existUser= users.find((user)=>user.room===room&&user.name===name);

    if(existUser){
        return {error:'UserName is taken'};
    }

    const user={id,name,room};
    //console.log("user:",user)
    users.push(user);

    return {user};
}

const removeUser=(id)=>{
    const index=users.findIndex((user)=>user.id===id);

    if(index!==-1){
        return users.splice(index,1)[0];
    }

}

const getUser=(id)=>users.find((user)=>user.id===id);

const getUserInRoom=(room)=>users.filter((user)=>user.room===room);

module.exports= {addUser,removeUser,getUser,getUserInRoom};