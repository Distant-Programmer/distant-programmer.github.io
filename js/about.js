(function () {
  "use strict";

  var timelineItems = document.querySelectorAll(".timeline-item");
  var timelineWeb = document.getElementById("timeline-web");

  if (timelineWeb && "IntersectionObserver" in window) {
    var webObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            timelineWeb.classList.add("is-drawn");
            webObserver.unobserve(timelineWeb);
          }
        });
      },
      { threshold: 0.2 }
    );
    webObserver.observe(timelineWeb);
  } else if (timelineWeb) {
    timelineWeb.classList.add("is-drawn");
  }

  if (!("IntersectionObserver" in window) || !timelineItems.length) {
    return;
  }

  var timelineObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-active");
        }
      });
    },
    { threshold: 0.35 }
  );

  timelineItems.forEach(function (item, index) {
    item.style.transitionDelay = String(index * 0.08) + "s";
    timelineObserver.observe(item);
  });

  var eduConnector = document.querySelector(".edu-web-connector");
  if (eduConnector && "IntersectionObserver" in window) {
    var eduObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            eduConnector.querySelectorAll("path").forEach(function (path) {
              path.style.animation = "web-thread-draw 2.5s ease forwards";
            });
            eduObserver.unobserve(eduConnector);
          }
        });
      },
      { threshold: 0.3 }
    );
    eduObserver.observe(eduConnector);
  }
})();
