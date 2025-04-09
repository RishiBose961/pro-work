import TitlePage from "./components/Texture/TitlePage";
import Hero from "./pages/Home/Hero";
import Work from "./pages/Home/Work";

const App = () => {
  return (
    <div className=" mx-auto max-w-7xl p-2 mb-20">
      <Hero />
      <TitlePage title="Skill" />
      <Work />
      
  
    </div>
  );
};

export default App;
