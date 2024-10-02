import { Heading } from "../components/Heading";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

export default function SendMoney(){
    const [searchParam] = useSearchParams();
    const name = searchParam.get("name");
    const [amount, setAmount] = useState(0);
    const toAccount = searchParam.get("id");

    return (
        <div className="h-screen w-screen bg-[#F3F5F7] flex justify-center items-center">
            <div className="w-96 h-auto rounded-xl shadow-2xl p-4 bg-white ">
                <div>
                    <Heading heading="Send Money" />
                </div>

                <div className="mt-16">
                    <div className="flex justify-start items-center">
                        <div className="bg-green-500 rounded-full w-10 h-10 text-white text-2xl flex justify-center items-center"><p>{name[0].toUpperCase()}</p></div>
                        <p className="font-bold text-xl ml-4">{name}</p>
                    </div>

                    <div className="font-bold text-sm">
                        Amount (in Rs)
                    </div>
                    <div className="border-2 p-1 mt-2 rounded-lg">
                        <input type="text" placeholder="Enter amount" className="outline-none" onChange={(e)=>setAmount(e.target.value)}/>
                    </div>

                    <div className="mt-4 text-white bg-green-500 p-2 rounded-lg flex justify-center items-center mb-4 cursor-pointer" onClick={ async ()=>{
                        await axios.post("http://localhost:3000/api/v1/account/transfer",{
                            'to' : toAccount, 
                            amount
                        },{
                            'headers' : {
                                Authorization : localStorage.getItem("token")
                            }
                        })


                    }}>
                        <p>Initiate Transfer</p>
                    </div>

                </div>

            </div>


        </div>
    )
}