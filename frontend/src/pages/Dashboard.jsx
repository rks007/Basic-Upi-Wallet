import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"


export const Dashboard = () => {
    const [amount, setAmount] = useState("")

    
    useEffect(() => {
        axios.get("https://basic-upi-wallet.onrender.com/api/v1/account/balance", {
            headers : {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            setAmount(response.data.balance)
        })
    },[amount])

    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={amount} />
            <Users />
        </div>
    </div>
}