/**
 * ================================================================================
 * ARCHIVO:    onboarding-controller.js
 * VERSIÓN:    1.1.0
 * FECHA:      2026-04-19
 * AUTOR:      Kimi — Junior Dev-Logic (Carril Operativo)
 * PROYECTO:   CPII Portugal — Landing Pública Onboarding v1.1.0
 * 
 * PROPÓSITO:  Controlador de interactividad para el Stepper educativo de 
 *             onboarding. Gestión de progreso local sin autenticación.
 *             Sincronización bidireccional entre checklist principal e
 *             indicadores del sidebar.
 * 
 * DOCTRINA:   R5 — Economía de Guerra (JS Puro, O(1), Zero-Deps, Zero-Network)
 *             R0 — Agnosticismo Radical (sin hardcode de negocio)
 *             R4 — i18n Strict (todas las cadenas via i18n.t())
 *             IA-Ready — Eventos pasivos, namespace sellado
 * ================================================================================
 */
(function() {
    'use strict';

    // ═════════════════════════════════════════════════════════════════════════════
    // [SEC-01] CONFIGURACIÓN Y CONSTANTES
    // ═════════════════════════════════════════════════════════════════════════════

    /** @const {string} Clave de almacenamiento local */
    const STORAGE_KEY = 'cpii_onboarding_progress';

    /** @const {number} Total de pasos del stepper */
    const TOTAL_STEPS = 5;

    /** @const {number} Paso umbral para desbloqueo (KYC completado) */
    const UNLOCK_THRESHOLD = 4;

    /** @const {Object} Claves i18n para estados del paso 5 */
    const STEP5_I18N_KEYS = {
        locked: 'onboarding.steps.step5.status_locked',
        unlocked: 'onboarding.steps.step5.status_unlocked',
        titleLocked: 'onboarding.steps.step5.title_locked',
        titleUnlocked: 'onboarding.steps.step5.title',
        descLocked: 'onboarding.steps.step5.desc_locked',
        descUnlocked: 'onboarding.steps.step5.desc'
    };

    /** @const {Object} Clases CSS para estados visuales */
    const CSS_CLASSES = {
        stepCompleted: 'step-completed',
        stepPending: 'step-pending',
        textGold: 'text-gold',
        opacity50: 'opacity-50',
        borderGold: 'border-gold',
        borderGold40: 'border-gold/40',
        borderBorderDark: 'border-border-dark',
        bgGold: 'bg-gold',
        textCarbon: 'text-carbon',
        bgBorderDark20: 'bg-border-dark/20',
        opacity40: 'opacity-40',
        grayscale: 'grayscale'
    };

    // ═════════════════════════════════════════════════════════════════════════════
    // [SEC-02] UTILIDADES CORE (O(1) — Sin dependencias)
    // ═════════════════════════════════════════════════════════════════════════════

    /**
     * Recupera estado de progreso desde localStorage.
     * @returns {Object} Estado con array de pasos completados
     */
    function loadProgress() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return { completed: [], timestamp: null };
            const parsed = JSON.parse(raw);
            return {
                completed: Array.isArray(parsed.completed) ? parsed.completed : [],
                timestamp: parsed.timestamp || null
            };
        } catch (e) {
            return { completed: [], timestamp: null };
        }
    }

    /**
     * Persiste estado de progreso en localStorage.
     * @param {Object} state
     */
    function saveProgress(state) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                completed: state.completed,
                timestamp: Date.now()
            }));
        } catch (e) {
            // Silencioso: modo privado o storage lleno
        }
    }

    /**
     * Verifica si un paso está completado.
     * @param {Object} state
     * @param {number} stepNumber
     * @returns {boolean}
     */
    function isStepCompleted(state, stepNumber) {
        return state.completed.indexOf(stepNumber) !== -1;
    }

    /**
     * Verifica si el paso 4 (KYC) está completado.
     * @param {Object} state
     * @returns {boolean}
     */
    function isKycCompleted(state) {
        return isStepCompleted(state, UNLOCK_THRESHOLD);
    }

    // ═════════════════════════════════════════════════════════════════════════════
    // [SEC-03] MANIPULACIÓN DOM (Light DOM, sincronización bidireccional)
    // ═════════════════════════════════════════════════════════════════════════════

    /**
     * Obtiene referencias a elementos del DOM por data attributes.
     * @returns {Object} Mapa de elementos
     */
    function getStepElements() {
        const elements = {
            steps: {},
            indicators: {},
            step5: {}
        };

        // Elementos principales de pasos 1-5
        for (let i = 1; i <= TOTAL_STEPS; i++) {
            elements.steps[i] = {
                container: document.querySelector(`[data-step="${i}"]`),
                checkbox: document.querySelector(`[data-step-checkbox="${i}"]`),
                label: document.querySelector(`[data-step-label="${i}"]`)
            };
        }

        // Indicadores del sidebar (nuevo en v1.1.0)
        for (let i = 1; i <= 3; i++) {
            elements.indicators[i] = document.querySelector(`[data-stepper-indicator="${i}"]`);
        }

        // Elementos específicos del paso 5
        elements.step5.status = document.querySelector('[data-step5-status]');
        elements.step5.title = document.querySelector('[data-step5-title]');
        elements.step5.desc = document.querySelector('[data-step5-desc]');
        elements.step5.container = document.querySelector('[data-step="5"]');

        return elements;
    }

    /**
     * Aplica clases visuales de completado a un paso principal.
     * @param {HTMLElement} container
     * @param {boolean} completed
     */
    function setStepVisualState(container, completed) {
        if (!container) return;
        
        if (completed) {
            container.classList.add(CSS_CLASSES.stepCompleted);
            container.classList.remove(CSS_CLASSES.stepPending);
            container.setAttribute('data-completed', 'true');
        } else {
            container.classList.remove(CSS_CLASSES.stepCompleted);
            container.classList.add(CSS_CLASSES.stepPending);
            container.removeAttribute('data-completed');
        }
    }

    /**
     * Actualiza estado visual del checkbox.
     * @param {HTMLInputElement} checkbox
     * @param {boolean} checked
     */
    function setCheckboxState(checkbox, checked) {
        if (!checkbox) return;
        checkbox.checked = checked;
    }

    /**
     * Actualiza indicador del sidebar (v1.1.0).
     * @param {HTMLElement} indicator
     * @param {boolean} completed
     */
    function setSidebarIndicator(indicator, completed) {
        if (!indicator) return;
        
        if (completed) {
            indicator.classList.add(CSS_CLASSES.textGold);
            indicator.classList.remove(CSS_CLASSES.opacity50);
        } else {
            indicator.classList.remove(CSS_CLASSES.textGold);
            indicator.classList.add(CSS_CLASSES.opacity50);
        }
    }

    /**
     * Actualiza el Paso 5 basado en estado de KYC.
     * @param {Object} elements
     * @param {boolean} kycCompleted
     */
    function updateStep5State(elements, kycCompleted) {
        const { step5 } = elements;
        
        if (!step5.container) return;

        if (kycCompleted) {
            // Estado desbloqueado
            step5.container.classList.remove(CSS_CLASSES.opacity40, CSS_CLASSES.grayscale, CSS_CLASSES.borderBorderDark);
            step5.container.classList.add(CSS_CLASSES.borderGold, CSS_CLASSES.borderGold40);
            
            if (step5.status) {
                step5.status.textContent = typeof i18n !== 'undefined' 
                    ? i18n.t(STEP5_I18N_KEYS.unlocked) 
                    : 'Disponível';
                step5.status.classList.remove(CSS_CLASSES.bgBorderDark20);
                step5.status.classList.add(CSS_CLASSES.bgGold, CSS_CLASSES.textCarbon);
            }
            
            if (step5.title && typeof i18n !== 'undefined') {
                step5.title.textContent = i18n.t(STEP5_I18N_KEYS.titleUnlocked);
            }
            
            if (step5.desc && typeof i18n !== 'undefined') {
                step5.desc.textContent = i18n.t(STEP5_I18N_KEYS.descUnlocked);
            }
        } else {
            // Estado bloqueado (default)
            step5.container.classList.add(CSS_CLASSES.opacity40, CSS_CLASSES.grayscale, CSS_CLASSES.borderBorderDark);
            step5.container.classList.remove(CSS_CLASSES.borderGold, CSS_CLASSES.borderGold40);
            
            if (step5.status) {
                step5.status.textContent = typeof i18n !== 'undefined' 
                    ? i18n.t(STEP5_I18N_KEYS.locked) 
                    : 'Bloqueada';
                step5.status.classList.add(CSS_CLASSES.bgBorderDark20);
                step5.status.classList.remove(CSS_CLASSES.bgGold, CSS_CLASSES.textCarbon);
            }
            
            if (step5.title && typeof i18n !== 'undefined') {
                step5.title.textContent = i18n.t(STEP5_I18N_KEYS.titleLocked);
            }
            
            if (step5.desc && typeof i18n !== 'undefined') {
                step5.desc.textContent = i18n.t(STEP5_I18N_KEYS.descLocked);
            }
        }
    }

    // ═════════════════════════════════════════════════════════════════════════════
    // [SEC-04] LÓGICA DE INTERACTIVIDAD
    // ═════════════════════════════════════════════════════════════════════════════

    /**
     * Renderiza estado completo del stepper basado en persistencia.
     * Sincroniza: checkboxes, contenedores principales, indicadores sidebar.
     */
    function render() {
        const state = loadProgress();
        const elements = getStepElements();

        // Actualizar pasos 1-4 (principales + indicadores sidebar)
        for (let i = 1; i < TOTAL_STEPS; i++) {
            const completed = isStepCompleted(state, i);
            
            // Elementos principales
            setStepVisualState(elements.steps[i].container, completed);
            setCheckboxState(elements.steps[i].checkbox, completed);
            
            // Indicadores del sidebar (mapeo: paso 1-3 tienen indicadores visuales)
            if (i <= 3 && elements.indicators[i]) {
                setSidebarIndicator(elements.indicators[i], completed);
            }
        }

        // Actualizar paso 5 basado en KYC (paso 4)
        const kycCompleted = isKycCompleted(state);
        updateStep5State(elements, kycCompleted);
        
        // Atributo data-available para uso externo
        if (elements.steps[5].container) {
            elements.steps[5].container.setAttribute('data-available', kycCompleted ? 'true' : 'false');
        }
    }

    /**
     * Handler para toggle de paso.
     * @param {number} stepNumber
     */
    function toggleStep(stepNumber) {
        const state = loadProgress();
        const index = state.completed.indexOf(stepNumber);
        
        if (index === -1) {
            // Marcar como completado
            state.completed.push(stepNumber);
        } else {
            // Desmarcar
            state.completed.splice(index, 1);
        }
        
        saveProgress(state);
        render();
    }

    /**
     * Reset completo del progreso.
     * Limpia localStorage y sincroniza todos los indicadores visuales.
     */
    function resetProgress() {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            // Silencioso
        }
        render();
    }

    // ═════════════════════════════════════════════════════════════════════════════
    // [SEC-05] INICIALIZACIÓN Y EVENT LISTENERS
    // ═════════════════════════════════════════════════════════════════════════════

    /**
     * Configura listeners de interacción.
     */
    function attachListeners() {
        // Listeners para checkboxes de pasos 1-4
        for (let i = 1; i < TOTAL_STEPS; i++) {
            const checkbox = document.querySelector(`[data-step-checkbox="${i}"]`);
            if (checkbox) {
                checkbox.addEventListener('change', function() {
                    toggleStep(i);
                });
            }
        }

        // Listener para botón de reset
        const resetBtn = document.querySelector('[data-onboarding-reset]');
        if (resetBtn) {
            resetBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm(typeof i18n !== 'undefined' 
                    ? i18n.t('onboarding.reset.confirm') 
                    : 'Tem certeza que deseja reiniciar o progresso?')) {
                    resetProgress();
                }
            });
        }
    }

    /**
     * Inicialización del controlador.
     */
    function initialize() {
        render();
        attachListeners();
    }

    // ═════════════════════════════════════════════════════════════════════════════
    // [SEC-06] EXPOSICIÓN CONTROLADA (Tolerancia a Object.seal)
    // ═════════════════════════════════════════════════════════════════════════════

    const controllerAPI = {
        version: '1.1.1',
        init: initialize,
        reset: resetProgress,
        getProgress: loadProgress,
        _toggle: toggleStep,
        _render: render
    };

    try {
        if (typeof window.__CPII__ === 'object' && !Object.isSealed(window.__CPII__)) {
            window.__CPII__.onboardingController = controllerAPI;
        } else {
            console.warn('[VIBE-CPII] Namespace sellado. OnboardingController en aislamiento.');
        }
    } catch (e) {
        console.warn('[VIBE-CPII] Restricción de escritura en __CPII__.');
    }

    // Auto-inicialización
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();
