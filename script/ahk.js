window.addEventListener("load", () => {
  const hidden = document.getElementById("hidden");
  document.getElementById("startup").addEventListener("click", function() {
    this.classList.toggle("collapse");
    hidden.style.height = (hidden.offsetHeight == 0 ? hidden.scrollHeight + "px" : 0);
  });
});