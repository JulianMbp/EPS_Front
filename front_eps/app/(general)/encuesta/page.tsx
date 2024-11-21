'use client'

import Header from "@/app/Sections/header"

export default function Encuesta() {
    return (
        <main className="">
            <Header/>
            <div className="border justify-center flex items-center h-screen w-screen">
                <div className="grid justify-center items-center grid-cols-3 border rounded-lg text-xl border-blue-400 shadow-lg">
                    <div className="col-span-3 flex gap-4 text-left p-5">
                        <h1 className="">Titulo de la encuesta:</h1>
                        <h1 className="font-bold">Encuesta</h1>
                    </div>
                    <div className="col-span-3 flex gap-4 text-left p-5">
                        <h1 className="">Descripcion de la encuesta:</h1>
                        <input type="text" className="border-2" />
                    </div>
                    <div className="col-span-3 flex gap-4 text-left p-5">  
                        <h1 className="">Fecha de creacion:</h1>
                        <input type="date" className="border-2" />
                    </div>
                    <div className="col-span-3 flex gap-4 text-left p-5">
                        <h1 className="">Completada:</h1>
                        <input type="checkbox" className="border-2" />
                    </div>
                    
                </div>
            </div>
        </main>
    )
}