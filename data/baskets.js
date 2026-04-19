// src/data/baskets.js
// Taksonomia klas ryzyk — Lloyd's / KNF APK rozszerzony

/** @type {Array<{roman: string, label: string, items: string[]}>} */
export const BASKETS = [
  {
    roman: 'I',
    label: 'Mienie',
    items: [
      'Ogień i inne żywioły (named perils)',
      'All Risks (ryzyka wszelkie)',
      'Przerwa w działalności (Business Interruption)',
      'Increased Cost of Working (ICOW)',
      'Dodatkowe koszty (Extra Expenses)',
      'Strajki, zamieszki, rozruchy (SRCC)',
      'Zawalenie budynku / awaria konstrukcji',
      'Terroryzm',
      'Sprzeniewierzenie / oszustwo (Fraud)',
      'Włamanie i rabunek',
      'Gotówka i wartości pieniężne',
      'Gotówka w transporcie (Cash in Transit)',
      'Kradzież zwykła',
      'Ubezpieczenie szyb',
      'Automatyczne ubezpieczenie nowych lokalizacji',
      'Profilaktyczna suma ubezpieczenia',
      'Przepięcia elektryczne',
      'Szkody elektryczne maszyn i urządzeń',
    ],
  },
  {
    roman: 'II',
    label: 'Odpowiedzialność cywilna',
    items: [
      'OC z tytułu prowadzenia działalności i posiadania mienia',
      'Szkody seryjne',
      'OC za produkt (Product Liability)',
      "OC pracodawcy (Employer's Liability)",
      'D&O — odpowiedzialność członków zarządu',
      'OC zawodowa (Professional Liability / E&O)',
      'OC obowiązkowe',
      'OC dobrowolne',
      'OC podwykonawców',
      'Zanieczyszczenie środowiska (Environmental Pollution)',
    ],
  },
  {
    roman: 'III',
    label: 'Budowlano-Montażowe (CAR / EAR)',
    items: [
      'Szkody materialne — sekcja I (material damage)',
      'Klauzule dodatkowe (mienie)',
      'OC robót budowlano-montażowych — sekcja II',
      'Klauzule dodatkowe (OC)',
      'Advance Loss of Profit (ALOP)',
    ],
  },
  {
    roman: 'IV',
    label: 'NNW i Chorobowe',
    items: [
      'NNW — następstwa nieszczęśliwych wypadków',
      'Choroba / hospitalizacja',
      'Ubezpieczenie podróżne (Travel Insurance)',
    ],
  },
  {
    roman: 'V',
    label: 'Komunikacyjne (Motor)',
    items: [
      'OC komunikacyjne',
      'AC (Autocasco)',
      'Assistance komunikacyjny',
      'NNW kierowcy i pasażerów',
      'Flota pojazdów',
    ],
  },
  {
    roman: 'VI',
    label: 'Kredytowe / Finansowe',
    items: [
      'Ubezpieczenie kredytu kupieckiego',
      'Ubezpieczenie należności (trade credit)',
      'Ryzyko walutowe',
      'Ubezpieczenie inwestycji',
    ],
  },
  {
    roman: 'VII',
    label: 'Gwarancje ubezpieczeniowe',
    items: [
      'Gwarancja przetargowa (wadium)',
      'Gwarancja należytego wykonania kontraktu',
      'Gwarancja zwrotu zaliczki',
      'Gwarancja celna',
      'Gwarancja kaucyjna (depozyt)',
    ],
  },
  {
    roman: 'VIII',
    label: 'Assistance',
    items: [
      'Assistance medyczny',
      'Assistance techniczny',
      'Assistance prawny',
      'Assistance podróżny',
    ],
  },
  {
    roman: 'IX',
    label: 'Ochrona prawna',
    items: [
      'Ochrona prawna — działalność gospodarcza',
      'Ochrona prawna — pracownicy',
      'Ochrona prawna — kontrakty',
    ],
  },
  {
    roman: 'X',
    label: 'Morskie (Marine)',
    items: [
      'Kadłub i maszyny (Hull & Machinery)',
      'P&I (Protection & Indemnity)',
      'Cargo (towary w transporcie morskim)',
      'Przerwa w działalności — marine',
    ],
  },
  {
    roman: 'XI',
    label: 'Lotnicze (Aviation)',
    items: [
      'Kadłub statku powietrznego (Hull)',
      'OC lotnicza (Aviation Liability)',
      'Cargo lotnicze',
    ],
  },
  {
    roman: 'XII',
    label: 'Ryzyka specjalne (Specialty)',
    items: [
      'Produkcja filmowa',
      'Imprezy masowe (Event Insurance)',
      'Sport i rekreacja',
      'Kidnap & Ransom (K&R)',
      'Key Man — ubezpieczenie kluczowych osób',
      'Cyber — ryzyka cybernetyczne',
      'Maszyny budowlane (CPM)',
      'Sprzęt elektroniczny (EEI)',
      'Drony / UAV',
    ],
  },
];
