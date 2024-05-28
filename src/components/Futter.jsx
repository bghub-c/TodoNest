import {  ArrowCircleUpRight } from "@phosphor-icons/react";
import { useSelector } from "react-redux";

export default function Futter() {
  const isDarkmode = useSelector((state) => state.tasks.darkMode);
  const currentYear = new Date().getFullYear();

  return (
    <section
      className={`mt-4 z-10 pt-1 pb-0 w-full flex fixed bottom-0 justify-center backdrop-blur ${
        isDarkmode ? "bg-bg1/70 text-white" : "bg-white/70 text-black"
      } roboto-condensed`}
    >
      <p className="flex items-center">
        Copyrights
        <a
          href="https://webweaver-personalportfolio.netlify.app/"
          className={`group font-semibold mx-2 flex items-center transition-all duration-300`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Webweaver
          <ArrowCircleUpRight size={18} weight="duotone" className="ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all ease-in-out duration-300" />
        </a>
        &copy; {currentYear}
      </p>
    </section>
  );
}
