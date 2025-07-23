import{useForm} from "react-hook-form";
import{z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"


const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "password must be at least 6 characters")
});

function Login(){
    const{
        register, 
        handleSubmit,
        formState: {errors},
    }=useForm({resolver: zodResolver(loginSchema)});

    const onSubmit = (data) =>{
        console.log("login data:", data);
        // later: send to backend
    }
    return(
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">
                Login
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block mb-1">Email</label>
                    <input {...register("email")} className="w-full p-2 border rounded"type="email"/>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div>
                    <label>Password</label>
                    <input {...register("password")} className="w-full p-2 border rounded"type="password"/>
                    {errors.password && <p className="text-red-500 text-sm">{email.password.message}</p>}
                </div>
                <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600" type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;