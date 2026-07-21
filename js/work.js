(function () {
  "use strict";

  if (window.location.hash) {
    var target = document.querySelector(window.location.hash);
    if (target) {
      window.setTimeout(function () {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  }

  var workItems = document.querySelectorAll(".work-item");
  if (!("IntersectionObserver" in window) || !workItems.length) {
    workItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
    return;
  }

  var workObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          workObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -30px 0px" }
  );

  workItems.forEach(function (item, index) {
    item.style.transitionDelay = String(index * 0.1) + "s";
    workObserver.observe(item);
  });
})();
