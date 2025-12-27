console.log("posts.js LOADED");

import {
  db,
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  increment
} from "./firebase.js";

/* ================= DOM TARGETS ================= */
const postSection = document.querySelector(".post-highlight");

/* Create cards container safely */
let cardsContainer = document.querySelector(".posts-container");
if (!cardsContainer) {
  cardsContainer = document.createElement("div");
  cardsContainer.className = "posts-container";
  postSection.appendChild(cardsContainer);
}

const modal = document.getElementById("postModal");

/* ================= LOAD POSTS ================= */
async function loadPosts() {
  const q = query(
    collection(db, "posts"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    console.warn("No posts found in Firestore");
    return;
  }

  snapshot.forEach(docSnap => {
    const post = docSnap.data();
    const postId = docSnap.id;

    const card = document.createElement("div");
    card.className = "post-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");

    card.onclick = () => openPostFromData(postId, post);
    card.onkeypress = e => {
      if (e.key === "Enter") openPostFromData(postId, post);
    };

    card.innerHTML = `
      <h4>${post.title}</h4>

      <p>${post.excerpt ?? ""}</p>

      <div class="post-meta">
        👁 ${post.views ?? 0} views &nbsp; | &nbsp; 📍 ${post.source ?? "Direct"}
      </div>

      <div class="post-actions" onclick="event.stopPropagation();">
        <span class="button">Read Full Post</span>
        <a href="chat.html" class="button outline">Talk to LagneshMitra</a>
      </div>
    `;

    cardsContainer.appendChild(card);
  });
}

/* ================= OPEN POST ================= */
async function openPostFromData(postId, post) {
  /* 🔥 Increment views safely */
  try {
    const ref = doc(db, "posts", postId);
    await updateDoc(ref, { views: increment(1) });
  } catch (e) {
    console.warn("View increment failed:", e.message);
  }

  /* ================= FILL MODAL ================= */
  modal.querySelector("h1").innerText = post.title;

  const stats = modal.querySelector(".post-stats");
  if (stats) {
    stats.innerHTML = `
      <span>👁 ${(post.views ?? 0) + 1} views</span>
      <span>📍 ${post.source ?? "Direct"}</span>
      <span>🕒 Updated Today</span>
    `;
  }

  const contentBox = modal.querySelector(".post-content");
  if (contentBox) {
    contentBox.innerHTML = post.content
      .split("\n")
      .filter(p => p.trim())
      .map(p => `<p style="margin-bottom:18px;">${p}</p>`)
      .join("");
  }

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
  if (navigator.share) {
    navigator.share({
      title: modal.querySelector("h1").innerText,
      text: "Read this post on LagneshMitra",
      url: window.location.href
    });
  } else {
    alert("Copy link and share manually.");
  }
};

/* ================= INIT ================= */
loadPosts();
