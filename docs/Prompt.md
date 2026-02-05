# **IndOz.work Reconstruction: UI/UX Design Prompt**

**Role:** Expert UI/UX Designer & Frontend Architect

**Project Name:** IndOz.work (Reconstruction Edition)

**Goal:** Design a professional, dual-system web application that serves as a career and residential gateway for Indonesians moving to Australia.

## **1\. Project Context & Brand Identity**

**Mission:** "Gerbang Karir & Residensial Australia untuk Indonesia" (Career & Residential Gateway).

**Target Audience:** Indonesians (Youth/Adults) seeking Working Holiday Visas (WHV) or Permanent Residency (PR).

**Tone:** Professional, reliable, empowering, yet friendly. Move away from excessive slang; aim for clear, high-trust visuals.

**Color Palette:**

* **Primary:** "Indo Red" (A bold, professional red) & "Oz Gold" (A warm, reliable gold).  
* **Neutral:** Clean whites, light grays for backgrounds, high-contrast dark text.  
* **Constraint:** Use specific CSS variables for these colors to ensure consistency across the app.

## **2\. Navigation & Layout Structure**

**Requirement:** The app must be split into two distinct systems with different layouts.

### **A. Public System (The Landing Page)**

* **Top Navigation (Flattened):**  
  * **Logo:** Modern "IndOz" wordmark (No flags).  
  * **Menu Items:** Direct links to "AI Chat", "Cari Lowongan" (Jobs), "Cek Resume", "Panduan" (Guides).  
  * **Action:** "Login/Masuk" button prominently displayed.  
* **Mobile Responsiveness:** Hamburger menu must stack gracefully.  
* **Breadcrumbs:** None. Use a simple "Back to Home" if deep linking.

### **B. Premium System (IndOz+ Dashboard)**

* **Layout:** Sidebar or distinct top-bar layout separate from the public site.  
* **Vibe:** "Control Center" / "Hub". Darker accents or boxed containers to denote a private, secure area.

## **3\. Key Page Specifications**

### **Page 1: Public Landing & Onboarding**

**Hero Section:**

* **Headline:** "Gerbang Karir & Residensial Australia untuk Indonesia."  
* **Subtext:** Brief explanation of the platform's value.  
* **Call to Action:** "Mulai Perjalanan Anda" (Start Your Journey).

**Educational Components (Crucial):**

* **The 3-Step Journey:** A horizontal visual stepper showing:  
  1. Persiapan (Preparation)  
  2. Keberangkatan (Departure)  
  3. Menetap (Settling In)  
* **Glossary Tooltips:** Create subtle UI elements (underline with question mark or info icon) for terms like "WHV", "SDUWHV", "PR". Hovering should reveal a clean definition card.

**AI Assistant (Ollie 2.0):**

google ai studio api: AIzaSyCNI-frnjR5oBJjSCREteLXOhysAg8ahG8

* **Interface:** A chat interface containerized within the page (not a full-screen overlay initially).  
* **Greeting UI:** A welcoming message bubble: "Selamat datang di IndOz. Saya Ollie. Apakah Anda sedang mempersiapkan WHV atau merencanakan PR?"

### **Page 2: Premium Dashboard (IndOz+)**

**Overview Hub:**

* **Status Cards:**  
  * Current Visa Status.  
  * PR Points Score (e.g., "65 Points").  
  * Document Readiness (e.g., "5/8 Documents Ready").

**Features to Design:**

1. **Document Vault:**  
   * A list of required documents.  
   * Upload buttons for each slot.  
   * **Gamification:** A progress bar that turns green when 8/8 documents are uploaded. "Ready for War" badge appears.  
2. **88-Day Logbook:**  
   * A structured data table (Date, Employer, Hours, Location).  
   * Input fields must be legible and easy to tap on mobile.  
3. **PR Points Simulator:**  
   * A form where all inputs start empty.  
   * **Strategy Card Output:** Instead of just a number, display a card outlining specific advice (e.g., "Increase English Score to Superior").

## **4\. UI Polish & Accessibility**

* **Contrast:** Ensure all forms (especially white backgrounds) have borders or distinct background colors so input fields are visible. No white-text-on-white-background.  
* **Feedback:** Design modal states for form submissions. If a user clicks submit with empty fields, show inline red error text, not a generic alert.  
* **Icons:** Use consistent icon sets (Lucide or FontAwesome). Ensure SVG paths are clean.

## **5\. Deliverables**

Generate the React code for the **Landing Page** first, implementing the "3-Step Journey" and the "Flattened Navigation" to establish the design language.