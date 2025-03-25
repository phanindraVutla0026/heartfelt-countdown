
/**
 * Creates a heart or sparkle element following mouse movement
 */
export const createFollowElement = (
  e: MouseEvent | TouchEvent,
  type: 'heart' | 'sparkle'
): void => {
  const element = document.createElement('div');
  element.className = 'floating-heart';

  // Set color based on type (red for hearts, white for sparkles)
  const color = type === 'heart' ? '#e53935' : '#ffffff';
  
  if (type === 'heart') {
    element.innerHTML = '❤️';
    element.style.fontSize = `${Math.random() * 10 + 10}px`;
  } else {
    element.innerHTML = '✨';
    element.style.fontSize = `${Math.random() * 8 + 8}px`;
  }

  // Get position for the element
  let x, y;
  if ('clientX' in e) { // MouseEvent
    x = e.clientX;
    y = e.clientY;
  } else { // TouchEvent
    const touch = e.touches[0];
    x = touch.clientX;
    y = touch.clientY;
  }

  // Positioning
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
  element.style.opacity = '0.8';
  element.style.position = 'fixed';
  element.style.pointerEvents = 'none';
  element.style.zIndex = '9999';
  
  // Add to document and animate
  document.body.appendChild(element);
  
  // Add randomness to animation
  const randomX = (Math.random() - 0.5) * 100;
  element.animate(
    [
      { transform: `translate(0, 0) rotate(0deg)`, opacity: 0.8 },
      { transform: `translate(${randomX}px, -100px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ],
    {
      duration: 1500 + Math.random() * 1000,
      easing: 'cubic-bezier(0.37, 0, 0.63, 1)',
      fill: 'forwards'
    }
  );
  
  // Remove element after animation completes
  setTimeout(() => {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }, 2500);
};

/**
 * Create confetti element with specific colors
 */
export const createConfetti = () => {
  const colors = ['#e53935', '#ffffff', '#121212']; // Red, White, Black
  const confettiCount = 150;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.zIndex = '1000';
    confetti.style.width = `${Math.random() * 10 + 5}px`;
    confetti.style.height = `${Math.random() * 10 + 5}px`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.top = `-50px`;
    confetti.style.opacity = '0.8';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    
    document.body.appendChild(confetti);
    
    // Animate falling confetti
    const randomX = (Math.random() - 0.5) * 100;
    const randomDuration = Math.random() * 3 + 2;
    
    confetti.animate(
      [
        { transform: 'translateY(0) rotate(0)', opacity: 0.8 },
        { transform: `translateY(100vh) translateX(${randomX}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
      ],
      {
        duration: randomDuration * 1000,
        easing: 'cubic-bezier(0.37, 0, 0.63, 1)',
        fill: 'forwards'
      }
    );
    
    // Remove confetti element after animation
    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.parentNode.removeChild(confetti);
      }
    }, randomDuration * 1000);
  }
};

/**
 * Creates a starry night sky effect
 */
export const createStarryNight = (container: HTMLElement) => {
  const starCount = 100;
  
  // Clear any existing stars
  const existingStars = container.querySelectorAll('.star');
  existingStars.forEach((star) => star.remove());
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random size from 1-3px
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Random position within container
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    
    // Random animation delay for twinkling effect
    star.style.animationDelay = `${Math.random() * 3}s`;
    
    container.appendChild(star);
  }
  
  // Add shooting star occasionally
  setInterval(() => {
    if (Math.random() > 0.7) {
      const shootingStar = document.createElement('div');
      shootingStar.className = 'star';
      shootingStar.style.width = '2px';
      shootingStar.style.height = '2px';
      shootingStar.style.left = `${Math.random() * 100}%`;
      shootingStar.style.top = `${Math.random() * 30}%`;
      shootingStar.style.boxShadow = '0 0 5px 1px rgba(255, 255, 255, 0.5)';
      
      shootingStar.animate(
        [
          { transform: 'translateX(0) translateY(0)', opacity: 1 },
          { transform: 'translateX(150px) translateY(150px)', opacity: 0 }
        ],
        {
          duration: 1000,
          easing: 'ease-in',
          fill: 'forwards'
        }
      );
      
      container.appendChild(shootingStar);
      
      setTimeout(() => {
        shootingStar.remove();
      }, 1000);
    }
  }, 3000);
};

/**
 * Play background music
 */
export const playMusic = async (audioFile: string) => {
  try {
    const audio = new Audio(audioFile);
    audio.volume = 0.5;
    await audio.play();
    
    // Fade out the music after 60 seconds
    setTimeout(() => {
      const fadeAudio = setInterval(() => {
        if (audio.volume > 0.1) {
          audio.volume -= 0.1;
        } else {
          audio.pause();
          clearInterval(fadeAudio);
        }
      }, 200);
    }, 60000);
    
    return audio;
  } catch (error) {
    console.error("Error playing audio:", error);
    return null;
  }
};
