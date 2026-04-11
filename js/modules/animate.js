export function initScrollAnimations(threshold = 0.12) {
  const targets = document.querySelectorAll("[data-animate]");

  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold },
  );

  targets.forEach((el) => observer.observe(el));
}
