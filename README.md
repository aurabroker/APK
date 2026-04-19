# APK — Analiza Potrzeb Klienta
### Aura Consulting · KNF art. 8 UDU

Formularz webowy do przeprowadzania i archiwizowania Analizy Potrzeb Klienta, zgodny z wymogiem art. 8 ustawy z dnia 15 grudnia 2017 r. o dystrybucji ubezpieczeń.

---

## Stack

| Warstwa | Technologia |
|---------|-------------|
| Frontend | React 18 + Vite |
| Style | Vanilla CSS (custom properties) |
| Backend / baza | Supabase (projekt `aurabroker`, `eu-west-1`) |
| Hosting | GitHub Pages (przez GitHub Actions) |
| PDF | `window.print()` — bez zewnętrznych bibliotek |

---

## Struktura plików

```
apk/
├── index.html                  # Punkt wejścia HTML
├── vite.config.js
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                # ReactDOM.createRoot
    ├── App.jsx                 # Główny komponent — routing ekranów
    ├── styles.css              # Globalne style (bez frameworka)
    │
    ├── data/
    │   └── baskets.js          # Taksonomia klas ryzyk I–XII (Lloyd's)
    │
    ├── lib/
    │   ├── supabase.js         # Klient REST Supabase + auditLog()
    │   ├── formState.js        # initForm(), collectPayload(), genRef()
    │   └── pdf.js              # exportPDF() → window.print()
    │
    ├── hooks/
    │   ├── useAutosave.js      # Autozapis co 5s → apk_forms (draft)
    │   └── useToast.js         # Toast notifications (#toast w index.html)
    │
    └── components/
        ├── YNGroup.jsx         # Przycisk TAK/NIE z rozwijaniem
        ├── Basket.jsx          # Koszyk ryzyk (accordion + checklist)
        ├── Satisfaction.jsx    # Ocena zadowolenia 1–5
        ├── ProgressBar.jsx     # Pasek postępu 6 kroków
        └── steps/
            ├── Step1Dane.jsx           # Dane podstawowe + link kliencki
            ├── Step2OsobaFizyczna.jsx  # Ochrona osobista (pyt. 4.x)
            ├── Step3Firma.jsx          # Ochrona firmy (pyt. 5.x)
            ├── Step4Koszyki.jsx        # Klasy ryzyk I–XII
            ├── Step5Historia.jsx       # Historia ubezpieczeniowa (pyt. 6.x)
            └── Step6Podsumowanie.jsx   # Podsumowanie + akceptacja + zapis
```

---

## Supabase — tabele (projekt `aurabroker`)

| Tabela | Opis |
|--------|------|
| `apk_forms` | Główna tabela formularzy. Kolumna `form_data` (JSONB) przechowuje pełne dane. Status: `draft` / `submitted` / `archived`. |
| `apk_tokens` | Jednorazowe linki klienckie. TTL 30 dni, status `pending` / `used` / `expired`. |
| `apk_audit` | Niemodyfikowalny log zdarzeń: `created`, `autosaved`, `submitted`, `pdf_exported`, `viewed`. |

RLS: anon może INSERT i UPDATE drafts (klient bez logowania), authenticated widzi wszystkie rekordy (doradca).

---

## Uruchomienie lokalne

```bash
git clone https://github.com/aura-consulting/apk.git
cd apk
npm install
npm run dev
# → http://localhost:3000
```

## Build produkcyjny

```bash
npm run build
# → dist/
```

## Deploy na GitHub Pages

Push do `main` → GitHub Actions buduje i deployuje automatycznie.

Jeśli repo jest pod adresem `https://github.com/aura-consulting/apk`, ustaw w `vite.config.js`:
```js
base: '/apk/'
```

---

## Tryby pracy

| Tryb | Opis |
|------|------|
| **Klient** | Klient wypełnia samodzielnie. Dane zapisywane przez anon key Supabase. |
| **Doradca** | Doradca wypełnia z klientem lub generuje link kliencki (token w `apk_tokens`). |
| **Panel doradcy** | Lista wszystkich APK z Supabase (status, data, ref). |

---

## Kolejne kroki (roadmap)

- [ ] Autenti — podpis elektroniczny po złożeniu APK
- [ ] Podgląd / edycja złożonego APK (read-only dla klienta)
- [ ] Filtrowanie i wyszukiwanie w panelu doradcy
- [ ] Powiadomienie e-mail po złożeniu (Supabase Edge Function + Resend)
- [ ] Integracja z `crm_clients` (powiązanie APK z kartoteką klienta CRM)
- [ ] Wersjonowanie formularza (pole `form_version` w `apk_forms`)

---

*Aura Consulting Sp. z o.o. · Broker ubezpieczeniowy licencjonowany przez KNF · auraconsulting.pl*
