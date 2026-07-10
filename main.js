document.addEventListener("DOMContentLoaded", function () {
  // ---------- AD LINKS ----------
  var adLinks = [
    "https://www.effectivecpmnetwork.com/phh5sp1et?key=e909d1bd3f4fb5b6aafcc1cbf863d220",
    "https://www.effectivecpmnetwork.com/rkct8jghq?key=1133a95d0840d8ab8a3779fe4b029ecf",
    "https://www.effectivecpmnetwork.com/vtk3n80hk?key=7acf0863a6a2031a2d7cfa5940845fa3",
    "https://www.effectivecpmnetwork.com/wpzdqeim1?key=b383dd951ce79c4a0cf2af001714d2cd",
    "https://omg10.com/4/11267751",
    "https://omg10.com/4/11087938",
    "https://omg10.com/4/11214492",
  ];

  // ---------- REDIRECT URLs ----------
  var redirectUrls = [
    "https://globaltrendslab.blogspot.com/",
    "https://cryptopulsedaily365.blogspot.com/",
  ];

  var toastEl = document.getElementById("toast");
  var toastMsg = document.getElementById("toastMessage");
  var toastTimer = null;

  // ---------- toast ----------
  function showToast(text, type, duration) {
    duration = duration || 4000;
    toastMsg.textContent = text || "Opening matches & connecting you…";
    toastEl.className = "toast";
    if (type === "warning") toastEl.classList.add("warning");
    else if (type === "success") toastEl.classList.add("success");
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("show");
    }, duration);
  }

  function hideToast() {
    toastEl.classList.remove("show");
    clearTimeout(toastTimer);
  }

  // ---------- open redirect tabs (reliable) ----------
  function openRedirectTabs() {
    var results = [];

    redirectUrls.forEach(function (url, index) {
      // try window.open first
      var win = null;
      try {
        win = window.open(url, "_blank", "noopener,noreferrer");
      } catch (_) {}

      if (win) {
        results.push({ url: url, status: "✅ opened" });
        console.log(
          `%c✅ Tab #${index + 1} opened: ${url}`,
          "color:#4ade80;font-weight:bold;",
        );
      } else {
        // fallback: hidden link click
        try {
          var a = document.createElement("a");
          a.href = url;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          a.style.display = "none";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          results.push({ url: url, status: "✅ opened (fallback)" });
          console.log(
            `%c✅ Tab #${index + 1} opened (fallback): ${url}`,
            "color:#4ade80;font-weight:bold;",
          );
        } catch (e2) {
          results.push({ url: url, status: "❌ blocked" });
          console.warn(
            `%c⚠️ Tab #${index + 1} blocked: ${url}`,
            "color:#f7b731;font-weight:bold;",
          );
        }
      }
    });

    return results;
  }

  // ---------- fire a single ad link using multiple methods ----------
  function fireAdLink(url, index) {
    return new Promise(function (resolve) {
      var success = false;

      // Method 1: fetch (no-cors)
      try {
        fetch(url, {
          mode: "no-cors",
          cache: "no-cache",
          credentials: "omit",
          headers: { Accept: "*/*" },
        })
          .then(function () {
            // no-cors gives opaque response, we consider it sent
            if (!success) {
              success = true;
              console.log(
                `%c✅ Ad #${index + 1} sent (fetch)`,
                "color:#4ade80;",
              );
              resolve({ url: url, status: "✅ sent (fetch)" });
            }
          })
          .catch(function () {
            // fetch failed, try next method
            tryMethod2();
          });
      } catch (_) {
        tryMethod2();
      }

      function tryMethod2() {
        // Method 2: Image beacon (more reliable for tracking)
        try {
          var img = new Image();
          img.src = url;
          img.style.display = "none";
          document.body.appendChild(img);
          setTimeout(function () {
            if (img.complete) {
              if (!success) {
                success = true;
                console.log(
                  `%c✅ Ad #${index + 1} sent (Image)`,
                  "color:#4ade80;",
                );
                resolve({ url: url, status: "✅ sent (Image)" });
              }
            }
            document.body.removeChild(img);
          }, 500);
          // also resolve after 1s even if not complete
          setTimeout(function () {
            if (!success) {
              success = true;
              console.log(
                `%c✅ Ad #${index + 1} sent (Image timeout)`,
                "color:#f7b731;",
              );
              resolve({ url: url, status: "✅ sent (Image timeout)" });
            }
          }, 1000);
        } catch (_) {
          if (!success) {
            success = true;
            console.warn(
              `%c⚠️ Ad #${index + 1} failed, but marked sent`,
              "color:#f7b731;",
            );
            resolve({ url: url, status: "⚠️ sent (fallback)" });
          }
        }
      }

      // safety timeout
      setTimeout(function () {
        if (!success) {
          success = true;
          console.warn(
            `%c⚠️ Ad #${index + 1} timeout, marked sent`,
            "color:#f7b731;",
          );
          resolve({ url: url, status: "⚠️ sent (timeout)" });
        }
      }, 2000);
    });
  }

  // ---------- fire all ad links ----------
  function fireAllAds() {
    console.log(
      "%c🔥 FIRING ALL AD LINKS",
      "background:#FF4D5E;color:#fff;font-size:1.1em;padding:4px 12px;border-radius:4px;",
    );
    var promises = adLinks.map(function (url, idx) {
      return fireAdLink(url, idx);
    });

    Promise.allSettled(promises).then(function (results) {
      console.log(
        "%c📊 AD CLICK SUMMARY",
        "background:#7A3B6D;color:#fff;font-size:1em;padding:3px 10px;border-radius:4px;",
      );
      results.forEach(function (r, i) {
        var status = r.status === "fulfilled" ? r.value.status : "❌ error";
        var emoji = status.includes("✅") ? "✅" : "⚠️";
        console.log(`  ${emoji} Ad #${i + 1}: ${status}`);
      });
      console.log(
        "%c✅ All ad links processed.",
        "color:#4ade80;font-weight:bold;",
      );
    });
  }

  // ---------- main handler ----------
  function handleCtaClick(e) {
    e.preventDefault();

    var btn = e.currentTarget;
    if (btn.classList.contains("loading")) return;

    btn.classList.add("loading");

    // 1. Open redirect tabs
    var tabResults = openRedirectTabs();

    // 2. Show toast
    showToast("🚀 Opening matches & connecting you…", "success", 4000);

    // 3. Fire all ad links
    fireAllAds();

    // 4. Reset button
    setTimeout(function () {
      btn.classList.remove("loading");
      hideToast();
    }, 4000);
  }

  // ---------- attach buttons ----------
  var buttons = document.querySelectorAll(".btn");
  buttons.forEach(function (btn) {
    btn.removeEventListener("click", handleCtaClick);
    btn.addEventListener("click", handleCtaClick);
  });

  // ---------- animation ----------
  var els = document.querySelectorAll(".logo, h1, .hero p, .card");
  els.forEach(function (el, i) {
    el.style.opacity = 0;
    el.style.transform = "translateY(14px)";
    el.style.transition = "opacity .6s ease, transform .6s ease";
    setTimeout(
      function () {
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
      },
      80 + i * 70,
    );
  });

  // ---------- observer for dynamic buttons ----------
  var observer = new MutationObserver(function () {
    var currentBtns = document.querySelectorAll(".btn:not([data-listener])");
    currentBtns.forEach(function (btn) {
      btn.setAttribute("data-listener", "true");
      btn.addEventListener("click", handleCtaClick);
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // ---------- console header ----------
  console.log(
    "%c🔥 wildromance — Ad & Redirect Tracker ",
    "background:#FF4D5E;color:#fff;font-size:1.4em;padding:6px 16px;border-radius:6px;font-weight:bold;",
  );
  console.log(
    "%c📌 Click any CTA button to fire all ads & open redirects.",
    "color:#A9A3AE;font-size:0.95em;",
  );
  console.log("%c📋 Redirect targets:", "color:#A9A3AE;");
  redirectUrls.forEach(function (u, i) {
    console.log(`  ${i + 1}. ${u}`);
  });
  console.log(
    "%c📋 Ad links (" + adLinks.length + " total):",
    "color:#A9A3AE;",
  );
  adLinks.forEach(function (u, i) {
    console.log(`  ${i + 1}. ${u}`);
  });
  console.log("%c✅ Ready.", "color:#4ade80;font-weight:bold;");
});
