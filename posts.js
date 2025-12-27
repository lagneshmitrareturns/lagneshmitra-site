console.log("posts.js running in SAFE MODE");

/* ================= DOM TARGET ================= */
const postSection = document.querySelector(".post-highlight");

if (!postSection) {
  console.error("post-highlight not found");
}

/* ================= TEMP POSTS DATA ================= */
const TEMP_POSTS = [
  {
    title: "Why Saturn Delays Marriage (And What It Actually Means)",
    excerpt:
      "Saturn does not deny marriage. It delays it so that emotional maturity, responsibility, and inner stability are formed before commitment.",
    views: 1248,
    source: "Reddit / Direct"
  },
  {
    title: "Strong Lagna vs Strong Moon – What Actually Matters?",
    excerpt:
      "Most people misunderstand strength in a chart. A strong Lagna gives direction, a strong Moon gives stability — imbalance causes chaos.",
    views: 642,
    source: "Website"
  },
  {
    title: "Karmic Relationships: Why Some Bonds Refuse To Break",
    excerpt:
      "If a relationship keeps returning despite logic, distance, or time — it is karmic, not emotional dependency.",
    views: 911,
    source: "Astrology Notes"
  }
];

/* ================= RENDER POSTS ================= */
function renderPosts() {
  TEMP_POSTS.forEach(post => {
    const card = document.createElement("div");
    card.className = "post-card";

    card.innerHTML = `
      <h4>${post.title}</h4>
      <p>${post.excerpt}</p>

      <div class="post-meta">
        👁 ${post.views} views &nbsp; | &nbsp; 📍 ${post.source}
      </div>

      <div class="post-actions">
        <span class="button">Read Full Post</span>
        <a href="chat.html" class="button outline">Talk to LagneshMitra</a>
      </div>
    `;

    postSection.appendChild(card);
  });
}

/* ================= INIT ================= */
renderPosts();
