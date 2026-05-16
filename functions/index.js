const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const axios = require("axios");

// ── PILAR A: Secretos exfiltrados de source — gestionados por Secret Manager ──
const TELEGRAM_TOKEN  = defineSecret("TELEGRAM_TOKEN");
const CHAT_ID         = defineSecret("CHAT_ID");
const MASTER_KEY      = defineSecret("MASTER_KEY");
const VERCEL_CRM_URL  = defineSecret("VERCEL_CRM_URL");

// ── sendLeadToTelegram — firma v1.0 preservada ────────────────────────────────
exports.sendLeadToTelegram = onRequest(
    { cors: true, secrets: [TELEGRAM_TOKEN, CHAT_ID] },
    async (req, res) => {
        if (req.method !== "POST") {
            return res.status(405).send("Method Not Allowed");
        }

        const data = req.body;

        // ── PILAR C: Null-guard sobre campos de entrada ──────────────────────
        const name     = (data.name     || "").toString().replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const email    = (data.email    || "").toString().replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const phone    = (data.phone    || "").toString().replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const country  = (data.country  || "").toString().replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const referral = (data.referral || "").toString().replace(/</g, "&lt;").replace(/>/g, "&gt;");

        const mensaje = `
🚀 <b>NUEVO LEAD - CPII PORTUGAL</b>
────────────────────
👤 <b>Inversor:</b> ${name}
📧 <b>Email:</b> ${email}
📞 <b>WhatsApp:</b> ${phone}
🌍 <b>País:</b> ${country}
🤝 <b>Embajador:</b> ${referral}
────────────────────
💰 <i>Estado: Pendiente de contacto comercial.</i>
        `;

        try {
            await axios.post(
                `https://api.telegram.org/bot${TELEGRAM_TOKEN.value()}/sendMessage`,
                {
                    chat_id:    CHAT_ID.value(),
                    text:       mensaje,
                    parse_mode: "HTML",
                }
            );

            logger.info("Notificación enviada con éxito para: " + email);
            res.status(200).send({ success: true });
        } catch (error) {
            logger.error("Fallo en el sistema de notificaciones", error);
            res.status(500).send({ success: false, error: error.message });
        }
    }
);

// ── validateAdminGate — PILAR B: árbitro real server-side ────────────────────
exports.validateAdminGate = onRequest(
    { cors: true, secrets: [MASTER_KEY, VERCEL_CRM_URL] },
    async (req, res) => {
        if (req.method !== "POST") {
            return res.status(405).send("Method Not Allowed");
        }

        const { key } = req.body;

        if (!key || typeof key !== "string") {
            logger.warn("Intento de acceso sin clave");
            return res.status(400).send({ success: false, message: "Bad Request" });
        }

        if (key === MASTER_KEY.value()) {
            logger.info("Acceso ADMIN concedido");
            return res.status(200).send({
                success: true,
                url: VERCEL_CRM_URL.value(),
            });
        }

        logger.warn("Intento de acceso fallido");
        return res.status(401).send({ success: false, message: "Unauthorized" });
    }
);
