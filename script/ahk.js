const content = document.getElementById("content");
document.getElementById("expand").addEventListener("click", function() {
  this.classList.toggle("collapse");
  content.style.height = (content.offsetHeight == 0 ? content.scrollHeight : 0);
});