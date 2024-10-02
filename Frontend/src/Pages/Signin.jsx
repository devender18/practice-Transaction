import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import { useState } from "react";
import axios from "axios";

export default function Signin(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return (
        <div className="flex justify-center items-center bg-[#7F7F7F] w-full h-screen">
            <div className="bg-white w-1/3 rounded-xl">
                <div>
                    <Heading heading="Sign In" subheading='Enter your credentials to access your account' />
                </div>
                <div>
                    <Input title="Email" placeholder="johndoe@example.com" onChange = {(e)=>setUsername(e.target.value)}/>
                </div>
                <div>
                    <Input title="Password" onChange = {(e)=>setPassword(e.target.value)} />
                </div>

                <div>
                    <Button title = "Sign In" onClick={async()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                            username,
                            password
                        })

                        const token = "Bearer " + response.data.token;

                        localStorage.setItem("token",token);
                        navigate("/dashboard");
                    }}/>
                </div>

                <div className="font-semibold text-sm flex justify-center items-center mt-4 mb-8">
                    <p>Don&apos;t have an account? <Link className="underline" to="/Signup">Sign Up</Link></p>
                </div>
                
            </div>
        </div>
    )
}