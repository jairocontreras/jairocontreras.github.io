window.addEventListener("load", function() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz",
        number = document.getElementById("number"),
        generate = document.getElementById("generate"),
        result = document.getElementById("result"),
        copy = document.getElementById("copy"),
        clear = document.getElementById("clear");
  var options = "";

  for (let i = 1; i < 27; i++) {
    options += "<option>" + i;
  }
  number.innerHTML += options;

  generate.addEventListener("click", function() {
    const length = number.value,
          buffer_len = length-1;
    var buffer = "",
        charset = alphabet;
    for (let i = 0; i < buffer_len; i++) {
      while (true) {
        let pos = Math.floor(Math.random() * charset.length),
            strNewTmp = charset.substring(pos, pos+1),
            tmp = buffer.indexOf(strNewTmp);
        if (tmp == -1) {
          buffer += strNewTmp;
          break
        }
        else
          charset = charset.replace(strNewTmp, "");
      }
    }
    charset = alphabet;
    while (true) {
      let pos = Math.floor(Math.random() * charset.length),
          new_tmp = charset.substring(pos, pos+1),
          tmp = buffer.indexOf(new_tmp);
      if (tmp == -1) {
        const insert_pos = Math.floor(Math.random() * buffer_len);
        var _result = buffer.substring(0, insert_pos) + new_tmp + buffer.substring(insert_pos, buffer_len);
        break
      }
      else
        charset = charset.replace(new_tmp, "");
    }
    result.value = _result;
  });

  copy.addEventListener("click", function() {
    navigator.clipboard.writeText(result.value);
    this.innerText = "Copied!";
    this.classList.add("copied");
  });

  copy.addEventListener("blur", function() {
    this.innerText = "Copy";
    this.classList.remove("copied");
  });

  clear.addEventListener("click", function() {
    result.value = "";
  });
});