import Image from "next/image"
import logo from "@/public/img/Logo.png"
const Header = () => {
    return (
        <header className="flex flex-col md:items-center border ">
            <div className="text-white border-slate-950 text-4xl gap-2 md:justify-between order-1 m-2 fixed p-2 col-span-1 items-center bg-[#a1a1a1] bg-opacity-80 backdrop-filter backdrop-blur-sm transparent border rounded-xl">
                    <Image src={logo} alt="Logo" className="h-12 w-auto" />
            </div>
            
        </header>
    )
}
export default Header