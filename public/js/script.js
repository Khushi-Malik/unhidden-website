document.addEventListener("DOMContentLoaded", function () {
  const allButtons = document.querySelectorAll(".searchBtn");
  const searchBar = document.querySelector(".searchBar");
  const searchInput = document.getElementById("searchInput");

  document.querySelector(".search-close")?.addEventListener("click", () => {
  searchBar.classList.remove("open");
});

  if (!searchBar || !searchInput) return; // safety guard

  allButtons.forEach(button => {
    button.addEventListener("click", function () {
    //   searchBar.style.visibility = "visible";
      searchBar.classList.add("open");
      this.setAttribute("aria-expanded", "true");
      searchInput.focus();
    });
  });
});
