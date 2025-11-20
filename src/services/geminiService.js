import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

if (!API_KEY) {
  console.warn('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file')
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null

// Convert file to base64
export const fileToGenerativePart = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64Data = reader.result.split(',')[1]
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      })
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// List of models to try in order (fallback mechanism)
// Using actual available Google Gemini API models (verified Nov 2024)
const MODELS_TO_TRY = [
  'gemini-2.5-flash',      // Fastest, most efficient
  'gemini-2.0-flash',      // Backup fast model
  'gemini-2.5-pro'         // Most powerful fallback
]

// Retry logic with multiple models fallback
const retryWithBackoff = async (fn, maxRetries = 3, initialDelay = 2000) => {
  let delay = initialDelay
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      const isLastRetry = i === maxRetries - 1
      const isOverloaded = error.message?.includes('503') || 
                          error.message?.includes('overloaded') ||
                          error.message?.includes('429') ||
                          error.message?.includes('quota')
      
      if (isOverloaded && !isLastRetry) {
        const waitTime = delay / 1000
        console.log(`⏳ API busy, retrying in ${waitTime}s... (Attempt ${i + 1}/${maxRetries})`)
        await new Promise(resolve => setTimeout(resolve, delay))
        delay *= 2 // Exponential backoff: 2s, 4s, 8s
        continue
      }
      
      // If it's the last retry, throw a user-friendly error
      if (isLastRetry) {
        throw new Error(
          `Unable to connect to AI service after ${maxRetries} attempts. ` +
          `The service is currently experiencing high traffic. ` +
          `Please try again in a few minutes. ` +
          `(Original error: ${error.message})`
        )
      }
      
      throw error
    }
  }
}

// Try multiple models if one fails
const tryMultipleModels = async (promptFn, imagePart = null) => {
  let lastError = null
  
  for (const modelName of MODELS_TO_TRY) {
    try {
      console.log(`🤖 Trying model: ${modelName}`)
      const model = genAI.getGenerativeModel({ model: modelName })
      
      return await retryWithBackoff(async () => {
        if (imagePart) {
          const result = await model.generateContent([promptFn(), imagePart])
          return (await result.response).text()
        } else {
          const result = await model.generateContent(promptFn())
          return (await result.response).text()
        }
      }, 2, 2000) // 2 retries per model with 2s initial delay
      
    } catch (error) {
      console.warn(`❌ Model ${modelName} failed:`, error.message)
      lastError = error
      
      // If it's not an overload error, don't try other models
      const isOverloadError = error.message?.includes('503') || 
                             error.message?.includes('overloaded') ||
                             error.message?.includes('429') ||
                             error.message?.includes('404')
      
      if (!isOverloadError) {
        throw error
      }
      
      // Wait a bit before trying next model
      console.log(`⏭️ Switching to next model...`)
      await new Promise(resolve => setTimeout(resolve, 1000))
      continue
    }
  }
  
  // If all models failed, throw the last error
  throw new Error(
    `All AI models are currently busy. This usually happens during peak hours. ` +
    `Please try again in 2-3 minutes. ` +
    `Tip: Try during off-peak hours for faster response. ` +
    `(Technical: ${lastError?.message || 'Unknown error'})`
  )
}

// Analyze crop image
export const analyzeCropImage = async (imageFile) => {
  if (!genAI) {
    throw new Error('Gemini API not initialized. Please add your API key.')
  }

  const imagePart = await fileToGenerativePart(imageFile)
  
  const getPrompt = () => `Analyze this crop/plant image and provide ACTIONABLE recommendations in the following format:

1. CROP IDENTIFICATION:
   - What crop or plant is this?
   - Variety (if identifiable)

2. HEALTH STATUS:
   - Current condition (Healthy/Diseased/Stressed)
   - Severity level (Mild/Moderate/Severe)

3. GROWTH STAGE:
   - Current growth stage
   - Expected next stage

4. IMMEDIATE ACTIONS REQUIRED:
   - Step-by-step actions to take TODAY
   - Priority order (what to do first)
   - Timeline for each action

5. TREATMENT RECOMMENDATIONS:
   - Chemical treatments (specific product names/active ingredients)
   - Organic alternatives (natural remedies)
   - Application method and dosage
   - Frequency of application

6. PREVENTIVE MEASURES:
   - How to prevent this issue in future
   - Best practices for this crop
   - Monitoring schedule

7. ADDITIONAL RESOURCES:
   - What to search for online
   - Key terms for finding products

Be SPECIFIC and PRACTICAL. Provide exact product types, not just general advice.`

  return tryMultipleModels(getPrompt, imagePart)
}

// Get soil recommendations based on image
export const analyzeSoilFromImage = async (imageFile) => {
  if (!genAI) {
    throw new Error('Gemini API not initialized. Please add your API key.')
  }

  const imagePart = await fileToGenerativePart(imageFile)
  
  const getPrompt = () => `Analyze this soil image and provide ACTIONABLE improvement plan:

1. SOIL IDENTIFICATION:
   - Soil type (Clay/Sandy/Loamy/Silt)
   - Texture assessment
   - Color analysis (what it indicates)

2. CURRENT CONDITION:
   - Health status (Poor/Fair/Good/Excellent)
   - Moisture level (Dry/Moist/Waterlogged)
   - Visible issues (compaction, erosion, etc.)

3. SUITABLE CROPS:
   - Best crops for this soil type
   - Crops to avoid
   - Expected yield potential

4. IMMEDIATE IMPROVEMENT ACTIONS:
   Step 1: [First action to take]
   Step 2: [Second action]
   Step 3: [Follow-up actions]

5. SOIL AMENDMENTS NEEDED:
   Chemical Options:
   - Fertilizer type: [e.g., NPK 10-26-26]
   - Quantity: [per acre/hectare]
   - Application method
   
   Organic Options:
   - Compost: [quantity and type]
   - Manure: [type and amount]
   - Green manure crops
   - Other organic amendments

6. pH MANAGEMENT:
   - Estimated pH level
   - If acidic: Add [lime type and quantity]
   - If alkaline: Add [sulfur type and quantity]

7. WATER MANAGEMENT:
   - Drainage improvements needed
   - Irrigation recommendations
   - Mulching suggestions

8. LONG-TERM IMPROVEMENT PLAN:
   - Crop rotation schedule
   - Cover crops to plant
   - Soil building timeline (3-6 months)

9. PRODUCTS TO SEARCH FOR:
   - "[Soil type] fertilizer"
   - "Soil conditioner for [issue]"
   - "Organic compost near me"

Provide SPECIFIC quantities, products, and timelines.`

  return tryMultipleModels(getPrompt, imagePart)
}

// Get crop recommendations based on location and conditions
export const getCropRecommendations = async (location, month, additionalInfo = '') => {
  if (!genAI) {
    throw new Error('Gemini API not initialized. Please add your API key.')
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const prompt = `As an agricultural expert, recommend the top 5 crops for:
Location: ${location}
Month: ${month}
${additionalInfo ? `Additional Info: ${additionalInfo}` : ''}

For each crop, provide:
1. Crop Name
2. Water Requirements (Low/Medium/High)
3. Temperature Range
4. Expected Yield
5. Profitability Rating (1-5 stars)
6. Growing Duration
7. Key Care Tips

Format the response clearly with each crop separated.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error getting recommendations:', error)
    throw error
  }
}

// Get fertilizer recommendations
export const getFertilizerRecommendations = async (cropName, soilCondition = '') => {
  if (!genAI) {
    throw new Error('Gemini API not initialized. Please add your API key.')
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const prompt = `Provide a detailed fertilizer schedule for ${cropName}:
${soilCondition ? `Soil Condition: ${soilCondition}` : ''}

Include:
1. Growth stages and timing
2. Chemical fertilizer recommendations (NPK ratios)
3. Organic alternatives
4. Application methods
5. Dosage per acre
6. Important precautions

Format as a clear schedule from planting to harvest.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error getting fertilizer recommendations:', error)
    throw error
  }
}

// Diagnose plant disease from image
export const diagnosePlantDisease = async (imageFile) => {
  if (!genAI) {
    throw new Error('Gemini API not initialized. Please add your API key.')
  }

  const imagePart = await fileToGenerativePart(imageFile)
  
  const getPrompt = () => `Analyze this plant image for diseases and provide ACTIONABLE treatment plan:

1. DISEASE IDENTIFICATION:
   - Disease name (scientific and common)
   - Pathogen type (fungal/bacterial/viral/pest)
   - Confidence level in diagnosis

2. SEVERITY ASSESSMENT:
   - Current severity (Mild/Moderate/Severe)
   - Spread risk (Low/Medium/High)
   - Urgency of treatment (Immediate/Within 24hrs/Within week)

3. VISIBLE SYMPTOMS:
   - List all visible symptoms
   - Stage of disease progression

4. ROOT CAUSES:
   - Primary cause
   - Contributing factors (weather, soil, etc.)

5. IMMEDIATE ACTION PLAN (Step-by-step):
   Step 1: [First action to take today]
   Step 2: [Second action within 24 hours]
   Step 3: [Follow-up actions]

6. CHEMICAL TREATMENT OPTIONS:
   Option A:
   - Product type: [e.g., Copper-based fungicide]
   - Active ingredient: [e.g., Copper hydroxide]
   - Example products: [e.g., Kocide, Champion]
   - Application: [How to apply, dosage]
   - Frequency: [How often]
   - Safety precautions: [Important warnings]

   Option B: [Alternative chemical treatment]

7. ORGANIC/NATURAL ALTERNATIVES:
   Option A:
   - Treatment: [e.g., Neem oil spray]
   - Preparation: [How to prepare]
   - Application method: [How to apply]
   - Frequency: [How often]
   
   Option B: [Alternative organic treatment]

8. CULTURAL PRACTICES:
   - Remove affected parts? (Yes/No and how)
   - Improve drainage/air circulation
   - Adjust watering schedule
   - Other management practices

9. PREVENTION FOR FUTURE:
   - Crop rotation recommendations
   - Resistant varieties to consider
   - Preventive sprays/treatments
   - Monitoring schedule

10. SEARCH TERMS FOR PRODUCTS:
    - "[Disease name] fungicide"
    - "[Active ingredient] for [crop]"
    - "Organic treatment for [disease]"

Provide SPECIFIC, PRACTICAL advice that a farmer can implement immediately.`

  return tryMultipleModels(getPrompt, imagePart)
}

// General farming chatbot
export const askFarmingQuestion = async (question, context = '') => {
  if (!genAI) {
    throw new Error('Gemini API not initialized. Please add your API key.')
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const prompt = `You are an expert agricultural advisor. Answer this farming question:

Question: ${question}
${context ? `Context: ${context}` : ''}

Provide a clear, practical answer that a farmer can understand and implement.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error answering question:', error)
    throw error
  }
}
