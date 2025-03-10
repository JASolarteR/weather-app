import { AnimatePresence, motion } from "motion/react";

export const Loader = () => {
  return (
    <AnimatePresence>
      <motion.img
        animate={{ rotate: 360 }}
        exit={{opacity: 0}}
        src="/icons/sun-loader.png"
        alt="Sun loader animated"
        width={52}
      />
    </AnimatePresence>
  );
};
