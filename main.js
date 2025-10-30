// Healthcare AI Assistant - Main JavaScript

// Gemini AI Configuration
const GEMINI_CONFIG = {
    API_KEY: 'AIzaSyCPJYlKpIqOXE3g6EzKhuiwiyYlEPqW0nI',
    MODEL: 'gemini-2.5-flash',
    API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'
};

class HealthcareAI {
    constructor() {
        this.symptoms = [];
        this.allSymptoms = [];
        this.symptomData = {};
        this.userProfile = this.loadUserProfile();
        this.initializeApp();
    }

    async initializeApp() {
        try {
            // Load symptom data
            await this.loadSymptomData();
            
            // Initialize UI components
            this.initializeSymptomChecker();
            this.initializeBodyMap();
            this.initializeVoiceInput();
            
            console.log('Healthcare AI Assistant initialized successfully');
        } catch (error) {
            console.error('Failed to initialize app:', error);
        }
    }

    async loadSymptomData() {
        // Comprehensive symptom database based on the training data
        this.allSymptoms = [
            'itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering',
            'chills', 'joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue',
            'muscle_wasting', 'vomiting', 'burning_micturition', 'spotting_urination', 'fatigue',
            'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss',
            'restlessness', 'lethargy', 'patches_in_throat', 'irregular_sugar_level', 'cough',
            'high_fever', 'sunken_eyes', 'breathlessness', 'sweating', 'dehydration',
            'indigestion', 'headache', 'yellowish_skin', 'dark_urine', 'nausea',
            'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 'constipation', 'abdominal_pain',
            'diarrhoea', 'mild_fever', 'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure',
            'fluid_overload', 'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision',
            'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose',
            'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements',
            'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness',
            'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels',
            'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties', 'excessive_hunger',
            'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain',
            'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements',
            'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort',
            'foul_smell_ofurine', 'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)',
            'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body',
            'belly_pain', 'abnormal_menstruation', 'dischromic_patches', 'watering_from_eyes', 'increased_appetite',
            'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration',
            'visual_disturbances', 'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma', 'stomach_bleeding',
            'distention_of_abdomen', 'history_of_alcohol_consumption', 'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations',
            'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling',
            'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose',
            'yellow_crust_ooze'
        ];

        // Symptom severity mapping (from Symptom-severity.csv)
        this.symptomSeverity = {
            'itching': 1, 'skin_rash': 3, 'nodal_skin_eruptions': 4, 'continuous_sneezing': 4, 'shivering': 5,
            'chills': 3, 'joint_pain': 3, 'stomach_pain': 5, 'acidity': 3, 'ulcers_on_tongue': 4,
            'muscle_wasting': 3, 'vomiting': 5, 'burning_micturition': 6, 'spotting_urination': 6, 'fatigue': 4,
            'weight_gain': 3, 'anxiety': 4, 'cold_hands_and_feets': 5, 'mood_swings': 3, 'weight_loss': 3,
            'restlessness': 5, 'lethargy': 2, 'patches_in_throat': 6, 'irregular_sugar_level': 5, 'cough': 4,
            'high_fever': 7, 'sunken_eyes': 3, 'breathlessness': 4, 'sweating': 3, 'dehydration': 4,
            'indigestion': 5, 'headache': 3, 'yellowish_skin': 3, 'dark_urine': 4, 'nausea': 5,
            'loss_of_appetite': 4, 'pain_behind_the_eyes': 4, 'back_pain': 3, 'constipation': 4, 'abdominal_pain': 4,
            'diarrhoea': 6, 'mild_fever': 5, 'yellow_urine': 4, 'yellowing_of_eyes': 4, 'acute_liver_failure': 6,
            'fluid_overload': 6, 'swelling_of_stomach': 7, 'swelled_lymph_nodes': 6, 'malaise': 6, 'blurred_and_distorted_vision': 5,
            'phlegm': 5, 'throat_irritation': 4, 'redness_of_eyes': 5, 'sinus_pressure': 4, 'runny_nose': 5,
            'congestion': 5, 'chest_pain': 7, 'weakness_in_limbs': 7, 'fast_heart_rate': 5, 'pain_during_bowel_movements': 5,
            'pain_in_anal_region': 6, 'bloody_stool': 5, 'irritation_in_anus': 6, 'neck_pain': 5, 'dizziness': 4,
            'cramps': 4, 'bruising': 4, 'obesity': 4, 'swollen_legs': 5, 'swollen_blood_vessels': 5,
            'puffy_face_and_eyes': 5, 'enlarged_thyroid': 6, 'brittle_nails': 5, 'swollen_extremeties': 5, 'excessive_hunger': 4,
            'extra_marital_contacts': 5, 'drying_and_tingling_lips': 4, 'slurred_speech': 4, 'knee_pain': 3, 'hip_joint_pain': 2,
            'muscle_weakness': 2, 'stiff_neck': 4, 'swelling_joints': 5, 'movement_stiffness': 5, 'spinning_movements': 6,
            'loss_of_balance': 4, 'unsteadiness': 4, 'weakness_of_one_body_side': 4, 'loss_of_smell': 3, 'bladder_discomfort': 4,
            'foul_smell_ofurine': 5, 'continuous_feel_of_urine': 6, 'passage_of_gases': 5, 'internal_itching': 4, 'toxic_look_(typhos)': 5,
            'depression': 3, 'irritability': 2, 'muscle_pain': 2, 'altered_sensorium': 2, 'red_spots_over_body': 3,
            'belly_pain': 4, 'abnormal_menstruation': 6, 'dischromic_patches': 6, 'watering_from_eyes': 4, 'increased_appetite': 5,
            'polyuria': 4, 'family_history': 5, 'mucoid_sputum': 4, 'rusty_sputum': 4, 'lack_of_concentration': 3,
            'visual_disturbances': 3, 'receiving_blood_transfusion': 5, 'receiving_unsterile_injections': 2, 'coma': 7, 'stomach_bleeding': 6,
            'distention_of_abdomen': 4, 'history_of_alcohol_consumption': 5, 'blood_in_sputum': 5, 'prominent_veins_on_calf': 6, 'palpitations': 4,
            'painful_walking': 2, 'pus_filled_pimples': 2, 'blackheads': 2, 'scurring': 2, 'skin_peeling': 3,
            'silver_like_dusting': 2, 'small_dents_in_nails': 2, 'inflammatory_nails': 2, 'blister': 4, 'red_sore_around_nose': 2,
            'yellow_crust_ooze': 3
        };

        // Body part to symptoms mapping
        this.bodyPartSymptoms = {
            'head': ['headache', 'dizziness', 'blurred_and_distorted_vision', 'pain_behind_the_eyes', 'sunken_eyes', 'loss_of_smell'],
            'chest': ['chest_pain', 'breathlessness', 'cough', 'phlegm', 'palpitations', 'blood_in_sputum'],
            'abdomen': ['stomach_pain', 'abdominal_pain', 'nausea', 'vomiting', 'indigestion', 'constipation', 'diarrhoea', 'bloody_stool'],
            'left arm': ['weakness_in_limbs', 'muscle_weakness', 'swelling_joints'],
            'right arm': ['weakness_in_limbs', 'muscle_weakness', 'swelling_joints'],
            'left leg': ['weakness_in_limbs', 'muscle_weakness', 'swollen_legs', 'painful_walking'],
            'right leg': ['weakness_in_limbs', 'muscle_weakness', 'swollen_legs', 'painful_walking']
        };
    }

    initializeSymptomChecker() {
        const symptomInput = document.getElementById('symptomInput');
        const suggestionsList = document.getElementById('suggestionsList');
        const selectedSymptoms = document.getElementById('selectedSymptoms');
        const symptomCount = document.getElementById('symptomCount');
        const analyzeBtn = document.getElementById('analyzeBtn');

        if (!symptomInput) return;

        // Input event for autocomplete
        symptomInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            this.showSymptomSuggestions(query);
        });

        // Enter key to add symptom
        symptomInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
                this.addSymptom(e.target.value.trim());
                e.target.value = '';
                this.hideSuggestions();
            }
        });

        // Popular symptoms buttons
        document.querySelectorAll('.popular-symptom').forEach(button => {
            button.addEventListener('click', (e) => {
                const symptom = e.target.dataset.symptom;
                this.addSymptom(symptom);
            });
        });

        // Analyze button
        analyzeBtn.addEventListener('click', () => {
            this.analyzeSymptoms();
        });
    }

    showSymptomSuggestions(query) {
        const suggestionsDiv = document.getElementById('symptomSuggestions');
        const suggestionsList = document.getElementById('suggestionsList');

        if (query.length < 2) {
            this.hideSuggestions();
            return;
        }

        const matches = this.allSymptoms.filter(symptom => 
            symptom.toLowerCase().includes(query) && 
            !this.symptoms.includes(symptom)
        ).slice(0, 8);

        if (matches.length > 0) {
            suggestionsList.innerHTML = matches.map(symptom => `
                <div class="suggestion-item p-2 hover:bg-blue-50 rounded cursor-pointer transition-colors" 
                     data-symptom="${symptom}">
                    <div class="flex items-center">
                        <span class="text-gray-800">${this.formatSymptomName(symptom)}</span>
                        <span class="ml-auto text-xs text-gray-500">Severity: ${this.symptomSeverity[symptom] || 1}/7</span>
                    </div>
                </div>
            `).join('');

            // Add click handlers to suggestions
            suggestionsList.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    const symptom = e.currentTarget.dataset.symptom;
                    this.addSymptom(symptom);
                    document.getElementById('symptomInput').value = '';
                    this.hideSuggestions();
                });
            });

            suggestionsDiv.classList.remove('hidden');
        } else {
            this.hideSuggestions();
        }
    }

    hideSuggestions() {
        const suggestionsDiv = document.getElementById('symptomSuggestions');
        suggestionsDiv.classList.add('hidden');
    }

    addSymptom(symptomName) {
        if (this.symptoms.includes(symptomName) || this.symptoms.length >= 10) {
            return;
        }

        this.symptoms.push(symptomName);
        this.updateSelectedSymptomsDisplay();
        this.updateAnalyzeButton();

        // Add animation
        anime({
            targets: '.symptom-tag:last-child',
            scale: [0, 1],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutBack'
        });
    }

    removeSymptom(symptomName) {
        this.symptoms = this.symptoms.filter(s => s !== symptomName);
        this.updateSelectedSymptomsDisplay();
        this.updateAnalyzeButton();
    }

    updateSelectedSymptomsDisplay() {
        const selectedSymptoms = document.getElementById('selectedSymptoms');
        const symptomCount = document.getElementById('symptomCount');

        if (this.symptoms.length === 0) {
            selectedSymptoms.innerHTML = '<div class="text-gray-500 text-sm">Add symptoms to see them here</div>';
            symptomCount.textContent = '0 symptoms';
        } else {
            selectedSymptoms.innerHTML = this.symptoms.map(symptom => `
                <div class="symptom-tag flex items-center bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm">
                    <span>${this.formatSymptomName(symptom)}</span>
                    <span class="ml-2 text-xs bg-blue-200 px-2 py-1 rounded-full">${this.symptomSeverity[symptom] || 1}</span>
                    <button 
                        class="ml-2 text-blue-600 hover:text-blue-800 transition-colors"
                        onclick="healthcareAI.removeSymptom('${symptom}')"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            `).join('');
            symptomCount.textContent = `${this.symptoms.length} symptom${this.symptoms.length !== 1 ? 's' : ''}`;
        }
    }

    updateAnalyzeButton() {
        const analyzeBtn = document.getElementById('analyzeBtn');
        const hasSymptoms = this.symptoms.length > 0;
        
        analyzeBtn.disabled = !hasSymptoms;
        analyzeBtn.classList.toggle('opacity-50', !hasSymptoms);
        analyzeBtn.classList.toggle('cursor-not-allowed', !hasSymptoms);
    }

    initializeBodyMap() {
        const bodyParts = document.querySelectorAll('.body-part');
        const bodyPartSymptoms = document.getElementById('bodyPartSymptoms');
        const bodyPartSymptomList = document.getElementById('bodyPartSymptomList');

        bodyParts.forEach(part => {
            part.addEventListener('click', (e) => {
                const partName = e.target.dataset.part;
                const symptoms = this.bodyPartSymptoms[partName] || [];
                
                if (symptoms.length > 0) {
                    bodyPartSymptomList.innerHTML = symptoms.map(symptom => `
                        <div class="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer"
                             onclick="healthcareAI.addSymptom('${symptom}')">
                            <span class="text-sm">${this.formatSymptomName(symptom)}</span>
                            <span class="text-xs text-gray-500">${this.symptomSeverity[symptom] || 1}/7</span>
                        </div>
                    `).join('');
                    bodyPartSymptoms.classList.remove('hidden');
                }
            });

            part.addEventListener('mouseenter', (e) => {
                anime({
                    targets: e.target,
                    scale: 1.1,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });

            part.addEventListener('mouseleave', (e) => {
                anime({
                    targets: e.target,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    initializeVoiceInput() {
        const voiceBtn = document.getElementById('voiceBtn');
        
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            voiceBtn.addEventListener('click', () => {
                recognition.start();
                voiceBtn.classList.add('pulse-animation');
                voiceBtn.style.color = '#2563eb';
            });

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript.toLowerCase();
                const symptomInput = document.getElementById('symptomInput');
                
                // Try to match spoken words to symptoms
                const spokenSymptoms = this.matchSpokenSymptoms(transcript);
                
                if (spokenSymptoms.length > 0) {
                    spokenSymptoms.forEach(symptom => this.addSymptom(symptom));
                } else {
                    symptomInput.value = transcript;
                    this.showSymptomSuggestions(transcript);
                }
            };

            recognition.onend = () => {
                voiceBtn.classList.remove('pulse-animation');
                voiceBtn.style.color = '';
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                voiceBtn.classList.remove('pulse-animation');
                voiceBtn.style.color = '';
            };
        } else {
            voiceBtn.style.display = 'none';
        }
    }

    matchSpokenSymptoms(transcript) {
        const symptomMap = {
            'headache': ['headache', 'head pain', 'my head hurts'],
            'fever': ['fever', 'high temperature', 'i have a fever'],
            'cough': ['cough', 'coughing', 'i am coughing'],
            'fatigue': ['tired', 'fatigue', 'exhausted', 'weak'],
            'nausea': ['nausea', 'nauseous', 'feeling sick'],
            'chest pain': ['chest pain', 'chest hurts', 'pain in chest'],
            'stomach pain': ['stomach pain', 'belly pain', 'tummy hurts'],
            'back pain': ['back pain', 'my back hurts'],
            'sore throat': ['sore throat', 'throat pain'],
            'runny nose': ['runny nose', 'stuffy nose', 'nasal congestion']
        };

        const foundSymptoms = [];
        for (const [symptom, keywords] of Object.entries(symptomMap)) {
            if (keywords.some(keyword => transcript.includes(keyword))) {
                foundSymptoms.push(symptom);
            }
        }

        return foundSymptoms;
    }

    formatSymptomName(symptom) {
        return symptom.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    calculateSeverityScore() {
        return this.symptoms.reduce((total, symptom) => {
            return total + (this.symptomSeverity[symptom] || 1);
        }, 0);
    }

    getSeverityLevel(score) {
        if (score <= 10) return { level: 'Mild', color: 'green', icon: '🟢' };
        if (score <= 25) return { level: 'Moderate', color: 'yellow', icon: '🟡' };
        if (score <= 40) return { level: 'Severe', color: 'orange', icon: '🟠' };
        return { level: 'Critical', color: 'red', icon: '🔴' };
    }

    async analyzeSymptoms() {
        if (this.symptoms.length === 0) return;

        const analyzeBtn = document.getElementById('analyzeBtn');
        const analyzeText = document.getElementById('analyzeText');
        const analyzeLoading = document.getElementById('analyzeLoading');

        // Show loading state
        analyzeText.classList.add('hidden');
        analyzeLoading.classList.remove('hidden');
        analyzeBtn.disabled = true;

        try {
            // Calculate severity and get predictions
            const severityScore = this.calculateSeverityScore();
            const severityLevel = this.getSeverityLevel(severityScore);
            
            // Simulate ML prediction (in real implementation, this would call the backend)
            const predictions = await this.getDiseasePredictions();
            
            // Store results for results page
            sessionStorage.setItem('symptomAnalysis', JSON.stringify({
                symptoms: this.symptoms,
                severityScore,
                severityLevel,
                predictions,
                timestamp: new Date().toISOString()
            }));

            // Navigate to results page
            window.location.href = 'results.html';

        } catch (error) {
            console.error('Analysis failed:', error);
            alert('Analysis failed. Please try again.');
        } finally {
            // Reset button state
            analyzeText.classList.remove('hidden');
            analyzeLoading.classList.add('hidden');
            analyzeBtn.disabled = false;
        }
    }

    async getDiseasePredictions() {
        // Simulate disease prediction based on symptoms
        // In a real implementation, this would call the ML model
        
        const diseaseSymptomMap = {
            'Fungal infection': ['itching', 'skin_rash', 'nodal_skin_eruptions'],
            'Allergy': ['continuous_sneezing', 'runny_nose', 'congestion'],
            'GERD': ['stomach_pain', 'acidity', 'indigestion'],
            'Bronchial Asthma': ['cough', 'breathlessness', 'chest_pain'],
            'Migraine': ['headache', 'nausea', 'pain_behind_the_eyes'],
            'Hypertension': ['headache', 'chest_pain', 'dizziness'],
            'Diabetes': ['excessive_hunger', 'weight_loss', 'fatigue'],
            'Common Cold': ['cough', 'runny_nose', 'throat_irritation'],
            'Pneumonia': ['high_fever', 'cough', 'chest_pain'],
            'Malaria': ['high_fever', 'headache', 'nausea']
        };

        const predictions = [];
        
        for (const [disease, diseaseSymptoms] of Object.entries(diseaseSymptomMap)) {
            const matchingSymptoms = this.symptoms.filter(symptom => 
                diseaseSymptoms.includes(symptom)
            );
            
            if (matchingSymptoms.length > 0) {
                const confidence = Math.min(95, (matchingSymptoms.length / diseaseSymptoms.length) * 100);
                predictions.push({
                    disease,
                    confidence: Math.round(confidence),
                    matchingSymptoms,
                    description: this.getDiseaseDescription(disease)
                });
            }
        }

        // Sort by confidence and return top 5
        return predictions
            .sort((a, b) => b.confidence - a.confidence)
            .slice(0, 5);
    }

    getDiseaseDescription(disease) {
        const descriptions = {
            'Fungal infection': 'A common skin condition caused by fungi, characterized by itching and skin changes.',
            'Allergy': 'An immune system reaction to substances in the environment, causing sneezing and respiratory symptoms.',
            'GERD': 'Gastroesophageal reflux disease causing stomach pain and acidity.',
            'Bronchial Asthma': 'A respiratory condition with airway inflammation, causing breathing difficulties.',
            'Migraine': 'Severe headaches often accompanied by nausea and visual disturbances.',
            'Hypertension': 'High blood pressure that can cause headaches and chest discomfort.',
            'Diabetes': 'A metabolic disorder affecting blood sugar levels and energy.',
            'Common Cold': 'Viral infection of the upper respiratory tract.',
            'Pneumonia': 'Infection of the lungs causing fever and breathing problems.',
            'Malaria': 'A mosquito-borne infectious disease causing fever and flu-like symptoms.'
        };
        
        return descriptions[disease] || 'Medical condition requiring professional evaluation.';
    }

    loadUserProfile() {
        const profile = localStorage.getItem('userProfile');
        return profile ? JSON.parse(profile) : {
            age: null,
            gender: null,
            weight: null,
            height: null,
            medicalHistory: [],
            allergies: [],
            dietaryPreferences: [],
            activityLevel: 'moderate'
        };
    }

    saveUserProfile() {
        localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
    }

    // Gemini AI Integration with Enhanced Error Handling
    async callGeminiAI(prompt, context = {}) {
        console.log('🤖 Calling Gemini AI...');
        console.log('📝 Prompt:', prompt);
        console.log('🔑 API Key:', GEMINI_CONFIG.API_KEY.substring(0, 10) + '...');
        console.log('🎯 Model:', GEMINI_CONFIG.MODEL);
        
        try {
            const systemPrompt = `You are a knowledgeable healthcare AI assistant. Provide helpful, accurate, and empathetic medical information. 
Always remind users that this is for educational purposes and they should consult healthcare professionals for medical advice.

User Context:
- Symptoms: ${context.symptoms || 'Not provided'}
- Severity Level: ${context.severityLevel || 'Not assessed'}
- Disease Predictions: ${context.predictions || 'Not available'}
- User Profile: Age ${context.age || 'Unknown'}, Gender ${context.gender || 'Unknown'}

Guidelines:
- Be empathetic and supportive
- Provide clear, actionable advice
- Always include medical disclaimers
- Use simple, understandable language
- Focus on safety and when to seek professional help`;

            const requestBody = {
                contents: [{
                    parts: [{
                        text: `${systemPrompt}\n\nUser Question: ${prompt}`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            };

            console.log('📤 Sending request to:', GEMINI_CONFIG.API_URL);

            const response = await fetch(`${GEMINI_CONFIG.API_URL}?key=${GEMINI_CONFIG.API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            console.log('📥 Response status:', response.status);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('❌ API Error Response:', errorData);
                
                let errorMessage = `API Error (${response.status}): `;
                
                if (response.status === 400) {
                    errorMessage += 'Invalid request. The model or API parameters may be incorrect.';
                    if (errorData.error && errorData.error.message) {
                        errorMessage += '\nDetails: ' + errorData.error.message;
                    }
                } else if (response.status === 403) {
                    errorMessage += 'API key is invalid or lacks permissions. Please check your API key.';
                } else if (response.status === 404) {
                    errorMessage += `Model "${GEMINI_CONFIG.MODEL}" not found. The model may not exist or may not be available.`;
                } else if (response.status === 429) {
                    errorMessage += 'Rate limit exceeded. Please try again later.';
                } else if (response.status === 500) {
                    errorMessage += 'Google AI service error. Please try again later.';
                } else {
                    errorMessage += 'Unknown error occurred.';
                }
                
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log('✅ Response received successfully');
            
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                const aiResponse = data.candidates[0].content.parts[0].text;
                console.log('💬 AI Response:', aiResponse.substring(0, 100) + '...');
                return aiResponse;
            } else {
                console.error('❌ Unexpected response structure:', data);
                throw new Error('Invalid response structure from Gemini API');
            }
        } catch (error) {
            console.error('❌ Gemini AI Error:', error);
            
            // Return detailed error message for user
            if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                return '⚠️ **Network Error**\n\nUnable to connect to Google AI services. Please check your internet connection and try again.\n\n*This is an educational tool. For medical advice, please consult a healthcare professional.*';
            } else if (error.message.includes('API key')) {
                return '⚠️ **API Key Error**\n\nThe API key appears to be invalid or lacks proper permissions. Please verify your Gemini API key.\n\n*This is an educational tool. For medical advice, please consult a healthcare professional.*';
            } else if (error.message.includes('Model')) {
                return `⚠️ **Model Error**\n\nThe AI model "${GEMINI_CONFIG.MODEL}" may not be available or accessible. Please try again later.\n\n*This is an educational tool. For medical advice, please consult a healthcare professional.*`;
            } else {
                return `⚠️ **AI Service Error**\n\n${error.message}\n\nPlease try again later or consult with a healthcare professional for personalized medical advice.\n\n*This is an educational tool, not a medical diagnosis system.*`;
            }
        }
    }
    
    // Test Gemini AI Connection
    async testGeminiConnection() {
        console.log('🧪 Testing Gemini AI Connection...');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🔑 API Key:', GEMINI_CONFIG.API_KEY ? 'Present (' + GEMINI_CONFIG.API_KEY.substring(0, 15) + '...)' : 'Missing!');
        console.log('🎯 Model:', GEMINI_CONFIG.MODEL);
        console.log('🌐 API URL:', GEMINI_CONFIG.API_URL);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        const testResponse = await this.callGeminiAI('Hello! Can you briefly confirm you are working?', {});
        
        if (testResponse.includes('⚠️')) {
            console.log('❌ Connection Test FAILED');
            console.log('Error:', testResponse);
        } else {
            console.log('✅ Connection Test PASSED');
            console.log('Response:', testResponse);
        }
        
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        return testResponse;
    }
}

// Initialize the healthcare AI
const healthcareAI = new HealthcareAI();

// Global functions for HTML onclick handlers
function initializeSymptomChecker() {
    // This function is called from the HTML to ensure the DOM is ready
    console.log('Symptom checker initialized');
}

// Export for use in other pages
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HealthcareAI;
}