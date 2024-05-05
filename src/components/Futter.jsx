import { Link } from "@phosphor-icons/react";

export default function Futter(){
    return(
        <section className="mt-4 w-full flex justify-center">
    Copyrights <a href="https://webweaver-personalportfolio.netlify.app/" className="font-semibold mx-2 flex  hover:text-white transition-all" target="_blank"> Webweaver<Link size={25} weight="duotone" /> </a> &copy; {new Date().getFullYear()}
</section>
    );
}