const firstUserButton = document.getElementById("firstUser");
const secondUserButton = document.getElementById("secondUser");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const container = document.getElementById("messages-box");

let activeUser = null;
let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];

window.onload = () => {
  messages.forEach(msg => addMessage(msg.text, msg.user, false));
};

firstUserButton.addEventListener("click", () => {
  activeUser = "user1";
});

secondUserButton.addEventListener("click", () => {
  activeUser = "user2";
});

sendButton.addEventListener("click", () => {
  if (!activeUser) {
    alert("Select a user first!");
    return;
  }

  const text = userInput.value.trim();
  if (text !== "") {
    addMessage(text, activeUser, true);
    userInput.value = "";
  }
});

function addMessage(text, user, save = true) {
  const p = document.createElement("div");
  p.classList.add(user);
  p.textContent = text;
  container.appendChild(p);
  container.scrollTop = container.scrollHeight;

  if (save) {
    messages.push({ text, user });
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }
}
