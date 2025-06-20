document.getElementById("contactForm").addEventListener("submit", async function (e) {
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

    const result = await response.json();

    if (response.ok) {
      alert(result.message);
      document.getElementById("contactForm").reset();
    } else {
      alert(result.error || "Something went wrong");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Server error. Please try again later.");
  }
});
