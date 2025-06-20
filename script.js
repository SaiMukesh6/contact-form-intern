document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const messageBox = document.getElementById("messageBox");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Basic client-side validation
    if (!name || !email || !message) {
      showMessage("Please fill in all fields.", "error");
      return;
    }

    // Optional: Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage("Please enter a valid email address.", "error");
      return;
    }

    try {
      const response = await fetch("https://contact-form-intern.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });

      const data = await response.json();

      if (response.ok) {
        showMessage("Thank you for your message!", "success");
        form.reset();
      } else {
        showMessage(data.error || "Something went wrong. Please try again.", "error");
      }
    } catch (err) {
      showMessage("Server error. Please try again later.", "error");
      console.error("Error submitting form:", err);
    }
  });

  function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = type;
    messageBox.style.display = "block";
  }
});
