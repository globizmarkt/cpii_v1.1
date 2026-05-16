# DOCTRINA DE LA PLANTA (CPII PORTUGAL)

Este documento contiene las leyes fundamentales que rigen la arquitectura y la toma de decisiones técnicas en este ecosistema.

## Ley I: Explicabilidad del Cerebro Comercial
Toda lógica técnica debe ser transparente y validable por el equipo humano (Cerebro Comercial). La arquitectura no debe operar en una "visión de túnel" que ignore los objetivos de negocio.

*   **Aplicación**: Antes de refactorizar o eliminar elementos visuales, se debe consultar su impacto en el embudo de marketing.

## Ley II: Política de Coste Cero
En la búsqueda de soluciones efectivas, siempre se priorizará la opción de **coste cero**. Si una lógica local o estática iguala la eficacia de un servicio de pago (como Cloud Functions innecesarias), se debe optar por la solución local.

*   **Aplicación**: Sustitución de validaciones de backend costosas por enrutadores de UI ligeros cuando la seguridad real se gestiona en el destino final.

## Ley III: Preservación del Embudo (Fricción Intencionada)
La Landing es un Embudo de Marketing. Cualquier salida de la Landing debe ser intencionada y controlada. Se permite el uso de "Fricción de UI" (ej: campos de contraseña falsos o atajos) para disuadir a leads de abandonar el flujo de conversión principal.

## Precedente Fundacional: Incidente-Puerta-Falsa-Capa2

El 17 de abril de 2026, se detectó y erradicó una brecha de seguridad en las reglas Firestore del CRM. El comodín `match /{collection}/{docId}` permitía un bypass de autenticación mediante una condición OR mal construida.

**Lección institucionalizada:**  
Toda regla de Firestore debe ser explícita y negar por defecto (Zero-Trust). Queda prohibido el uso de comodines sin validación de tenencia y rango. Este incidente se convierte en precedente vinculante para futuras auditorías de Sentinel.

*   **Referencias**: [[Incidente-Puerta-Falsa-Capa2]], [[Ley de Coste Cero]], [[Zero-Trust]].
