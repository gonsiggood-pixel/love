// data.js — EDIT ME. Everything below is safe to change or add to.
// You should never need to touch index.html, style.css, or script.js just to add content.
// Look for the word PLACEHOLDER to find what still needs your real details.

// ---- 1. TIMELINE ----
// Add as many entries as you want, in chronological order.
const timelineData = [
  { date: "2025-12-30", title: "The day we met", text: "You just walked into my life and changed everything.💕" },
  { date: "2026-01-04", title: "First date", text: "We walked so much we got pain in our legs.🦵" },
  { date: "2026-03-15", title: "First movie date", text: "You booked the chillest seats in the theater.😂" }
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
  { src: "photos/photo-02.jpg", caption: "Our first unofficial date 🥰" },
  { src: "photos/photo-03.jpg", caption: "Our first official date 😜" },
  { src: "photos/photo-04.jpg", caption: "Our first mall date 🛍 ️" },
  { src: "photos/photo-05.jpg", caption: "Our first movie date 🎬" },
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
  { title: "Why I love you", body: "You make my life complete and filled with joy. In every ordinary moment, you find a way to make things feel warm and alive. Your laugh, your voice, the way you care for people around you — all of it makes me fall for you a little more each day. Being loved by you feels like the safest, softest place in the world." },
  { title: "My favorite memory", body: "You in my arms, both of us not wanting that moment to end. The world outside just faded away and it was only us — your heartbeat, your breathing, your warmth. I remember thinking how lucky I was that out of everyone, I get to hold you. I still carry that feeling with me every single day." },
  { title: "What I'm excited for", body: "To spend the rest of my life with you. Every little thing — lazy mornings, silly fights that end in laughter, growing older side by side, building a home full of love and noise and inside jokes. Every version of my future looks better with you standing right next to me in it." }
  // Add more: { title: "...", body: "..." },
];

// ---- 5. QUIZ ----
// correctIndex is the 0-based index into options[] that is the right answer.
// funFact is optional — shown after the question is answered.
const quizData = [
  {
    question: "What was my username of the first time we chatted?",
    options: ["DelhiDude01", "NaughtyHunk", "MoodyDelhiGuy"],
    correctIndex: 2,
    funFact: "I just made that account like 30 minutes ago!"
  },
  {
    question: "What's my favorite thing about you?",
    options: ["Your smile", "Your free spirit", "Your naughtiness"],
    correctIndex: 1,
    funFact: "You know it's whole you!"
  }
  // Add more question objects, same shape.
];
