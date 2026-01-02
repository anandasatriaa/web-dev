require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function checkAllModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    console.log("--- Mengecek Daftar Model Tersedia ---");
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
        const data = await response.json();
        
        if (data.models) {
            console.log("Model yang bisa kamu gunakan:");
            data.models.forEach(m => {
                console.log(`- ${m.name.replace('models/', '')} (${m.supportedGenerationMethods})`);
            });
        } else {
            console.log("Tidak ada model ditemukan. Pesan Error:", data);
        }
    } catch (error) {
        console.error("Gagal mengambil daftar model:", error.message);
    }
}

checkAllModels();