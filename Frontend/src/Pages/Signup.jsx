import { useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


export default function Signup(){
     const [username, setUsername] = useState("");
     const [firstName, setFirstName] = useState("");
     const [lastName, setLastName] = useState("");
     const [password, setPassword] = useState("");
     const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center bg-[#7F7F7F] w-full h-screen">
            <div className="bg-white w-1/3 rounded-xl">
               <div>
                    <Heading heading="Sign Up" subheading="Enter your information to create an account" />
               </div>
               <div className="mt-4">
               <div>
                    <Input title="First Name" placeholder="John" onChange={(e)=>setFirstName(e.target.value)} />
               </div>
               <div>
                    <Input title="Last Name" placeholder="Doe" onChange={(e)=>setLastName(e.target.value)}/>
               </div>
               <div>
                    <Input title="Email" placeholder="johndoe@example.com" onChange={(e)=>setUsername(e.target.value)} />
               </div>
               <div>
                    <Input title="Passoword" placeholder="John" onChange={(e)=>setPassword(e.target.value)} />
               </div>
               </div>

               <div>
                    <Button title="Sign Up" onClick={async ()=>{
                         const response = await axios.post('http://localhost:3000/api/v1/user/signup',{
                              username,
                              password,
                              firstName,
                              lastName
                         })

                         const finalToken = "Bearer " + response.data.token;

                         localStorage.setItem('token', finalToken);

                         navigate("/dashboard");
                         
                    }}/>
               </div>

               <div className="font-semibold text-sm flex justify-center items-center mt-4 mb-8">
                    <p className="">Already have an account? <Link to="/signin" className="underline">Login</Link> </p>
               </div>
               
            </div>
        </div>
    )
}