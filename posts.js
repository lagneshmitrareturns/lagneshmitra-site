alert("🔥 posts.js FILE LOADED");

const target = document.querySelector(".post-highlight");

if (!target) {
  alert("❌ .post-highlight NOT FOUND");
} else {
  target.insertAdjacentHTML(
    "beforeend",
    `
    <div class="post-card">
      <h4>JS IS WORKING</h4>
      <p>If you see this, posts.js is connected.</p>
      <div class="post-meta">👁 0 views | 📍 Debug</div>
    </div>
    `
  );
}
