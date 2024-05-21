import { Link } from "@phosphor-icons/react";
import { useSelector } from "react-redux";

export default function Futter(){
    const isDarkmode = useSelector(state => state.tasks.darkMode);
    return(
        <section className={`mt-4 z-0 py-1 w-full flex absolute bottom-0 justify-center backdrop-blur-xl ${isDarkmode?"bg-bg1/70 text-white":""}`}>
    Copyrights <a href="https://webweaver-personalportfolio.netlify.app/" className="font-semibold mx-2 flex  hover:text-white transition-all" target="_blank"> Webweaver<Link size={25} weight="duotone" /> </a> &copy; {new Date().getFullYear()}
</section>
    );
}