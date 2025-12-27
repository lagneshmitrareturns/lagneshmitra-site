console.clear();

/* 🔥 HARD PROOF THAT JS IS RUNNING */
document.body.insertAdjacentHTML(
  "afterbegin",
  `
  <div style="
    position:fixed;
    top:0;
    left:0;
    right:0;
    z-index:9999;
    background:#16a34a;
    color:#020617;
    padding:10px;
    font-weight:700;
    text-align:center;
  ">
    ✅ posts.js IS EXECUTING
  </div>
  `
);

/* 🔥 HARD DOM INSERT (NO FIREBASE) */
const postSection = document.querySelector(".post-highlight");

if (!postSection) {
  alert("❌ .post-highlight NOT FOUND");
} else {
  const testCard = document.createElement("div");
  testCard.className = "post-card";
  testCard.innerHTML = `
    <h4>TEST POST – JS WORKING</h4>
    <p>If you can see this, JS + DOM are connected.</p>
    <div class="post-meta">👁 0 views | 📍 Test</div>
  `;
  postSection.appendChild(testCard);
}

