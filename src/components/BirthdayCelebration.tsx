
import React, { useEffect, useState, useRef } from 'react';
import { createConfetti, playMusic, createStarryNight } from '@/utils/animations';
import { Button } from '@/components/ui/button';

interface BirthdayCelebrationProps {
  isVisible: boolean;
}

const BirthdayCelebration: React.FC<BirthdayCelebrationProps> = ({ isVisible }) => {
  const [messageIndex, setMessageIndex] = useState(-1);
  const [showGift, setShowGift] = useState(false);
  const [giftPhase, setGiftPhase] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const starryContainerRef = useRef<HTMLDivElement>(null);
  
  const celebrationMessages = [
    "The world got a little more beautiful today...",
    "Because someone special was born...",
    "A soul that brings light to everyone around her...",
    "A name that deserves to be whispered by the stars...",
    "Deekshitha, Happy Birthday!",
  ];

  // Initialize and handle the celebration sequence
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
      
      // Show celebration messages one by one
      const messageTimer = setInterval(() => {
        setMessageIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= celebrationMessages.length) {
            clearInterval(messageTimer);
            // After all celebration messages, show gift button
            setTimeout(() => setShowGift(true), 2000);
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

  // Handle starry night effect
  useEffect(() => {
    if (giftPhase === 2 && starryContainerRef.current) {
      createStarryNight(starryContainerRef.current);
    }
  }, [giftPhase]);
  
  // Handle the gift reveal phases
  const handleRevealGift = () => {
    setGiftPhase(1);
    setTimeout(() => setGiftPhase(2), 3000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Celebration Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-theme-black to-theme-red transition-all duration-1000 ease-in-out">
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* Celebration Messages */}
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
          
          {/* Gift Button that appears after celebration messages */}
          {showGift && giftPhase === 0 && (
            <Button 
              className="mt-12 px-6 py-4 bg-transparent border border-theme-white text-theme-white rounded-full hover:bg-theme-white hover:text-theme-black transition-all duration-300 animate-pulse"
              onClick={handleRevealGift}
              variant="outline"
              size="lg"
            >
              <span className="mr-2">❤️</span> Special Message
            </Button>
          )}
        </div>
      </div>
      
      {/* Hidden Gift Content - Phase 1: Initial fade in */}
      {giftPhase === 1 && (
        <div className="fixed inset-0 z-60 bg-theme-black animate-fadeIn flex items-center justify-center p-4">
          <p className="font-handwritten text-2xl md:text-3xl text-theme-white text-center max-w-md animate-fadeIn">
            "Some words are better left unspoken... But if they were to be said, they would sound something like this..."
          </p>
        </div>
      )}
      
      {/* Hidden Gift Content - Phase 2: Starry night with message */}
      {giftPhase === 2 && (
        <div 
          ref={starryContainerRef}
          className="fixed inset-0 z-60 bg-gradient-to-b from-theme-deepBlack to-theme-black flex flex-col items-center justify-center p-4 overflow-hidden"
        >
          <p className="font-serif text-xl md:text-2xl text-theme-white text-center max-w-md animate-fadeIn mb-2 z-10">
            ✨ For someone as rare as a falling star, may your wishes always come true. ✨
          </p>
          
          <Button 
            className="mt-8 px-6 py-2 bg-transparent border border-theme-white text-theme-white rounded-full hover:bg-theme-white hover:text-theme-black transition-all duration-300 z-10"
            onClick={() => setGiftPhase(0)}
            variant="outline"
          >
            Return to Celebration
          </Button>
        </div>
      )}
    </div>
  );
};

export default BirthdayCelebration;
