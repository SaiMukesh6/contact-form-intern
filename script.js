document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("https://contact-form-intern.onrender.com/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        successMessage.textContent = data.message || "Message sent!";
        successMessage.style.color = "green";
        form.reset();
      } else {
        successMessage.textContent = data.error || "Failed to submit.";
        successMessage.style.color = "red";
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      successMessage.textContent = "Internal server error. Try again later.";
      successMessage.style.color = "red";
    }
  });
});
