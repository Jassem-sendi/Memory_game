"use client"
import React, { useState, useEffect } from 'react';
import Card from './Card';
import styles from './GameBoard.module.css';

const GameBoard = () => {
  const initialCards = Array.from({ length: 16 }, (_, i) => ({ id: i, content: Math.floor(i / 2) }));
  const [cards, setCards] = useState(shuffle(initialCards));
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [time, setTime] = useState(180); 
  const [gameOver, setGameOver] = useState(false);
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitial(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!initial && time > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (time === 0) {
      setGameOver(true);
    }
  }, [time, gameOver, initial]);

  const handleCardClick = (id) => {
    if (!initial && flippedCards.length < 2 && !flippedCards.includes(id) && !matchedCards.includes(id) && !gameOver) {
      setFlippedCards([...flippedCards, id]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);

      if (firstCard.content === secondCard.content) {
        setMatchedCards([...matchedCards, firstId, secondId]);
      }

      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (matchedCards.length === cards.length) {
      setGameOver(true);
    }
  }, [matchedCards, cards]);

  return (
    <div>
      <div className={styles.timer}>Time: {time} seconds</div>
      {gameOver && <div className={styles.gameOver}>Game Over</div>}
      <div className={styles.gameBoard}>
        {cards.map(card => (
          <Card
            key={card.id}
            id={card.id}
            content={card.content}
            flipped={flippedCards.includes(card.id) || matchedCards.includes(card.id)}
            onClick={handleCardClick}
            initial={initial}
            matched={matchedCards.includes(card.id)}
          />
        ))}
      </div>
    </div>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

export default GameBoard;

