/**
* PHP Email Form Validation - v3.9
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
const form = document.querySelector(".php-email-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const loading = form.querySelector(".loading");
  const error = form.querySelector(".error-message");
  const sent = form.querySelector(".sent-message");

  loading.style.display = "block";
  error.style.display = "none";
  sent.style.display = "none";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    });

    loading.style.display = "none";

    if (response.ok) {
      sent.style.display = "block";
      form.reset();
    } else {
      error.textContent = "There was a problem sending your message.";
      error.style.display = "block";
    }
  } catch (err) {
    loading.style.display = "none";
    error.textContent = "Network error. Please try again later.";
    error.style.display = "block";
  }
});
