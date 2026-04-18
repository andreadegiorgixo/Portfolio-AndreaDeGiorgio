const form = document.getElementById('contact-form');
const status = document.getElementById('contact-form-status');

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    try {
        const response = await fetch('/contact.php', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        status.textContent = data.message;

        if (data.success) {
            form.reset();
            if (typeof grecaptcha !== 'undefined') {
                grecaptcha.reset();
            }
        }
    } catch (error) {
        status.textContent = 'Si è verificato un errore imprevisto.';
        console.error(error);
    }
});