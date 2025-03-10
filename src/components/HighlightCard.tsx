import { motion } from "motion/react";
import { ReactNode } from "react";

type HighlightCardProps = {
  cardTitle: string;
  content: string;
  children?: ReactNode;
};

export const HighlightCard = ({
  cardTitle,
  content,
  children,
}: HighlightCardProps) => {
  return (
    <motion.article
      whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
      className="info-card"
    >
      <h5 className="info-card--heading">{cardTitle}</h5>
      <p className="info-card--content">{content}</p>
      {children}
    </motion.article>
  );
};
