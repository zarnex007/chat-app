// Initialize Firebase
const firebaseConfig = {
  <script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBXBZsgnO4cbkGmZsSjE3ERrfpzcJ0XWkA",
    authDomain: "chat-app-332a1.firebaseapp.com",
    projectId: "chat-app-332a1",
    storageBucket: "chat-app-332a1.firebasestorage.app",
    messagingSenderId: "785682705348",
    appId: "1:785682705348:web:484d8aefcb4e0cd0445291"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
</script>
};

firebase.initializeApp(firebaseConfig);

// Database reference
const db = firebase.database();
const chatRef = db.ref("messages");

// Username
let username = localStorage.getItem("username");

// Login
function login() {
  const name = document.getElementById("username").value;
  if (name.trim() === "") return alert("Name enter pannu");

  localStorage.setItem("username", name);
  location.reload();
}

// Send message
function sendMessage() {
  const msgInput = document.getElementById("message");
  const msg = msgInput.value;

  if (msg.trim() === "") return;

  chatRef.push({
    user: username,
    text: msg,
    time: Date.now()
  });

  msgInput.value = "";
}

// Receive messages
chatRef.on("child_added", function (snapshot) {
  const data = snapshot.val();
  const chatBox = document.getElementById("chatBox");

  const div = document.createElement("div");
  div.className = data.user === username ? "msg sent" : "msg received";
  div.innerText = data.user + ": " + data.text;

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
});
