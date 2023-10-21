const generateButton = document.getElementById("generateButton");
const copyButton = document.getElementById("copyButton");

if (generateButton) {
  generateButton.addEventListener("click", (e) => {
    e.preventDefault();
    const inputLink = document.getElementById("inputLink");
    const inputCustom = document.getElementById("inputCustom");
    const link = inputLink.value;
    const suffix = inputCustom.value;
    if (suffix) {
      generateShortUrl(link, suffix);
    } else {
      generateShortUrl(link);
    }
  });
}

if (copyButton) {
  copyButton.addEventListener("click", (e) => {
    e.preventDefault();
    const shortenedLink = document.getElementById("shortenedLink");
    copyToClipboard(shortenedLink.href);
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
  const messageContainer = document.getElementById("messageContainer");
  messageContainer.textContent = e;
  messageContainer.style.display = "block";
  messageContainer.style.color = "red";
}

function hideError() {
  const messageContainer = document.getElementById("messageContainer");
  messageContainer.style.display = "none";
}

function hideShortenedLink() {
  const linkContainer = document.getElementById("linkContainer");
  linkContainer.style.display = "none";
}

function copyToClipboard(link) {
  navigator.clipboard.writeText(link).then(() => callbackCopyToClipboard("Link copied to Clipboard"));
}

function callbackCopyToClipboard(text) {
  const messageContainer = document.getElementById("messageContainer");

  messageContainer.style.display = "block";
  messageContainer.style.color = "green";
  messageContainer.textContent = text;
}
