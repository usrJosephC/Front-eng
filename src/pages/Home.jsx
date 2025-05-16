import { Nome} from "../components/Nome";
import SelecionarAno from "../components/SelecionarAno";

function Home(){
return (
    <div className="min-h-screen bg-[#80FFEC] flex flex-col items-center pt-20 px-4">
      <Nome />
      <div className="mt-10 w-full max-w-md">
        <SelecionarAno />
      </div>
    </div>
  );
}

export default Home;
