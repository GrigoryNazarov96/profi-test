const button = document.getElementById("generateButton");
const inputLink = document.getElementById("inputLink");
const inputCustom = document.getElementById("inputCustom");

if (button) {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const link = inputLink.value;
    const suffix = inputCustom.value;
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
    hideError();
    displayShortenedLink(shortenedLink);
  } catch (err) {
    hideShortenedLink();
    displayError(err.response.data.error);
  }
}

function displayShortenedLink(link) {
  const linkContainer = document.getElementById("linkContainer");
  const shortenedLink = document.getElementById("shortenedLink");

  shortenedLink.href = link;
  shortenedLink.textContent = link;
  linkContainer.style.display = "block";
}

function displayError(e) {
  const errorContainer = document.getElementById("errorContainer");
  errorContainer.textContent = e;
  errorContainer.style.display = "block";
}

function hideError() {
  const errorContainer = document.getElementById("errorContainer");
  errorContainer.style.display = "none";
}

function hideShortenedLink() {
  const linkContainer = document.getElementById("linkContainer");
  linkContainer.style.display = "none";
}
