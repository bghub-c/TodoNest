import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
export default function ColorButtons({func, buttonVal}){
  const [tapped, setTapped]=useState(buttonVal);
  useEffect(() => {
    setTapped(buttonVal);
  }, [buttonVal]);
    return(
        <motion.div
        initial={{x:-100, opacity:0}}
        animate={{x:0, opacity:1}}
        exit={{x:-100, opacity:0}}
        transition={{duration:0.25, ease:"backInOut"}}
        id="button_container"
        className="flex items-center gap-2 smartphone:flex-row "
      >
        <button
          type="button"
          onClick={() => {func(`default`)
            setTapped(1);}
          }
          className={`px-3 py-1 rounded-md  bg-w1 ring-black text-gray-800 hover:ring-2 focus:ring-2 ${tapped===1?"ring-1 scale-105 shadow-white/20":""} focus:scale-105 transition-all shadow-lg focus:shadow-white/20 hover:shadow-white/20`}
        >
          Default
        </button>
        <button
          type="button"
          onClick={() => {func("AzureBreeze"); setTapped(2)}}
          className={`w-5 h-5 rounded-full bg-c1lt ring-offset-2 ring-offset-white hover:ring-2 focus:ring-2 ${tapped===2?"ring-1 scale-105 shadow-c1":""} focus:scale-105 transition-all  ring-c1lt shadow-lg focus:shadow-c1`}
        ></button>
        <button
          type="button"
          onClick={() => {func("MeadowMist"); setTapped(3)}}
          className={`w-5 h-5 rounded-full bg-c2lt ring-offset-2 ring-offset-white hover:ring-2 focus:ring-2 ${tapped===3?"ring-1 scale-105 shadow-c2/50":""} focus:scale-105 transition-all ring-c2lt shadow-lg focus:shadow-c2/50` }
        ></button>
        <button
          type="button"
          onClick={() => {func("PeachyBlush"); setTapped(4)}}
          className={`w-5 h-5 rounded-full bg-c3lt ring-offset-2 ring-offset-white hover:ring-2 focus:ring-2 ${tapped===4?"ring-1 scale-105 shadow-c3/50":""} focus:scale-105 transition-all ring-c3lt shadow-lg focus:shadow-c3/50`}
        ></button>
        <button
          type="button"
          onClick={() => {func("LavenderHaze"); setTapped(5)}}
          className={` w-5 h-5 rounded-full bg-c4lt ring-offset-2 ring-offset-white hover:ring-2 focus:ring-2 ${tapped===5?"ring-1 scale-105 shadow-c4/50":""} focus:scale-105 transition-all ring-c4 shadow-lg focus:shadow-c4/50 `}
        ></button>
        <button
          type="button"
          onClick={() =>{ func("CoralCrush"); setTapped(6)}}
          className={`w-5 h-5 rounded-full bg-c5lt ring-offset-2 ring-offset-white hover:ring-2 focus:ring-2 ${tapped===6?"ring-1 scale-105 shadow-c5/50":""} focus:scale-105 transition-all ring-c5 shadow-lg focus:shadow-c5/50`}
        ></button>
        <button
          type="button"
          onClick={() => {func("MintWhisper"); setTapped(7)}}
          className={` w-5 h-5 rounded-full bg-c6lt ring-offset-2 ring-offset-white hover:ring-2 focus:ring-2 ${tapped===7?"ring-1 scale-105 shadow-c6/50":""} focus:scale-105 transition-all ring-c6lt shadow-lg focus:shadow-c6/50 `}
        ></button>
      </motion.div>
    )
}
ColorButtons.propTypes = {
    func: PropTypes.func.isRequired,
    buttonVal: PropTypes.number.isRequired
  };
  
