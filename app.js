// ===== LEVEL CONFIG =====
const LEVELS = [
  { level:1,  name:"Niemand",          xp:0,    stage:0  },
  { level:2,  name:"Schatten",         xp:100,  stage:1  },
  { level:3,  name:"Flüsterer",        xp:250,  stage:2  },
  { level:4,  name:"Jäger",            xp:450,  stage:3  },
  { level:5,  name:"Krieger",          xp:700,  stage:4  },
  { level:6,  name:"Berserker",        xp:1000, stage:5  },
  { level:7,  name:"Schattenfürst",    xp:1350, stage:6  },
  { level:8,  name:"Seelenbrecher",    xp:1750, stage:7  },
  { level:9,  name:"Kriegsherr",       xp:2200, stage:8  },
  { level:10, name:"Unsterblicher",    xp:2700, stage:9  },
  { level:11, name:"Dämonenkönig",     xp:3250, stage:10 },
  { level:12, name:"Göttermörder",     xp:3850, stage:11 },
  { level:13, name:"Übermensch",       xp:4500, stage:12 },
  { level:14, name:"Legende",          xp:5200, stage:13 },
  { level:15, name:"✦ Finale Form ✦",  xp:5950, stage:14 },
];

// One unique stage per level (15 total)
// Color arc: gray → blue-gray → soft blue → sky blue → cyan → teal → green → lime → gold → orange → orange-red → crimson → pink → white → rainbow
const CHAR_STAGES = [
  // 0  Niemand       – flat dark gray, dead eyes, nothing
  { bodyColor:"#4a4a55", auraColor:"#4a4a55", auraClass:"",                  aura:false, eyes:false, energy:false, armor:false, wings:false, crown:false, rays:false, bg:"#0d0d1a" },
  // 1  Schatten      – blue-gray, still dormant
  { bodyColor:"#6872a0", auraColor:"#6872a0", auraClass:"",                  aura:false, eyes:false, energy:false, armor:false, wings:false, crown:false, rays:false, bg:"#0d0e1c" },
  // 2  Flüsterer     – soft blue, eyes wake up
  { bodyColor:"#5b8dd9", auraColor:"#5b8dd9", auraClass:"aura-pulse-blue",   aura:true,  eyes:true,  energy:false, armor:false, wings:false, crown:false, rays:false, bg:"#07101e" },
  // 3  Jäger         – bright sky blue, full aura
  { bodyColor:"#29b6f6", auraColor:"#29b6f6", auraClass:"aura-pulse-blue",   aura:true,  eyes:true,  energy:false, armor:false, wings:false, crown:false, rays:false, bg:"#040d1f" },
  // 4  Krieger       – cyan, energy lines crackle
  { bodyColor:"#26c6da", auraColor:"#26c6da", auraClass:"aura-pulse-blue",   aura:true,  eyes:true,  energy:true,  armor:false, wings:false, crown:false, rays:false, bg:"#03101a" },
  // 5  Berserker     – teal, bridging cyan to green
  { bodyColor:"#26a69a", auraColor:"#26a69a", auraClass:"aura-pulse-green",  aura:true,  eyes:true,  energy:true,  armor:false, wings:false, crown:false, rays:false, bg:"#021210" },
  // 6  Schattenfürst – green, armor forged
  { bodyColor:"#66bb6a", auraColor:"#66bb6a", auraClass:"aura-pulse-green",  aura:true,  eyes:true,  energy:true,  armor:true,  wings:false, crown:false, rays:false, bg:"#021208" },
  // 7  Seelenbrecher – lime / yellow-green, armor gleams
  { bodyColor:"#c6e03a", auraColor:"#c6e03a", auraClass:"aura-pulse-green",  aura:true,  eyes:true,  energy:true,  armor:true,  wings:false, crown:false, rays:false, bg:"#0b1002" },
  // 8  Kriegsherr    – amber gold, power crystallises
  { bodyColor:"#ffca28", auraColor:"#ffca28", auraClass:"aura-pulse-gold",   aura:true,  eyes:true,  energy:true,  armor:true,  wings:false, crown:false, rays:false, bg:"#130a00" },
  // 9  Unsterblicher – orange, crown appears
  { bodyColor:"#ffa726", auraColor:"#ffa726", auraClass:"aura-pulse-gold",   aura:true,  eyes:true,  energy:true,  armor:true,  wings:false, crown:true,  rays:false, bg:"#160600" },
  // 10 Dämonenkönig  – orange-red, wings unfold
  { bodyColor:"#ff7043", auraColor:"#ff7043", auraClass:"aura-pulse-red",    aura:true,  eyes:true,  energy:true,  armor:true,  wings:true,  crown:true,  rays:false, bg:"#1a0300" },
  // 11 Göttermörder  – crimson, full wings + crown
  { bodyColor:"#ef5350", auraColor:"#ef5350", auraClass:"aura-pulse-red",    aura:true,  eyes:true,  energy:true,  armor:true,  wings:true,  crown:true,  rays:false, bg:"#1f0000" },
  // 12 Übermensch    – hot pink / magenta, transcending
  { bodyColor:"#ec407a", auraColor:"#ec407a", auraClass:"aura-pulse-red",    aura:true,  eyes:true,  energy:true,  armor:true,  wings:true,  crown:true,  rays:false, bg:"#1a0010" },
  // 13 Legende       – pure white, divine rays pierce through
  { bodyColor:"#ffffff", auraColor:"#ffffff", auraClass:"aura-pulse-white",  aura:true,  eyes:true,  energy:true,  armor:true,  wings:true,  crown:true,  rays:true,  bg:"#070710" },
  // 14 Finale Form   – rainbow prismatic, everything
  { bodyColor:"url(#rainbowGrad)", auraColor:"#ff6b6b", auraClass:"aura-pulse-rainbow", aura:true, eyes:true, energy:true, armor:true, wings:true, crown:true, rays:true, bg:"#000008" },
];

// ===== QUEST DATA =====
// Sport: 8 Schwierigkeitsstufen (t1–t8), skaliert von Level 1 bis 15
// Natur & Sozial: 5 Stufen (t1–t5)
const QUESTS = {
  sport: {
    t1: [ // Level 1–2: Einstieg – ganz leicht
      "Mache 10 Liegestütze",
      "Mache 15 Kniebeugen",
      "Mache 10 Sit-ups",
      "Halte eine 20-Sekunden-Plank",
      "Mache 15 Hampelmänner",
      "Geh 10 Minuten flott spazieren",
      "Mache 8 Ausfallschritte pro Bein",
      "Strecke dich 5 Minuten durch",
      "Springe 1 Minute auf der Stelle",
      "Mache 5 Trizeps-Dips an einem Stuhl",
      "Mache 10 Crunches",
      "Geh einmal die Treppe hoch und runter – 5× wiederholen",
      "Halte 3× 10 Sek. Wandsitzen",
      "Mache 10 Armkreise vor & zurück",
      "Mache 5 langsame Kniebeugen – auf Technik achten",
    ],
    t2: [ // Level 3–4: Warm werden
      "Mache 20 Liegestütze",
      "Mache 30 Kniebeugen",
      "Mache 20 Sit-ups",
      "Halte eine 40-Sekunden-Plank",
      "Mache 20 Hampelmänner",
      "Geh 20 Minuten flott spazieren",
      "Mache 2× 12 Ausfallschritte pro Bein",
      "Springe 3 Minuten auf der Stelle",
      "Mache 15 Trizeps-Dips",
      "10 Liegestütze + 20 Kniebeugen – 2 Sätze",
      "Laufe 1 km ohne Pause",
      "Mache 3× 10 Crunches",
      "Halte 3× 20 Sek. Wandsitzen",
      "Mache 15 Burpees",
      "Mache 20 Beinheber im Liegen",
      "Springe 50× Seilspringen oder auf der Stelle",
    ],
    t3: [ // Level 5–6: Erste Kombos
      "Mache 30 Liegestütze",
      "Mache 50 Kniebeugen",
      "Mache 30 Sit-ups + 20 Crunches",
      "Halte eine 1-Minuten-Plank",
      "Laufe 2 km ohne Pause",
      "Mache 20 Burpees",
      "2 Sätze: 15 Liegestütze + 20 Kniebeugen + 15 Sit-ups",
      "Mache 3× 15 Ausfallschritte pro Bein",
      "Springe 5 Minuten auf der Stelle",
      "Mache 25 Trizeps-Dips",
      "3× 15 Liegestütze mit 60 Sek. Pause",
      "40 Hampelmänner + 20 Kniebeugen",
      "Laufe 15 Minuten ohne Pause",
      "3× 20 Beinheber + 15 Crunches",
      "10 Burpees + 20 Kniebeugen + 10 Liegestütze",
      "Mache 30 Sit-ups so schnell wie möglich",
    ],
    t4: [ // Level 7–8: Ernsthaft
      "Mache 50 Liegestütze",
      "Mache 80 Kniebeugen",
      "3 Sätze: 20 Liegestütze + 25 Kniebeugen + 20 Sit-ups",
      "Halte 2× 1-Minuten-Plank",
      "Laufe 3 km ohne Pause",
      "Mache 30 Burpees",
      "3× 20 Ausfallschritte + 15 Liegestütze",
      "3 Sätze: 30 Hampelmänner + 15 Burpees",
      "Laufe 20 Minuten ohne Pause",
      "4× 12 Trizeps-Dips + 12 Liegestütze",
      "50 Kniebeugen + 30 Sit-ups + 20 Liegestütze am Stück",
      "3× 20 Crunches + 15 Beinheber",
      "Mache so viele Liegestütze wie möglich in 5 Min.",
      "2 km laufen + danach 20 Liegestütze",
      "4 Sätze: 10 Burpees + 15 Kniebeugen",
      "60 Sit-ups + 30 Liegestütze – kein Stop",
    ],
    t5: [ // Level 9–10: Hart
      "Mache 80 Liegestütze – verteilt wenn nötig",
      "Mache 100 Kniebeugen",
      "4 Sätze: 20 Liegestütze + 30 Kniebeugen + 20 Sit-ups",
      "Laufe 5 km ohne Pause",
      "Mache 50 Burpees",
      "Halte 3× 1-Minuten-Plank mit 30 Sek. Pause",
      "4 Sätze Klimmzüge bis zum Versagen",
      "5 Sätze: 10 Burpees + 10 Liegestütze + 10 Sit-ups",
      "Laufe 25 Minuten + 30 Liegestütze danach",
      "100 Kniebeugen + 50 Sit-ups + 25 Liegestütze",
      "60 Ausfallschritte + 3× 1-Min. Plank",
      "4 Sätze: 15 Klimmzüge (Max) + 20 Liegestütze",
      "40 Burpees so schnell wie möglich",
      "4 km laufen + alle 500 m 10 Kniebeugen",
      "5× 20 Trizeps-Dips + 15 Liegestütze",
      "80 Sit-ups + 40 Liegestütze + 40 Kniebeugen",
    ],
    t6: [ // Level 11–12: Sehr hart
      "Mache 120 Liegestütze – verteilt über den Tag",
      "Mache 150 Kniebeugen",
      "5 Sätze: 20 Liegestütze + 30 Kniebeugen + 20 Burpees",
      "Laufe 7 km ohne Pause",
      "Mache 70 Burpees",
      "Halte 5× 1-Minuten-Plank",
      "5 Sätze Klimmzüge bis zum Versagen",
      "150 Kniebeugen + 80 Sit-ups + 50 Liegestütze",
      "Laufe 30 Minuten + 50 Liegestütze danach",
      "6 Sätze: 10 Burpees + 15 Liegestütze + 20 Kniebeugen",
      "80 Ausfallschritte + 5× 1-Min. Plank",
      "50 Klimmzüge – aufgeteilt wie nötig",
      "5 Sätze: 20 Trizeps-Dips + 20 Liegestütze + 15 Burpees",
      "5 km laufen + alle 1 km 15 Burpees",
      "200 Hampelmänner + 60 Liegestütze + 60 Sit-ups",
      "7 Sätze: 12 Liegestütze + 15 Kniebeugen + 10 Sit-ups",
    ],
    t7: [ // Level 13–14: Extrem
      "Mache 200 Liegestütze – verteilt über den Tag",
      "Mache 250 Kniebeugen – verteilt über den Tag",
      "6 Sätze: 25 Liegestütze + 35 Kniebeugen + 25 Burpees",
      "Laufe 10 km ohne Pause",
      "Mache 100 Burpees",
      "Täglich 10 Minuten Plank gesamt – aufgeteilt wie nötig",
      "7 Sätze Klimmzüge bis zum Versagen",
      "200 Kniebeugen + 100 Sit-ups + 80 Liegestütze",
      "Laufe 40 Minuten + 80 Liegestütze danach",
      "8 Sätze: 12 Burpees + 20 Liegestütze + 25 Kniebeugen",
      "100 Ausfallschritte + 8× 1-Min. Plank",
      "70 Klimmzüge – aufgeteilt wie nötig",
      "Jede Stunde 20 Liegestütze den ganzen Tag",
      "7 km laufen + alle 1 km 20 Burpees",
      "300 Hampelmänner + 80 Liegestütze + 80 Sit-ups",
      "9 Sätze: 15 Liegestütze + 20 Kniebeugen + 10 Burpees",
    ],
    t8: [ // Level 15: ⚔ FINAL FORM – absolut brutal
      "⚔ FINAL FORM: 300 Liegestütze über den Tag verteilt – z.B. alle Stunde 25",
      "⚔ FINAL FORM: 500 Kniebeugen über den Tag – jede Stunde 40, kein Ausreden",
      "⚔ FINAL FORM: Laufe 15 km – Tempo egal, aber niemals stoppen",
      "⚔ FINAL FORM: 150 Burpees über den Tag verteilt – das ist dein Standard",
      "⚔ FINAL FORM: Jede Stunde 25 Liegestütze + 25 Kniebeugen + 10 Sit-ups – ganzer Tag",
      "⚔ FINAL FORM: 150 Klimmzüge über den Tag – setze dir keine Grenzen",
      "⚔ FINAL FORM: 200 Burpees + 200 Sit-ups verteilt über den Tag",
      "⚔ FINAL FORM: 10 km laufen + danach 50 Liegestütze + 50 Burpees",
      "⚔ FINAL FORM: Gauntlet – 100 Liegestütze, 200 Kniebeugen, 100 Sit-ups, 50 Burpees",
      "⚔ FINAL FORM: 10 Sätze bis zum Versagen: Liegestütze → Kniebeugen → Plank 1 Min.",
      "⚔ FINAL FORM: 400 Kniebeugen + 150 Liegestütze + 100 Sit-ups – kein Limit, kein Stop",
      "⚔ FINAL FORM: Laufe 12 km + mache alle 2 km 20 Burpees & 20 Liegestütze",
    ],
  },

  natur: {
    t1: [ // Level 1–3: Erste Schritte
      "Geh 10 Minuten frische Luft schnappen",
      "Öffne das Fenster und atme 5× tief die Außenluft ein",
      "Sitz 10 Minuten draußen ohne Handy",
      "Schau dir eine Pflanze oder Blume heute genau an",
      "Geh kurz raus und hör 3 Minuten nur den Geräuschen der Natur zu",
      "Schau heute Abend kurz in den Himmel – Wolken, Mond oder Sterne",
      "Geh 10 Minuten barfuß auf Gras oder Erde",
      "Fotografiere etwas Schönes aus der Natur, das du heute siehst",
      "Atme 5 Minuten bewusst frische Luft – Augen zu, nur fühlen",
      "Geh einen kleinen Umweg nach Hause durch Grün",
      "Steh heute morgen kurz vor die Tür – bevor du ans Handy gehst",
      "Berühre heute einen Baum und spüre die Rinde",
    ],
    t2: [ // Level 4–6: Verbindung aufbauen
      "Geh 20 Minuten in der Natur spazieren",
      "Sitz 15 Minuten draußen ohne Handy",
      "Beobachte heute den Sonnenuntergang",
      "Sammle 5 Stück Müll draußen auf",
      "Fotografiere 3 verschiedene Naturdetails (Blatt, Rinde, Tier...)",
      "Liege im Gras und beobachte die Wolken für 10 Minuten",
      "Finde heute ein Tier in freier Wildbahn und beobachte es",
      "Geh in den Regen und bleib 5 Minuten drin",
      "Besuche heute einen Ort in der Natur, den du schon lange mochtest",
      "Mache eine 30-min-Runde durch Park oder Wald",
      "Sitz neben einem Gewässer und entspanne 15 Minuten",
      "Pflanze heute etwas – eine Blume, ein Kraut, einen Ableger",
      "Beobachte den Sternenhimmel für 10 Minuten",
      "Geh barfuß 20 Minuten auf natürlichem Boden",
    ],
    t3: [ // Level 7–9: Bewusst erleben
      "Mache eine Wanderung von mindestens 4 km",
      "Verbringe 1 Stunde ohne Handy draußen in der Natur",
      "Beobachte einen Sonnenaufgang – stehe früh auf!",
      "Sammle 15 Stück Müll und entsorge sie richtig",
      "Finde und fotografiere 5 verschiedene Tierarten",
      "Sitz 30 Minuten barfuß auf dem Boden und meditiere",
      "Erkunde einen Wald oder Park, den du noch nicht kennst",
      "Beobachte den Sternenhimmel 20 Minuten – kein Handy",
      "Mache eine 6-km-Wanderung ohne Musik",
      "Verbringe den Abend draußen – ohne Bildschirm",
      "Fotografiere dieselbe Szene morgens, mittags und abends",
      "Sitz neben einem Gewässer und schreibe auf, was du siehst & fühlst",
      "Schwimme in einem natürlichen Gewässer – egal wie kalt",
      "Übernachte draußen – Zelt, Hängematte oder Balkon",
    ],
    t4: [ // Level 10–12: Echte Herausforderung
      "Mache eine Wanderung von mindestens 10 km",
      "Verbringe 2 Stunden komplett ohne Handy in der Natur",
      "Erlebe Sonnenaufgang UND Sonnenuntergang in der Natur",
      "Besuche einen besonderen Naturort, den du noch nie warst",
      "Sammle & bestimme 10 verschiedene Pflanzen oder Bäume",
      "Mache eine 12-km-Wanderung ohne Musik oder Podcast",
      "Verbring einen halben Tag komplett in der Natur – kein Netz",
      "Schwimme in einem natürlichen Gewässer bei Sonnenaufgang",
      "Finde 3 verschiedene Tierarten und recherchiere sie kurz",
      "Schlafe eine Nacht draußen in der Natur",
      "Wandere 8 km + fotografiere jeden Kilometer etwas Neues",
      "Verbring 3 Stunden allein in der Natur – kein Handy, kein Podcast",
    ],
    t5: [ // Level 13–15: Final Form
      "⚔ FINAL FORM: Verbringe einen ganzen Tag in der Natur – kein Handy, keine Ablenkung",
      "⚔ FINAL FORM: Mache eine 18-km-Wanderung allein – nur Natur, nur du",
      "⚔ FINAL FORM: Erlebe Sonnenaufgang draußen und bleib bis zum Sonnenuntergang",
      "⚔ FINAL FORM: Übernachte draußen in der Natur – finde deinen Platz selbst",
      "⚔ FINAL FORM: 24 Stunden ohne Handy – nur Natur, Stille und du",
      "⚔ FINAL FORM: Wandere 15 km + schwimme in einem natürlichen Gewässer",
      "⚔ FINAL FORM: Baue ein Nachtlager in der Natur und schlafe dort",
    ],
  },

  sozial: {
    t1: [ // Level 1–3: Kleine Gesten
      "Lächle heute 3 fremden Menschen bewusst an",
      "Mach jemandem ein aufrichtiges Kompliment",
      "Sag heute jemandem danke – und meine es wirklich",
      "Halte heute einmal die Tür für jemanden auf",
      "Schreibe einer Person eine kurze nette Nachricht",
      "Frage heute jemanden: 'Wie geht es dir wirklich?'",
      "Hör jemandem 5 Minuten lang aktiv zu – kein Handy",
      "Grüße heute jeden, dem du begegnest, bewusst",
      "Sage einem Familienmitglied, dass du es schätzt",
      "Bedanke dich heute bei jemandem, dem du es schon lange schuldest",
      "Lass jemanden in der Schlange vor dir",
      "Schicke jemandem ein Meme oder etwas, das ihn zum Lachen bringt",
    ],
    t2: [ // Level 4–6: Echte Verbindung
      "Schreibe einer Person, die du lange nicht kontaktiert hast",
      "Mach jemandem ein tiefes, echtes Kompliment – kein Smalltalk",
      "Lächle heute 5 fremden Menschen bewusst an",
      "Hilf heute jemandem bei einer konkreten Aufgabe",
      "Bereite für jemanden eine Mahlzeit zu",
      "Bedanke dich bei jemandem für etwas, das du lange ignoriert hast",
      "Höre jemandem 15 Minuten aktiv zu – ohne dich selbst einzubringen",
      "Mache jemandem eine kleine Überraschung",
      "Lerne den Namen eines Nachbarn oder Kollegen kennen",
      "Erzähle jemandem direkt ins Gesicht, was du an ihm schätzt",
      "Teile etwas mit jemandem – Essen, Zeit oder ein Lächeln",
      "Schreibe jemandem eine handgeschriebene Nachricht",
      "Sag deinen Eltern / deiner Familie, dass du sie liebst",
    ],
    t3: [ // Level 7–9: Aktiv handeln
      "Verabrede dich mit einem Freund, den du lange nicht gesehen hast",
      "Hilf heute einem Fremden aktiv – ungefragt",
      "Tu heute etwas Gutes für jemanden, ohne es zu erwähnen",
      "Organisiere einen spontanen Abend mit Freunden oder Familie",
      "Spende etwas – Zeit, Geld oder Kleidung – für einen guten Zweck",
      "Führe heute ein echtes, tiefes Gespräch mit jemandem",
      "Tu heute 3 nette Dinge für 3 verschiedene Menschen",
      "Ruf jemanden an, den du lange nicht gesprochen hast",
      "Mache heute für jemanden etwas, das er sich schon lange wünscht",
      "Rede heute mit einem Menschen, der alleine wirkt",
      "Schreibe einer Person, die dir viel bedeutet, einen langen Brief",
      "Engagiere dich heute für eine Stunde ehrenamtlich",
    ],
    t4: [ // Level 10–12: Große Gesten
      "Rede heute mit mindestens 3 fremden Menschen – echte Gespräche",
      "Organisiere ein Treffen für 5+ Menschen – plane es vollständig",
      "Tu heute etwas Gutes für 3 verschiedene Personen – anonym",
      "Verbringe 2 Stunden ohne Handy nur mit einer wichtigen Person",
      "Sage 3 verschiedenen Menschen heute etwas Ehrliches von Herzen",
      "Engagiere dich heute aktiv in deiner Community",
      "Ruf 3 Menschen an, die du lange nicht gehört hast",
      "Organisiere überraschend etwas Besonderes für jemanden",
      "Führe heute 3 echte, aufrichtige Gespräche – kein Smalltalk",
      "Mache heute für jemanden etwas wirklich Bedeutungsvolles",
      "Schreibe 3 echten Briefen an Menschen, die dir wichtig sind",
      "Überrasche jemanden mit einem ganzen Tag deiner Zeit",
    ],
    t5: [ // Level 13–15: Final Form
      "⚔ FINAL FORM: Sei heute für alle da – hilf 5 verschiedenen Menschen aktiv",
      "⚔ FINAL FORM: Verbringe einen ganzen Tag nur mit geliebten Menschen – kein Handy",
      "⚔ FINAL FORM: Tue heute etwas, das das Leben einer anderen Person wirklich verändert",
      "⚔ FINAL FORM: Organisiere ein Ereignis für deine Gemeinschaft – echt und unvergesslich",
      "⚔ FINAL FORM: Schreibe 5 Menschen Briefe von Herzen – warum sie in deinem Leben zählen",
      "⚔ FINAL FORM: Widme heute einen ganzen Tag dem Geben – für Fremde, Freunde, Familie",
    ],
  },
};

const RARE_QUESTS = {
  sport: {
    early: [ // Level 1–7
      "CHALLENGE: 50 Liegestütze + 50 Kniebeugen + 50 Sit-ups – verteilt wenn nötig",
      "CHALLENGE: Laufe heute 4 km – egal wie langsam",
      "CHALLENGE: Mache jede Stunde 10 Kniebeugen den ganzen Tag",
      "CHALLENGE: 5 Runden – 8 Burpees + 10 Liegestütze + 12 Kniebeugen",
      "CHALLENGE: 100 Sit-ups über den Tag verteilt",
      "CHALLENGE: Geh 45 Minuten ohne Pause spazieren oder leicht joggen",
    ],
    late: [ // Level 8–15
      "CHALLENGE: 100 Liegestütze + 100 Kniebeugen + 100 Sit-ups – über den Tag",
      "CHALLENGE: Laufe heute 8 km – kein Stopp erlaubt",
      "CHALLENGE: Jede Stunde 20 Kniebeugen + 10 Liegestütze – ganzer Tag",
      "CHALLENGE: 10 Runden – 10 Burpees + 15 Liegestütze + 20 Kniebeugen",
      "CHALLENGE: 200 Sit-ups + 60 Liegestütze über den Tag",
      "CHALLENGE: 60 Minuten Sport am Stück – was auch immer du willst",
    ],
  },
  natur: {
    early: [
      "CHALLENGE: 1 Stunde ohne Handy in der Natur",
      "CHALLENGE: Erlebe Sonnenaufgang UND Sonnenuntergang heute",
      "CHALLENGE: Besuche einen Naturort, den du noch nie warst",
      "CHALLENGE: Sammle 20 Stück Müll und entsorge sie",
      "CHALLENGE: Wanderung von 5 km – ohne Musik",
    ],
    late: [
      "CHALLENGE: 3 Stunden ohne jegliche Technologie in der Natur",
      "CHALLENGE: 12-km-Wanderung – allein, kein Handy",
      "CHALLENGE: Schlafe eine Nacht draußen in der Natur",
      "CHALLENGE: Ganzer Tag im Freien – vom Aufstehen bis zum Einschlafen",
      "CHALLENGE: Schwimme in einem natürlichen See oder Fluss",
    ],
  },
  sozial: {
    early: [
      "CHALLENGE: Rede heute mit 3 fremden Menschen wirklich",
      "CHALLENGE: Tu heute etwas Gutes für 3 verschiedene Personen",
      "CHALLENGE: Ruf 3 Menschen an, die du lange nicht gehört hast",
      "CHALLENGE: Mache 5 verschiedenen Menschen heute eine echte Freude",
      "CHALLENGE: Organisiere ein spontanes Treffen mit Freunden",
    ],
    late: [
      "CHALLENGE: Sei heute für 5+ Menschen aktiv da",
      "CHALLENGE: Organisiere ein Ereignis für 10+ Menschen",
      "CHALLENGE: Schreibe 3 echte Briefe an wichtige Menschen",
      "CHALLENGE: Verbringe 4 Stunden ausschließlich mit einem geliebten Menschen – kein Handy",
      "CHALLENGE: Tu heute anonym etwas wirklich Bedeutungsvolles für jemanden",
    ],
  },
};

const LEGENDARY_QUESTS = {
  sport: [
    "⚡ LEGENDÄR: Mache heute 200 Liegestütze – egal wie aufgeteilt",
    "⚡ LEGENDÄR: Laufe heute 10 km ohne Unterbrechung",
    "⚡ LEGENDÄR: 50 Burpees + 50 Liegestütze + 100 Kniebeugen – ein einziges Workout",
    "⚡ LEGENDÄR: Jede Stunde 20 Kniebeugen & 10 Liegestütze von 8 bis 22 Uhr",
    "⚡ LEGENDÄR: 5 km laufen + 100 Liegestütze + 100 Sit-ups – alles heute",
    "⚡ LEGENDÄR: 8 Sätze bis zum Versagen – Liegestütze, Kniebeugen, Sit-ups, Plank",
  ],
  natur: [
    "🌿 LEGENDÄR: Halben Tag komplett ohne Handy in der Natur verbringen",
    "🌿 LEGENDÄR: Finde einen Ort, an dem du noch nie warst – erlebe ihn allein",
    "🌿 LEGENDÄR: Wanderung bei Sonnenaufgang – sofort aufstehen und losgehen",
    "🌿 LEGENDÄR: Schwimme in einem natürlichen Gewässer bei Morgengrauen",
    "🌿 LEGENDÄR: Schlafe eine Nacht draußen – mitten in der Natur",
    "🌿 LEGENDÄR: Verbringe 4 Stunden allein in der Natur – ohne Worte, ohne Netz",
  ],
  sozial: [
    "💙 LEGENDÄR: Sage 5 verschiedenen Menschen heute etwas von Herzen",
    "💙 LEGENDÄR: Tu heute etwas Gutes für einen Fremden – anonym und selbstlos",
    "💙 LEGENDÄR: Widme einen ganzen Tag vollständig deinen liebsten Menschen",
    "💙 LEGENDÄR: Schreibe 3 echte Briefe an Menschen, die dir wichtig sind",
    "💙 LEGENDÄR: Organisiere überraschend einen bedeutsamen Moment für jemanden",
    "💙 LEGENDÄR: Führe heute 5 echte, tiefe Gespräche – kein Smalltalk, nur Herz",
  ],
};

// ===== ENGLISH QUEST DATA =====
const QUESTS_EN = {
  sport: {
    t1: [
      "Do 10 push-ups",
      "Do 15 squats",
      "Do 10 sit-ups",
      "Hold a 20-second plank",
      "Do 15 jumping jacks",
      "Take a brisk 10-minute walk",
      "Do 8 lunges per leg",
      "Stretch for 5 minutes",
      "Jump in place for 1 minute",
      "Do 5 tricep dips on a chair",
      "Do 10 crunches",
      "Walk up and down the stairs – repeat 5×",
      "Hold 3× 10 sec. wall sit",
      "Do 10 arm circles forwards & back",
      "Do 5 slow squats – focus on form",
    ],
    t2: [
      "Do 20 push-ups",
      "Do 30 squats",
      "Do 20 sit-ups",
      "Hold a 40-second plank",
      "Do 20 jumping jacks",
      "Take a brisk 20-minute walk",
      "Do 2× 12 lunges per leg",
      "Jump in place for 3 minutes",
      "Do 15 tricep dips",
      "10 push-ups + 20 squats – 2 sets",
      "Run 1 km without stopping",
      "Do 3× 10 crunches",
      "Hold 3× 20 sec. wall sit",
      "Do 15 burpees",
      "Do 20 leg raises lying down",
      "Jump 50× skipping rope or in place",
    ],
    t3: [
      "Do 30 push-ups",
      "Do 50 squats",
      "Do 30 sit-ups + 20 crunches",
      "Hold a 1-minute plank",
      "Run 2 km without stopping",
      "Do 20 burpees",
      "2 sets: 15 push-ups + 20 squats + 15 sit-ups",
      "Do 3× 15 lunges per leg",
      "Jump in place for 5 minutes",
      "Do 25 tricep dips",
      "3× 15 push-ups with 60 sec. rest",
      "40 jumping jacks + 20 squats",
      "Run for 15 minutes without stopping",
      "3× 20 leg raises + 15 crunches",
      "10 burpees + 20 squats + 10 push-ups",
      "Do 30 sit-ups as fast as you can",
    ],
    t4: [
      "Do 50 push-ups",
      "Do 80 squats",
      "3 sets: 20 push-ups + 25 squats + 20 sit-ups",
      "Hold 2× 1-minute plank",
      "Run 3 km without stopping",
      "Do 30 burpees",
      "3× 20 lunges + 15 push-ups",
      "3 sets: 30 jumping jacks + 15 burpees",
      "Run for 20 minutes without stopping",
      "4× 12 tricep dips + 12 push-ups",
      "50 squats + 30 sit-ups + 20 push-ups in a row",
      "3× 20 crunches + 15 leg raises",
      "Do as many push-ups as possible in 5 min.",
      "Run 2 km + then do 20 push-ups",
      "4 sets: 10 burpees + 15 squats",
      "60 sit-ups + 30 push-ups – no stopping",
    ],
    t5: [
      "Do 80 push-ups – spread out if needed",
      "Do 100 squats",
      "4 sets: 20 push-ups + 30 squats + 20 sit-ups",
      "Run 5 km without stopping",
      "Do 50 burpees",
      "Hold 3× 1-minute plank with 30 sec. rest",
      "4 sets of pull-ups to failure",
      "5 sets: 10 burpees + 10 push-ups + 10 sit-ups",
      "Run 25 minutes + 30 push-ups after",
      "100 squats + 50 sit-ups + 25 push-ups",
      "60 lunges + 3× 1-min. plank",
      "4 sets: 15 pull-ups (max) + 20 push-ups",
      "40 burpees as fast as possible",
      "Run 4 km + 10 squats every 500 m",
      "5× 20 tricep dips + 15 push-ups",
      "80 sit-ups + 40 push-ups + 40 squats",
    ],
    t6: [
      "Do 120 push-ups – spread over the day",
      "Do 150 squats",
      "5 sets: 20 push-ups + 30 squats + 20 burpees",
      "Run 7 km without stopping",
      "Do 70 burpees",
      "Hold 5× 1-minute plank",
      "5 sets of pull-ups to failure",
      "150 squats + 80 sit-ups + 50 push-ups",
      "Run 30 minutes + 50 push-ups after",
      "6 sets: 10 burpees + 15 push-ups + 20 squats",
      "80 lunges + 5× 1-min. plank",
      "50 pull-ups – split as needed",
      "5 sets: 20 tricep dips + 20 push-ups + 15 burpees",
      "Run 5 km + 15 burpees every 1 km",
      "200 jumping jacks + 60 push-ups + 60 sit-ups",
      "7 sets: 12 push-ups + 15 squats + 10 sit-ups",
    ],
    t7: [
      "Do 200 push-ups – spread over the day",
      "Do 250 squats – spread over the day",
      "6 sets: 25 push-ups + 35 squats + 25 burpees",
      "Run 10 km without stopping",
      "Do 100 burpees",
      "10 total minutes of plank today – split as needed",
      "7 sets of pull-ups to failure",
      "200 squats + 100 sit-ups + 80 push-ups",
      "Run 40 minutes + 80 push-ups after",
      "8 sets: 12 burpees + 20 push-ups + 25 squats",
      "100 lunges + 8× 1-min. plank",
      "70 pull-ups – split as needed",
      "Every hour do 20 push-ups all day long",
      "Run 7 km + 20 burpees & push-ups every 1 km",
      "300 jumping jacks + 80 push-ups + 80 sit-ups",
      "9 sets: 15 push-ups + 20 squats + 10 burpees",
    ],
    t8: [
      "⚔ FINAL FORM: 300 push-ups spread over the day – e.g. 25 every hour",
      "⚔ FINAL FORM: 500 squats over the day – 40 every hour, no excuses",
      "⚔ FINAL FORM: Run 15 km – pace doesn't matter, but never stop",
      "⚔ FINAL FORM: 150 burpees spread over the day – this is your standard",
      "⚔ FINAL FORM: Every hour 25 push-ups + 25 squats + 10 sit-ups – all day long",
      "⚔ FINAL FORM: 150 pull-ups over the day – set no limits for yourself",
      "⚔ FINAL FORM: 200 burpees + 200 sit-ups spread over the day",
      "⚔ FINAL FORM: Run 10 km + then 50 push-ups + 50 burpees",
      "⚔ FINAL FORM: Gauntlet – 100 push-ups, 200 squats, 100 sit-ups, 50 burpees",
      "⚔ FINAL FORM: 10 sets to failure: push-ups → squats → 1 min. plank",
      "⚔ FINAL FORM: 400 squats + 150 push-ups + 100 sit-ups – no limit, no stopping",
      "⚔ FINAL FORM: Run 12 km + every 2 km do 20 burpees & push-ups",
    ],
  },
  natur: {
    t1: [
      "Get some fresh air for 10 minutes",
      "Open the window and breathe in the outside air 5× deeply",
      "Sit outside for 10 minutes without your phone",
      "Look closely at a plant or flower today",
      "Go outside briefly and listen to the sounds of nature for 3 minutes",
      "Look up at the sky tonight – clouds, moon or stars",
      "Walk barefoot on grass or soil for 10 minutes",
      "Photograph something beautiful from nature that you see today",
      "Breathe fresh air consciously for 5 minutes – eyes closed, just feel",
      "Take a small detour home through greenery",
      "Step outside briefly this morning – before you check your phone",
      "Touch a tree today and feel the bark",
    ],
    t2: [
      "Take a 20-minute walk in nature",
      "Sit outside for 15 minutes without your phone",
      "Watch the sunset today",
      "Pick up 5 pieces of litter outside",
      "Photograph 3 different nature details (leaf, bark, animal...)",
      "Lie in the grass and watch the clouds for 10 minutes",
      "Find an animal in the wild today and observe it",
      "Go out in the rain and stay for 5 minutes",
      "Visit a place in nature that you have long enjoyed",
      "Take a 30-min. walk through a park or forest",
      "Sit by a body of water and relax for 15 minutes",
      "Plant something today – a flower, herb, or cutting",
      "Watch the night sky for 10 minutes",
      "Walk barefoot on natural ground for 20 minutes",
    ],
    t3: [
      "Go on a hike of at least 4 km",
      "Spend 1 hour outside in nature without your phone",
      "Watch a sunrise – get up early!",
      "Collect 15 pieces of litter and dispose of them properly",
      "Find and photograph 5 different animal species",
      "Sit barefoot on the ground for 30 minutes and meditate",
      "Explore a forest or park you haven't been to before",
      "Watch the night sky for 20 minutes – no phone",
      "Take a 6 km hike without music",
      "Spend the evening outside – no screens",
      "Photograph the same scene in the morning, noon and evening",
      "Sit by a body of water and write down what you see & feel",
      "Swim in a natural body of water – no matter how cold",
      "Sleep outside – tent, hammock or balcony",
    ],
    t4: [
      "Go on a hike of at least 10 km",
      "Spend 2 hours completely without your phone in nature",
      "Experience both sunrise AND sunset in nature",
      "Visit a special natural place you have never been to",
      "Collect & identify 10 different plants or trees",
      "Take a 12 km hike without music or podcasts",
      "Spend half a day completely in nature – no signal",
      "Swim in a natural body of water at sunrise",
      "Find 3 different animal species and briefly research them",
      "Sleep one night outdoors in nature",
      "Hike 8 km + photograph something new each kilometer",
      "Spend 3 hours alone in nature – no phone, no podcast",
    ],
    t5: [
      "⚔ FINAL FORM: Spend a whole day in nature – no phone, no distractions",
      "⚔ FINAL FORM: Take an 18 km solo hike – just nature, just you",
      "⚔ FINAL FORM: Experience sunrise outdoors and stay until sunset",
      "⚔ FINAL FORM: Sleep outside in nature – find your own spot",
      "⚔ FINAL FORM: 24 hours without your phone – just nature, silence and you",
      "⚔ FINAL FORM: Hike 15 km + swim in a natural body of water",
      "⚔ FINAL FORM: Build a night camp in nature and sleep there",
    ],
  },
  sozial: {
    t1: [
      "Consciously smile at 3 strangers today",
      "Give someone a sincere compliment",
      "Say thank you to someone today – and really mean it",
      "Hold the door open for someone today",
      "Send someone a short kind message",
      "Ask someone today: 'How are you really doing?'",
      "Listen actively to someone for 5 minutes – no phone",
      "Consciously greet everyone you meet today",
      "Tell a family member that you appreciate them",
      "Thank someone today for something you have long owed them",
      "Let someone go ahead of you in line",
      "Send someone a meme or something to make them laugh",
    ],
    t2: [
      "Write to someone you haven't contacted in a long time",
      "Give someone a deep, genuine compliment – no small talk",
      "Consciously smile at 5 strangers today",
      "Help someone with a concrete task today",
      "Prepare a meal for someone",
      "Thank someone for something you have long ignored",
      "Listen actively to someone for 15 minutes – without talking about yourself",
      "Give someone a small surprise",
      "Learn the name of a neighbor or colleague",
      "Tell someone directly to their face what you appreciate about them",
      "Share something with someone – food, time or a smile",
      "Write someone a handwritten note",
      "Tell your parents / your family that you love them",
    ],
    t3: [
      "Arrange to meet a friend you haven't seen in a long time",
      "Actively help a stranger today – without being asked",
      "Do something good for someone today without mentioning it",
      "Organize a spontaneous evening with friends or family",
      "Donate something – time, money or clothing – for a good cause",
      "Have a real, deep conversation with someone today",
      "Do 3 kind things for 3 different people today",
      "Call someone you haven't spoken to in a long time",
      "Do something today for someone that they have long wished for",
      "Talk today with a person who looks lonely",
      "Write a long letter to someone who means a lot to you",
      "Volunteer for one hour today",
    ],
    t4: [
      "Talk to at least 3 strangers today – real conversations",
      "Organize a meeting for 5+ people – plan it fully",
      "Do something good for 3 different people today – anonymously",
      "Spend 2 hours without your phone with just one important person",
      "Say something honest from the heart to 3 different people today",
      "Get actively involved in your community today",
      "Call 3 people you haven't heard from in a long time",
      "Organize something special for someone as a surprise",
      "Have 3 real, sincere conversations today – no small talk",
      "Do something truly meaningful for someone today",
      "Write 3 real letters to people who are important to you",
      "Surprise someone with a whole day of your time",
    ],
    t5: [
      "⚔ FINAL FORM: Be there for everyone today – actively help 5 different people",
      "⚔ FINAL FORM: Spend an entire day only with loved ones – no phone",
      "⚔ FINAL FORM: Do something today that truly changes another person's life",
      "⚔ FINAL FORM: Organize an event for your community – real and unforgettable",
      "⚔ FINAL FORM: Write 5 heartfelt letters – why these people matter in your life",
      "⚔ FINAL FORM: Dedicate today entirely to giving – for strangers, friends, family",
    ],
  },
};

const RARE_QUESTS_EN = {
  sport: {
    early: [
      "CHALLENGE: 50 push-ups + 50 squats + 50 sit-ups – spread out if needed",
      "CHALLENGE: Run 4 km today – no matter how slow",
      "CHALLENGE: Do 10 squats every hour all day long",
      "CHALLENGE: 5 rounds – 8 burpees + 10 push-ups + 12 squats",
      "CHALLENGE: 100 sit-ups spread over the day",
      "CHALLENGE: Walk or jog lightly for 45 minutes without stopping",
    ],
    late: [
      "CHALLENGE: 100 push-ups + 100 squats + 100 sit-ups – over the day",
      "CHALLENGE: Run 8 km today – no stopping allowed",
      "CHALLENGE: Every hour 20 squats + 10 push-ups – all day long",
      "CHALLENGE: 10 rounds – 10 burpees + 15 push-ups + 20 squats",
      "CHALLENGE: 200 sit-ups + 60 push-ups over the day",
      "CHALLENGE: 60 minutes of sport in a row – whatever you want",
    ],
  },
  natur: {
    early: [
      "CHALLENGE: 1 hour without your phone in nature",
      "CHALLENGE: Experience both sunrise AND sunset today",
      "CHALLENGE: Visit a natural place you have never been to",
      "CHALLENGE: Collect 20 pieces of litter and dispose of them",
      "CHALLENGE: Hike 5 km – without music",
    ],
    late: [
      "CHALLENGE: 3 hours without any technology in nature",
      "CHALLENGE: 12 km hike – alone, no phone",
      "CHALLENGE: Sleep one night outside in nature",
      "CHALLENGE: Entire day outdoors – from waking up to falling asleep",
      "CHALLENGE: Swim in a natural lake or river",
    ],
  },
  sozial: {
    early: [
      "CHALLENGE: Talk to 3 strangers genuinely today",
      "CHALLENGE: Do something good for 3 different people today",
      "CHALLENGE: Call 3 people you haven't heard from in a long time",
      "CHALLENGE: Bring genuine joy to 5 different people today",
      "CHALLENGE: Organize a spontaneous meetup with friends",
    ],
    late: [
      "CHALLENGE: Be actively there for 5+ people today",
      "CHALLENGE: Organize an event for 10+ people",
      "CHALLENGE: Write 3 real letters to important people",
      "CHALLENGE: Spend 4 hours exclusively with a loved one – no phone",
      "CHALLENGE: Do something truly meaningful for someone today – anonymously",
    ],
  },
};

const LEGENDARY_QUESTS_EN = {
  sport: [
    "⚡ LEGENDARY: Do 200 push-ups today – no matter how you split them",
    "⚡ LEGENDARY: Run 10 km without interruption today",
    "⚡ LEGENDARY: 50 burpees + 50 push-ups + 100 squats – one single workout",
    "⚡ LEGENDARY: Every hour 20 squats & 10 push-ups from 8 am to 10 pm",
    "⚡ LEGENDARY: Run 5 km + 100 push-ups + 100 sit-ups – all today",
    "⚡ LEGENDARY: 8 sets to failure – push-ups, squats, sit-ups, plank",
  ],
  natur: [
    "🌿 LEGENDARY: Spend half a day completely without your phone in nature",
    "🌿 LEGENDARY: Find a place you have never been to – experience it alone",
    "🌿 LEGENDARY: Hike at sunrise – get up immediately and go",
    "🌿 LEGENDARY: Swim in a natural body of water at dawn",
    "🌿 LEGENDARY: Sleep one night outdoors – in the middle of nature",
    "🌿 LEGENDARY: Spend 4 hours alone in nature – no words, no signal",
  ],
  sozial: [
    "💙 LEGENDARY: Say something from the heart to 5 different people today",
    "💙 LEGENDARY: Do something good for a stranger today – anonymously and selflessly",
    "💙 LEGENDARY: Dedicate an entire day completely to your dearest people",
    "💙 LEGENDARY: Write 3 real letters to people who are important to you",
    "💙 LEGENDARY: Surprise someone with a truly meaningful moment",
    "💙 LEGENDARY: Have 5 real, deep conversations today – no small talk, just heart",
  ],
};

// ===== LEVEL NAMES =====
const LEVEL_NAMES = {
  de: ["Niemand","Schatten","Flüsterer","Jäger","Krieger","Berserker","Schattenfürst","Seelenbrecher","Kriegsherr","Unsterblicher","Dämonenkönig","Göttermörder","Übermensch","Legende","✦ Finale Form ✦"],
  en: ["Nobody","Shadow","Whisperer","Hunter","Warrior","Berserker","Shadow Lord","Soul Breaker","Warlord","Immortal","Demon King","Godslayer","Overman","Legend","✦ Final Form ✦"],
};

// ===== TRANSLATIONS =====
const TRANSLATIONS = {
  de: {
    chooseYourPath:    'Wähle deinen Pfad',
    chooseCatsHint:    'Wähle 1–3 Kategorien — die 3 Tages-Quests verteilen sich darauf',
    nameLabel:         'Wie lautet dein Name, Krieger?',
    namePlaceholder:   'Dein Name...',
    sportName:         'Sport',
    naturName:         'Natur',
    sozialName:        'Sozial',
    sportDesc:         'Kraft, Ausdauer & körperliche Herausforderungen',
    naturDesc:         'Entdecke die Welt und verbinde dich mit der Natur',
    sozialDesc:        'Stärke deine Verbindungen zu anderen Menschen',
    confirmSelection:  'Auswahl bestätigen',
    pathNote:          'Pfad kann jederzeit gewechselt werden',
    settings:          'Einstellungen',
    yourName:          'Dein Name',
    save:              'Speichern',
    questPath:         'Quest-Pfad wechseln',
    questPathWarning:  'Wähle 1–3 Kategorien · Achtung: Tages-Quests werden zurückgesetzt',
    language:          'Sprache',
    dangerZone:        'Gefahrenzone',
    dangerZoneSub:     'Setzt XP, Level und Quests des aktiven Pfads zurück',
    resetProgress:     '↺ Fortschritt zurücksetzen',
    dailyQuests:       'Tägliche Quests',
    questsLbl:         'Quests',
    dayStreak:         'Tage Serie',
    totalXP:           'Gesamt XP',
    back:              '← Zurück',
    levelUp:           'LEVEL UP!',
    continueBtn:       'Weiter ✦',
    complete:          'Abschließen',
    completed:         '✓ Erledigt',
    rareBadge:         '⭐ SELTEN',
    legendaryBadge:    '🌟 LEGENDÄR',
    newQuestsIn:       'Neue Quests in',
    maxLevel:          'MAX LEVEL ✦',
    xpReached:         'XP erreicht',
    fromXP:            'ab',
    mastered:          '✓ Gemeistert',
    youAreHere:        '◉ Du bist hier',
    levelUpSub:        'Du hast dich weiterentwickelt. Dein Charakter spiegelt nun dein wahres Ich wieder.',
    finalFormSub:      'Du hast die ultimative Form erreicht. Kein Weg führt noch höher.',
    resetConfirm:      'Wirklich zurücksetzen? XP, Level und Quests des aktiven Pfads werden gelöscht.',
    yourAscent:        'Dein Aufstieg',
    achievements:      '🏆 Trophäen',
    achievementUnlocked: 'Achievement freigeschaltet!',
    achievementsOf:    'von',
    achievementsUnlocked: 'freigeschaltet',
  },
  en: {
    chooseYourPath:    'Choose Your Path',
    chooseCatsHint:    'Choose 1–3 categories — the 3 daily quests will be distributed among them',
    nameLabel:         'What is your name, Warrior?',
    namePlaceholder:   'Your name...',
    sportName:         'Sport',
    naturName:         'Nature',
    sozialName:        'Social',
    sportDesc:         'Strength, endurance & physical challenges',
    naturDesc:         'Explore the world and connect with nature',
    sozialDesc:        'Strengthen your connections with other people',
    confirmSelection:  'Confirm Selection',
    pathNote:          'Path can be changed at any time',
    settings:          'Settings',
    yourName:          'Your Name',
    save:              'Save',
    questPath:         'Change Quest Path',
    questPathWarning:  'Choose 1–3 categories · Warning: Daily quests will be reset',
    language:          'Language',
    dangerZone:        'Danger Zone',
    dangerZoneSub:     'Resets XP, level and quests of the active path',
    resetProgress:     '↺ Reset Progress',
    dailyQuests:       'Daily Quests',
    questsLbl:         'Quests',
    dayStreak:         'Day Streak',
    totalXP:           'Total XP',
    back:              '← Back',
    levelUp:           'LEVEL UP!',
    continueBtn:       'Continue ✦',
    complete:          'Complete',
    completed:         '✓ Done',
    rareBadge:         '⭐ RARE',
    legendaryBadge:    '🌟 LEGENDARY',
    newQuestsIn:       'New quests in',
    maxLevel:          'MAX LEVEL ✦',
    xpReached:         'XP reached',
    fromXP:            'from',
    mastered:          '✓ Mastered',
    youAreHere:        '◉ You are here',
    levelUpSub:        'You have evolved. Your character now reflects your true self.',
    finalFormSub:      'You have reached the ultimate form. No path leads higher.',
    resetConfirm:      'Really reset? XP, level and quests of the active path will be deleted.',
    yourAscent:        'Your Ascent',
    achievements:      '🏆 Trophies',
    achievementUnlocked: 'Achievement Unlocked!',
    achievementsOf:    'of',
    achievementsUnlocked: 'unlocked',
  },
};

// ===== ACHIEVEMENTS =====
const ACHIEVEMENTS = [
  { id:'first_quest',     icon:'⚔️',  name:{de:'Erster Schritt',   en:'First Step'},      desc:{de:'Schließe deine erste Quest ab',              en:'Complete your first quest'},            check: s => s.totalQuests >= 1 },
  { id:'quests_10',       icon:'🔥',  name:{de:'Auf Kurs',         en:'On Track'},        desc:{de:'10 Quests abgeschlossen',                    en:'10 quests completed'},                  check: s => s.totalQuests >= 10 },
  { id:'quests_50',       icon:'💪',  name:{de:'Veteran',          en:'Veteran'},         desc:{de:'50 Quests abgeschlossen',                    en:'50 quests completed'},                  check: s => s.totalQuests >= 50 },
  { id:'quests_100',      icon:'🏆',  name:{de:'Hundertfacher',    en:'Centurion'},       desc:{de:'100 Quests abgeschlossen',                   en:'100 quests completed'},                 check: s => s.totalQuests >= 100 },
  { id:'quests_500',      icon:'🌌',  name:{de:'Unaufhaltsam',     en:'Unstoppable'},     desc:{de:'500 Quests abgeschlossen',                   en:'500 quests completed'},                 check: s => s.totalQuests >= 500 },
  { id:'streak_3',        icon:'📅',  name:{de:'3er Serie',        en:'3-Day Streak'},    desc:{de:'3 Tage in Folge aktiv',                      en:'Active 3 days in a row'},               check: s => s.streak >= 3 },
  { id:'streak_7',        icon:'🗓️',  name:{de:'Eine Woche',       en:'One Week'},        desc:{de:'7 Tage Serie',                               en:'7-day streak'},                         check: s => s.streak >= 7 },
  { id:'streak_14',       icon:'⚡',  name:{de:'Zwei Wochen',      en:'Two Weeks'},       desc:{de:'14 Tage Serie',                              en:'14-day streak'},                        check: s => s.streak >= 14 },
  { id:'streak_30',       icon:'🌙',  name:{de:'Monatskrieger',    en:'Month Warrior'},   desc:{de:'30 Tage Serie',                              en:'30-day streak'},                        check: s => s.streak >= 30 },
  { id:'level_5',         icon:'🌀',  name:{de:'Krieger',          en:'Warrior'},         desc:{de:'Level 5 erreicht',                           en:'Reached level 5'},                      check: _s => getComboProgress().level >= 5 },
  { id:'level_10',        icon:'👑',  name:{de:'Meister',          en:'Master'},          desc:{de:'Level 10 erreicht',                          en:'Reached level 10'},                     check: _s => getComboProgress().level >= 10 },
  { id:'level_15',        icon:'✦',   name:{de:'Finale Form',      en:'Final Form'},      desc:{de:'Level 15 – du hast alles erreicht',          en:'Level 15 – you achieved everything'},   check: _s => getComboProgress().level >= 15 },
  { id:'rare_first',      icon:'⭐',  name:{de:'Seltenheit',       en:'Rare Find'},       desc:{de:'Erste seltene Quest abgeschlossen',          en:'Completed your first rare quest'},      check: s => (s.achievementStats?.rareCompleted||0) >= 1 },
  { id:'legendary_first', icon:'🌟',  name:{de:'Legendenstatus',   en:'Legendary'},       desc:{de:'Erste legendäre Quest abgeschlossen',        en:'Completed your first legendary quest'}, check: s => (s.achievementStats?.legendaryCompleted||0) >= 1 },
  { id:'perfect_day',     icon:'✅',  name:{de:'Perfekter Tag',    en:'Perfect Day'},     desc:{de:'Alle 3 Tages-Quests abgeschlossen',          en:'All 3 daily quests completed'},         check: s => (s.achievementStats?.perfectDays||0) >= 1 },
  { id:'perfect_days_7',  icon:'🏅',  name:{de:'Perfekte Woche',   en:'Perfect Week'},    desc:{de:'7× alle Tages-Quests abgeschlossen',         en:'All daily quests completed 7 times'},   check: s => (s.achievementStats?.perfectDays||0) >= 7 },
  { id:'allrounder',      icon:'🎯',  name:{de:'Allrounder',       en:'All-Rounder'},     desc:{de:'Quest in jeder Kategorie abgeschlossen',     en:'Quest completed in every category'},    check: s => ['sport','natur','sozial'].every(c => s.achievementStats?.catsUsed?.[c]) },
  { id:'xp_1000',         icon:'💎',  name:{de:'XP-Sammler',       en:'XP Collector'},    desc:{de:'1.000 Gesamt-XP gesammelt',                  en:'1,000 total XP collected'},             check: s => Object.values(s.progress).reduce((a,p)=>a+(p.xp||0),0) >= 1000 },
  { id:'xp_5000',         icon:'💠',  name:{de:'XP-Meister',       en:'XP Master'},       desc:{de:'5.000 Gesamt-XP gesammelt',                  en:'5,000 total XP collected'},             check: s => Object.values(s.progress).reduce((a,p)=>a+(p.xp||0),0) >= 5000 },
];

const CAT_ICONS = { sport: '💪', natur: '🌿', sozial: '🤝' };
const CAT_NAMES = { sport: 'Sport', natur: 'Natur', sozial: 'Sozial' };

// ===== STATE =====
const DEFAULT_PROGRESS = () => ({ xp: 0, level: 1 });

let state = {
  playerName: null,
  selectedCategories: null,
  language: 'de',
  progress: {
    sport:  DEFAULT_PROGRESS(),
    natur:  DEFAULT_PROGRESS(),
    sozial: DEFAULT_PROGRESS(),
  },
  dailyQuests: null,
  questsGeneratedAt: null,    // ms timestamp
  questsForCategories: null,  // which cats quests were built for
  totalQuests: 0,
  streak: 0,
  lastCompleteDate: null,
  unlockedAchievements: [],
  achievementStats: {
    rareCompleted: 0,
    legendaryCompleted: 0,
    perfectDays: 0,
    catsUsed: { sport: false, natur: false, sozial: false },
  },
};

function loadState() {
  const s = localStorage.getItem('dq_state');
  if (!s) return;
  const p = JSON.parse(s);

  // Migrate: single selectedCategory → array
  if (p.selectedCategory && !p.selectedCategories) {
    p.selectedCategories = [p.selectedCategory];
    delete p.selectedCategory;
  }
  // Migrate: global xp/level → per-category progress
  if (p.xp !== undefined && !p.progress) {
    const cat = (p.selectedCategories || ['sport'])[0];
    p.progress = {
      sport:  DEFAULT_PROGRESS(),
      natur:  DEFAULT_PROGRESS(),
      sozial: DEFAULT_PROGRESS(),
    };
    p.progress[cat] = { xp: p.xp || 0, level: p.level || 1 };
    delete p.xp; delete p.level;
  }
  // Migrate: date-string quest date → timestamp
  if (p.dailyQuestDate && !p.questsGeneratedAt) {
    p.questsGeneratedAt = Date.now(); // treat as just generated so no immediate reset
    p.questsForCategories = p.selectedCategories || null;
    delete p.dailyQuestDate;
  }

  state = { ...state, ...p };

  // Ensure all categories exist in progress
  ['sport','natur','sozial'].forEach(c => {
    if (!state.progress[c]) state.progress[c] = DEFAULT_PROGRESS();
  });

  // Migrate: ensure language is set
  if (!state.language) state.language = 'de';

  // Migrate: ensure achievement fields exist
  if (!state.unlockedAchievements) state.unlockedAchievements = [];
  if (!state.achievementStats) state.achievementStats = { rareCompleted:0, legendaryCompleted:0, perfectDays:0, catsUsed:{sport:false,natur:false,sozial:false} };
  if (!state.achievementStats.catsUsed) state.achievementStats.catsUsed = { sport:false, natur:false, sozial:false };

  // Migrate: move old dailyQuests into questsByCombo structure
  if (state.dailyQuests && !state.questsByCombo) {
    const key = state.questsForCategories
      ? getComboKey(state.questsForCategories)
      : getComboKey(state.selectedCategories || ['sport']);
    state.questsByCombo = {};
    state.questsByCombo[key] = {
      quests: state.dailyQuests,
      generatedAt: state.questsGeneratedAt || Date.now(),
    };
  }
  if (!state.questsByCombo) state.questsByCombo = {};
}

function saveState() {
  localStorage.setItem('dq_state', JSON.stringify(state));
}

// ===== LANGUAGE / TRANSLATION HELPERS =====
function t(key) {
  const lang = state.language || 'de';
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS['de'][key] || key;
}

function getLevelName(lvl) {
  const lang = state.language || 'de';
  const names = LEVEL_NAMES[lang] || LEVEL_NAMES['de'];
  return names[Math.min(lvl - 1, names.length - 1)];
}

function getCatName(cat) {
  return t(cat + 'Name') || CAT_NAMES[cat];
}

function questsData()    { return state.language === 'en' ? QUESTS_EN    : QUESTS; }
function rareData()      { return state.language === 'en' ? RARE_QUESTS_EN  : RARE_QUESTS; }
function legendaryData() { return state.language === 'en' ? LEGENDARY_QUESTS_EN : LEGENDARY_QUESTS; }

function applyTranslations() {
  const lang = state.language || 'de';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = TRANSLATIONS[lang][key];
    if (val === undefined) return;
    if (el.tagName === 'INPUT') {
      el.placeholder = val;
    } else {
      el.textContent = val;
    }
  });
  // Sync lang button active states in all switchers
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  // Update html lang attribute
  document.documentElement.lang = lang;
}

function changeLanguage(lang) {
  if (lang !== 'de' && lang !== 'en') return;
  state.language = lang;
  // Re-translate quests for current combo, keep done states
  if (state.questsByCombo) {
    const curKey = getComboKey();
    const stored = state.questsByCombo[curKey];
    if (stored && stored.quests) {
      const doneBefore = stored.quests.map(q => q.done);
      const newQuests  = generateDailyQuests(stored.generatedAt);
      doneBefore.forEach((done, i) => { if (newQuests[i]) newQuests[i].done = done; });
      state.questsByCombo[curKey] = { ...stored, quests: newQuests };
      state.dailyQuests = newQuests;
    }
    // Clear other combos so they get fresh language on next visit
    Object.keys(state.questsByCombo).forEach(k => {
      if (k !== curKey) delete state.questsByCombo[k];
    });
  }
  saveState();
  applyTranslations();
  renderAll();
}

// ===== ACHIEVEMENT FUNCTIONS =====
function checkAchievements() {
  const newlyUnlocked = [];
  ACHIEVEMENTS.forEach(ach => {
    if (!state.unlockedAchievements.includes(ach.id) && ach.check(state)) {
      state.unlockedAchievements.push(ach.id);
      newlyUnlocked.push(ach);
    }
  });
  return newlyUnlocked;
}

let _achQueue = [];
let _achShowing = false;

function queueAchievementToasts(list) {
  _achQueue.push(...list);
  if (!_achShowing) _showNextAchievement();
}

function _showNextAchievement() {
  if (_achQueue.length === 0) { _achShowing = false; return; }
  _achShowing = true;
  const ach  = _achQueue.shift();
  const lang = state.language || 'de';
  document.getElementById('achievementToastIcon').textContent  = ach.icon;
  document.getElementById('achievementToastLabel').textContent = t('achievementUnlocked');
  document.getElementById('achievementToastName').textContent  = ach.name[lang];
  const toast = document.getElementById('achievementToast');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(_showNextAchievement, 450);
  }, 3200);
}

function renderAchievements() {
  const lang      = state.language || 'de';
  const unlocked  = state.unlockedAchievements;
  const count     = unlocked.length;
  const total     = ACHIEVEMENTS.length;

  // Panel title
  document.getElementById('achievementsPanelTitle').textContent = t('achievements');

  // Progress bar area
  const pb = document.getElementById('achievementsProgressBar');
  pb.innerHTML = `
    <div class="ach-progress-wrap">
      <span class="ach-progress-text">${count} ${t('achievementsOf')} ${total} ${t('achievementsUnlocked')}</span>
      <div class="ach-progress-track"><div class="ach-progress-fill" style="width:${Math.round(count/total*100)}%"></div></div>
    </div>`;

  // Grid
  const grid = document.getElementById('achievementsGrid');
  grid.innerHTML = '';
  ACHIEVEMENTS.forEach(ach => {
    const isUnlocked = unlocked.includes(ach.id);
    const card = document.createElement('div');
    card.className = `ach-card ${isUnlocked ? 'unlocked' : 'locked'}`;
    card.innerHTML = `
      <div class="ach-icon">${isUnlocked ? ach.icon : '🔒'}</div>
      <div class="ach-info">
        <p class="ach-name">${ach.name[lang]}</p>
        <p class="ach-desc">${isUnlocked ? ach.desc[lang] : '???'}</p>
      </div>
      ${isUnlocked ? '<span class="ach-check">✦</span>' : ''}
    `;
    grid.appendChild(card);
  });
}

function openAchievements() {
  renderAchievements();
  document.getElementById('achievementsPanel').classList.add('open');
}
function closeAchievements() {
  document.getElementById('achievementsPanel').classList.remove('open');
}

// ===== SEEDED RNG =====
function seededRNG(seed) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// ===== DAILY QUEST GENERATION =====
function pickFromPool(pool, rng, usedIndices) {
  let idx, tries = 0;
  do { idx = Math.floor(rng() * pool.length); tries++; }
  while (usedIndices.has(idx) && tries < 20);
  usedIndices.add(idx);
  return pool[idx];
}

function getCommonPool(cat, level) {
  const q = questsData()[cat];
  if (cat === 'sport') {
    if (level <= 2)  return q.t1;
    if (level <= 4)  return q.t2;
    if (level <= 6)  return q.t3;
    if (level <= 8)  return q.t4;
    if (level <= 10) return q.t5;
    if (level <= 12) return q.t6;
    if (level <= 14) return q.t7;
    return q.t8;
  } else {
    if (level <= 3)  return q.t1;
    if (level <= 6)  return q.t2;
    if (level <= 9)  return q.t3;
    if (level <= 12) return q.t4;
    return q.t5;
  }
}

function getRarePool(cat, level) {
  const rd = rareData();
  return level <= 7 ? rd[cat].early : rd[cat].late;
}

function generateDailyQuests(timestampMs) {
  const seed = Math.floor(timestampMs / (24 * 3600 * 1000));
  const cats = (state.selectedCategories && state.selectedCategories.length)
    ? state.selectedCategories : ['sport'];
  const catSlots   = [cats[0], cats[1 % cats.length], cats[2 % cats.length]];
  const comboLevel = getComboProgress().level;
  const usedCommon = { sport: new Set(), natur: new Set(), sozial: new Set() };

  return catSlots.map((cat, i) => {
    const rng = seededRNG(seed * 31 + i * 7919 + comboLevel * 113);
    const rarityRoll = rng();
    let rarity, questText, xp;

    if (rarityRoll < 0.05) {
      rarity = 'legendary'; xp = 200;
      questText = pickFromPool(legendaryData()[cat], rng, new Set());
    } else if (rarityRoll < 0.23) {
      rarity = 'rare'; xp = 80;
      questText = pickFromPool(getRarePool(cat, comboLevel), rng, new Set());
    } else {
      rarity = 'common'; xp = 30;
      questText = pickFromPool(getCommonPool(cat, comboLevel), rng, usedCommon[cat]);
    }
    return { id: `${cat}-${seed}-${i}`, cat, text: questText, rarity, xp, done: false };
  });
}

const TWENTY_FOUR_H = 24 * 60 * 60 * 1000;

// ===== COMBO KEY — sorted category string used as progress key =====
function getComboKey(cats) {
  const c = cats || state.selectedCategories || ['sport'];
  return [...c].sort().join('+');
}

function getComboProgress(cats) {
  const key = getComboKey(cats);
  if (!state.progress[key]) state.progress[key] = DEFAULT_PROGRESS();
  return state.progress[key];
}

function ensureDailyQuests() {
  const cats = state.selectedCategories || ['sport'];
  const now  = Date.now();
  const key  = getComboKey(cats);

  if (!state.questsByCombo) state.questsByCombo = {};

  const stored  = state.questsByCombo[key];
  const expired = !stored || !stored.generatedAt || (now - stored.generatedAt) >= TWENTY_FOUR_H;

  if (expired) {
    state.questsByCombo[key] = {
      quests: generateDailyQuests(now),
      generatedAt: now,
    };
  }

  // Expose active quests via legacy state fields (used by renderAll etc.)
  state.dailyQuests         = state.questsByCombo[key].quests;
  state.questsGeneratedAt   = state.questsByCombo[key].generatedAt;
  state.questsForCategories = [...cats];
  saveState();
}

function getTodayDateStr() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function hasCategories() {
  return state.selectedCategories && state.selectedCategories.length > 0;
}

// ===== LEVEL HELPERS =====
function getLevelInfo(lvl) {
  return LEVELS[Math.min(lvl - 1, LEVELS.length - 1)];
}

function getLevelFromXP(xp) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xp) return LEVELS[i].level;
  }
  return 1;
}

function getXPProgress(xp, lvl) {
  const cur = getLevelInfo(lvl);
  const next = LEVELS[lvl] || null;
  if (!next) return { cur: xp - cur.xp, needed: 1, pct: 100 };
  const cur_xp = xp - cur.xp;
  const needed = next.xp - cur.xp;
  return { cur: cur_xp, needed, pct: Math.min(100, (cur_xp / needed) * 100) };
}

// ===== CHARACTER RENDERING =====
function applyCharacterStage(lvl) {
  const info = getLevelInfo(lvl);
  const st = CHAR_STAGES[info.stage];

  document.documentElement.style.setProperty('--body-color', st.bodyColor.startsWith('url') ? '#ffd54f' : st.bodyColor);
  document.documentElement.style.setProperty('--aura-color', st.auraColor);

  // SVG element colors
  const colorEls = ['head', 'earL', 'earR', 'neck', 'body', 'legL', 'legR', 'footL', 'footR', 'armL', 'armR'];
  colorEls.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.setAttribute('fill', st.bodyColor);
  });

  // Aura circle opacity + glow
  const auraEl = document.getElementById('svgAura');
  if (auraEl) auraEl.setAttribute('opacity', st.aura ? '0.6' : '0');

  // Toggle SVG features
  const toggle = (id, show) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute('display', show ? 'block' : 'none');
  };

  toggle('eyeLGlow',    st.eyes);
  toggle('eyeRGlow',    st.eyes);
  toggle('energyLines', st.energy);
  toggle('armor',       st.armor);
  toggle('wings',       st.wings);
  toggle('crown',       st.crown);
  toggle('divineRays',  st.rays);

  if (st.eyes) {
    ['eyeLGlow','eyeRGlow'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.setAttribute('fill', st.bodyColor.startsWith('url') ? '#ffd54f' : st.bodyColor);
    });
  }

  // Aura div around SVG
  const auraDivArr = document.querySelectorAll('.char-aura');
  auraDivArr.forEach(a => {
    a.className = 'char-aura ' + st.auraClass;
  });

  document.body.style.background = st.bg;

  // Rainbow body for level 15
  if (info.stage === 14) {
    colorEls.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.setAttribute('fill', 'url(#rainbowGrad)');
    });
  }
}

// ===== UI RENDERING =====
function renderAll() {
  const combo   = getComboProgress();
  const lvl     = combo.level;
  const lvlInfo = getLevelInfo(lvl);
  const prog    = getXPProgress(combo.xp, lvl);

  document.getElementById('levelName').textContent = getLevelName(lvl);
  document.getElementById('levelNum').textContent  = lvl;
  document.getElementById('xpBarFill').style.width = prog.pct + '%';
  document.getElementById('xpText').textContent    =
    lvl < 15 ? `${prog.cur} / ${prog.needed} XP` : t('maxLevel');

  // Stats — total XP is sum of all stored combo progresses
  const totalXP = Object.values(state.progress).reduce((s, p) => s + (p.xp || 0), 0);
  document.getElementById('totalQuestsVal').textContent = state.totalQuests;
  document.getElementById('streakVal').textContent      = state.streak;
  document.getElementById('totalXpVal').textContent     = totalXP;

  // Date
  const d = new Date();
  const dateLang = state.language === 'en' ? 'en-US' : 'de-DE';
  document.getElementById('dateDisplay').textContent =
    d.toLocaleDateString(dateLang, { weekday:'long', day:'numeric', month:'long' });

  // 24h countdown
  if (state.questsGeneratedAt) {
    const remaining = Math.max(0, TWENTY_FOUR_H - (Date.now() - state.questsGeneratedAt));
    const rh = Math.floor(remaining / 3600000);
    const rm = Math.floor((remaining % 3600000) / 60000);
    document.getElementById('resetHint').textContent = `${t('newQuestsIn')} ${rh}h ${rm}m`;
  }

  applyTranslations();

  applyCharacterStage(lvl);
  updatePlayerName();
  renderQuests();
}

function renderQuests() {
  const list = document.getElementById('questsList');
  list.innerHTML = '';

  (state.dailyQuests || []).forEach((q, i) => {
    const card = document.createElement('div');
    card.className = `quest-card cat-${q.cat} rarity-${q.rarity}${q.done ? ' quest-done' : ''}`;

    const rarityLabel = q.rarity === 'rare' ? t('rareBadge') : q.rarity === 'legendary' ? t('legendaryBadge') : '';
    const rarityBadge = rarityLabel ? `<span class="quest-rarity-badge">${rarityLabel}</span>` : '';

    card.innerHTML = `
      <div class="quest-card-top">
        <span class="quest-cat-label">${CAT_ICONS[q.cat]} ${getCatName(q.cat)}</span>
        ${rarityBadge}
      </div>
      <p class="quest-text">${q.text}</p>
      <div class="quest-card-bot">
        <span class="quest-xp">+${q.xp} XP</span>
        <button class="quest-btn ${q.done ? 'done-btn' : ''}" ${q.done ? 'disabled' : ''} data-idx="${i}">
          ${q.done ? t('completed') : t('complete')}
        </button>
      </div>
    `;

    if (!q.done) {
      card.querySelector('.quest-btn').addEventListener('click', () => completeQuest(i));
    }

    list.appendChild(card);
  });
}

// ===== QUEST COMPLETION =====
function completeQuest(idx) {
  const q = state.dailyQuests[idx];
  if (!q || q.done) return;

  q.done = true;
  const combo = getComboProgress(); // XP geht auf den aktiven Pfad (Combo)
  combo.xp += q.xp;
  state.totalQuests += 1;

  // Streak
  const today = getTodayDateStr();
  const yesterday = (() => {
    const d = new Date(); d.setDate(d.getDate() - 1);
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  })();
  if (state.lastCompleteDate === yesterday) state.streak += 1;
  else if (state.lastCompleteDate !== today) state.streak = 1;
  state.lastCompleteDate = today;

  // Level up für diesen Pfad
  const newLevel   = getLevelFromXP(combo.xp);
  const didLevelUp = newLevel > combo.level;
  if (didLevelUp) combo.level = newLevel;

  // Achievement stats tracking
  if (!state.achievementStats) state.achievementStats = { rareCompleted:0, legendaryCompleted:0, perfectDays:0, catsUsed:{sport:false,natur:false,sozial:false} };
  if (!state.achievementStats.catsUsed) state.achievementStats.catsUsed = { sport:false, natur:false, sozial:false };
  if (q.rarity === 'rare')      state.achievementStats.rareCompleted      = (state.achievementStats.rareCompleted      || 0) + 1;
  if (q.rarity === 'legendary') state.achievementStats.legendaryCompleted = (state.achievementStats.legendaryCompleted || 0) + 1;
  state.achievementStats.catsUsed[q.cat] = true;

  // Check if all 3 quests are now done → perfect day
  const allDone = state.dailyQuests.every(qu => qu.done);
  if (allDone) state.achievementStats.perfectDays = (state.achievementStats.perfectDays || 0) + 1;

  // Check and queue achievement toasts
  const newAch = checkAchievements();
  saveState();
  showXPPopup(q.xp, q.rarity);

  setTimeout(() => {
    renderAll();
    if (allDone) setTimeout(() => showConfetti(), 300);
    if (newAch.length > 0) setTimeout(() => queueAchievementToasts(newAch), allDone ? 3200 : 800);
    if (didLevelUp) setTimeout(() => showLevelUpModal(newLevel, q.cat), allDone ? 2500 : 400);
  }, 200);
}

function showConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';

  const colors = ['#ffd54f','#ff6b6b','#69f0ae','#64b5f6','#ce93d8','#ffffff','#ffa726','#f06292'];
  const particles = Array.from({ length: 140 }, () => ({
    x:        Math.random() * canvas.width,
    y:        -10 - Math.random() * 150,
    r:        4 + Math.random() * 7,
    color:    colors[Math.floor(Math.random() * colors.length)],
    vx:       (Math.random() - 0.5) * 7,
    vy:       1.5 + Math.random() * 4,
    gravity:  0.08 + Math.random() * 0.1,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.25,
    rect:     Math.random() < 0.6,
  }));

  let frame = 0;
  const FADE_START = 130, TOTAL = 200;

  (function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const alpha = frame < FADE_START ? 1 : 1 - (frame - FADE_START) / (TOTAL - FADE_START);

    particles.forEach(p => {
      p.x  += p.vx;
      p.y  += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.992;
      p.rotation += p.rotSpeed;

      ctx.save();
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      if (p.rect) {
        ctx.fillRect(-p.r, -p.r * 0.45, p.r * 2, p.r * 0.9);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.r * 0.55, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    frame++;
    if (frame < TOTAL) {
      requestAnimationFrame(animate);
    } else {
      canvas.style.display = 'none';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  })();
}

function showXPPopup(xp, rarity) {
  const popup = document.getElementById('xpPopup');
  popup.textContent = rarity === 'legendary' ? `🌟 +${xp} XP` : rarity === 'rare' ? `⭐ +${xp} XP` : `+${xp} XP`;
  popup.className = 'xp-popup';
  void popup.offsetWidth;
  popup.classList.add('show');
  setTimeout(() => popup.className = 'xp-popup', 1500);
}

function showLevelUpModal(newLevel, cat) {
  const catName = getCatName(cat);
  const catIcon = CAT_ICONS[cat] || '';

  document.getElementById('modalLvl').textContent  = `${catIcon} ${catName} · Level ${newLevel}`;
  document.getElementById('modalName').textContent = getLevelName(newLevel);
  document.getElementById('modalSub').textContent  = newLevel === 15
    ? t('finalFormSub')
    : t('levelUpSub');

  document.getElementById('levelUpModal').classList.add('active');
}

document.getElementById('modalBtn').addEventListener('click', () => {
  document.getElementById('levelUpModal').classList.remove('active');
});

// ===== CATEGORY SELECTION =====
const CAT_ICONS_LIST = { sport: '💪', natur: '🌿', sozial: '🤝' };

function showCatScreen() {
  document.getElementById('catScreen').classList.remove('hidden');
}
function hideCatScreen() {
  document.getElementById('catScreen').classList.add('hidden');
}

// Toggle a card's selected state in a given container; return new selection array
function toggleCatCard(card, currentSel) {
  const cat = card.dataset.cat;
  const idx = currentSel.indexOf(cat);
  let next;
  if (idx === -1) {
    next = [...currentSel, cat];
  } else {
    if (currentSel.length === 1) return currentSel; // must keep at least 1
    next = currentSel.filter(c => c !== cat);
  }
  return next;
}

function syncCardVisuals(container, selection) {
  container.querySelectorAll('.cat-card').forEach(c => {
    c.classList.toggle('selected', selection.includes(c.dataset.cat));
  });
}

function updatePathBtn() {
  const lbl = document.getElementById('pathBtn');
  if (!lbl) return;
  const cats = state.selectedCategories || [];
  if (cats.length <= 1) {
    lbl.textContent = cats.map(c => CAT_ICONS_LIST[c] + ' ' + getCatName(c)).join('');
  } else {
    lbl.innerHTML = cats.map(c => `<span>${CAT_ICONS_LIST[c]} ${getCatName(c)}</span>`).join('<br>');
  }
}

function applyCategories(cats, name) {
  if (name) state.playerName = name;
  state.selectedCategories = cats;
  // Do NOT null dailyQuests here — ensureDailyQuests handles per-combo storage
  saveState();
  ensureDailyQuests();
  updatePathBtn();
  renderAll();
}

function updatePlayerName() {
  const el = document.getElementById('playerNameDisplay');
  if (el) el.textContent = state.playerName || '—';
}

// --- First-run screen ---
let pendingCats = []; // temp selection on first-run screen

function initCatScreenCards() {
  const container = document.querySelector('#catScreen .cat-cards');
  const confirmBtn = document.getElementById('catConfirmBtn');
  pendingCats = state.selectedCategories ? [...state.selectedCategories] : [];
  syncCardVisuals(container, pendingCats);
  confirmBtn.disabled = pendingCats.length === 0;

  container.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('click', () => {
      pendingCats = toggleCatCard(card, pendingCats);
      syncCardVisuals(container, pendingCats);
      confirmBtn.disabled = pendingCats.length === 0;
    });
  });

  confirmBtn.addEventListener('click', () => {
    if (pendingCats.length === 0) return;
    const name = document.getElementById('nameInput').value.trim();
    applyCategories(pendingCats, name);
    hideCatScreen();
    updatePlayerName();
  });
}

// First-run screen — init after DOM ready (called in INIT section)

// ===== SETTINGS PANEL =====
let settingsPendingCats = [];

function openSettings() {
  document.getElementById('settingsNameInput').value = state.playerName || '';
  settingsPendingCats = [...(state.selectedCategories || [])];
  syncCardVisuals(document.getElementById('settingsCatCards'), settingsPendingCats);
  document.getElementById('settingsPanel').classList.add('open');
}
function closeSettings() {
  document.getElementById('settingsPanel').classList.remove('open');
}

document.getElementById('settingsBtn').addEventListener('click', openSettings);
document.getElementById('settingsBackBtn').addEventListener('click', closeSettings);

document.getElementById('settingsNameSave').addEventListener('click', () => {
  const val = document.getElementById('settingsNameInput').value.trim();
  if (val) { state.playerName = val.slice(0, 20); saveState(); updatePlayerName(); }
  closeSettings();
});

document.querySelectorAll('#settingsCatCards .cat-card').forEach(card => {
  card.addEventListener('click', () => {
    settingsPendingCats = toggleCatCard(card, settingsPendingCats);
    syncCardVisuals(document.getElementById('settingsCatCards'), settingsPendingCats);
  });
});

document.getElementById('settingsCatSave').addEventListener('click', () => {
  if (settingsPendingCats.length === 0) return;
  const val = document.getElementById('settingsNameInput').value.trim();
  applyCategories(settingsPendingCats, val);
  updatePlayerName();
  closeSettings();
});

// ===== LEVEL OVERVIEW =====
function miniCharSVG(stage) {
  const st = CHAR_STAGES[stage];
  const c = st.bodyColor.startsWith('url') ? '#ffd54f' : st.bodyColor;
  const g = st.auraColor;
  const wings = st.wings ? `
    <ellipse cx="8"  cy="52" rx="9" ry="16" fill="${c}" opacity="0.4" transform="rotate(-15,8,52)"/>
    <ellipse cx="52" cy="52" rx="9" ry="16" fill="${c}" opacity="0.4" transform="rotate(15,52,52)"/>` : '';
  const crown = st.crown ? `
    <polygon points="30,3 25,12 30,10 35,12" fill="${c}"/>
    <polygon points="19,12 17,6 25,12"       fill="${c}"/>
    <polygon points="41,12 43,6 35,12"       fill="${c}"/>
    <rect x="17" y="10" width="26" height="4" rx="2" fill="${c}" opacity="0.7"/>` : '';
  const eyes = st.eyes
    ? `<circle cx="25" cy="24" r="3.5" fill="${g}" opacity="0.95"/>
       <circle cx="35" cy="24" r="3.5" fill="${g}" opacity="0.95"/>`
    : `<circle cx="25" cy="24" r="3"   fill="#222"/>
       <circle cx="35" cy="24" r="3"   fill="#222"/>`;
  const aura = st.aura
    ? `<circle cx="30" cy="52" r="28" fill="${g}" opacity="0.08"/>` : '';
  const rainbow = stage === 14
    ? `<defs><linearGradient id="rg${stage}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="#ff6b6b"/>
        <stop offset="50%"  stop-color="#69f0ae"/>
        <stop offset="100%" stop-color="#64b5f6"/>
       </linearGradient></defs>` : '';
  const fill = stage === 14 ? `url(#rg${stage})` : c;
  const glowFilter = st.aura ? `filter: drop-shadow(0 0 5px ${g})` : '';

  return `<svg viewBox="0 0 60 100" xmlns="http://www.w3.org/2000/svg" style="${glowFilter}">
    ${rainbow}${aura}${wings}
    <!-- feet -->
    <ellipse cx="25" cy="94" rx="7" ry="4" fill="${fill}"/>
    <ellipse cx="35" cy="94" rx="7" ry="4" fill="${fill}"/>
    <!-- legs -->
    <rect x="21" y="72" width="8"  height="23" rx="4" fill="${fill}"/>
    <rect x="31" y="72" width="8"  height="23" rx="4" fill="${fill}"/>
    <!-- body -->
    <rect x="16" y="44" width="28" height="30" rx="7" fill="${fill}"/>
    <!-- arms angled down -->
    <rect x="4"  y="46" width="13" height="7" rx="3.5" fill="${fill}" transform="rotate(-28,16,49)"/>
    <rect x="43" y="46" width="13" height="7" rx="3.5" fill="${fill}" transform="rotate(28,44,49)"/>
    <!-- ears -->
    <ellipse cx="17" cy="27" rx="3" ry="5" fill="${fill}"/>
    <ellipse cx="43" cy="27" rx="3" ry="5" fill="${fill}"/>
    <!-- head oval -->
    <ellipse cx="30" cy="27" rx="13" ry="15" fill="${fill}"/>
    <!-- neck -->
    <rect x="26" y="39" width="8" height="7" rx="3" fill="${fill}"/>
    <!-- mouth -->
    <path d="M26,33 Q30,37 34,33" stroke="#00000040" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    ${eyes}${crown}
  </svg>`;
}

function renderLevelOverview() {
  const combo    = getComboProgress();
  const curLevel = combo.level;
  const curXP    = combo.xp;

  // Build path label for header
  const cats     = state.selectedCategories || ['sport'];
  const pathLabel = cats.map(c => `${CAT_ICONS[c]} ${getCatName(c)}`).join(' + ');

  // Update page title to show active path
  document.getElementById('levelOverviewTitle').textContent = `${t('yourAscent')} · ${pathLabel}`;

  const list = document.getElementById('levelOverviewList');
  list.innerHTML = '';

  LEVELS.forEach(lv => {
    const isDone    = curLevel > lv.level;
    const isCurrent = curLevel === lv.level;
    const cls       = isDone ? 'done' : isCurrent ? 'current' : 'upcoming';
    const badge     = isDone ? t('mastered') : isCurrent ? t('youAreHere') : '';

    // XP label
    const nextLv = LEVELS[lv.level] || null;
    let xpLabel;
    if (isDone) {
      xpLabel = `${lv.xp} XP ${t('xpReached')}`;
    } else if (isCurrent) {
      const prog = getXPProgress(curXP, curLevel);
      xpLabel = nextLv ? `${prog.cur} / ${prog.needed} XP` : t('maxLevel');
    } else {
      xpLabel = `${t('fromXP')} ${lv.xp} XP`;
    }

    // Mini XP bar for current level
    const xpBar = isCurrent && nextLv ? (() => {
      const prog = getXPProgress(curXP, curLevel);
      return `<div class="lv-mini-xp-bar"><div class="lv-mini-xp-fill" style="width:${prog.pct}%"></div></div>`;
    })() : '';

    const card = document.createElement('div');
    card.className = `lv-card ${cls}`;
    card.innerHTML = `
      <div class="lv-mini-char">${miniCharSVG(lv.stage)}</div>
      <div class="lv-info">
        <span class="lv-num">Level ${lv.level}</span>
        <span class="lv-name">${getLevelName(lv.level)}</span>
        ${xpBar}
        <span class="lv-xp">${xpLabel}</span>
      </div>
      ${badge ? `<span class="lv-badge">${badge}</span>` : ''}
    `;
    list.appendChild(card);

    if (isCurrent) setTimeout(() => card.scrollIntoView({ behavior:'smooth', block:'center' }), 100);
  });
}

function openLevelOverview() {
  renderLevelOverview();
  document.getElementById('levelOverview').classList.add('open');
}
function closeLevelOverview() {
  document.getElementById('levelOverview').classList.remove('open');
}

document.getElementById('backBtn').addEventListener('click', closeLevelOverview);
document.querySelector('.char-wrap').addEventListener('click', openLevelOverview);

document.getElementById('resetBtn').addEventListener('click', () => {
  if (!confirm(t('resetConfirm'))) return;
  const key = getComboKey();
  state.progress[key] = DEFAULT_PROGRESS();
  state.totalQuests = 0;
  state.streak = 0;
  state.lastCompleteDate = null;
  state.dailyQuests = null;
  state.questsGeneratedAt = null;
  state.questsForCategories = null;
  if (state.questsByCombo) delete state.questsByCombo[key];
  ensureDailyQuests();
  saveState();
  renderAll();
  closeSettings();
});

document.getElementById('renameBtn').addEventListener('click', openSettings);

// ===== LANGUAGE BUTTON HANDLERS =====
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => changeLanguage(btn.dataset.lang));
});

// ===== ACHIEVEMENTS BUTTON HANDLERS =====
document.getElementById('achievementsBtn').addEventListener('click', openAchievements);
document.getElementById('achievementsBackBtn').addEventListener('click', closeAchievements);

// ===== INIT =====
loadState();
applyTranslations();
initCatScreenCards();
if (!hasCategories()) {
  showCatScreen();
  if (state.playerName) {
    const inp = document.getElementById('nameInput');
    if (inp) inp.value = state.playerName;
  }
} else {
  hideCatScreen();
  ensureDailyQuests();
  renderAll();
  updatePathBtn();
  updatePlayerName();
}

// Update countdown every minute; auto-refresh quests when timer hits 0
setInterval(() => {
  const d = new Date();
  const dateLang = state.language === 'en' ? 'en-US' : 'de-DE';
  document.getElementById('dateDisplay').textContent =
    d.toLocaleDateString(dateLang, { weekday:'long', day:'numeric', month:'long' });

  if (state.questsGeneratedAt) {
    const remaining = Math.max(0, TWENTY_FOUR_H - (Date.now() - state.questsGeneratedAt));
    if (remaining === 0) {
      ensureDailyQuests(); renderAll(); return;
    }
    const rh = Math.floor(remaining / 3600000);
    const rm = Math.floor((remaining % 3600000) / 60000);
    document.getElementById('resetHint').textContent = `${t('newQuestsIn')} ${rh}h ${rm}m`;
  }
}, 60000);
