const fs = require('fs');

const polyglot = {
  "pt": {
    "onboarding": {
      "brand": { "name": "CPII Portugal" },
      "sidebar": {
        "subtitle": "Acesso Institucional",
        "tab_onboarding": "Onboarding",
        "tab_registry": "Registo de Clientes",
        "tab_insights": "Perspetivas de Mercado",
        "cta": "Novo Dossier"
      },
      "meta": {
        "badge": "Protocolo de Admissão",
        "hero": {
          "title_main": "O Caminho para o",
          "title_highlight": "Clube Privado",
          "p": "Siga estes 5 passos para ativar o seu acesso institucional e começar a construir o seu património exponencial."
        }
      },
      "stepper": {
        "step1": "Solicitação",
        "step2": "Verificação",
        "step3": "Plataforma",
        "step4": "Compliance",
        "step5": "Promotor"
      },
      "steps": {
        "step1": {
          "title": "Solicitação de Acesso",
          "desc": "Preencha o formulário oficial. O seu perfil será analisado pela equipa de compliance para garantir o alinhamento com os valores do Clube.",
          "note": "Após submissão, receberá o seu link de referidos exclusivo para partilhar a sua rede.",
          "cta": { "text": "Ir para o formulário", "href": "access-form.html" }
        },
        "step2": {
          "title": "Verificação de Canal",
          "desc": "Receberá um e-mail de activação do seu canal de comunicação privado. A resposta a este e-mail é obrigatória para prosseguir.",
          "note": "Verifique a sua caixa de spam. O remetente será sempre um domínio @cpii.digital.",
          "alert": { "type": "warning", "message": "Resposta obrigatória: sem confirmação, o processo fica suspenso." }
        },
        "step3": {
          "title": "Acesso à Plataforma",
          "desc": "Receberá por e-mail os links privados de registo na plataforma de investimento independente, separada do ecossistema CPII.",
          "note": "Guarde estes links em local seguro. Não são partilhados publicamente.",
          "alert": { "type": "info", "message": "Plataforma externa: o registo é gerido por um operador licenciado independente." }
        },
        "step4": {
          "title": "Compliance KYC / AML",
          "desc": "Suba os documentos de identificação e comprovativo de morada na plataforma. A validação é obrigatória para desbloquear o acesso total às oportunidades de investimento.",
          "note": "Documentos aceites: passaporte, bilhete de identidade, comprovativo de morada recente (últimos 90 dias).",
          "alert": { "type": "success", "message": "Após validação KYC, o seu perfil fica com estado 'Verified Investor'." }
        },
        "step5": {
          "title": "Via Promotor — Condicionada",
          "title_locked": "Via Promotor — Bloqueada",
          "desc": "Contacte o seu patrocinador directo para activar a via de promotor. Esta funcionalidade permite captar ativos e construir a sua rede de Revenue Share.",
          "desc_locked": "Complete o KYC (Passo 4) para desbloquear.",
          "note": "Requisito estrito: ter concluído o KYC (Passo 4) com estado 'Approved'. Sem esta validação, a via de promotor permanece bloqueada.",
          "alert": { "type": "lock", "message": "Bloqueado até KYC aprovado." },
          "status_unlocked": "Disponível",
          "status_locked": "Bloqueada",
          "status": {
            "label": "Estado:",
            "value_locked": "Disponível apenas com Craft de Acesso verificado.",
            "value_unlocked": "Via de Promotor activa. Bem-vindo à rede."
          }
        }
      },
      "transversal": {
        "support": {
          "title": "Precisa de ajuda?",
          "desc": "Consulte os nossos webinars guiados para acompanhar cada passo do processo com exemplos práticos e esclarecimentos da equipa.",
          "cta": { "text": "Ver Webinars de Onboarding", "href": "webinars.html" }
        }
      },
      "cta_final": {
        "title": "Pronto para dar o primeiro passo?",
        "btn_primary": "Iniciar Admissão",
        "btn_secondary": "Voltar à página inicial"
      },
      "cta": {
        "proceed": "Prosseguir",
        "save_later": "Guardar para depois"
      },
      "reset": {
        "confirm": "Tem certeza que deseja reiniciar o progresso?"
      },
      "footer": {
        "confidential": "Est. 2024 · Privado e Confidencial"
      }
    }
  },
  "es": {
    "onboarding": {
      "brand": { "name": "CPII Portugal" },
      "sidebar": {
        "subtitle": "Acceso Institucional",
        "tab_onboarding": "Onboarding",
        "tab_registry": "Registro de Clientes",
        "tab_insights": "Perspectivas de Mercado",
        "cta": "Nuevo Dossier"
      },
      "meta": {
        "badge": "Protocolo de Admisión",
        "hero": {
          "title_main": "El Camino hacia el",
          "title_highlight": "Club Privado",
          "p": "Siga estos 5 pasos para activar su acceso institucional y comenzar a construir su patrimonio exponencial."
        }
      },
      "stepper": {
        "step1": "Solicitud",
        "step2": "Verificación",
        "step3": "Plataforma",
        "step4": "Compliance",
        "step5": "Promotor"
      },
      "steps": {
        "step1": {
          "title": "Solicitud de Acceso",
          "desc": "Complete el formulario oficial. Su perfil será analizado por el equipo de compliance para garantizar la alineación con los valores del Club.",
          "note": "Tras el envío, recibirá su enlace de referidos exclusivo para compartir su red.",
          "cta": { "text": "Ir al formulario", "href": "access-form.html" }
        },
        "step2": {
          "title": "Verificación de Canal",
          "desc": "Recibirá un correo de activación de su canal de comunicación privado. La respuesta a este correo es obligatoria para continuar.",
          "note": "Verifique su carpeta de spam. El remitente será siempre un dominio @cpii.digital.",
          "alert": { "type": "warning", "message": "Respuesta obligatoria: sin confirmación, el proceso queda suspendido." }
        },
        "step3": {
          "title": "Acceso a la Plataforma",
          "desc": "Recibirá por correo los enlaces privados de registro en la plataforma de inversión independiente, separada del ecosistema CPII.",
          "note": "Guarde estos enlaces en un lugar seguro. No se comparten públicamente.",
          "alert": { "type": "info", "message": "Plataforma externa: el registro es gestionado por un operador licenciado independiente." }
        },
        "step4": {
          "title": "Compliance KYC / AML",
          "desc": "Suba los documentos de identificación y comprobante de domicilio en la plataforma. La validación es obligatoria para desbloquear el acceso total a las oportunidades de inversión.",
          "note": "Documentos aceptados: pasaporte, documento de identidad, comprobante de domicilio reciente (últimos 90 días).",
          "alert": { "type": "success", "message": "Tras la validación KYC, su perfil adquiere el estado 'Verified Investor'." }
        },
        "step5": {
          "title": "Vía Promotor — Condicionada",
          "title_locked": "Vía Promotor — Bloqueada",
          "desc": "Contacte a su patrocinador directo para activar la vía de promotor. Esta funcionalidad permite captar activos y construir su red de Revenue Share.",
          "desc_locked": "Complete el KYC (Paso 4) para desbloquear.",
          "note": "Requisito estricto: haber concluido el KYC (Paso 4) con estado 'Approved'. Sin esta validación, la vía de promotor permanece bloqueada.",
          "alert": { "type": "lock", "message": "Bloqueado hasta KYC aprobado." },
          "status_unlocked": "Disponible",
          "status_locked": "Bloqueada",
          "status": {
            "label": "Estado:",
            "value_locked": "Disponible solo con Craft de Acceso verificado.",
            "value_unlocked": "Vía de Promotor activa. Bienvenido a la red."
          }
        }
      },
      "transversal": {
        "support": {
          "title": "¿Necesita ayuda?",
          "desc": "Consulte nuestros webinars guiados para acompañar cada paso del proceso con ejemplos prácticos y aclaraciones del equipo.",
          "cta": { "text": "Ver Webinars de Onboarding", "href": "webinars.html" }
        }
      },
      "cta_final": {
        "title": "¿Listo para dar el primer paso?",
        "btn_primary": "Iniciar Admisión",
        "btn_secondary": "Volver a la página inicial"
      },
      "cta": {
        "proceed": "Proceder",
        "save_later": "Guardar para después"
      },
      "reset": {
        "confirm": "¿Está seguro de que desea reiniciar el progreso?"
      },
      "footer": {
        "confidential": "Est. 2024 · Privado y Confidencial"
      }
    }
  },
  "en": {
    "onboarding": {
      "brand": { "name": "CPII Portugal" },
      "sidebar": {
        "subtitle": "Institutional Access",
        "tab_onboarding": "Onboarding",
        "tab_registry": "Client Registry",
        "tab_insights": "Market Insights",
        "cta": "New Dossier"
      },
      "meta": {
        "badge": "Admission Protocol",
        "hero": {
          "title_main": "The Path to the",
          "title_highlight": "Private Club",
          "p": "Follow these 5 steps to activate your institutional access and begin building your exponential wealth."
        }
      },
      "stepper": {
        "step1": "Application",
        "step2": "Verification",
        "step3": "Platform",
        "step4": "Compliance",
        "step5": "Promoter"
      },
      "steps": {
        "step1": {
          "title": "Access Application",
          "desc": "Complete the official form. Your profile will be analysed by the compliance team to ensure alignment with the Club's values.",
          "note": "Upon submission, you will receive your exclusive referral link to share your network.",
          "cta": { "text": "Go to form", "href": "access-form.html" }
        },
        "step2": {
          "title": "Channel Verification",
          "desc": "You will receive an activation email for your private communication channel. Response to this email is mandatory to proceed.",
          "note": "Check your spam folder. The sender will always be a @cpii.digital domain.",
          "alert": { "type": "warning", "message": "Mandatory response: without confirmation, the process is suspended." }
        },
        "step3": {
          "title": "Platform Access",
          "desc": "You will receive private registration links via email for the independent investment platform, separate from the CPII ecosystem.",
          "note": "Store these links securely. They are not publicly shared.",
          "alert": { "type": "info", "message": "External platform: registration is managed by an independent licensed operator." }
        },
        "step4": {
          "title": "KYC / AML Compliance",
          "desc": "Upload identification documents and proof of address on the platform. Validation is mandatory to unlock full access to investment opportunities.",
          "note": "Accepted documents: passport, national ID, recent proof of address (last 90 days).",
          "alert": { "type": "success", "message": "Upon KYC validation, your profile achieves 'Verified Investor' status." }
        },
        "step5": {
          "title": "Promoter Path — Conditional",
          "title_locked": "Promoter Path — Locked",
          "desc": "Contact your direct sponsor to activate the promoter path. This functionality enables asset acquisition and building your Revenue Share network.",
          "desc_locked": "Complete KYC (Step 4) to unlock.",
          "note": "Strict requirement: KYC (Step 4) must be completed with 'Approved' status. Without this validation, the promoter path remains locked.",
          "alert": { "type": "lock", "message": "Locked until KYC approved." },
          "status_unlocked": "Available",
          "status_locked": "Locked",
          "status": {
            "label": "Status:",
            "value_locked": "Available only with verified Access Craft.",
            "value_unlocked": "Promoter Path active. Welcome to the network."
          }
        }
      },
      "transversal": {
        "support": {
          "title": "Need assistance?",
          "desc": "Consult our guided webinars to follow each step of the process with practical examples and team clarifications.",
          "cta": { "text": "View Onboarding Webinars", "href": "webinars.html" }
        }
      },
      "cta_final": {
        "title": "Ready to take the first step?",
        "btn_primary": "Begin Admission",
        "btn_secondary": "Return to homepage"
      },
      "cta": {
        "proceed": "Proceed",
        "save_later": "Save for later"
      },
      "reset": {
        "confirm": "Are you sure you wish to reset your progress?"
      },
      "footer": {
        "confidential": "Est. 2024 · Private & Confidential"
      }
    }
  },
  "fr": {
    "onboarding": {
      "brand": { "name": "CPII Portugal" },
      "sidebar": {
        "subtitle": "Accès Institutionnel",
        "tab_onboarding": "Onboarding",
        "tab_registry": "Registre Clients",
        "tab_insights": "Perspectives Marché",
        "cta": "Nouveau Dossier"
      },
      "meta": {
        "badge": "Protocole d'Admission",
        "hero": {
          "title_main": "Le Chemin vers le",
          "title_highlight": "Club Privé",
          "p": "Suivez ces 5 étapes pour activer votre accès institutionnel et commencer à construire votre patrimoine exponentiel."
        }
      },
      "stepper": {
        "step1": "Demande",
        "step2": "Vérification",
        "step3": "Plateforme",
        "step4": "Conformité",
        "step5": "Promoteur"
      },
      "steps": {
        "step1": {
          "title": "Demande d'Accès",
          "desc": "Remplissez le formulaire officiel. Votre profil sera analysé par l'équipe conformité pour garantir l'alignement avec les valeurs du Club.",
          "note": "Après soumission, vous recevrez votre lien de parrainage exclusif pour partager votre réseau.",
          "cta": { "text": "Aller au formulaire", "href": "access-form.html" }
        },
        "step2": {
          "title": "Vérification Canal",
          "desc": "Vous recevrez un email d'activation de votre canal de communication privé. La réponse à cet email est obligatoire pour continuer.",
          "note": "Vérifiez votre dossier spam. L'expéditeur sera toujours un domaine @cpii.digital.",
          "alert": { "type": "warning", "message": "Réponse obligatoire : sans confirmation, le processus est suspendu." }
        },
        "step3": {
          "title": "Accès Plateforme",
          "desc": "Vous recevrez par email les liens privés d'inscription sur la plateforme d'investissement indépendante, séparée de l'écosystème CPII.",
          "note": "Conservez ces liens en lieu sûr. Ils ne sont pas partagés publiquement.",
          "alert": { "type": "info", "message": "Plateforme externe : l'inscription est gérée par un opérateur licencié indépendant." }
        },
        "step4": {
          "title": "Conformité KYC / AML",
          "desc": "Téléchargez les documents d'identification et justificatif de domicile sur la plateforme. La validation est obligatoire pour débloquer l'accès total aux opportunités d'investissement.",
          "note": "Documents acceptés : passeport, carte d'identité, justificatif de domicile récent (90 derniers jours).",
          "alert": { "type": "success", "message": "Après validation KYC, votre profil obtient le statut 'Verified Investor'." }
        },
        "step5": {
          "title": "Voie Promoteur — Conditionnée",
          "title_locked": "Voie Promoteur — Bloquée",
          "desc": "Contactez votre parrain direct pour activer la voie promoteur. Cette fonctionnalité permet d'acquérir des actifs et construire votre réseau Revenue Share.",
          "desc_locked": "Complétez le KYC (Étape 4) pour débloquer.",
          "note": "Exigence stricte : avoir conclu le KYC (Étape 4) avec statut 'Approved'. Sans cette validation, la voie promoteur reste bloquée.",
          "alert": { "type": "lock", "message": "Bloqué jusqu'à KYC approuvé." },
          "status_unlocked": "Disponible",
          "status_locked": "Bloquée",
          "status": {
            "label": "Statut :",
            "value_locked": "Disponible uniquement avec Craft d'Accès vérifié.",
            "value_unlocked": "Voie Promoteur active. Bienvenue dans le réseau."
          }
        }
      },
      "transversal": {
        "support": {
          "title": "Besoin d'aide ?",
          "desc": "Consultez nos webinars guidés pour suivre chaque étape du processus avec exemples pratiques et clarifications de l'équipe.",
          "cta": { "text": "Voir Webinars Onboarding", "href": "webinars.html" }
        }
      },
      "cta_final": {
        "title": "Prêt à faire le premier pas ?",
        "btn_primary": "Commencer l'Admission",
        "btn_secondary": "Retour page d'accueil"
      },
      "cta": {
        "proceed": "Procéder",
        "save_later": "Enregistrer pour plus tard"
      },
      "reset": {
        "confirm": "Êtes-vous sûr de vouloir réinitialiser votre progression ?"
      },
      "footer": {
        "confidential": "Est. 2024 · Privé et Confidentiel"
      }
    }
  }
};

function flattenObj(ob) {
  let result = {};
  for (const i in ob) {
    if ((typeof ob[i]) === 'object' && !Array.isArray(ob[i])) {
      const temp = flattenObj(ob[i]);
      for (const j in temp) {
        result[i + '.' + j] = temp[j];
      }
    } else {
      result[i] = ob[i];
    }
  }
  return result;
}

const langs = ['pt', 'es', 'en', 'fr'];
const flatData = {};
for (const lang of langs) {
  flatData[lang] = flattenObj(polyglot[lang]);
}

let content = fs.readFileSync('i18n.js', 'utf8');

for (const lang of langs) {
  const flattened = flatData[lang];
  let newLines = ['        // ── Bloque "onboarding.*" [VIBE-CPII-22] ──────────────────────────'];
  for (const key of Object.keys(flattened)) {
    newLines.push(`        "${key}": ${JSON.stringify(flattened[key])},`);
  }
  // Remove trailing comma from the last element if needed, though in JS it's fine.
  let replacement = newLines.join('\\n');
  
  // Create regex to replace the existing onboarding block for this language
  // We need to match from "// ── Bloque "onboarding.*" [VIBE-CPII-22]" up to the end of the translations object for that language.
  // Wait, in i18n.js, each language object ends with '}'
  const regex = new RegExp(`(// ── Bloque "onboarding\\.\\*" \\[VIBE\\-CPII\\-22\\] ──────────────────────────)[\\s\\S]*?(?=\\n    \\})`, 'g');
  
  let replaced = false;
  content = content.replace(regex, (match) => {
    // Only replace if it matches the current language, but wait, the regex matches ALL occurrences.
    // We should probably find the language block first.
    return match; // placeholder
  });
}

// Manual replace might be safer
for (const lang of langs) {
  const flattened = flatData[lang];
  let newLines = ['// ── Bloque "onboarding.*" [VIBE-CPII-22] ──────────────────────────'];
  for (const key of Object.keys(flattened)) {
    newLines.push(`        "${key}": ${JSON.stringify(flattened[key])},`);
  }
  let blockString = newLines.join('\\n');
  blockString = blockString.substring(0, blockString.length - 1); // remove last comma
  
  // Instead of regex, split by language keys
  let langStart = content.indexOf(`"${lang}": {`);
  if (langStart === -1) langStart = content.indexOf(`'${lang}': {`);
  if (langStart === -1) langStart = content.indexOf(`${lang}: {`);
  
  if (langStart !== -1) {
    let blockStart = content.indexOf('// ── Bloque "onboarding.*"', langStart);
    if (blockStart !== -1) {
      // Find the end of the object
      let blockEnd = content.indexOf('\\n    }', blockStart);
      if (blockEnd !== -1) {
        let before = content.substring(0, blockStart);
        let after = content.substring(blockEnd);
        content = before + blockString + after;
      }
    }
  }
}

fs.writeFileSync('i18n.js', content, 'utf8');
console.log("i18n.js updated.");
