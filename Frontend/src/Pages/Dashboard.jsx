import { Balance } from "../components/Balance";
import { Header } from "../components/Header";
import { User } from "../components/User";
import axios from 'axios';
import { useEffect, useState } from "react";


export default function Dashboard(){
    const [balance, setBalance] = useState(0);

    useEffect(()=>{
        const getBal = async()=>{
            const response = await axios.get("http://localhost:3000/api/v1/account/balance",{
                'headers' : {Authorization : localStorage.getItem("token")}
            })

            setBalance(response.data.balance);

        }

        getBal();
    },[balance])

    return (
        <div>
            <Header />
            <Balance balance = {balance}/>
            <User />
        </div>
    )
}