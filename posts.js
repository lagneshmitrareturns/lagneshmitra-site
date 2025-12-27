console.log("✅ posts.js LOADED");

/* ================= FIREBASE IMPORTS ================= */
import {
  db,
  collection,
  getDocs,
  doc,
  updateDoc,
  increment
} from "./firebase.js";

/* ================= DOM TARGETS ================= */
const postSection = document.querySelector(".post-highlight");
const modal = document.getElementById("postModal");

if (!postSection) {
  console.error("❌ .post-highlight container not found");
}

/* ================= POSTS CONTAINER ================= */
let cardsContainer = postSection.querySelector(".posts-container");

if (!cardsContainer) {
  cardsContainer = document.createElement("div");
  cardsContainer.className = "posts-container";
  postSection.appendChild(cardsContainer);
}

/* ================= LOAD POSTS ================= */
async function loadPosts() {
  cardsContainer.innerHTML = "";

  try {
    // 🔥 SAFE QUERY (NO orderBy — ANDROID & GITHUB SAFE)
    const snapshot = await getDocs(collection(db, "posts"));

    console.log("📦 POSTS FOUND:", snapshot.size);

    if (snapshot.empty) {
      cardsContainer.innerHTML = `
        <p style="opacity:.6; text-align:center; margin-top:24px;">
          No posts yet.
        </p>
      `;
      return;
    }

    snapshot.forEach(docSnap => {
      const post = docSnap.data();
      const postId = docSnap.id;

      // 🛡️ SAFETY CHECK
      if (!post.title || !post.content) return;

      const card = document.createElement("div");
      card.className = "post-card";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");

      card.onclick = () => openPostFromData(postId, post);
      card.onkeypress = e => {
        if (e.key === "Enter") openPostFromData(postId, post);
      };

      card.innerHTML = `
        <h4>${escapeHTML(post.title)}</h4>

        <p>${escapeHTML(post.excerpt || "")}</p>

        <div class="post-meta">
          👁 ${post.views ?? 0} views &nbsp; | &nbsp;
          📍 ${escapeHTML(post.source || "Direct")}
        </div>

        <div class="post-actions" onclick="event.stopPropagation();">
          <span class="button">Read Full Post</span>
          <a href="chat.html" class="button outline">
            Talk to LagneshMitra
          </a>
        </div>
      `;

      cardsContainer.appendChild(card);
    });

  } catch (err) {
    console.error("❌ Failed to load posts:", err);
    cardsContainer.innerHTML = `
      <p style="color:#f87171; text-align:center;">
        Error loading posts.
      </p>
    `;
  }
}

/* ================= OPEN POST (MODAL) ================= */
async function openPostFromData(postId, post) {
  // 🔥 Increment views (NON-BLOCKING)
  try {
    const ref = doc(db, "posts", postId);
    await updateDoc(ref, { views: increment(1) });
  } catch (e) {
    console.warn("⚠️ View increment failed:", e.message);
  }

  // 🔥 FILL MODAL
  modal.querySelector("h1").innerText = post.title;

  modal.querySelector(".post-stats").innerHTML = `
    <span>👁 ${(post.views ?? 0) + 1} views</span>
    <span>📍 ${post.source || "Direct"}</span>
    <span>🕒 Updated Today</span>
  `;

  const contentBox = modal.querySelector(".post-content");
  contentBox.innerHTML = "";

  post.content
    .split("\n")
    .filter(p => p.trim())
    .forEach(p => {
      const para = document.createElement("p");
      para.innerText = p;
      para.style.marginBottom = "18px"; // ✅ BODY GAP FIX
      contentBox.appendChild(para);
    });

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

/* ================= CLOSE POST ================= */
window.closePost = function () {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
};

/* ================= SHARE ================= */
window.sharePost = function () {
  const title =
    modal.querySelector("h1")?.innerText || "LagneshMitra Post";

  if (navigator.share) {
    navigator.share({
      title: title,
      text: "Read this post on LagneshMitra",
      url: window.location.href
    });
  } else {
    alert("Copy link and share manually.");
  }
};

/* ================= HELPERS ================= */
function escapeHTML(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* ================= INIT ================= */
loadPosts();
