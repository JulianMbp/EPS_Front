import Header from './Sections/header'
import Welcome from './Sections/welcome'
export default function Home() {
  return (
    <main className="w-screen h-screen bg-slate-200 font-sans">
      <Header />
      <Welcome />
    </main>
  );
}
