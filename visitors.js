import { db } from "./firebase.js";
import { doc, getDoc, setDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

console.log("👁 visitors.js loaded");

/* ===== REFRESH COUNTER ===== */
async function countVisit() {
  const ref = doc(db, "siteStats", "visitors");

  try {
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      // first time
      await setDoc(ref, { count: 1 });
      updateUI(1);
    } else {
      // increment
      await updateDoc(ref, { count: increment(1) });

      // read updated value
      const updatedSnap = await getDoc(ref);
      updateUI(updatedSnap.data().count);
    }
  } catch (err) {
    console.error("Visitor counter error:", err);
  }
}

/* ===== UI UPDATE ===== */
function updateUI(count) {
  const el = document.getElementById("visitorCount");
  if (el) {
    el.innerText = count;
  }
}

/* ===== RUN ON PAGE LOAD ===== */
countVisit();