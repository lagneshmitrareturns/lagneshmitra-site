import { db, collection, getDocs, query, orderBy } from "./firebase.js";

const postSection = document.querySelector(".post-highlight");

async function loadPosts() {
  const q = query(
    collection(db, "posts"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  snapshot.forEach(doc => {
    const post = doc.data();

    const card = document.createElement("div");
    card.className = "post-card";
    card.onclick = () => openPostFromData(post);

    card.innerHTML = `
      <h4>${post.title}</h4>

      <p>${post.excerpt}</p>

      <div class="post-meta">
        👁 ${post.views} views &nbsp; | &nbsp; 📍 ${post.source}
      </div>

      <div class="post-actions">
        <span class="button">Read Full Post</span>
        <span class="button outline">Talk to LagneshMitra</span>
      </div>
    `;

    postSection.appendChild(card);
  });
}

loadPosts();