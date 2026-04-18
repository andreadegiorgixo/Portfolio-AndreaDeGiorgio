const form = document.getElementById('contact-form');
const status = document.getElementById('contact-form-status');

if (form && status) {
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        const consentCheckbox = document.getElementById('contact-consent');
        const formData = new FormData(form);
        const recaptchaResponse = typeof grecaptcha !== 'undefined'
            ? grecaptcha.getResponse()
            : '';

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        if (!consentCheckbox || !consentCheckbox.checked) {
            status.textContent = 'Devi acconsentire al trattamento dei dati personali per inviare il messaggio.';
            return;
        }

        if (!recaptchaResponse) {
            status.textContent = 'Completa la verifica reCAPTCHA prima di inviare.';
            return;
        }

        formData.set('recaptchaToken', recaptchaResponse);
        status.textContent = 'Invio in corso...';

        if (submitButton) {
            submitButton.disabled = true;
        }

        try {
            const response = await fetch(form.getAttribute('action') || '/contact.php', {
                method: 'POST',
                body: formData
            });

            const responseText = await response.text();
            let data = null;

            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                data = null;
            }

            if (data && data.message) {
                status.textContent = data.message;
            } else {
                const compactResponse = responseText
                    ? responseText.replace(/\s+/g, ' ').trim().slice(0, 180)
                    : '';

                status.textContent = compactResponse
                    ? `Risposta server non valida: ${compactResponse}`
                    : 'Il server ha restituito una risposta non valida.';
            }

            if (response.ok && data && data.success) {
                form.reset();
                if (typeof grecaptcha !== 'undefined') {
                    grecaptcha.reset();
                }
            }
        } catch (error) {
            status.textContent = 'Si è verificato un errore imprevisto.';
            console.error(error);
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
            }
        }
    });
}
