require("dotenv").config();
const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  console.log("User bertanya:", prompt);

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ message: text });
  } catch (error) {
    console.error("Error Detail:", error.message);
    res.status(500).json({ message: "Maaf, AI sedang sibuk. Coba lagi dalam 1 menit." });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Chatbot Berjalan di http://localhost:${PORT}`);
});