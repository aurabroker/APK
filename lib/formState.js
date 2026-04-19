// src/lib/formState.js
// Inicjalny stan formularza + helper do zbierania danych

import { BASKETS } from '../data/baskets.js';

/** Generuje unikalny numer referencyjny APK */
export function genRef() {
  return 'APK-' + Date.now().toString(36).toUpperCase();
}

/** Dzisiejsza data w formacie RRRR-MM-DD */
export function today() {
  return new Date().toISOString().split('T')[0];
}

/** Jednorazowy token kliencki */
export function genToken() {
  return (
    Math.random().toString(36).substring(2, 10).toUpperCase() +
    Math.random().toString(36).substring(2, 6).toUpperCase()
  );
}

/** Pusty stan formularza */
export function initForm() {
  return {
    date: today(),
    ref: genRef(),
    client: '',
    advisor: '',
    notes: '',
    yn: {},          // { [key]: 'yes' | 'no' }
    sat: {},         // { [key]: 1..5 }
    baskets: {},     // { [roman]: { [itemIndex]: boolean } }
    basketDesc: {},  // { [roman]: string }
    descriptions: {},// { ind_property, ind_personal, co_*, insured, claims, broker_name }
    company: { name: '', fte: '' },
    final_notes: '',
  };
}

/**
 * Zbiera dane formularza do payloadu Supabase.
 * @param {object} form  bieżący stan formularza
 * @param {string} mode  'client' | 'advisor'
 * @param {string} status 'draft' | 'submitted'
 */
export function collectPayload(form, mode, status = 'draft') {
  const formData = {
    ref_number: form.ref,
    client_name: form.client,
    advisor_name: form.advisor,
    form_date: form.date || today(),
    notes: form.notes,
    mode,
    yn_answers: { ...form.yn },
    satisfaction: { ...form.sat },
    descriptions: { ...form.descriptions },
    company: {
      ...form.company,
      assets_above: form.yn.assets || null,
      revenue_above: form.yn.revenue || null,
    },
    risk_classes: Object.fromEntries(
      BASKETS.map((b) => [
        b.roman,
        {
          label: b.label,
          selected_items: Object.entries(form.baskets[b.roman] || {})
            .filter(([, v]) => v)
            .map(([i]) => b.items[Number(i)]),
          description: form.basketDesc[b.roman] || '',
        },
      ])
    ),
    final_notes: form.final_notes,
  };

  const payload = {
    ref_number: form.ref,
    client_name: form.client || '(bez nazwy)',
    advisor_name: form.advisor,
    form_date: form.date || today(),
    mode,
    status,
    form_data: formData,
    updated_at: new Date().toISOString(),
  };

  if (status === 'submitted') {
    payload.submitted_at = new Date().toISOString();
  }

  return { payload, formData };
}
