// src/hooks/useAutosave.js
// Hook do autozapisu formularza co N sekund

import { useRef, useCallback } from 'react';
import { sb, auditLog } from '../lib/supabase.js';

const DELAY_MS = 5000;

/**
 * @param {object} opts
 * @param {() => object} opts.getPayload  zwraca payload do zapisu
 * @param {string|null}  opts.formId
 * @param {(id: string) => void} opts.onFormId  callback gdy nowy formId
 * @param {(msg: string, type: string) => void} opts.toast
 * @param {string} opts.actor  nazwa doradcy lub 'client'
 */
export function useAutosave({ getPayload, formId, onFormId, toast, actor }) {
  const timerRef = useRef(null);
  const formIdRef = useRef(formId);
  formIdRef.current = formId;

  const save = useCallback(async () => {
    const payload = getPayload();
    let fid = formIdRef.current;

    if (fid) {
      await sb('PATCH', `apk_forms?id=eq.${fid}`, payload);
    } else {
      const r = await sb('POST', 'apk_forms', payload);
      if (r.data && r.data[0]) {
        fid = r.data[0].id;
        onFormId(fid);
        formIdRef.current = fid;
      }
    }

    if (fid) await auditLog(fid, 'autosaved', actor);
    toast('Autozapis ✓', 'save');
  }, [getPayload, onFormId, toast, actor]);

  const schedule = useCallback(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(save, DELAY_MS);
  }, [save]);

  const cancel = useCallback(() => clearTimeout(timerRef.current), []);

  return { schedule, cancel };
}
