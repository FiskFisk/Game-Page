# Terminoppgave 2024 Dokumentasjon

## Innhold
Terminoppgaven min består av to deler: et spill og en game-page. Over tid har jeg laget flere spill her og der, for eksempel *Little Island Town*, som ble laget til en tidligere oppgave. Rundt to uker før vi startet på terminoppgaven begynte jeg på et annet spill, et tower defense-spill, som jeg også har inkludert i terminoppgaven. Jeg har brukt en del tid på dette spillet, mens resten av tiden har gått til utviklingen av game-pagen.

---

## Spill: Tower Defense

### Introduksjon
Spillet startet med en enkel idé om hva det skulle være, og deretter bygde jeg videre på det. For et tower defense-spill trenger man hovedsakelig fem grunnleggende elementer for at det skal fungere:
1. En måte å få units/towers.
2. En måte å velge hvilke units man vil bruke.
3. En måte å gå inn på et game-map.
4. En måte å plassere units på game-mapet.
5. Et fiendesystem.

---

### Inventory og Units
Jeg startet med å gi spilleren et inventory og en måte å få units/towers på. Jeg hentet inspirasjon fra nyere tower defense-spill, der spilleren bruker penger for å skape tilfeldige units. Dette førte til at penger også ble en del av spillet. Penger tjener man ved å spille på forskjellige game-maps.

---

### Game Maps
Jeg laget et system der spilleren kan klikke på en game-map-meny og velge fra tilgjengelige maps (foreløpig er det kun ett map). Når spilleren velger et map, transporteres de til en ny skjerm. For å overføre de valgte unitsene til den nye skjermen laget jeg et equip-system i inventoryet. Units som blir equipet lagres i en Equip Manager med en "Don't Destroy On Load"-funksjon, som sikrer at informasjonen overføres mellom scener.

Units kan plasseres på alle områder unntatt de som har en "Not-Plasable"-collider. De unitsene som plasseres får overført stats fra prefab-knappen til selve enheten på kartet. Jeg implementerte også en funksjon for å oppgradere units: Spilleren kan klikke på en unit, få opp dens stats, oppgraderingskostnad, og en knapp for oppgradering. Når man oppgraderer, brukes in-game penger, og unitens stats forbedres. Penger tjener man ved å fullføre waves.

---

### Fiender
Jeg startet med å lage prefabs for fiender med de nødvendige stats og scripts. For fiendens bevegelser la jeg punkter på kartet som fiendene beveger seg mot, i en bestemt rekkefølge. Det siste punktet har en kollisjonsboks som reduserer spillerens liv om fienden når fram. Dette førte til behovet for en HP Manager, som også fungerer som in-game pengesystem. Når en fiende dør, gir den penger som kan brukes til å kjøpe flere units. Hver fiende har egne stats for angrep og helse, som lagres i et Enemy Stats-script.

---

### Waves
Wave-systemet er foreløpig enkelt, men funksjonelt. Jeg kan spesifisere hvilke fiender og hvor mange som skal dukke opp i hver wave. Når alle fiender er drept, eller spilleren trykker på skip-knappen, starter neste wave. Spilleren får også en pengebonus for hver fullførte wave. "Sea Coins" er pengene som brukes til å kjøpe units, og de tjener man etter å ha vunnet eller tapt spillet. Beløpet avhenger av hvor mange waves man klarer.

---

### Unit Angrep
Til slutt implementerte jeg unit-angrep. Etter at en unit er plassert, mottar den statsene sine:
- **Attack Damage**: Hvor mye skade uniten gjør.
- **Range**: Rekkevidden til uniten.
- **Attack Speed**: Hvor raskt uniten angriper.
- **Upgrade Cost**: Kostnaden for å oppgradere uniten.

Uniten lager en usynlig sirkel rundt seg basert på rekkevidden. Når en fiende kommer innenfor sirkelen, skyter uniten en kule som påfører fienden skade tilsvarende unitens Attack Damage. Attack Speed bestemmer hvor ofte uniten angriper; lavere tall betyr raskere angrep.

---

## Game Page: Nettside

### Valg av Teknologi
Jeg startet med å finne ut hva jeg skulle bruke for å lage nettsiden. Selv om HTML, CSS, og JavaScript var en mulighet, valgte jeg React og TypeScript fordi det er mer moderne og effektivt. Jeg begynte med en JavaScript-backend, men byttet senere til Python.

---

### Frontend
Jeg laget først en enkel React og TypeScript-nettside for frontend. Ved hjelp av min egen tutorial, tilgjengelig på [GitHub](https://github.com/FiskFisk/Hvordan-lage-en-applikasjon-i-React-Vue-SvelteKit/tree/main), satte jeg opp de nødvendige filene. **App.tsx** ble koblet til **GameList.tsx**, slik at nettsiden viste en liste med bokser for hvert spill. Når man klikker på en spillboks, vises en informasjonsboks via **GameModal.tsx**. Hver boks har sin egen unike informasjonsboks.

---

### Backend
For å håndtere likes, nedlastinger, og kommentarer, trengte jeg en backend. Jeg brukte Python og SQL for å lage en database i **games.db**. **App.py** håndterer all backend-logikken og kobler til **GameModal.tsx**, slik at likes, nedlastinger og kommentarer lagres permanent i databasen.

---

### Hosting
Nettsiden var opprinnelig bare tilgjengelig lokalt, men ved hjelp av **app.py** kunne jeg koble frontend og backend sammen på en IP-adresse: `http://10.2.3.46`. Frontend kjører på port 3000 og backend på port 5000. Dermed kan nettsiden nås av alle på samme nettverk. Likes, kommentarer og nedlastinger oppdateres i sanntid for alle brukere.

---

### Logging
Tidligere kunne brukere like spill så mange ganger de ville. For å løse dette la jeg til **AuthPanel.tsx**, som krever at brukere logger inn eller registrerer seg. På registreringssiden skriver man inn e-post, passord og brukernavn. Hvis registreringen er vellykket, blir man automatisk logget inn og sendt til game-pagen. Logginformasjonen lagres i SQL-databasen.

---

## Funksjoner
- Spillere kan kun like et spill én gang.
- Brukernavnet vises øverst til høyre på nettsiden.

