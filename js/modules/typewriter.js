const PHRASES = ["Cloud | DevOps | Systèmes d'information | Développement web"];

const CONFIG = {
  typingSpeed: 75,
  deletingSpeed: 40,
  pauseAfterEnd: 1800,
  pauseBeforeType: 300,
  startDelay: 800,
};

export function initTypewriter() {
  const target = document.getElementById("typewriter-text");
  if (!target) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const currentPhrase = PHRASES[phraseIndex];

    if (!isDeleting) {
      charIndex++;
      target.textContent = currentPhrase.slice(0, charIndex);

      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(tick, CONFIG.pauseAfterEnd);
        return;
      }
      setTimeout(tick, CONFIG.typingSpeed);
    } else {
      charIndex--;
      target.textContent = currentPhrase.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % PHRASES.length;
        setTimeout(tick, CONFIG.pauseBeforeType);
        return;
      }
      setTimeout(tick, CONFIG.deletingSpeed);
    }
  }

  setTimeout(tick, CONFIG.startDelay);
}
