
import React, { useEffect, useState, useRef } from 'react';
import { createConfetti, playMusic } from '@/utils/animations';

interface CelebrationProps {
  isVisible: boolean;
}

const Celebration: React.FC<CelebrationProps> = ({ isVisible }) => {
  const [messageIndex, setMessageIndex] = useState(-1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const celebrationMessages = [
    "The world got a little more beautiful today...",
    "Because someone special was born...",
    "A soul that brings light to everyone around her...",
    "A name that deserves to be whispered by the stars...",
    "Deekshitha, Happy Birthday!",
  ];

  useEffect(() => {
    if (isVisible) {
      // Launch confetti
      createConfetti();
      
      // Play music
      const playBirthdayMusic = async () => {
        try {
          const audio = new Audio("/birthday-music.mp3");
          audio.volume = 0.5;
          await audio.play();
          audioRef.current = audio;
          
          // Fade out music after 60 seconds
          setTimeout(() => {
            const fadeOut = setInterval(() => {
              if (audio.volume > 0.1) {
                audio.volume -= 0.05;
              } else {
                audio.pause();
                clearInterval(fadeOut);
              }
            }, 500);
          }, 60000);
        } catch (error) {
          console.error("Failed to play music:", error);
        }
      };
      
      playBirthdayMusic();
      
      // Show messages one by one
      const messageTimer = setInterval(() => {
        setMessageIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= celebrationMessages.length) {
            clearInterval(messageTimer);
          }
          return nextIndex;
        });
      }, 2000);
      
      return () => {
        clearInterval(messageTimer);
        if (audioRef.current) {
          audioRef.current.pause();
        }
      };
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-theme-black to-theme-red transition-all duration-1000 ease-in-out z-50">
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {celebrationMessages.map((message, index) => (
          <div 
            key={index}
            className={`celebration-text font-serif text-2xl md:text-4xl text-theme-white mb-8 text-center max-w-lg px-4 ${messageIndex >= index ? 'visible' : ''}`}
            style={{ 
              transitionDelay: `${index * 0.5}s`,
              opacity: messageIndex >= index ? 1 : 0,
              transform: messageIndex >= index ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            {message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Celebration;
