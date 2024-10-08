window.addEventListener("load", () => {
  const test = document.querySelector(".bc-logo");
  const tab_switchers = document.querySelectorAll("[data-switcher]");

  for (let i = 0; i < tab_switchers.length; i++) {
    const tab_switcher = tab_switchers[i];
    const page_id = tab_switcher.dataset.tab;

    tab_switcher.addEventListener("click", () => {
      test.classList.remove("is-active");
      tab_switcher.parentNode.classList.add("is-active");
      SwitchPage(page_id);
    });
  }
  function SwitchPage(page_id) {
    console.log(page_id);

    const current_page = document.querySelector(".pages .page.is-active");
    current_page.classList.remove("is-active");
    current_page.setAttribute("hidden", "");
    const next_page = document.querySelector(
      `.pages .page[data-page="${page_id}"]`
    );
    next_page.classList.add("is-active");
    next_page.removeAttribute("hidden");
  }
});
// Loops through dropdown buttons (switches between hidden and unhidden)
var dropdown = document.getElementsByClassName("my-button");
var i;
for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

//meta-llama API call request
const OPENROUTER_API_KEY = "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";
const generateResponse = (incomingChatli) => {
    const API_url = "https://openrouter.ai/api/v1/chat/completions";
    const messageElement = incomingChatli.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "meta-llama/llama-3.1-8b-instruct:free",
            "messages": [{"role": "user", "content": userMessage}]
        })
    }
    fetch(API_url, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
      messageElement.textContent = "Oops! Something went wrong. Please try again!" 
    }).finally(() => chatBox.scrollTo(0, chatBox.scrollHeight));
};

//Chatbot messsage handling
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatBox = document.querySelector(".chatbox");
const chatToggler = document.querySelector(".chatbot-toggler");
const chatBotCloseBtn = document.querySelector(".close-btn");

let userMessage;

const createChatli = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent = className === "outgoing" ? `<p>` : `<span class="material-symbols-outlined">smart_toy</span><p><p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
}


const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatInput.value = "";

    chatBox.appendChild(createChatli(userMessage, "outgoing"));
    chatBox.scrollTo(0, chatBox.scrollHeight);

    setTimeout(() => {
      const incomingChatli = createChatli("Thinking....", "incoming")
      chatBox.appendChild(incomingChatli);
      chatBox.scrollTo(0, chatBox.scrollHeight);
      generateResponse(incomingChatli);
    }, 600)
}

chatBotCloseBtn.addEventListener("click", () => document.getElementById("chatbot-con").classList.remove("show-chatbot"));
chatToggler.addEventListener("click", () => document.getElementById("chatbot-con").classList.toggle("show-chatbot"));
sendChatBtn.addEventListener("click", handleChat);

//Animations 
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  }));
});
const subSectionElements = document.querySelectorAll(".sub-section");
subSectionElements.forEach((el) => observer.observe(el));
