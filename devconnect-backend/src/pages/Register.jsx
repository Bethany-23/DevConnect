
import {useForm} from "react-hook-form";
import {z} from "zod";
import{zodResolver} from "@hookform/resolvers/zod"

const schema = z.object({
    name: z.string().min(2,"Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "password must be at least 6 charachters")
});


function Register(){
    const{
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({resolver:zodResolver(schema)});

    const onSubmit = (data) =>{
        console.log("Register data:",data);
        // later: send to backend
    };

    return(
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block mb-1">Name</label>
                    <input {...register("name")} className="w-full p-2 border rounded" type="text"/>
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div>
                    <label className="block mb-1">Email</label>
                    <input {...register("email")} className="w-full p-2 border rounded" type="email"/>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div>
                    <label>Password</label>
                    <input {...register("password")}className="w-full p-2 border rounded" type="password"/>
                    {errors.password && <p className="rext-red-500 text-sm">{errors.password.message}</p>}
                </div>
                <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600" type="submit">Signup </button>
            </form>
        </div>
    );
}

export default Register;