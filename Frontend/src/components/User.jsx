import axios from "axios";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export function User(){

    const [filter, setFilter] = useState("");
    const [allUser, setAllUser] = useState([]);

    // debounced version
    useEffect(()=>{
        const delay = 400;
        const timer = setTimeout(()=>{
            const getUser = async()=>{
                const response =  await axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter, {
                    'headers' : {Authorization : localStorage.getItem("token")}
                });

                setAllUser(response.data.users);
            }



            if(filter){
                getUser();
            }
        },delay)

        return ()=>{
            clearTimeout(timer)
        }
    },[filter])
    

    // useEffect(()=>{

    //     const getUser = async (delay)=>{
    //         const response = await axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter, {
    //             'headers' : {Authorization : localStorage.getItem("token")}
    //         });

    //         setAllUser(response.data.users);

    //     }

    //     getUser(400);
    // },[filter])

    return (
        <div className="m-4">
            <div className="mt-4">
                <p className="font-bold text-2xl">Users</p>
                <input type="text" placeholder="Search users..." className="border-2 rounded-lg w-full p-1 outline-none mt-2" onChange={(e)=>{
                    setFilter(e.target.value);
                }}/>
            </div>
            <div className="p-4">
                {allUser.map((item)=>(
                    <UserDetails firstName={item.firstName} key={item.username} userId={item._id}/>
                ))}
                
                
            </div>
        </div>

    )
}

function UserDetails({firstName,userId}){
    const navigate = useNavigate();
    return(
        <div className="flex justify-between mt-2">
            <div className="flex justify-center items-center">
                <div className="bg-gray-300 h-12 w-12 rounded-full flex justify-center items-center"><p>{firstName ? firstName[0].toUpperCase() : "U"}</p></div>
                <p className="ml-4 font-bold text-lg">{firstName ? firstName : "User"}</p>
            </div>
            <div>
                <Button title="Send Money" onClick={()=>{
                    navigate(`/send?name=${firstName}&id=${userId}`);
                }}/>
            </div>
        </div>
    )
}