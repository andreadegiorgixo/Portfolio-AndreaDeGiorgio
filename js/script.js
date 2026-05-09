const themeStorageKey = 'portfolio_theme';
const defaultTheme = 'dark';

function getStoredTheme() {
    try {
        return window.localStorage.getItem(themeStorageKey);
    } catch (error) {
        return null;
    }
}

function setStoredTheme(theme) {
    try {
        window.localStorage.setItem(themeStorageKey, theme);
    } catch (error) {
        return;
    }
}

function applyTheme(theme) {
    const normalizedTheme = theme === 'light' ? 'light' : defaultTheme;
    document.documentElement.setAttribute('data-theme', normalizedTheme);
    document.documentElement.style.colorScheme = normalizedTheme;

    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
        const nextTheme = normalizedTheme === 'dark' ? 'light' : 'dark';
        const label = button.querySelector('.theme-toggle__label');

        button.setAttribute('aria-pressed', String(normalizedTheme === 'light'));
        button.setAttribute('aria-label', `Attiva tema ${nextTheme === 'light' ? 'chiaro' : 'scuro'}`);

        if (label) {
            label.textContent = nextTheme;
        }
    });
}

function initializeThemeToggle() {
    const storedTheme = getStoredTheme();

    applyTheme(storedTheme || defaultTheme);

    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
        button.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

            applyTheme(nextTheme);
            setStoredTheme(nextTheme);
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeThemeToggle);
} else {
    initializeThemeToggle();
}

const cookieConsentKey = 'portfolio_cookie_consent';

function getCookieConsentValue() {
    try {
        return window.localStorage.getItem(cookieConsentKey);
    } catch (error) {
        return null;
    }
}

function setCookieConsentValue(value) {
    try {
        window.localStorage.setItem(cookieConsentKey, value);
    } catch (error) {
        return;
    }
}

function createCookieBanner() {
    if (!document.body || getCookieConsentValue()) {
        return;
    }

    const banner = document.createElement('aside');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Preferenze cookie');

    banner.innerHTML = `
        <div class="cookie-banner__media" aria-hidden="true">
            <div class="cookie-banner__shape cookie-banner__shape--frame"></div>
            <div class="cookie-banner__shape cookie-banner__shape--card-one"></div>
            <div class="cookie-banner__shape cookie-banner__shape--card-two"></div>
            <div class="cookie-banner__shape cookie-banner__shape--device"></div>
        </div>
        <div class="cookie-banner__content">
            <p class="cookie-banner__eyebrow">Cookie</p>
            <h2 class="cookie-banner__title">Scegli come navigare.</h2>
            <p class="cookie-banner__text">
                Questo sito utilizza cookie tecnici e, previo consenso, cookie per migliorare l'esperienza di navigazione.
                Puoi accettare o rifiutare in qualsiasi momento. Leggi la
                <a href="/policy-contatto.html" class="cookie-banner__link">policy</a>.
            </p>
            <div class="cookie-banner__actions">
                <button type="button" class="btn cookie-banner__button cookie-banner__button--ghost" data-cookie-choice="declined">Rifiuta</button>
                <button type="button" class="btn cookie-banner__button cookie-banner__button--primary" data-cookie-choice="accepted">Accetta</button>
            </div>
        </div>
    `;

    const closeBanner = function (choice) {
        setCookieConsentValue(choice);
        banner.classList.remove('is-visible');
        banner.classList.add('is-hiding');

        window.setTimeout(function () {
            banner.remove();
            document.body.classList.remove('has-cookie-banner');
        }, 380);
    };

    banner.addEventListener('click', function (event) {
        const target = event.target;

        if (!(target instanceof HTMLElement)) {
            return;
        }

        const choice = target.getAttribute('data-cookie-choice');

        if (!choice) {
            return;
        }

        closeBanner(choice);
    });

    document.body.appendChild(banner);
    document.body.classList.add('has-cookie-banner');

    window.requestAnimationFrame(function () {
        banner.classList.add('is-visible');
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createCookieBanner);
} else {
    createCookieBanner();
}

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
            const response = await fetch(form.getAttribute('action') || '/php/contact.php', {
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
