class JobApplicationBot {
    constructor() {
        this.currentStep = 0;
        this.userData = {};
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.quickActions = document.getElementById('quickActions');
        
        this.steps = [
            {
                question: "Köszönöm! Most kérem az email címét, amelyen kapcsolatba tudunk lépni:",
                field: "email",
                validation: this.validateEmail,
                quickOptions: []
            },
            {
                question: "Kérem, adja meg a telefonszámát is:",
                field: "phone",
                validation: this.validatePhone,
                quickOptions: []
            },
            {
                question: "Hány éves tapasztalata van frontend fejlesztés területén?",
                field: "experience",
                validation: this.validateExperience,
                quickOptions: ["1-2 év", "3-5 év", "5+ év", "Kezdő vagyok"]
            },
            {
                question: "Mi motiválja Önt, hogy csapatunkhoz csatlakozzon?",
                field: "motivation",
                validation: this.validateMotivation,
                quickOptions: ["Új kihívások", "Csapatmunka", "Technológiai fejlődés", "Karrierépítés"]
            },
            {
                question: "Milyen fizetési elvárásai vannak? (nettó HUF/hó)",
                field: "salary",
                validation: this.validateSalary,
                quickOptions: ["400.000-500.000", "500.000-600.000", "600.000-700.000", "700.000+"]
            },
            {
                question: "Mikor tudna munkába állni?",
                field: "startDate",
                validation: this.validateStartDate,
                quickOptions: ["Azonnal", "1 hónap múlva", "2 hónap múlva", "Egyeztetés szerint"]
            }
        ];
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        this.messageInput.addEventListener('input', () => {
            this.sendButton.style.opacity = this.messageInput.value.trim() ? '1' : '0.5';
        });
    }
    
    sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;
        
        this.addUserMessage(message);
        this.messageInput.value = '';
        this.sendButton.style.opacity = '0.5';
        this.clearQuickActions();
        
        setTimeout(() => {
            this.processUserInput(message);
        }, 500);
    }
    
    addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    addBotMessage(message, delay = 1000) {
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.hideTypingIndicator();
            
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message bot-message';
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <img src="assets/petra.jpg" alt="Petra" class="avatar-image">
                </div>
                <div class="message-content">
                    <p>${message}</p>
                </div>
            `;
            this.chatMessages.appendChild(messageDiv);
            this.scrollToBottom();
        }, delay);
    }
    
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <img src="assets/petra.jpg" alt="Petra" class="avatar-image">
            </div>
            <div class="message-content">
                <p>Petra gépel
                    <span class="typing-dots">
                        <span class="typing-dot"></span>
                        <span class="typing-dot"></span>
                        <span class="typing-dot"></span>
                    </span>
                </p>
            </div>
        `;
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    processUserInput(input) {
        // Handle name input first (step 0)
        if (this.currentStep === 0) {
            if (this.validateName(input)) {
                this.userData.name = input;
                this.currentStep++;
                this.updateProgress();
                this.askNextQuestion();
            } else {
                this.addBotMessage("Kérem, adjon meg egy érvényes teljes nevet (vezetéknév és keresztnév).", 800);
            }
            return;
        }
        
        // Handle other steps
        const currentStepData = this.steps[this.currentStep - 1];
        
        if (currentStepData.validation.call(this, input)) {
            this.userData[currentStepData.field] = input;
            this.currentStep++;
            this.updateProgress();
            
            if (this.currentStep <= this.steps.length) {
                this.askNextQuestion();
            } else {
                this.showSummary();
            }
        } else {
            this.addBotMessage("Kérem, ellenőrizze a megadott adatot és próbálja újra.", 800);
            this.addQuickActions();
        }
    }
    
    askNextQuestion() {
        if (this.currentStep > this.steps.length) {
            this.showSummary();
            return;
        }
        
        const step = this.steps[this.currentStep - 1];
        
        setTimeout(() => {
            this.addBotMessage(step.question, 1000);
            setTimeout(() => {
                this.addQuickActions();
            }, 1500);
        }, 500);
    }
    
    addQuickActions() {
        if (this.currentStep === 0 || this.currentStep > this.steps.length) {
            return; // No quick actions for name input or after all steps
        }
        
        const step = this.steps[this.currentStep - 1];
        if (step && step.quickOptions.length > 0) {
            this.quickActions.innerHTML = '';
            
            step.quickOptions.forEach(option => {
                const button = document.createElement('button');
                button.className = 'quick-btn';
                button.textContent = option;
                button.addEventListener('click', () => {
                    this.messageInput.value = option;
                    this.sendMessage();
                });
                this.quickActions.appendChild(button);
            });
        }
    }
    
    clearQuickActions() {
        this.quickActions.innerHTML = '';
    }
    
    updateProgress() {
        // Progress bar removed
    }
    
    showSummary() {
        const summaryMessage = `
            Köszönöm a válaszait! Kérem, ellenőrizze a megadott adatokat:<br><br>
            <strong>Név:</strong> ${this.userData.name}<br>
            <strong>Email:</strong> ${this.userData.email}<br>
            <strong>Telefon:</strong> ${this.userData.phone}<br>
            <strong>Tapasztalat:</strong> ${this.userData.experience}<br>
            <strong>Motiváció:</strong> ${this.userData.motivation}<br>
            <strong>Fizetési elvárás:</strong> ${this.userData.salary}<br>
            <strong>Munkakezdés:</strong> ${this.userData.startDate}<br><br>
            Az adatok helyességének megerősítése esetén továbbítjuk jelentkezését a HR osztályra.
        `;
        
        this.addBotMessage(summaryMessage, 1000);
        
        setTimeout(() => {
            this.quickActions.innerHTML = '';
            
            const confirmBtn = document.createElement('button');
            confirmBtn.className = 'quick-btn';
            confirmBtn.textContent = 'Adatok megerősítése';
            confirmBtn.style.background = 'linear-gradient(135deg, #1e90ff 0%, #00d4aa 100%)';
            confirmBtn.style.color = 'white';
            confirmBtn.style.borderColor = 'transparent';
            confirmBtn.style.boxShadow = '0 4px 15px rgba(30, 144, 255, 0.3)';
            confirmBtn.addEventListener('click', () => this.submitApplication());
            
            const editBtn = document.createElement('button');
            editBtn.className = 'quick-btn';
            editBtn.textContent = 'Adatok módosítása';
            editBtn.addEventListener('click', () => this.startOver());
            
            this.quickActions.appendChild(confirmBtn);
            this.quickActions.appendChild(editBtn);
        }, 2000);
    }
    
    submitApplication() {
        this.clearQuickActions();
        this.addBotMessage("Feldolgozom a jelentkezését...", 1000);
        
        setTimeout(() => {
            this.addBotMessage(`
                Köszönjük, ${this.userData.name}!<br><br>
                A jelentkezését sikeresen rögzítettük a rendszerünkben.<br><br>
                <strong>A folyamat további lépései:</strong><br>
                • 1-2 munkanapon belül felvesszük Önnel a kapcsolatot<br>
                • Amennyiben profilja megfelel az elvárásoknak, meghívjuk személyes beszélgetésre<br>
                • A teljes folyamat 1-2 hetet vesz igénybe<br><br>
                Addig is követheti a TechCorp Hungary karrierlehetőségeit a Profession.hu oldalán.
            `, 2000);
            
            setTimeout(() => {
                
                // Restart button
                const restartBtn = document.createElement('button');
                restartBtn.className = 'quick-btn';
                restartBtn.textContent = 'Új jelentkezés indítása';
                restartBtn.style.background = 'linear-gradient(135deg, #1e90ff 0%, #00d4aa 100%)';
                restartBtn.style.color = 'white';
                restartBtn.style.borderColor = 'transparent';
                restartBtn.style.boxShadow = '0 4px 15px rgba(30, 144, 255, 0.3)';
                restartBtn.addEventListener('click', () => this.startOver());
                
                this.quickActions.appendChild(restartBtn);
            }, 2500);
        }, 1500);
    }
    
    startOver() {
        this.currentStep = 0;
        this.userData = {};
        this.chatMessages.innerHTML = `
            <div class="message bot-message">
                <div class="message-avatar">
                    <img src="assets/petra.jpg" alt="Petra" class="avatar-image">
                </div>
                <div class="message-content">
                                            <p>Üdvözlöm! Petra vagyok, a profession.hu toborzási asszisztense.</p>
                                            <p>Köszönöm az érdeklődését az XYZ Technology Kft-nél a Senior Frontend fejlesztő munkakörrel kapcsolatban. Szívesen végigvezetem a jelentkezési folyamaton, amely mindössze néhány percet vesz igénybe.</p>
                    <p>Kezdjük az alapadatokkal. Kérem, adja meg a teljes nevét:</p>
                </div>
            </div>
        `;
        

        this.clearQuickActions();
        this.messageInput.focus();
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    // Validation functions
    validateName(name) {
        return name.length >= 2 && name.includes(' ');
    }
    
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    validatePhone(phone) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{8,}$/;
        return phoneRegex.test(phone);
    }
    
    validateExperience(experience) {
        return experience.length > 0;
    }
    
    validateMotivation(motivation) {
        return motivation.length >= 10;
    }
    
    validateSalary(salary) {
        return salary.length > 0;
    }
    
    validateStartDate(startDate) {
        return startDate.length > 0;
    }
}

// Initialize the bot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new JobApplicationBot();
}); 