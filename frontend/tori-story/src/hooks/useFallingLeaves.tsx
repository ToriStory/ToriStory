/* eslint-disable @typescript-eslint/no-explicit-any */
declare const confetti: any;
export const firework = () => {
  const duration = 500;
  const animationEnd = Date.now() + duration;
  let skew = 1;

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  (function frame() {
    const timeLeft = animationEnd - Date.now();
    const ticks = Math.max(800, 1200 * (timeLeft / duration));

    skew = Math.max(0.8, skew - 0.001);

    const particleCount = 1;
    const colorsChip = ['#FB8914', '#FABF20', '#FA5A21'];
    for (let i = 0; i < particleCount; i++) {
      confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: ticks,
        origin: {
          x: Math.random(),
          y: Math.random() * skew + 0.3,
        },
        colors: [colorsChip[Math.floor(Math.random() * colorsChip.length)]],
        shapes: ['circle'],
        gravity: randomInRange(0.1, 0.3),
        scalar: randomInRange(1.5, 2),
        drift: randomInRange(-0.8, 0.8),
        zIndex: -1,
      });
    }

    if (timeLeft > 0) {
      requestAnimationFrame(frame);
    }
  })();
};
