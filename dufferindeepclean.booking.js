/* dufferindeepclean.booking.js */

/* =========================
   CONFIG
========================= */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_ME"; // <-- put your real endpoint here

/* =========================
   STEP WIZARD + UI
========================= */
(function () {
  const form = document.getElementById("bookingForm");
  if (!form) return;

  // Ensure form has action + method for Formspree
  if (!form.getAttribute("action")) form.setAttribute("action", FORMSPREE_ENDPOINT);
  if (!form.getAttribute("method")) form.setAttribute("method", "POST");

  // Add a simple honeypot input if it doesn't exist (spam trap)
  if (!form.querySelector('input[name="_gotcha"]')) {
    const hp = document.createElement("input");
    hp.type = "text";
    hp.name = "_gotcha";
    hp.tabIndex = -1;
    hp.autocomplete = "off";
    hp.style.position = "absolute";
    hp.style.left = "-9999px";
    form.appendChild(hp);
  }

  const stepEls = Array.from(document.querySelectorAll(".step"));
  const stepperItems = document.getElementById("stepper")?.children || [];
  const successEl = document.getElementById("bookingSuccess");
  const reviewList = document.getElementById("reviewList");

  let current = 0;

  function showStep(i) {
    stepEls.forEach((s, idx) => { s.hidden = idx !== i; });
    Array.from(stepperItems).forEach((li, idx) => {
      li.classList.toggle("active", idx === i);
      li.classList.toggle("done", idx < i);
    });
    current = i;
    if (i === 4) buildReview(); // step index 4 == "Step 5: Review & Confirm"
    scrollToTopSmooth();
  }

  function scrollToTopSmooth() {
    try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (_) { window.scrollTo(0, 0); }
  }

  // Next/Back
  document.addEventListener("click", (e) => {
    const t = e.target;
    if (t.matches(".next")) {
      const vis = stepEls[current];
      const required = vis.querySelectorAll("[required]");
      for (const el of required) {
        if (!el.value) { el.focus(); return; }
      }
      showStep(Math.min(current + 1, stepEls.length - 1));
    }
    if (t.matches(".back")) {
      showStep(Math.max(current - 1, 0));
    }
  });

  // Package descriptions toggle (Step 3)
  const pkg = document.getElementById("package");
  function updatePkg() {
    const blocks = {
      industrial: document.getElementById("pkg-industrial"),
      office: document.getElementById("pkg-office"),
      specialty: document.getElementById("pkg-specialty"),
    };
    Object.values(blocks).forEach((b) => b && (b.hidden = true));
    if (blocks[pkg.value]) blocks[pkg.value].hidden = false;
  }
  if (pkg) pkg.addEventListener("change", updatePkg);

  // Build the review summary for Step 5
  function buildReview() {
    if (!reviewList) return;
    const fd = new FormData(form);

    const freqMap = {
      weekly: "Weekly (25% off)",
      biweekly: "Bi-Weekly (20% off)",
      triweekly: "Tri-Weekly (15% off)",
      monthly: "Monthly (10% off)",
      biannual: "Biannual (5% off)",
      onetime: "One-time",
    };
    const pkgMap = {
      industrial: "🏭 Industrial & Warehouse Care",
      office: "🖥️ Office & Corporate Cleaning",
      specialty: "🪟 Specialty Facility Services",
    };

    const rows = [
      ["Business", fd.get("business") || "—"],
      ["Address", [fd.get("address"), fd.get("city"), fd.get("postal")].filter(Boolean).join(", ") || "—"],
      ["Preferred Date", fd.get("date") || "—"],
      ["Preferred Time", fd.get("time") || "—"],
      ["Approx. Sq Ft", fd.get("sqft") || "—"],
      ["Frequency", freqMap[fd.get("frequency")] || "—"],
      ["Package", pkgMap[fd.get("package")] || "—"],
      ["Full Name", fd.get("name") || "—"],
      ["Email", fd.get("email") || "—"],
      ["Phone", fd.get("phone") || "—"],
      ["Notes", fd.get("notes") || "—"],
    ];

    reviewList.innerHTML = rows
      .map(([k, v]) => `<dt>${k}</dt><dd>${String(v).replace(/</g, "&lt;")}</dd>`)
      .join("");
  }

  // Submit to Formspree
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Prevent double submits
    const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector(".submit");
    const allBtns = form.querySelectorAll("button");
    allBtns.forEach((b) => (b.disabled = true));
    if (submitBtn) submitBtn.textContent = "Sending…";

    const fd = new FormData(form);

    // Subject for Formspree email (shows up as email subject)
    if (!fd.get("_subject")) {
      fd.append("_subject", "New Booking Request — Dufferin Deep Clean");
    }

    // Build a neat summary block
    const freq = fd.get("frequency") || "";
    const freqMapShort = {
      weekly: "Weekly (25%)",
      biweekly: "Bi-Weekly (20%)",
      triweekly: "Tri-Weekly (15%)",
      monthly: "Monthly (10%)",
      biannual: "Biannual (5%)",
      onetime: "One-time",
    };
    const pkgMapShort = {
      industrial: "Industrial & Warehouse",
      office: "Office & Corporate",
      specialty: "Specialty Facility",
    };

    const summaryLines = [
      `Business: ${fd.get("business") || "—"}`,
      `Address: ${[fd.get("address"), fd.get("city"), fd.get("postal")].filter(Boolean).join(", ") || "—"}`,
      `Preferred Date/Time: ${fd.get("date") || "—"} @ ${fd.get("time") || "—"}`,
      `Approx. Sq Ft: ${fd.get("sqft") || "—"}`,
      `Frequency: ${freqMapShort[freq] || "—"}`,
      `Package: ${pkgMapShort[fd.get("package")] || "—"}`,
      `Name: ${fd.get("name") || "—"}`,
      `Email: ${fd.get("email") || "—"}`,
      `Phone: ${fd.get("phone") || "—"}`,
      `Notes: ${fd.get("notes") || "—"}`,
    ];
    fd.append("summary", summaryLines.join("\n"));

    try {
      const res = await fetch(form.action || FORMSPREE_ENDPOINT, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        form.hidden = true;
        if (successEl) successEl.hidden = false;
      } else {
        // Try to read Formspree error for clarity
        let msg = "There was a problem sending your booking request. Please try again.";
        try {
          const data = await res.json();
          if (data && data.errors && data.errors.length) {
            msg = data.errors.map((e) => e.message).join("\n");
          }
        } catch (_) {}
        alert(msg);
      }
    } catch (err) {
      alert("Network error. Please check your connection and try again.");
    } finally {
      allBtns.forEach((b) => (b.disabled = false));
      if (submitBtn) submitBtn.textContent = "Submit";
    }
  });

  // Init
  updatePkg();
  showStep(0);
})();
