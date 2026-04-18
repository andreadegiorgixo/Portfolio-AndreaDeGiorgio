const canUseCustomCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (canUseCustomCursor) {
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);
    const hoverTargets = "a, button, input, textarea, select, label, [role='button']";

    const showCursor = () => cursor.classList.add("is-visible");
    const hideCursor = () => cursor.classList.remove("is-visible");
    const enableHoverState = () => cursor.classList.add("is-hovering");
    const disableHoverState = () => cursor.classList.remove("is-hovering");

    document.addEventListener("mousemove", (event) => {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
        showCursor();
    });

    document.addEventListener("mouseleave", hideCursor);
    document.addEventListener("mouseenter", showCursor);
    document.addEventListener("mouseover", (event) => {
        if (event.target.closest(hoverTargets)) {
            enableHoverState();
        }
    });
    document.addEventListener("mouseout", (event) => {
        if (event.target.closest(hoverTargets)) {
            disableHoverState();
        }
    });
}

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
    const statusElement = document.querySelector("#contact-form-status");
    const submitButton = contactForm.querySelector("button[type='submit']");
    const submitButtonLabel = submitButton ? submitButton.textContent : "";

    const updateStatus = (message, type) => {
        if (!statusElement) {
            return;
        }

        statusElement.textContent = message;
        statusElement.className = "contacts-form-status";

        if (type) {
            statusElement.classList.add(`is-${type}`);
        }
    };

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            updateStatus("Controlla i campi obbligatori prima di inviare.", "error");
            return;
        }

        if (typeof grecaptcha === "undefined") {
            updateStatus("reCAPTCHA non e disponibile in questo momento. Ricarica la pagina.", "error");
            return;
        }

        const recaptchaToken = grecaptcha.getResponse();

        if (!recaptchaToken) {
            updateStatus("Completa la verifica reCAPTCHA prima di inviare il messaggio.", "error");
            return;
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Invio in corso...";
        }

        updateStatus("Invio del messaggio in corso...", "pending");

        try {
            const response = await fetch("/.netlify/functions/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    name: contactForm.elements.name.value,
                    email: contactForm.elements.email.value,
                    message: contactForm.elements.message.value,
                    recaptchaToken
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Invio non riuscito.");
            }

            contactForm.reset();
            grecaptcha.reset();
            updateStatus(result.message, "success");
        } catch (error) {
            grecaptcha.reset();
            updateStatus(error.message || "Si e verificato un errore. Riprova tra poco.", "error");
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = submitButtonLabel;
            }
        }
    });
}
