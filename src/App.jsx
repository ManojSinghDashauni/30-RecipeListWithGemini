import { Link } from "react-router";
import Cook from "./svg/Cook.jsx";

export default function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <button className="p-4 animate-bounce">
        <Link to="/CreateRecipe" className="flex flex-col items-center cook">
          <Cook className="size-20" />
          <span className="font-light">Create Recipe</span>
        </Link>
      </button>
    </div>
  );
}
