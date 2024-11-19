'use client'
import Link from "next/link"
import Header from "@/app/Sections/header"
export default function Citas() {
    return (
        <main className="">
            <Header/>
            <div className="border justify-center flex items-center h-screen w-screen">
                <div className="grid justify-center items-center grid-cols-3 border text-xl border-blue-400 shadow-lg">
                    <div className="flex gap-3 col-span-3 p-5">
                        <h1 className="">Fecha de Factura:</h1>
                        <input type="date" className="border-2" />
                    </div>
                    <div className="col-span-3 flex gap-4 text-left p-5">
                        <h1 className="">
                            Total de la factura:    
                        </h1>
                        <div className="font-bold">
                        <label className="block ">
                            {/* entrada de texto al titulo */}
                            <input type="text" name="Total" className="h-full px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Total de la factura" />
                        </label>
                        </div>
                    </div>
                    <div className="col-span-3 flex gap-4 text-left p-5">
                    <h1 className="">
                            Metodo de Pago:    
                        </h1>
                        <div className="font-bold">
                        <label className="block ">
                            {/* entrada de texto al titulo */}
                            <input type="text" name="Efectivo" className="h-full px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Metodo de Pago" />
                        </label>
                        </div>
                    </div>
                    <div className="col-span-3 flex gap-4 text-left p-5">
                        <h1 className="">
                            Descuento:
                        </h1>
                        <div className="font-bold">
                        <label className="block ">
                            {/* entrada de texto al titulo */}
                            <input type="text" name="Descuento" className="h-full px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Descuento" />
                        </label>
                        </div>
                    </div> 
                    <div className="col-span-3 flex gap-4 text-left p-5">
                        <h1 className="">
                            Eps Cubre:
                        </h1>
                        <div className="font-bold">
                            <label className="block items-center">
                                <input type="checkbox" name="Eps_Cubre" className="h-5 w-5 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:border-sky-500 focus:ring-sky-500" placeholder="Eps Cubre" />
                            </label>
                        </div>
                    </div>
                    <div className="col-span-3 flex p-5">
                        <Link href="">
                            <button className="col-span-3 bg-blue-500 p-2 text-white rounded-md hover:bg-blue-600 duration-300 active:bg-blue-700 active:scale-95 hover:scale-105 transition-all">
                                Generar Factura
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}