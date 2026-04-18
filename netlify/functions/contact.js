const WEB3FORMS_API_URL = "https://api.web3forms.com/submit";
const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

const jsonResponse = (statusCode, body) => ({
    statusCode,
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
});

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return jsonResponse(405, { message: "Metodo non consentito." });
    }

    const {
        RECAPTCHA_SECRET_KEY,
        WEB3FORMS_ACCESS_KEY
    } = process.env;

    if (!RECAPTCHA_SECRET_KEY || !WEB3FORMS_ACCESS_KEY) {
        return jsonResponse(500, {
            message: "Configurazione server incompleta. Verifica le variabili ambiente."
        });
    }

    let payload;

    try {
        payload = JSON.parse(event.body || "{}");
    } catch {
        return jsonResponse(400, { message: "Payload non valido." });
    }

    const {
        name = "",
        email = "",
        message = "",
        recaptchaToken = ""
    } = payload;

    if (!name.trim() || !email.trim() || !message.trim()) {
        return jsonResponse(400, { message: "Compila tutti i campi richiesti." });
    }

    if (!recaptchaToken) {
        return jsonResponse(400, { message: "Conferma di non essere un robot richiesta." });
    }

    try {
        const verificationResponse = await fetch(RECAPTCHA_VERIFY_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                secret: RECAPTCHA_SECRET_KEY,
                response: recaptchaToken
            })
        });

        const verificationResult = await verificationResponse.json();

        if (!verificationResult.success) {
            return jsonResponse(400, {
                message: "Verifica reCAPTCHA non valida. Riprova."
            });
        }

        const submissionResponse = await fetch(WEB3FORMS_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                access_key: WEB3FORMS_ACCESS_KEY,
                subject: "Nuovo messaggio dal form contatti",
                from_name: "Portfolio Andrea De Giorgio",
                name: name.trim(),
                email: email.trim(),
                message: message.trim()
            })
        });

        const submissionResult = await submissionResponse.json();

        if (!submissionResponse.ok || !submissionResult.success) {
            return jsonResponse(502, {
                message: "Invio non riuscito. Controlla la configurazione di Web3Forms."
            });
        }

        return jsonResponse(200, {
            message: "Messaggio inviato correttamente. Ti rispondero il prima possibile."
        });
    } catch (error) {
        console.error("Contact form error:", error);

        return jsonResponse(500, {
            message: "Si e verificato un errore durante l'invio. Riprova tra poco."
        });
    }
};
