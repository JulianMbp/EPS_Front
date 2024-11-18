import Image from "next/image"
import logo from "../../public/img/Logo.png"
const Welcome = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Bienvenido a la EPS</h1>
            <Image src={logo} alt="Logo" className="h-20 w-auto" />
        </div>
    )
}
export default Welcome