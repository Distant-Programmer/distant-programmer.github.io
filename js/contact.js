(function () {
  "use strict";

  var form = document.getElementById("contact-form");
  var statusEl = document.getElementById("form-status");
  var subjectInput = document.getElementById("subject");

  if (!form) {
    return;
  }

  var params = new URLSearchParams(window.location.search);
  var subjectParam = params.get("subject");
  if (subjectParam && subjectInput) {
    subjectInput.value = subjectParam;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!statusEl) {
      return;
    }

    var name = form.querySelector("#name");
    var email = form.querySelector("#email");
    var subject = form.querySelector("#subject");
    var message = form.querySelector("#message");

    if (!name.value.trim() || !email.value.trim() || !subject.value.trim() || !message.value.trim()) {
      statusEl.textContent = "Please fill in all fields before sending.";
      statusEl.className = "form-status is-error";
      return;
    }

    var mailBody =
      "Name: " +
      name.value.trim() +
      "\nEmail: " +
      email.value.trim() +
      "\n\n" +
      message.value.trim();

    var mailtoLink =
      "mailto:saheedsm2@gmail.com?subject=" +
      encodeURIComponent(subject.value.trim()) +
      "&body=" +
      encodeURIComponent(mailBody);

    statusEl.textContent = "Opening your email app… If nothing opens, email saheedsm2@gmail.com directly.";
    statusEl.className = "form-status is-success";
    window.location.href = mailtoLink;
  });
})();
