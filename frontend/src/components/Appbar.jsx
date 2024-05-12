import {useNavigate} from "react-router-dom"

export const Appbar = () => {
    const navigate = useNavigate();

    return <div className="shadow h-14 flex justify-between bg-blue-100">
        <div className="flex flex-col justify-center h-full ml-4 font-medium ">
            <span className=" shadow-lg text-xl">QuickPay Wallet</span>
        </div>
        <div className="flex ">
            <div className="flex flex-col justify-center h-full mr-4">
                <button onClick={() => {
                    localStorage.removeItem("token")
                    navigate("/signin")
                }} 
                className=" rounded-md p-1 bg-blue-200 transition ease-in-out hover:bg-blue-300 hover:shadow-lg">Logout</button>
            </div>
            <div className="rounded-2xl h-12 w-12 bg-slate-400 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    Hello
                </div>
            </div>
        </div>
    </div>
}