// ==== Chatbot Toggle and UI Elements ====
const toggleBtn = document.getElementById('chatbot-toggle');
const chatbot = document.getElementById('chatbot');
const closeBtn = document.getElementById('close-chatbot');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chatbot-messages');

toggleBtn.addEventListener('click', () => {
  chatbot.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
  chatbot.style.display = 'none';
});

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') sendMessage();
});

// ==== Response Dictionary ====
const responseDictionary = {
  "about_me": "I'm highly passionate about Machine Learning and Data Science, always exploring new ways to extract insights from data and build intelligent systems.",
  "certifications": "I've completed the IBM Data Science Professional Certificate, Google Data Analytics Professional Certificate, IBM Full Stack Development, and more.",
  "contact": "You can contact me using the contact form available on the website. I'll get back to you soon!",
  "education": "I graduated with a BSc in Computer Science from Government Victoria College with a CGPA of 8.525 (85%).",
  "experience": "I’ve interned at Afame Technologies and Code Alpha as a Web Developer, gaining experience in both front-end and back-end technologies.",
  "hobbies": "Outside of coding, I enjoy playing table tennis, staying up to date with tech trends, and working on ML side projects.",
  "projects": "My portfolio includes projects like a Sign Language to Text app using EfficientNet, Emotion Recognition with CNN, and a Website Builder using PyQt and Electron.",
  "resume": "You can download my resume from the portfolio or request it through the contact form.",
  "skills": "I'm skilled in Python, SQL, JavaScript, Flask, Pandas, Scikit-learn, and ML model deployment.",
  "tech_stack": "My tech stack includes Python, HTML/CSS/JS, Flask, PyTorch, TensorFlow, SQLite, Git, and tools like Jupyter and Tableau.",
  "fallback": "Sorry, I didn't quite get that. Could you please rephrase your question?"
};

// ==== Message Handling Logic ====
async function sendMessage() {
  const msg = userInput.value.trim();
  if (!msg) return;

  appendMessage('user', msg);
  userInput.value = '';

  try {
    const res = await fetch("https://afzal12345-my-chatbot-backend.hf.space/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: msg })
    });

    const data = await res.json();
    const intent = data.intent || "fallback";
    const reply = responseDictionary[intent] || responseDictionary["fallback"];
    appendMessage("bot", reply);
  } catch (err) {
    appendMessage("bot", "Error connecting to server.");
  }
}

// ==== Append Message to Chat ====
function appendMessage(sender, text) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender);
  msgDiv.innerText = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
