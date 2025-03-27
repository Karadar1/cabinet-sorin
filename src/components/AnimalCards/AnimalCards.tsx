import React from "react";
import styles from "./style.module.css";
import Image, { StaticImageData } from "next/image";

interface AnimalCardProps {
  title: string;
  image: StaticImageData | string; // Can be either a static import or a path string
  onClick: () => void;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ title, image, onClick }) => {
  return (
    <div className={`${styles.card} animal-card`} onClick={onClick}>
      <Image src={image} alt="Card background" className={styles.image} fill />
      <div className={styles.gradientOverlay} />
      <div className={styles.content}>{title}</div>
    </div>
  );
};

export default AnimalCard;
