import { FaHome } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import "./MenuLateral.css"

export default function MenuLateral() {
    return (
        <nav>
            <ul>
                <li className="logo"> MENU </li>
                <li> <FaHome /> <a href="/home">HOME</a></li>
                <li> <FaBox /> <a href="/produtos">PRODUTOS</a> </li>
            </ul>
        </nav>
    )
}