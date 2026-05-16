/**
 * ================================================================================
 * ARCHIVO:    handoff-emitter.js
 * VERSIÓN:    1.0.0
 * FECHA:      2026-04-19
 * AUTOR:      Kimi — Junior Dev-Logic (Carril Operativo)
 * PROYECTO:   CPII Portugal — VIBE-CPII-22 "La Mochila"
 * 
 * PROPÓSITO:  Implementar el mecanismo de persistencia cross-domain para parámetros
 *             de sesión (locale, referral, UTM) mediante inyección dinámica en
 *             enlaces salientes hacia el CRM. Solución O(1), zero-deps, IA-Ready.
 * 
 * DOCTRINA:   R5 — Economía de Guerra (JS Puro, O(1), Zero-Deps)
 *             IA-Ready — Eventos pasivos nativos, namespace sellado
 * ================================================================================
 */

(function () {
    'use strict';

    // ═════════════════════════════════════════════════════════════════════════════
    // [SEC-01] CONFIGURACIÓN Y CONSTANTES
    // ═════════════════════════════════════════════════════════════════════════════

    /**
     * Lista blanca estricta de parámetros permitidos para el handoff.
     * Cualquier otro parámetro en localStorage será ignorado.
     * @const {Array<string>}
     */
    const ALLOWED_BACKPACK_PARAMS = ['locale', 'ref', 'utm_source'];

    /**
     * Prefijo canónico para claves en localStorage.
     * @const {string}
     */
    const STORAGE_PREFIX = 'cpii_';

    /**
     * Dominio destino para handoff (CRM).
     * @const {string}
     */
    const CRM_DOMAIN = 'crm.cpii.digital';

    /**
     * Namespace global CPII — inicializado si no existe.
     * @namespace
     */
    if (typeof window.__CPII__ !== 'object' || window.__CPII__ === null) {
        window.__CPII__ = {};
    }

    // ═════════════════════════════════════════════════════════════════════════════
    // [SEC-02] UTILIDADES CORE (O(1) — Sin dependencias externas)
    // ═════════════════════════════════════════════════════════════════════════════

    /**
     * Recupera valor de localStorage con prefijo canónico.
     * @param {string} key — Clave sin prefijo
     * @returns {string|null}
     */
    function getStoredValue(key) {
        try {
            return localStorage.getItem(STORAGE_PREFIX + key);
        } catch (e) {
            // Fallback silencioso para modo privado o storage bloqueado
            return null;
        }
    }

    /**
     * Construye objeto URLSearchParams con los parámetros permitidos presentes.
     * @returns {URLSearchParams}
     */
    function buildBackpackParams() {
        const params = new URLSearchParams();

        for (let i = 0; i < ALLOWED_BACKPACK_PARAMS.length; i++) {
            const key = ALLOWED_BACKPACK_PARAMS[i];
            const value = getStoredValue(key);

            if (value !== null && value !== '') {
                params.append(key, value);
            }
        }

        return params;
    }

    /**
     * Determina si una URL apunta al dominio CRM.
     * @param {string} href
     * @returns {boolean}
     */
    function isCrmDomain(href) {
        try {
            const url = new URL(href, window.location.href);
            return url.hostname === CRM_DOMAIN;
        } catch (e) {
            return false;
        }
    }

    /**
     * Inyecta parámetros de mochila en URL destino.
     * @param {string} originalHref
     * @param {URLSearchParams} backpack
     * @returns {string} — URL modificada
     */
    function injectBackpack(originalHref, backpack) {
        if (backpack.size === 0) {
            return originalHref;
        }

        const url = new URL(originalHref, window.location.href);

        // Merge: parámetros existentes preservados, backpack añadido/override
        backpack.forEach((value, key) => {
            url.searchParams.set(key, value);
        });

        return url.toString();
    }

    // ═════════════════════════════════════════════════════════════════════════════
    // [SEC-03] HANDLER PRINCIPAL (Intercepción de clicks)
    // ═════════════════════════════════════════════════════════════════════════════

    /**
     * Handler para eventos de click en enlaces.
     * Intercepta, inyecta parámetros, emite telemetría.
     * @param {MouseEvent} event
     */
    function handleLinkClick(event) {
        const anchor = event.target.closest('a[href]');

        if (!anchor) {
            return;
        }

        const originalHref = anchor.getAttribute('href');

        // Filtro: solo enlaces externos al CRM
        if (!isCrmDomain(originalHref)) {
            return;
        }

        // Construcción de mochila O(1)
        const backpack = buildBackpackParams();

        // Inyección de parámetros
        const enhancedHref = injectBackpack(originalHref, backpack);

        // Aplicar URL modificada
        anchor.href = enhancedHref;

        // Emisión de evento pasivo nativo (IA-Ready telemetry)
        emitHandoffEvent({
            originalHref: originalHref,
            enhancedHref: enhancedHref,
            paramsInjected: Array.from(backpack.keys()),
            timestamp: Date.now()
        });
    }

    /**
     * Emite evento pasivo nativo de telemetría.
     * @param {Object} detail — Metadatos del handoff
     */
    function emitHandoffEvent(detail) {
        try {
            const event = new CustomEvent('cpii:telemetry:handoff_initiated', {
                bubbles: true,
                cancelable: false,
                detail: detail
            });

            document.dispatchEvent(event);
        } catch (e) {
            // Silencioso: telemetría no debe bloquear funcionalidad core
        }
    }

    // ═════════════════════════════════════════════════════════════════════════════
    // [SEC-04] INICIALIZACIÓN Y SELLO
    // ═════════════════════════════════════════════════════════════════════════════

    /**
     * Inicializa el sistema de handoff.
     * Registra listener pasivo en documento para captura de clicks.
     */
    function initialize() {
        // Delegación de eventos: un solo listener para todos los enlaces
        document.addEventListener('click', handleLinkClick, {
            passive: true,
            capture: false
        });

        // Exposición controlada en namespace
        window.__CPII__.handoff = {
            version: '1.0.0',
            initialized: true,
            allowedParams: ALLOWED_BACKPACK_PARAMS.slice(), // Copia defensiva
            getBackpackSnapshot: buildBackpackParams
        };

        // Sello contra inyecciones maliciosas
        Object.seal(window.__CPII__);
    }

    // ═════════════════════════════════════════════════════════════════════════════
    // [SEC-05] ARRANQUE AUTÓNOMO
    // ═════════════════════════════════════════════════════════════════════════════

    // Auto-inicialización cuando DOM está listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

})();
