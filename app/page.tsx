import React from 'react';
import GameBoard from '../components/GameBoard';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Memory Game</h1>
      <GameBoard />
    </div>
  );
}
