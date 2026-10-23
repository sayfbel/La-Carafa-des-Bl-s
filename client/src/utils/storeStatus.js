/**
 * Calculates real-time opening status for La Carafa des Blés (Épinay-sur-Orge).
 * Respects:
 * 1. Admin manual override ('forced_closed', 'forced_open', or 'auto')
 * 2. Custom admin notification message
 * 3. Exact bakery weekly schedule in Paris time (Europe/Paris):
 *    - Lundi : Fermé
 *    - Mardi - Vendredi : 06h30 - 19h30
 *    - Samedi : 07h00 - 19h30
 *    - Dimanche : 07h00 - 13h00
 */
export function getStoreLiveStatus(settings = {}) {
  const mode = settings.store_status_mode || 'auto';
  const customMessage = settings.store_status_custom_message?.trim();

  // 1. Manual Admin Override: Force Closed
  if (mode === 'forced_closed') {
    return {
      isOpen: false,
      badgeText: 'Fermé Exceptionnellement',
      subtext: customMessage || 'Le fournil est actuellement fermé par décision de l’artisan.',
      chipVariant: 'closed',
      isOverridden: true
    };
  }

  // 2. Manual Admin Override: Force Open
  if (mode === 'forced_open') {
    return {
      isOpen: true,
      badgeText: 'Fournil Ouvert',
      subtext: customMessage || 'Fournées spéciales et viennoiseries disponibles.',
      chipVariant: 'open',
      isOverridden: true
    };
  }

  // 3. Automatic Schedule Calculation (Europe/Paris timezone)
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Paris',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    });
    const parts = formatter.formatToParts(now);
    const day = parts.find((p) => p.type === 'weekday')?.value; // Mon, Tue, Wed, Thu, Fri, Sat, Sun
    const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10);
    const minute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
    const timeVal = hour + minute / 60;

    let isOpen = false;
    let nextOpen = '';

    if (day === 'Mon') {
      isOpen = false;
      nextOpen = 'Réouverture Mardi dès 06h30';
    } else if (['Tue', 'Wed', 'Thu', 'Fri'].includes(day)) {
      if (timeVal >= 6.5 && timeVal < 19.5) {
        isOpen = true;
      } else if (timeVal < 6.5) {
        isOpen = false;
        nextOpen = 'Ouverture ce matin à 06h30';
      } else {
        isOpen = false;
        nextOpen = day === 'Fri' ? 'Réouverture Samedi à 07h00' : 'Réouverture demain à 06h30';
      }
    } else if (day === 'Sat') {
      if (timeVal >= 7.0 && timeVal < 19.5) {
        isOpen = true;
      } else if (timeVal < 7.0) {
        isOpen = false;
        nextOpen = 'Ouverture ce matin à 07h00';
      } else {
        isOpen = false;
        nextOpen = 'Réouverture Dimanche à 07h00';
      }
    } else if (day === 'Sun') {
      if (timeVal >= 7.0 && timeVal < 13.0) {
        isOpen = true;
      } else {
        isOpen = false;
        nextOpen = 'Réouverture Mardi à 06h30 (Fermé le Lundi)';
      }
    }

    if (isOpen) {
      return {
        isOpen: true,
        badgeText: 'Fournil Ouvert Actuellement',
        subtext: 'Fournées du jour et viennoiseries disponibles en boutique',
        chipVariant: 'open',
        isOverridden: false
      };
    } else {
      return {
        isOpen: false,
        badgeText: 'Actuellement Fermé',
        subtext: nextOpen || 'Consultez les horaires d’ouverture ci-dessous',
        chipVariant: 'closed',
        isOverridden: false
      };
    }
  } catch (err) {
    return {
      isOpen: true,
      badgeText: 'Fournil Ouvert',
      subtext: 'Fournées du jour et créations artisanales',
      chipVariant: 'open',
      isOverridden: false
    };
  }
}
