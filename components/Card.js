"use client"
import React from 'react';
import { motion } from 'framer-motion';
import styles from './Card.module.css';

const Card = ({ id, flipped, onClick, content, initial, matched }) => {
  return (
    <motion.div
      className={styles.card}
      onClick={() => onClick(id)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        className={`${styles.cardInner} ${flipped || initial ? styles.flipped : ''} ${matched ? styles.matched : ''}`}
        animate={{ rotateY: flipped || initial ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.cardFront}></div>
        <div className={styles.cardBack}>{content}</div>
      </motion.div>
    </motion.div>
  );
};

export default Card;
