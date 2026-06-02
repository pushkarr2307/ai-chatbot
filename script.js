const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("userInput");

function addMessage(message, sender) {
    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message", sender);
    messageDiv.textContent = message;

    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {

    const message = userInput.value.trim();

    if (message === "") return;

    addMessage(message, "user");

    userInput.value = "";

    try {

        const response = await fetch(
            "http://localhost:3000/chat",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: message
                })
            }
        );

        const data = await response.json();

        addMessage(data.reply, "bot");

    } catch (error) {

        addMessage("Server connection error ❌", "bot");
        console.error(error);

    }
}

userInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});