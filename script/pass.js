document.addEventListener("DOMContentLoaded", () => {
  const abc = "abcdefghijklmnopqrstuvwxyz",
        number = document.getElementById("number"),
        generate = document.getElementById("generate"),
        password = document.getElementById("password"),
        copy = document.getElementById("copy"),
        clear = document.getElementById("clear");
  var options = "";

  for (let i = 1; i < 27; i++)
    options += "<option>" + i;
  number.innerHTML = options;

  generate.addEventListener("click", () => {
    const buffer_len = number.value-1;
    var buffer = "",
        charset = abc;
    for (let i = 0; i < buffer_len; i++) {
      while (true) {
        let pos = Math.floor(Math.random() * charset.length),
            str_new_tmp = charset.substring(pos, pos+1),
            tmp = buffer.indexOf(str_new_tmp);
        if (tmp === -1) {
          buffer += str_new_tmp;
          break
        }
        else
          charset = charset.replace(str_new_tmp, "");
      }
    }
    charset = abc;
    while (true) {
      let pos = Math.floor(Math.random() * charset.length),
          new_tmp = charset.substring(pos, pos+1),
          tmp = buffer.indexOf(new_tmp);
      if (tmp === -1) {
        const insert_pos = Math.floor(Math.random() * buffer_len);
        var result = buffer.substring(0, insert_pos) + new_tmp + buffer.substring(insert_pos, buffer_len);
        break
      }
      else
        charset = charset.replace(new_tmp, "");
    }
    password.value = result;
  });

  copy.addEventListener("click", () => {
    navigator.clipboard.writeText(password.value);
    copy.innerText = "Copied!";
    copy.classList.add("copied");
  });

  copy.addEventListener("blur", () => {
    copy.innerText = "Copy";
    copy.classList.remove("copied");
  });

  clear.addEventListener("click", () => password.value = "");
});