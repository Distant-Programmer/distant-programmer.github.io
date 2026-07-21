(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var yearEl = document.getElementById("year");
  var newsflash = document.getElementById("newsflash");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var orbitItems = document.querySelectorAll(".skill-orbit-item");
  if (orbitItems.length) {
    var step = 360 / orbitItems.length;
    orbitItems.forEach(function (item, index) {
      item.style.setProperty("--angle", String(index * step) + "deg");
    });
  }

  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var isOpen = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    document.addEventListener("click", function (event) {
      if (!header.contains(event.target)) {
        header.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }
    });
  }

  var revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealItems.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  var tickerTrack = document.querySelector(".newsflash-track");
  if (tickerTrack && tickerTrack.children.length) {
    var clone = tickerTrack.cloneNode(true);
    while (clone.firstChild) {
      tickerTrack.appendChild(clone.firstChild);
    }
  }

  if (newsflash) {
    var hero = document.querySelector(".hero-home");
    var newsflashSlot = document.getElementById("newsflash-slot");

    function updateNewsflashDock() {
      if (!hero) {
        return;
      }

      var heroBottom = hero.getBoundingClientRect().bottom;
      var shouldDock = heroBottom < 0;

      newsflash.classList.toggle("is-docked", shouldDock);
      document.body.classList.toggle("has-docked-ticker", shouldDock);
      if (newsflashSlot) {
        newsflashSlot.classList.toggle("is-collapsed", shouldDock);
      }
    }

    window.addEventListener("scroll", updateNewsflashDock, { passive: true });
    updateNewsflashDock();
  }
})();
