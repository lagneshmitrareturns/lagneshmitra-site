console.log("🔥 posts.js LOADED");

/* HARD PROOF BANNER */
document.body.insertAdjacentHTML(
  "afterbegin",
  `
  <div style="
    position:fixed;
    top:0;
    left:0;
    right:0;
    z-index:9999;
    background:#22c55e;
    color:#020617;
    padding:10px;
    font-weight:700;
    text-align:center;
  ">
    ✅ posts.js CONNECTED SUCCESSFULLY
  </div>
  `
);

/* TARGET */
const postSection = document.querySelector(".post-highlight");

if (!postSection) {
  alert("❌ .post-highlight NOT FOUND");
} else {
  const container = document.createElement("div");
  container.className = "posts-container";

  container.innerHTML = `
    <div class="post-card">
      <h4>TEST POST #1</h4>
      <p>If this changes, posts.js → index.html is LIVE.</p>
      <div class="post-meta">👁 0 views | 📍 Test</div>
    </div>

    <div class="post-card">
      <h4>TEST POST #2</h4>
      <p>Edit posts.js and refresh — this text should update.</p>
      <div class="post-meta">👁 0 views | 📍 Debug</div>
    </div>
  `;

  postSection.appendChild(container);
}
