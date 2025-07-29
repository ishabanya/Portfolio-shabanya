import { useState, useEffect, useCallback } from 'react';

interface TypewriterOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  loop?: boolean;
}

export const useTypewriter = ({
  words,
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetweenWords = 2000,
  loop = true,
}: TypewriterOptions) => {
  const [currentText, setCurrentText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const typeAnimation = useCallback(() => {
    const currentWord = words[currentWordIndex];
    
    if (!currentWord) return;
    
    if (!isDeleting) {
      // Typing forward
      if (currentText.length < currentWord.length) {
        setCurrentText(currentWord.slice(0, currentText.length + 1));
      } else {
        // Word complete, start deleting after delay
        setTimeout(() => setIsDeleting(true), delayBetweenWords);
        return;
      }
    } else {
      // Deleting backward
      if (currentText.length > 0) {
        setCurrentText(currentWord.slice(0, currentText.length - 1));
      } else {
        // Word deleted, move to next word
        setIsDeleting(false);
        setCurrentWordIndex((prev) => {
          const nextIndex = (prev + 1) % words.length;
          if (!loop && nextIndex === 0 && prev !== 0) {
            setIsComplete(true);
            return prev;
          }
          return nextIndex;
        });
      }
    }
  }, [currentText, currentWordIndex, isDeleting, words, delayBetweenWords, loop]);

  useEffect(() => {
    if (isComplete) return;

    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const timer = setTimeout(typeAnimation, speed);

    return () => clearTimeout(timer);
  }, [typeAnimation, isDeleting, typeSpeed, deleteSpeed, isComplete]);

  return {
    text: currentText,
    isComplete,
    currentWordIndex,
  };
};