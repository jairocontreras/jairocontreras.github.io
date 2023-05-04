document.addEventListener("DOMContentLoaded", () => {
  const hidden = document.getElementById("hidden");
  document.getElementById("startup").addEventListener("click", function() {
    this.classList.toggle("collapse");
    hidden.style.height = (!hidden.offsetHeight ? hidden.scrollHeight + "px" : 0);
  });
});