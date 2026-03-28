const stars = document.querySelectorAll(".rating span");
const ratingText = document.getElementById("ratingText");

let savedRating = 0;

// Hover-Effekt
stars.forEach(star => {
  star.addEventListener("mouseover", () => {
    const value = star.dataset.value;

    stars.forEach(s => {
      s.classList.toggle("hover", s.dataset.value <= value);
    });
  });

  star.addEventListener("mouseout", () => {
    stars.forEach(s => s.classList.remove("hover"));
  });
});

// Klick = Bewertung speichern
stars.forEach(star => {
  star.addEventListener("click", () => {
    savedRating = star.dataset.value;

    stars.forEach(s => {
      s.classList.toggle("active", s.dataset.value <= savedRating);
    });

    ratingText.textContent = `Bewertung: ${savedRating} Sterne`;
  });
});
