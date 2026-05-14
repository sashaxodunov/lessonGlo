const animate = ({ duration, draw, done }) => {
  const start = performance.now();

  function frame(time) {
    let progress = (time - start) / duration;

    if (progress > 1) {
      progress = 1;
    }

    draw(progress);

    if (progress < 1) {
      requestAnimationFrame(frame);
    } else if (done) {
      done();
    }
  }

  requestAnimationFrame(frame);
};

export { animate };
