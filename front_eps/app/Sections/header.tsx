import Link from "next/link"
const Header = () => {
    return (
        <header className="flex flex-col border fixed h-screen">
            <div className="text-black flex flex-col gap-3 border-slate-950 h-screen justify-start items-start text-xl order-1 m-2 p-2 col-span-1 bg-[#eeeeee] bg-opacity-80 backdrop-filter backdrop-blur-sm transparent border rounded-xl">
                    <Link href="medicamentos" className=" border-b-2 border-slate-950 text-center gap-2 flex items-center font-mono hover:scale-110 hover:bg-slate-500 hover:text-white rounded-md p-2 hover:cursor-pointer transition-all duration-300 ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        Medicamentos
                    </Link>
                    <Link href="encuesta" className="border-b-2 border-slate-950 text-center flex gap-2 items-center  font-mono hover:scale-110 hover:bg-slate-500 hover:text-white rounded-md p-2 hover:cursor-pointer transition-all duration-300 ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    Encuesta
                    </Link>
                    <Link href="citas" className="border-b-2 border-slate-950 text-center flex gap-2 items-center  font-mono hover:scale-110 hover:bg-slate-500 hover:text-white rounded-md p-2 hover:cursor-pointer transition-all duration-300    ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    Citas
                    </Link>
                    <Link href="paciente" className="border-b-2 border-slate-950 text-center flex gap-2 items-center  font-mono hover:scale-110 hover:bg-slate-500 hover:text-white rounded-md p-2 hover:cursor-pointer transition-all duration-300    ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    Pacientes</Link>
                    <Link href="factura" className="border-b-2 border-slate-950 text-center flex gap-2 items-center  font-mono hover:scale-110 hover:bg-slate-500 hover:text-white rounded-md p-2 hover:cursor-pointer transition-all duration-300    ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                        </svg>
                    Factura</Link>
                        <Link href="personal" className="border-b-2 border-slate-950 text-center flex gap-2 items-center  font-mono hover:scale-110 hover:bg-slate-500 hover:text-white rounded-md p-2 hover:cursor-pointer transition-all duration-300    ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    Personal</Link>
            </div>
        </header>
    )
}
export default Header