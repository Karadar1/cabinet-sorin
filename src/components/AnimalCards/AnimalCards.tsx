import React from "react";
import styles from "./style.module.css";
import { StaticImageData } from "next/image";
import Image from "next/image";
interface AnimalCardProps {
  title: string;
  image: any;
  onClick: any;
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
