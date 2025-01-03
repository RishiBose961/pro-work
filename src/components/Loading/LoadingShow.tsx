import { useEffect, useState, useRef } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { motion } from "framer-motion";

const loadingMessages = [
  "Loading...",
  "Just a moment...",
  "Hang tight!",
  "Almost there...",
  "Your patience is loading...",
  "Searching for the answer... 404: Not Found.",
  "Loading... 99%... 99%... 99%...",
  "My brain is trying to process this... loading emoji",
  "Loading your future success...",
  "Your dreams are loading... Hold on tight!",
  "Patience is a virtue... Loading...",
  "Good things come to those who wait... Loading...",
];

const LoadingShow = () => {
  // Use useRef for the initial random number, this won't cause re-renders.
  const randomNum = useRef(Math.floor(Math.random() * 12));

  const [messageIndex, setMessageIndex] = useState(randomNum.current);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages?.length);
    }, 3000); // Change message every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`flex flex-col items-center justify-center  text-white mt-20`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <LoadingSpinner size={60} color="white" />
      </div>

      <div className="p-2">
        <motion.h2
          className="mt-4 text-2xl font-bold text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {loadingMessages[messageIndex]}
        </motion.h2>
      </div>
    </motion.div>
  );
};

export default LoadingShow;
