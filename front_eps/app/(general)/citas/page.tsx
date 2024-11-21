'use client'
import Header from "@/app/Sections/header"
export default function Citas() {
    return (
        <main className="">
            <Header/>
            <div className="border justify-center flex items-center h-screen w-screen">
                <div className="grid justify-center items-center grid-cols-3 border rounded-lg text-xl border-blue-400 shadow-lg">
                    <div className="col-span-3 flex gap-4 text-left p-5">
                        <h1 className="">Paciente:</h1>
                        <input type="text" className="border-2" />
                    </div>
                    <div className="col-span-3 flex gap-4 text-left p-5">
                        <h1 className="">Fecha de la cita:</h1>
                        <input type="date" className="border-2" />
                    </div>
                    <div className="col-span-3 flex gap-4 text-left p-5">
                        <h1 className="">Hora de la cita:</h1>
                        <input type="time" className="border-2" />
                    </div>
                    <div className="col-span-3 flex gap-4 text-left p-5">  
                        <h1 className="">Motivo de la cita:</h1>
                        <input type="text" className="border-2" />
                    </div>
                    <div className="col-span-3 flex gap-4 text-left p-5">
                        <h1 className="">Estado de la cita:</h1>
                        <input type="text" className="border-2" />
                    </div>
                    <div className="col-span-3 flex gap-4 text-left p-5">  
                        <h1 className="">Medico asignado:</h1>
                        <input type="text" className="border-2" />
                    </div>
                    <div className="col-span-3 flex gap-4 text-left p-5">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Agendar cita
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}