// Chai Culture Landing Page

document.addEventListener("DOMContentLoaded", () => {
    console.log(
        "%c🚀 Chai Culture Landing Page Initialized",
        "color:#D4AF37;font-size:16px;font-weight:bold;"
    );

    const loader = document.querySelector(".loader");

    setTimeout(() => {
        loader.classList.add("hidden");
        setTimeout(() => {
            loader.style.display = "none";
            initializePage();
        }, 500);
    }, 1500);

    function initializePage() {

        /* Logo Handling */
        const logo = document.getElementById("logo");
        const logoFallback = document.getElementById("logoFallback");

        if (logo) {
            logo.addEventListener("error", () => {
                logo.style.display = "none";
                logoFallback.style.display = "block";
            });

            logo.addEventListener("mouseenter", () => {
                logo.style.transform = "translateY(-5px) scale(1.05)";
                logo.style.filter =
                    "drop-shadow(0 8px 24px rgba(212,175,55,0.4))";
            });

            logo.addEventListener("mouseleave", () => {
                logo.style.transform = "translateY(0) scale(1)";
                logo.style.filter =
                    "drop-shadow(0 4px 8px rgba(60,42,33,0.2))";
            });
        }

        createGoldParticles();

        /* Scroll Progress */
        const progressBar = document.getElementById("progressBar");
        if (progressBar) {
            window.addEventListener("scroll", () => {
                const height =
                    document.documentElement.scrollHeight -
                    document.documentElement.clientHeight;
                progressBar.style.width =
                    (window.scrollY / height) * 100 + "%";
            });
        }

        /* Countdown Timer */
        const launchDate = new Date("January 29, 2026 23:59:59").getTime();
        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");
        const countdownProgress = document.getElementById("countdownProgress");

        function updateCountdown() {
            const now = Date.now();
            const diff = launchDate - now;

            if (diff <= 0) {
                daysEl.textContent =
                    hoursEl.textContent =
                    minutesEl.textContent =
                    secondsEl.textContent =
                        "00";
                countdownProgress.style.width = "100%";
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (diff / (1000 * 60 * 60)) % 24
            );
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            updateNumber(daysEl, days);
            updateNumber(hoursEl, hours);
            updateNumber(minutesEl, minutes);
            updateNumber(secondsEl, seconds);

            countdownProgress.style.width =
                100 - (days / 100) * 100 + "%";
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);

        /* Email Signup */
        const emailForm = document.getElementById("emailForm");
        const emailInput = document.getElementById("emailInput");
        const successMessage = document.getElementById("successMessage");
        const signupCountEl = document.getElementById("signupCount");
        const goalFill = document.getElementById("goalFill");

        let signupCount = 42;
        const goal = 10000;

        function updateSignup() {
            signupCountEl.textContent = signupCount;
            goalFill.style.width =
                Math.min((signupCount / goal) * 100, 100) + "%";
        }

        updateSignup();

        if (emailForm) {
            emailForm.addEventListener("submit", async (e) => {
                e.preventDefault();

                const email = emailInput.value.trim();
                if (!isValidEmail(email)) {
                    showError("Please enter a valid email address");
                    return;
                }

                const btn = emailForm.querySelector(".submit-btn");
                const text = btn.querySelector(".btn-text");
                const original = text.textContent;

                text.textContent = "Submitting...";
                btn.disabled = true;

                try {
                    await submitEmail(email);
                    signupCount++;
                    updateSignup();

                    emailForm.style.display = "none";
                    successMessage.style.display = "block";

                    setTimeout(() => {
                        successMessage.style.display = "none";
                        emailForm.style.display = "block";
                    }, 5000);

                    emailInput.value = "";
                } catch {
                    showError("Something went wrong. Please try again.");
                } finally {
                    text.textContent = original;
                    btn.disabled = false;
                }
            });
        }

        /* Back To Top */
        const backToTop = document.getElementById("backToTop");
        if (backToTop) {
            window.addEventListener("scroll", () => {
                backToTop.classList.toggle(
                    "visible",
                    window.scrollY > 500
                );
            });

            backToTop.addEventListener("click", () =>
                window.scrollTo({ top: 0, behavior: "smooth" })
            );
        }

        initializeFloatingElements();
    }

    /* Utilities */

    function createGoldParticles() {
        const container = document.getElementById("goldParticles");
        if (!container) return;

        for (let i = 0; i < 50; i++) {
            const p = document.createElement("div");
            p.className = "gold-particle";
            p.style.left = Math.random() * 100 + "vw";
            p.style.top = Math.random() * 100 + "vh";
            const size = Math.random() * 3 + 1;
            p.style.width = p.style.height = size + "px";
            p.style.opacity = Math.random() * 0.3 + 0.1;
            p.style.animation = `floatAround ${
                Math.random() * 20 + 10
            }s linear infinite`;
            container.appendChild(p);
        }
    }

    function updateNumber(el, value) {
        const formatted = value.toString().padStart(2, "0");
        if (el.textContent !== formatted) {
            el.textContent = formatted;
        }
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function submitEmail(email) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const list =
                    JSON.parse(
                        localStorage.getItem("chaiSubmissions") || "[]"
                    );
                list.push({ email, time: new Date().toISOString() });
                localStorage.setItem(
                    "chaiSubmissions",
                    JSON.stringify(list)
                );
                Math.random() > 0.1 ? resolve() : reject();
            }, 800);
        });
    }

    function showError(message) {
        const error = document.createElement("div");
        error.className = "error-message";
        error.textContent = message;
        document.getElementById("emailForm").appendChild(error);

        setTimeout(() => error.remove(), 3000);
    }

    function initializeFloatingElements() {
        document.querySelectorAll(".floating-element").forEach((el, i) => {
            setInterval(() => {
                el.style.transform = `translate(${Math.random() * 40 - 20}px,${
                    Math.random() * 40 - 20
                }px)`;
            }, 3000 + i * 1000);
        });
    }
});