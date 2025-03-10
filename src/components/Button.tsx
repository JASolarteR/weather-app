import { motion } from "motion/react";
import { ReactNode } from "react";

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
  customClass: string;
}

export const Button = ({
  onClick,
  children,
  customClass,
  ...props
}: ButtonProps) => {
  return (
    <motion.button
      {...props}
      whileTap={{ scale: 0.8 }}
      onClick={onClick}
      className={customClass}
    >
      {children}
    </motion.button>
  );
};
