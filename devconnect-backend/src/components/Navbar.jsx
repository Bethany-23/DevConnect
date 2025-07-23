import {Link} from "react-router-dom"

function Navbar(){
    return(
        <nav className="bg-gray-900 text-white  px-4 py-3 flex justify-between items-center ">
            <h1 className="text-xl font-bold text-orange-400 px-5">DevConnect</h1>
            <div className="space-x-4">
                <Link to= "/" className="hover:text-orange-300">Home</Link>
                <Link to="/register" className="hover:text-orange-300">Register</Link>
                <Link to="/login" className="hover:text-orange-300">Login</Link>
                <Link to="/dashboard" className="hover:text-orange-300">Dashboard</Link>
            </div>
        </nav>
    );
}

export default Navbar;