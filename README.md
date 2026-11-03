# Sbobinatore

Carica la registrazione di una lezione e ricevi la sbobinatura: paragrafi con il minutaggio, indice per argomenti, riassunto, ricerca nel testo, ascolto sincronizzato con l'audio ed export in Word, PDF, Markdown e testo.

Online: https://simoneabbiati.github.io/sbobinatore/

## Come funziona

Un solo file, `index.html`, che gira interamente nel browser:

- l'audio va direttamente ad [AssemblyAI](https://www.assemblyai.com) (modelli Universal-3.5 Pro, con Universal-2 di riserva);
- l'indice per argomenti viene dalla Summarization di AssemblyAI e, se la lezione non è in inglese, è tradotto con l'LLM Gateway di AssemblyAI;
- le sbobinature restano salvate nel browser (IndexedDB); una trascrizione in corso riprende anche se la pagina viene chiusa.

## Accesso

La chiave API è nella pagina solo **cifrata** (AES-GCM 256, chiave derivata dalla password con PBKDF2-SHA256, 600.000 iterazioni). Chi conosce la password la sblocca una volta e il browser la ricorda. In alternativa si può incollare direttamente una propria chiave AssemblyAI nel campo password.

Per cambiare chiave o password:

```sh
node tools/encrypt-key.mjs "<chiave-assemblyai>" "<nuova-password>"
```

e sostituisci il valore di `ENC` in `index.html`.

## Scelte di design

Basate su una ricerca su UX dei tool di trascrizione, scienze dell'apprendimento, accessibilità (WCAG 2.2 AA, dislessia) e concorrenti (Otter, TurboScribe, Happy Scribe, Glean, Sbobby, LecturesLab…). Stile editoriale: Bodoni Moda per i titoli, Inter Tight per l'interfaccia, Inter per la lettura, accento corallo; modalità "Alta leggibilità" con Atkinson Hyperlegible Next.
