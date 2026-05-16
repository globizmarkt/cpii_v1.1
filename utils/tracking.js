(function (global) {
  function normalizeRef(ref) {
    return ref.toLowerCase().replace(/\s+/g, "_");
  }

  /**
   * Captura el parámetro ?ref= de la URL y lo persiste.
   * - Guarda la versión normalizada en localStorage('cpii_ref')
   * - Guarda la versión raw en sessionStorage('cpii_ref')
   */
  function captureReferralFromUrl(options) {
    var settings = options || {};
    try {
      var params = new URLSearchParams(global.location.search);
      var ref = params.get("ref");
      if (!ref) return null;

      var normalized = normalizeRef(ref);

      try {
        global.localStorage.setItem("cpii_ref", normalized);
      } catch (e) { /* almacenamiento bloqueado */ }

      try {
        global.sessionStorage.setItem("cpii_ref", ref);
      } catch (e) { /* almacenamiento bloqueado */ }

      if (settings.log !== false && global.console && console.log) {
        console.log("[CPII] Referral captured:", ref, "→", normalized);
      }

      return { raw: ref, normalized: normalized };
    } catch (e) {
      return null;
    }
  }

  /**
   * Genera un slug de embajador siguiendo la Regla PT (Portugal Hierarchy).
   * @param {string} fullName Nombre completo del lead.
   * @param {string[]} existingSlugs Lista de slugs ya existentes para evitar colisiones.
   * @returns {string} Slug normalizado y único.
   */
  function generateAmbassadorSlug(fullName, existingSlugs) {
    var slugs = existingSlugs || [];
    if (!fullName) return "";

    // Normalización básica y limpieza
    var names = fullName.trim().toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Quitar tildes
      .split(/\s+/).filter(function (n) { return n.length > 0; });

    if (names.length === 0) return "";

    var firstName = names[0];
    var lastName = names[names.length - 1];

    // Nivel 1 (Base): [primer_nombre]_[ultimo_apellido]
    var baseSlug = firstName + "_" + lastName;
    if (slugs.indexOf(baseSlug) === -1) return baseSlug;

    // Nivel 2 (Colisión): + inicial del segundo apellido (penúltimo elemento)
    if (names.length >= 3) {
      var secondToLastInitial = names[names.length - 2].charAt(0);
      var level2Slug = baseSlug + "_" + secondToLastInitial;
      if (slugs.indexOf(level2Slug) === -1) return level2Slug;
    }

    // Nivel 3 (Persistencia): + correlativo numérico
    var counter = 1;
    var level3Slug = baseSlug + "_" + counter;
    while (slugs.indexOf(level3Slug) !== -1) {
      counter++;
      level3Slug = baseSlug + "_" + counter;
    }
    return level3Slug;
  }

  global.CPIITracking = global.CPIITracking || {};
  global.CPIITracking.captureReferralFromUrl = captureReferralFromUrl;
  global.CPIITracking.generateAmbassadorSlug = generateAmbassadorSlug;
})(window);

