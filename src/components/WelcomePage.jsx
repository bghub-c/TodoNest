import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const Tags = ['Plan!', 'Organise!', 'Achieve!'];

export default function WelcomePage() {
  const isDarkmode = useSelector(state => state.tasks.darkMode);
  const [currentTag, setCurrentTag] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTag(prevTag => (prevTag + 1) % Tags.length);
    }, 500); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex flex-col-reverse absolute z-50 items-center justify-center h-screen w-screen ${isDarkmode ? "bg-bg1 text-white" : ""}`}>
      <AnimatePresence>
        <motion.h1
        layout
          key={Tags[currentTag]}
          initial={{ scaleX:0,opacity: 0 }}
          animate={{ scaleX:1,opacity: 1 }}
          exit={{ scaleX:0,opacity: 0 }}
          transition={{duration:0.4}}
          className="text-5xl font-bold caveat"
        >
          {Tags[currentTag]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
