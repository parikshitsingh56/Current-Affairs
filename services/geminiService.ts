import { GoogleGenAI } from "@google/genai";

const CACHE_KEY_PREFIX = 'jibo_news_cache_v4_'; 

// --- DEMO CONTENT FOR USERS WITHOUT API KEY ---
const DEMO_CONTENT = `
# 🚨 DEMO MODE: NO API KEY DETECTED
> **Note:** You are viewing a **static sample**. To fetch real-time news from Drishti IAS & GKToday, you need a free API Key from [aistudio.google.com](https://aistudio.google.com).

---

# SECTION A: DRISHTI IAS (Editorial Deep Dive)

## 1. The Glacial Lake Outburst Flood (GLOF) Threat
**Why in News?**
Recent satellite imagery has flagged high-risk glacial lakes in the Himalayas, prompting the NDMA to issue new guidelines.

### Key Highlights
*   **Definition:** A Glacial Lake Outburst Flood (GLOF) is a type of outburst flood that occurs when the dam containing a glacial lake fails.
*   **Recent Data:** The ISRO atlas lists over 28,000 glacial lakes in the Himalayas, of which 47 are critically dangerous.
*   **NDMA Guidelines:** Installation of Early Warning Systems (EWS) and zoning of hazardous areas.

### Historical Background
*   **Chamoli Disaster (2021):** A massive rock and ice avalanche triggered a GLOF, killing over 200 people and destroying two hydropower projects (Tapovan Vishnugad).
*   **Sikkim Floods (2023):** South Lhonak Lake burst caused massive devastation in the Teesta basin.

### Constitutional & Legal Angle
*   **Disaster Management Act, 2005:** Provides the statutory framework for the NDMA.
*   **Article 21:** The Supreme Court has interpreted the "Right to Life" to include the right to a safe environment and protection from preventable disasters.

### Significance
*   **Ecological:** The Himalayas are the "Water Tower of Asia". Instability here affects water security for millions.
*   **Economic:** Hydropower projects worth billions are at risk.

> **STATIC GK BOX**
> *   **NDMA Chairman:** Prime Minister of India
> *   **Headquarters:** New Delhi
> *   **Act:** Disaster Management Act, 2005
> *   **Relevant Ministry:** Ministry of Home Affairs

---

# SECTION B: BUSINESS STANDARD (Banking & Finance)

## 2. RBI Maintains Status Quo on Repo Rate
**Context:** The Monetary Policy Committee (MPC) has decided to keep the Repo Rate unchanged at 6.5%.

### Key Financial Data
*   **Repo Rate:** 6.50%
*   **Reverse Repo Rate:** 3.35% (Fixed Rate)
*   **Marginal Standing Facility (MSF):** 6.75%
*   **Bank Rate:** 6.75%
*   **GDP Projection:** RBI projects real GDP growth for FY25 at 7.0%.

### Significance for Banking Exams
*   **Stance:** The stance remains "Withdrawal of Accommodation" to ensure inflation aligns with the target while supporting growth.
*   **Inflation Target:** The RBI aims to keep CPI inflation at 4% with a band of +/- 2%.

> **STATIC GK BOX**
> *   **RBI Governor:** Shaktikanta Das
> *   **RBI HQ:** Mumbai
> *   **Established:** April 1, 1935 (RBI Act, 1934)
> *   **Nationalized:** January 1, 1949

---

# SECTION C: GKTODAY (Rapid Fire Updates)

## 3. Bhutan’s Sonam Yeshey Scripts History
**News:** Bhutanese pacer Sonam Yeshey became the first bowler in men's T20I history to take an 8-wicket haul.
*   **Opponent:** China
*   **Figures:** 8 wickets for just few runs.
*   **Venue:** Malaysia Quadrangular Series.

> **STATIC GK BOX**
> *   **Bhutan Capital:** Thimphu
> *   **Currency:** Ngultrum
> *   **Prime Minister:** Tshering Tobgay

## 4. World's First AI Safety Summit
**News:** The UK hosted the inaugural AI Safety Summit at Bletchley Park.
*   **Outcome:** The "Bletchley Declaration" was signed by 28 countries, including India, US, and China.
*   **Focus:** Regulating "Frontier AI" models.

> **STATIC GK BOX**
> *   **UK Capital:** London
> *   **Currency:** Pound Sterling
> *   **Significance of Bletchley Park:** Site of WWII Codebreakers (Alan Turing).

## 5. Project Kusha
**News:** DRDO is developing Project Kusha, a long-range air defence system.
*   **Range:** Up to 350 km.
*   **Comparison:** Often compared to Israel's Iron Dome and Russia's S-400.
*   **Objective:** To detect and destroy enemy aircraft and missiles.

> **STATIC GK BOX**
> *   **DRDO Chairman:** Dr. Samir V Kamat
> *   **HQ:** New Delhi
> *   **Motto:** Balasya Mulam Vigyanam (Strength's Origin is in Science)
`;

export const fetchDailyNews = async (date: string): Promise<string> => {
  // 0. Check Date
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  
  if (selectedDate > today) {
    throw new Error("Invalid Date: Cannot fetch news for future dates.");
  }

  // 1. Check for API Key - IF MISSING, RETURN DEMO CONTENT
  const apiKey = process.env.API_KEY;
  const isKeyMissing = !apiKey || apiKey === "undefined" || apiKey === "" || apiKey.includes("your_api_key_here");
  
  if (isKeyMissing) {
    console.warn("No API Key found. Returning Demo Content.");
    // Simulate a network delay for realism
    await new Promise(resolve => setTimeout(resolve, 1500));
    return DEMO_CONTENT;
  }

  // 2. Check Cache
  const cacheKey = `${CACHE_KEY_PREFIX}${date}`;
  try {
    const cachedContent = localStorage.getItem(cacheKey);
    if (cachedContent) return cachedContent;
  } catch (e) {
    console.warn("Local storage access failed", e);
  }

  // 3. Initialize API
  const ai = new GoogleGenAI({ apiKey: apiKey });

  const prompt = `
    Act as the Chief Academic Director of a top-tier UPSC & Banking Coaching Institute.
    TARGET DATE: ${date}
    MISSION: Compile an **EXHAUSTIVE, ENCYCLOPEDIC DOSSIER** of Current Affairs.
    
    STRICT GUIDELINES:
    1. **NO SUMMARIES**: Full details. If an article mentions a scheme, list ALL eligibility criteria.
    2. **VERBATIM PREFERENCE**: Mimic Drishti IAS editorials and Business Standard.
    3. **QUANTITY**: Minimum 30 distinct news items.
    4. **SOURCE SEGREGATION**:
    
    # SECTION A: DRISHTI IAS (Editorial Deep Dive)
    - **Headline**, **Why in News?**, **Key Highlights**, **Historical Background**, **Constitutional Provisions**, **Significance**.
    
    # SECTION B: BUSINESS STANDARD (Banking & Finance Special)
    - RBI Circulars, GDP, Mergers. Detail Level: Exact figures (e.g., "Rs 54,000 Crore").
    
    # SECTION C: GKTODAY (Detailed Updates)
    - Appointments, Awards, Books, Sports. Provide at least 15 items.
    
    # SECTION D: MANDATORY STATIC GK BOX
    - AFTER EVERY SINGLE NEWS ITEM: **STATIC GK DATA** (Capital, HQ, Articles).
    
    RECOVERY: If quota exceeded, use internal knowledge to reconstruct major events for ${date}.
  `;

  try {
    console.log("Attempting fetch with Search Tool...");
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', 
      contents: prompt,
      config: { tools: [{ googleSearch: {} }] },
    });

    const text = response.text;
    if (text && text.length > 500) {
      localStorage.setItem(cacheKey, text);
      return text;
    }
    throw new Error("Generated content was too empty.");

  } catch (error: any) {
    console.warn("Primary fetch failed.", error);

    // If API Key is invalid or quota exceeded, fall back to demo content if it's an auth error
    if (error.message && (error.message.includes("API key") || error.status === 403)) {
       return DEMO_CONTENT;
    }

    // Quota Handling
    const isQuotaError = error.status === 429 || error.code === 429 || (error.message && error.message.toLowerCase().includes("quota"));
    
    if (isQuotaError) {
      try {
        const fallbackResponse = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: prompt + "\\n\\n[SYSTEM NOTE: Search disabled due to quota. Generate based on internal knowledge.]",
          config: { thinkingConfig: { thinkingBudget: 1024 } },
        });
        const fallbackText = fallbackResponse.text;
        if (fallbackText) return "> **⚠️ SYSTEM NOTICE: SEARCH QUOTA EXCEEDED**\\n> Report generated using internal AI database.\\n\\n---" + fallbackText;
      } catch (fallbackError) {
        throw new Error("Service overloaded. Please try again later.");
      }
    }
    throw error;
  }
};