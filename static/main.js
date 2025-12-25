document.getElementById("year").textContent = new Date().getFullYear();

(function setupCarousel(){
  const track = document.querySelector("[data-carousel-track]");
  if (!track) return;

  const prevBtn = document.querySelector("[data-carousel-prev]");
  const nextBtn = document.querySelector("[data-carousel-next]");
  const dotsWrap = document.querySelector("[data-carousel-dots]");

  const cards = Array.from(track.querySelectorAll(".pcard"));

  // Build dots
  const dots = cards.map((_, i) => {
    const b = document.createElement("button");
    b.className = "dotbtn";
    b.type = "button";
    b.setAttribute("aria-label", `Go to item ${i+1}`);
    b.addEventListener("click", () => {
      cards[i].scrollIntoView({behavior:"smooth", inline:"start", block:"nearest"});
    });
    dotsWrap.appendChild(b);
    return b;
  });

  function setActiveDot(){
    // Find the left-most visible card
    const trackRect = track.getBoundingClientRect();
    let bestIdx = 0;
    let bestDist = Infinity;

    cards.forEach((card, i) => {
      const r = card.getBoundingClientRect();
      const dist = Math.abs(r.left - trackRect.left);
      if (dist < bestDist) { bestDist = dist; bestIdx = i; }
    });

    dots.forEach((d, i) => d.setAttribute("aria-current", i === bestIdx ? "true" : "false"));
  }

  function scrollByOne(dir){
    // scroll by one card width (+ gap)
    const firstCard = cards[0];
    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = 14; // keep consistent with CSS gap
    track.scrollBy({ left: dir * (cardWidth + gap), behavior: "smooth" });
  }

  prevBtn?.addEventListener("click", () => scrollByOne(-1));
  nextBtn?.addEventListener("click", () => scrollByOne(1));

  track.addEventListener("scroll", () => {
    window.requestAnimationFrame(setActiveDot);
  });

  // Init
  setActiveDot();
})();
