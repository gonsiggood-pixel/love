// data.js — EDIT ME. Everything below is safe to change or add to.
// You should never need to touch index.html, style.css, or script.js just to add content.
// Look for the word PLACEHOLDER to find what still needs your real details.

// ---- 1. TIMELINE ----
// Add as many entries as you want, in chronological order.
const timelineData = [
  { date: "2025-12-30", title: "The day we met", text: "PLACEHOLDER — replace with the real story of this day." },
  { date: "2026-01-14", title: "First date", text: "PLACEHOLDER — replace with a real milestone." },
  { date: "2026-02-14", title: "Valentine's Day", text: "PLACEHOLDER — replace with a real milestone." }
  // Add more: { date: "YYYY-MM-DD", title: "...", text: "..." },
];

// ---- 2. PHOTO GALLERY ----
// Step 1: drop image files into the photos/ folder, named photo-02.jpg, photo-03.jpg, etc.
// Step 2: add a matching entry below (filename must match exactly). Caption is optional.
// photo.jpg (root, already existing) is always shown first — don't remove that entry below.
// Entries whose file isn't there yet are automatically skipped/hidden, so it's safe to
// pre-list a few placeholder filenames now and just drop matching files in later.
const galleryData = [
  { src: "photo.jpg", caption: "Us ❤️" },
  { src: "photos/photo-02.jpg", caption: "PLACEHOLDER caption — add photos/photo-02.jpg to enable" },
  { src: "photos/photo-03.jpg", caption: "PLACEHOLDER caption — add photos/photo-03.jpg to enable" },
  { src: "photos/photo-04.jpg", caption: "PLACEHOLDER caption — add photos/photo-04.jpg to enable" }
  // Add more: { src: "photos/photo-05.jpg", caption: "..." },
];

// ---- 3. LOVE MESSAGES (random-message button) ----
const messagesData=[
"You are my favorite person ❤️",
"I’m so lucky to have you 💕",
"Every moment with you is special ✨",
"I love you more every day 💖",
"You make my life beautiful 🌸"
];

// ---- 4. LOVE LETTERS (flip cards — longer than the quick messages above) ----
const lettersData = [
  { title: "Why I love you", body: "PLACEHOLDER — write a real short letter or paragraph here." },
  { title: "My favorite memory", body: "PLACEHOLDER — write a real short letter or paragraph here." },
  { title: "What I'm excited for", body: "PLACEHOLDER — write a real short letter or paragraph here." }
  // Add more: { title: "...", body: "..." },
];

// ---- 5. QUIZ ----
// correctIndex is the 0-based index into options[] that is the right answer.
// funFact is optional — shown after the question is answered.
const quizData = [
  {
    question: "PLACEHOLDER — e.g. Where did we first meet?",
    options: ["PLACEHOLDER A", "PLACEHOLDER B", "PLACEHOLDER C"],
    correctIndex: 0,
    funFact: "PLACEHOLDER — optional fun fact."
  },
  {
    question: "PLACEHOLDER — e.g. What's my favorite thing about you?",
    options: ["PLACEHOLDER A", "PLACEHOLDER B", "PLACEHOLDER C"],
    correctIndex: 1,
    funFact: "PLACEHOLDER — optional fun fact."
  }
  // Add more question objects, same shape.
];
