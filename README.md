# Profession.hu - Párbeszéd alapú jelentkezési prototípus

[![GitHub](https://img.shields.io/badge/GitHub-barrajanos%2Fparbeszed--jelentkezes-blue?style=flat-square&logo=github)](https://github.com/barrajanos/parbeszed-jelentkezes)
[![Demo](https://img.shields.io/badge/Demo-GitHub%20Pages-green?style=flat-square&logo=github)](https://barrajanos.github.io/parbeszed-jelentkezes/)

## Áttekintés

Ez a prototípus demonstrálja, hogyan működhetne a profession.hu párbeszéd alapú állásjelentkezési rendszere. A felhasználókat egy AI asszisztens (Petra) vezeti végig a jelentkezési folyamaton, amely egy modern chatbot interfészen keresztül történik.

## Funkcionalitás

### 🤖 AI Asszisztens
- **Petra** - A virtuális HR koordinátor valós profil képpel
- Professzionális, udvarias kommunikáció
- Valós idejű gépelés indikátor
- Autentikus, emberi megjelenés

### 📋 Jelentkezési folyamat
A jelentkezés 7 lépésben történik:

1. **Név megadása** - Teljes név validálással
2. **Email cím** - Email formátum ellenőrzés
3. **Telefonszám** - Telefonszám validálás
4. **Tapasztalat** - Frontend fejlesztési tapasztalat
5. **Motiváció** - Miért szeretne a cégnél dolgozni
6. **Fizetési elvárás** - Nettó havi fizetés
7. **Kezdési dátum** - Mikor tud munkába állni és összefoglaló

### 🚀 Felhasználói élmény

#### Gyors válaszok
- Előre definiált válaszlehetőségek
- Egy kattintással kiválasztható opciók
- Felgyorsítja a jelentkezési folyamatot

#### Haladás követés
- Vizuális progress bar
- Lépésszám megjelenítés
- Átlátható folyamat

#### Validáció
- Valós idejű input validáció
- Hibaüzenetek magyar nyelven
- Újrapróbálkozási lehetőség

## Technikai megvalósítás

### Frontend
- **HTML5** - Szemantikus markup
- **CSS3** - Modern design, animációk
- **JavaScript** - Interaktív logika
- **Responsive design** - Mobil-barát

### Stílusok
- **Letisztult színpaletta** - Fehér háttér + kék-türkiz kiemelések (#1e90ff → #00d4aa)
- **Professzionális megjelenés** - Egyszerű, tiszta design
- **Tipográfia** - Arial betűtípus (standard)
- **Professzionális UX** - Hover effektek, smooth transitions

### Validáció
- **Név**: Minimum 2 karakter + szóköz
- **Email**: RFC compliant email validáció
- **Telefon**: International telefon formátum
- **Motiváció**: Minimum 10 karakter

## 🚀 Gyors kezdés

### Online demo
[**► Próbáld ki itt: barrajanos.github.io/parbeszed-jelentkezes**](https://barrajanos.github.io/parbeszed-jelentkezes/)

### Helyi futtatás

```bash
# Repository klónozása
git clone https://github.com/barrajanos/parbeszed-jelentkezes.git

# Könyvtár megnyitása
cd parbeszed-jelentkezes

# Megnyitás böngészőben
open index.html
```

## Használat

1. Nyisd meg az `index.html` fájlt böngészőben
2. Kövesd Petra instrukcióit
3. Válaszolj a kérdésekre vagy használd a gyors válaszokat
4. Az végén tekintsd át és küldd el a jelentkezést

## Funkcionalitás részletei

### Chatbot interfész
- **Üzenetek**: Bot és felhasználói üzenetek elkülönítése
- **Profil képek**: Petra valós fotója minden üzenetben
- **Idősorrend**: Kronológiai üzenetmegjelenítés
- **Auto-scroll**: Automatikus görgetés új üzenetekhez

### Interakciók
- **Szöveges input**: Szabadszöveges válaszok
- **Gyors gombok**: Előre definiált válaszok
- **Enter gomb**: Gyors küldés
- **Validáció**: Azonnali visszajelzés

### Mobilbarát design
- **Responsive**: Minden képernyőméreten használható
- **Touch friendly**: Mobil optimalizált gombok
- **Flexibilis layout**: Automatikus átméretezés

## Fejlesztési lehetőségek

### Következő fázis
- **Backend integráció**: Valós adatbázis csatlakozás
- **Fájl feltöltés**: CV és motivációs levél
- **Multi-language**: Többnyelvű támogatás
- **Analytics**: Felhasználói viselkedés követése

### Továbbfejlesztések
- **Voice input**: Hangvezérlés
- **Video chat**: Videó interjú integráció
- **AI scoring**: Automatikus értékelés
- **Integration**: ATS rendszer csatlakozás

## Tesztelés

### Tesztesetek
1. **Teljes flow**: Végigmenni a teljes folyamaton
2. **Validáció**: Hibás adatok megadása
3. **Responsiveness**: Különböző képernyőméreteken
4. **Restart**: Új jelentkezés indítása

### Böngésző kompatibilitás
- Chrome/Chromium 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Architektúra

```
JobApplicationBot Class
├── Constructor - Inicializálás
├── Event Listeners - Felhasználói interakciók
├── Message Management - Üzenetkezelés
├── Step Management - Lépések kezelése
├── Validation - Adatok validálása
├── Progress Tracking - Haladás követése
└── UI Updates - Felhasználói interfész frissítése
```

## Testreszabási lehetőségek

### Branding
- Színpaletta módosítása
- Profession.hu eredeti logó használata
- Üzenetek személyre szabása

### Funkciók
- Új lépések hozzáadása
- Validációs szabályok módosítása
- Quick actions testreszabása

---

## Fájlszerkezet

- `index.html` - Főoldal a chatbot interfésszel
- `style.css` - Modern profession.hu design
- `script.js` - Interaktív chatbot logika
- `assets/logo.svg` - Eredeti profession.hu logó
- `assets/petra.jpg` - Petra HR koordinátor valós profil képe
- `README.md` - Részletes dokumentáció

---

**Készítette:** AI Assistant  
**Verzió:** 1.0  
**Utolsó frissítés:** 2024  

*Ez egy prototípus demonstrációs célokra. Éles használathoz további biztonsági és teljesítmény optimalizálások szükségesek.* 