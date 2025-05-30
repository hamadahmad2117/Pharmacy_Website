// Chatbot Functionality
const chatbotButton = document.getElementById('chatbot-button');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotForm = document.getElementById('chatbot-form');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');

// Disease information database
const diseaseDatabase = {
    cold: {
        symptoms: "Runny nose, sore throat, cough, sneezing, mild fever.",
        allopathic: "Over-the-counter cold relief (e.g., Cold & Flu Relief, $15.99, available on our menu page), antihistamines, decongestants.",
        homeopathic: "Aconite (for sudden onset), Allium Cepa (for runny nose), Oscillococcinum (for early stages).",
    },
    flu: {
        symptoms: "High fever, body aches, fatigue, cough, headache, sore throat.",
        allopathic: "Antiviral medications like Tamiflu (prescription required, contact pharmacy), pain relievers like ibuprofen ($12.99, available on our menu page).",
        homeopathic: "Gelsemium (for fever and weakness), Bryonia (for body aches), Eupatorium Perfoliatum (for bone pain).",
    },
    headache: {
        symptoms: "Pain in the head, sensitivity to light or sound, possible nausea.",
        allopathic: "Pain relief medications like ibuprofen or acetaminophen ($12.99, available on our menu page), migraine-specific drugs (prescription required).",
        homeopathic: "Belladonna (for throbbing pain), Nux Vomica (for tension headaches), Bryonia (for headaches worsened by movement).",
    },
    // Add more diseases as needed
};

// Toggle chatbot window
chatbotButton.addEventListener('click', () => {
    chatbotWindow.classList.toggle('hidden');
});

// Close chatbot window
chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.add('hidden');
});

// Handle form submission
chatbotForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userMessage = chatbotInput.value.trim();
    if (!userMessage) return;

    // Add user message to chat
    addMessage(userMessage, 'user-message');
    chatbotInput.value = '';

    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    // Get AI response
    const botResponse = await getAIResponse(userMessage);
    addMessage(botResponse, 'bot-message');

    // Scroll to bottom again
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
});

// Add message to chat window
function addMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.textContent = text;
    chatbotMessages.appendChild(messageDiv);
}

// Enhanced AI response function
async function getAIResponse(message) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const lowerMessage = message.toLowerCase();
    const disclaimer = "\n\n**Disclaimer**: This information is for general guidance only. Please consult a healthcare professional for proper diagnosis and treatment.";

    // Check for disease-related queries
    for (const disease in diseaseDatabase) {
        if (lowerMessage.includes(disease)) {
            const info = diseaseDatabase[disease];
            return `**${disease.charAt(0).toUpperCase() + disease.slice(1)} Information**:\n- **Symptoms**: ${info.symptoms}\n- **Allopathic Medicines**: ${info.allopathic}\n- **Homeopathic Medicines**: ${info.homeopathic}${disclaimer}`;
        }
    }

    // Existing keyword-based responses
    if (lowerMessage.includes('amoxicillin')) {
        return 'Amoxicillin is a broad-spectrum antibiotic available in capsules and suspension forms. It requires a valid prescription. Would you like to contact our pharmacy for more details?' + disclaimer;
    } else if (lowerMessage.includes('delivery')) {
        return 'We offer free same-day delivery within a 5km radius, with temperature-controlled vehicles and real-time tracking. Would you like to schedule a delivery?';
    } else if (lowerMessage.includes('vitamin')) {
        return 'We have a range of vitamins, including Vitamin C 1000mg for immune support and Daily Multivitamin Complex. Check them out on our Vitamins page!';
    } else {
        return 'I’m here to help! You can ask about our medications, services, or a specific disease (e.g., "cold," "flu," "headache") for symptoms and treatment options.' + disclaimer;
    }

    // Optional: Uncomment for actual Grok API integration
    /*
    try {
        const response = await fetch('https://api.x.ai/grok', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY',
            },
            body: JSON.stringify({ message: message })
        });
        const data = await response.json();
        return data.response || 'Sorry, I couldn’t process that. Please try again!' + disclaimer;
    } catch (error) {
        return 'Error connecting to the AI service. Please try again later.' + disclaimer;
    }
    */
}