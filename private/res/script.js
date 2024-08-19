document.addEventListener("DOMContentLoaded", () => {
  var a_fetch = true,
      result = "";
  const textarea = document.querySelector("textarea"),
        p = document.querySelector("p");
  document.querySelector("button").addEventListener("click", event => {
    const button = event.currentTarget;
    if (a_fetch) {
      textarea.readOnly = true;
      button.disabled = true;
      const links = textarea.value.split("\n"),
            len = links.length;
            duration = 30;
      (async () => {
        for (let i = 1; i < (len+1); i++) {
          if ((len > 20) && (i % 20 === 0) && (i !== len)) {
            p.style.visibility = "visible";
            if (len > 40) {
              document.getElementById("qty").style.visibility = "visible";
              document.getElementById("num").textContent = Math.round((len-i)/20);
            }
            await new Promise(resolve => {
              var start = Date.now();
              function timer() {
                var diff = duration - (((Date.now() - start)/1000) | 0),
                    seconds = (diff % 60) | 0;
                document.getElementById("time").textContent = seconds;
                if (diff === 0)
                  clearInterval(id);
              }
              timer();
              const id = setInterval(timer, 1000);
              setTimeout(resolve, duration*1000);
            });
          }
          const video = links[i-1];
          fetch(video)
            .then(response => response.text())
            .then(html => {
              const date = html.split("video_date_published").pop().match(/[0-9]+/)[0],
                    thumbnail = new DOMParser().parseFromString(html, "text/html").getElementById("videoElementPoster").src;
              result += date + " " + video + " " + thumbnail.substring(0, thumbnail.indexOf("?cache")) + "\n";
              if (i === len) {
                a_fetch = false;
                p.remove();
                textarea.style.width = "1325px";
                textarea.value = result.trim().split("\n").sort().join("\n");
                button.textContent = "Copy";
                button.disabled = false;
              }
            });
        }
      })();
    }
    else
      navigator.clipboard.writeText(textarea.value);
  });
});