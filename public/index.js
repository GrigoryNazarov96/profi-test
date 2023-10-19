const button = document.querySelector("button");
const input_link = document.querySelector(".input_link");
const input_custom = document.querySelector(".input_custom");

if (button) {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const link = input_link.value;
    const suffix = input_custom.value;
    if (suffix) {
      generateShortUrl(link, suffix);
    } else {
      generateShortUrl(link);
    }
  });
}

async function generateShortUrl(str, suffix) {
  try {
    const res = await axios({
      method: "POST",
      url: "/",
      data: { originalLink: str, customSeq: suffix },
    });
    alert(`Your shorten link is: ${res.request.responseURL}${res.data.seq}`);
  } catch (err) {
    alert(err.response.data.error);
  }
}
