const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
toggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.innerHTML = open ? "CLOSE <span>×</span>" : "MENU <span>☰</span>";
});
menu.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = "MENU <span>☰</span>";
  }),
);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = "MENU <span>☰</span>";
  }
});
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.08 },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
} else {
  document
    .querySelectorAll(".reveal")
    .forEach((el) => el.classList.add("visible"));
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    if (!form) return;

    const button = form.querySelector(".contact-submit");

    const PUBLIC_KEY = "Q8y5Q3ce2_-7mTlR4";
    const SERVICE_ID = "service_iik3cfq";
    const TEMPLATE_ID = "template_frihqfb";

    emailjs.init({
        publicKey: PUBLIC_KEY
    });

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        button.disabled = true;
        button.textContent = "SENDING...";
        status.textContent = "";

        try {
            await emailjs.sendForm(
                SERVICE_ID,
                TEMPLATE_ID,
                form
            );

            status.textContent = "Message sent successfully!";
            status.style.color = "#43a86b";

            form.reset();

        } catch (error) {
            console.error("EmailJS Error:", error);

            status.textContent =
                "Something went wrong. Please try again.";

            status.style.color = "#ff7426";

        } finally {
            button.disabled = false;
            button.textContent = "SEND MESSAGE ↗";
        }
    });
});