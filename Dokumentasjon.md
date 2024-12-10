# 🎮 Terminoppgave 2024: Spill og Game Page

## 📋 Innhold
1. [📖 Introduksjon](#-introduksjon)
2. [🕹️ Spill: Tower Defense](#️-spill-tower-defense)
   - [🔑 Grunnleggende Elementer](#-grunnleggende-elementer)
   - [📦 Inventory og Units](#-inventory-og-units)
   - [🗺️ Game Maps](#-game-maps)
   - [👾 Fiendesystem](#-fiendesystem)
   - [🌊 Waves](#-waves)
   - [🎯 Unitangrep](#-unitangrep)
3. [💻 Nettside: Game Page](#-nettside-game-page)
   - [✨ Frontend-funksjoner](#-frontend-funksjoner)
   - [🔧 Backend-funksjoner](#-backend-funksjoner)
   - [🌐 Hosting](#-hosting)
   - [🔑 Brukerautentisering](#-brukerautentisering)
4. [📁 Katalogstruktur](#-katalogstruktur)
5. [🚀 Videreutvikling](#-videreutvikling)
6. [📚 Ressurser](#-ressurser)

---

## 📖 Introduksjon

Denne terminoppgaven består av to deler:
1. **Et spill** - Et Tower Defense-spill designet for å utforske mekanikkene i sjangeren.
2. **En nettside** - En Game Page der brukere kan interagere med spillene ved å legge igjen likes, kommentarer og laste ned spillene.

Målet var å kombinere teknisk kompetanse med kreativ spillutvikling.

---

## 🕹️ Spill: Tower Defense

### 🔑 Grunnleggende Elementer

Tower Defense-spillet er bygget rundt fem nøkkelfunksjoner som definerer sjangeren:
1. En mekanisme for å få **units/towers**.
2. En metode for å **velge** hvilke units som skal brukes.
3. Et system for å **gå inn på et game map**.
4. En funksjon for å **plassere units** på kartet.
5. Et **fiendesystem** for å utfordre spilleren.

---

### 📦 Inventory og Units

- **Inventory** gir spilleren muligheten til å få units ved hjelp av in-game penger.
- Units genereres tilfeldig basert på spillerens økonomi, inspirert av moderne tower defense-spill.
- Spilleren tjener penger ved å spille og fullføre game maps.

---

### 🗺️ Game Maps

1. **Kartvalg:** Spilleren kan velge fra en meny over tilgjengelige maps. Foreløpig er kun ett map tilgjengelig.
2. **Overføring av units:** Brukeren velger units via et **equip-system**, som lagrer informasjonen i en **Equip Manager** med "Don't Destroy On Load"-funksjonalitet.
3. **Plassering:** Units kan plasseres på tilgjengelige områder på kartet.
4. **Oppgradering:** Spilleren kan oppgradere units med in-game penger for å forbedre stats.

---

### 👾 Fiendesystem

- **Fiendebevegelser:** Fiender navigerer mellom forhåndsdefinerte punkter. Når de når sluttpunktet, mister spilleren liv.
- **Belønning:** Spilleren tjener penger ved å beseire fiender. Disse pengene brukes til å skaffe nye units.
- **Fiendestats:** Hver fiende har egne stats for helse og skade.

---

### 🌊 Waves

- **Wave-design:** Hver wave består av forhåndsdefinerte fiender og mengder.
- **Progressjon:** Etter at spilleren beseirer alle fiender eller trykker "skip", starter neste wave.
- **Belønninger:** Spilleren får bonuspenger for fullførte waves og kan tjene "Sea Coins" avhengig av antall fullførte waves.

---

### 🎯 Unitangrep

- Hver unit har følgende stats:
  - **Attack Damage:** Skaden per angrep.
  - **Range:** Rekkevidde for angrep.
  - **Attack Speed:** Hvor ofte uniten angriper (f.eks. 1 = 1 angrep per sekund, 0.5 = 2 angrep per sekund).
- Units angriper fiender innenfor rekkevidden ved å skyte prosjektiler.

---

## 💻 Nettside: Game Page

### ✨ Frontend-funksjoner

- **GameList.tsx:** Viser en liste med klikkbare spillbokser.
- **GameModal.tsx:** Viser detaljer om hvert spill, inkludert:
  - Likes: Dynamisk oppdatering ved brukerinteraksjon.
  - Kommentarer: Lar brukere legge igjen kommentarer.
  - Nedlastinger: En knapp for å laste ned spill.

---

### 🔧 Backend-funksjoner

- **App.py:** Backend skrevet i Python som kobler frontend med en SQLite-database.
- **Database:** Lagrer informasjon som:
  - Antall likes.
  - Nedlastinger.
  - Kommentarer.
- **API:** Håndterer kommunikasjonen mellom frontend og backend for sanntidsoppdateringer.

---

### 🌐 Hosting

- **Frontend:** Kjører på `http://10.2.3.46:3000`.
- **Backend:** Kjører på `http://10.2.3.46:5000`.
- **Tilgang:** Nettsiden kan nås av alle på samme nettverk.

---

### 🔑 Brukerautentisering

- **AuthPanel.tsx:** Krever at brukere logger inn eller registrerer seg.
- **Registreringsprosess:**
  - Brukeren fyller inn e-post, passord og brukernavn.
  - Etter registrering logges brukeren inn automatisk.
- **Etter innlogging:**
  - Kun én like per spill per bruker.
  - Brukernavnet vises øverst til høyre.

---

## 📁 Katalogstruktur

```plaintext
├── backend/
│   ├── app.py
│   ├── games.db
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── GameList.tsx
│   │   ├── GameModal.tsx
│   │   ├── AuthPanel.tsx
│   │   ├── styles/
│   │   │   └── App.css
│   └── public/
│       └── index.html
```

---

## 🚀 Videreutvikling
- Legge til flere maps og fiendetyper i Tower Defense-spillet.
- Utvikle et mer avansert wave-system.
-- Utvide Game Page med spillvurderinger og personalisering.

---

## 📚 Ressurser
- React + TypeScript Tutorial

---

## 🎉 Bonus
- Spilleren kan kun like et spill én gang.
- Brukernavnet vises i toppmenyen etter innlogging.


