const form = document.getElementById('contact-form');
const status = document.getElementById('contact-form-status');

if (form && status) {
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        const formData = new FormData(form);
        const recaptchaResponse = typeof grecaptcha !== 'undefined'
            ? grecaptcha.getResponse()
            : '';

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

            status.textContent = data && data.message
                ? data.message
                : 'Il server ha restituito una risposta non valida.';

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
