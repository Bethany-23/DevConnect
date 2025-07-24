
import {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () =>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchUser = async () =>{
            const token = localStorage.getItem("token");

            if (!token){
                navigate("/login");
                return;
            }

            try{
                const res = await axios.get("http://localhost:5000/api/auth/me", {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(res.data)
            }catch(error){
                setError("You must be logged in to view this page.");
                localStorage.removeItem("token");
                navigate("/login")
            }finally{
                setLoading(false);
            }
        };
        fetchUser();
    },[]);
    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if(error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return(
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Your Profile</h1>
            <div className="space-y-2">
                <p><strong>Name:</strong>{user.name}</p>
                <p><strong>Email</strong>{user.email}</p>
                <p><strong>ID:</strong>{user.id}</p>
            </div>
        </div>
    );
};

export default Profile;