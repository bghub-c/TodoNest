import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { ListChecks } from "@phosphor-icons/react";

const Tags = ["Plan!", "Organise!", "Achieve!"];
const tagColors = ["text-c1", "text-c6", "text-c5"];

export default function WelcomePage() {
  const isDarkmode = useSelector((state) => state.tasks.darkMode);
  const [currentTag, setCurrentTag] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTag((prevTag) => (prevTag + 1) % Tags.length);
    }, 800); // Change tag every 0.8 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div initial={{  opacity: 0.7 }}
    animate={{  opacity: 1 }}
    exit={{  opacity: 0 }}
      className={`flex flex-col-reverse absolute z-50 items-center justify-center h-screen w-screen bg-bg1 ${
        isDarkmode ? " text-white" : "bg-gray-100 "
      }`}
    >
      <motion.span
        id="container"
        className="relative mb-36 flex gap-1 items-center justify-center text-5xl quicksand font-extrabold"
      >
        <div>
          <ListChecks
            size={100}
            weight="bold"
            className="absolute top-0 left-0 bg-bg1 text-c1"
          />
        </div>
        <motion.div initial={{x:-100, opacity:0}} animate={{x:0, opacity:1}} className="ml-24 my-7 bg-gradient-to-r from-c1 to-c3 text-transparent bg-clip-text">
          ToDo Nest
        </motion.div>
      </motion.span>
      <AnimatePresence>
      <motion.h1
  layout
  key={Tags[currentTag]}
  initial={{ scaleX: 0, opacity: 0 }}
  animate={{ scaleX: 1, opacity: 1 }}
  exit={{ scaleX: 0, opacity: 0 }}
  transition={{ duration: 0.3, delay: 0.3 }} // Add delay here
  className={`text-4xl font-bold caveat absolute ${tagColors[currentTag]}`}
>
  {Tags[currentTag]}
</motion.h1>
      </AnimatePresence>
    </motion.div>
  );
}
