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
    const shortenedLink = `${res.request.responseURL}${res.data.seq}`;
    displayShortenedLink(shortenedLink);
  } catch (err) {
    alert(err.response.data.error);
  }
}

function displayShortenedLink(link) {
  const linkContainer = document.getElementById("linkContainer");
  const shortenedLink = document.getElementById("shortenedLink");

  shortenedLink.href = link;
  shortenedLink.textContent = link;
  linkContainer.style.display = "block";
}
