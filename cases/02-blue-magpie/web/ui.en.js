/* Blue Magpie's interface text, English, on top of the engine's (engine/ui.en.js). Same keys
   as ui.zh.js. Keys used in the page's HTML as {{key}} must be plain strings; the rest may be
   functions. */
const UI = Object.assign({}, ENGINE_UI, {
  lang: 'en',
  caseTitle: 'Blue Magpie',
  pdfName: 'blue-magpie.pdf',
  description: 'A privacy mystery: a billing notice with no link, and a QR code to “verify your membership”. Take the scam apart and find out who sold the member data.',
  // no-JS notice (HTML)
  nojsBody: 'The interactive Blue Magpie simulates an investigator’s computer and needs JavaScript to run. Your browser has JavaScript turned off, for example at Tor Browser’s “Safest” security level.',
  nojsPdf: 'To play offline or on paper, <a href="blue-magpie.pdf" download="blue-magpie.pdf">download the PDF</a> (the solution is on the last pages).',
  // desktop
  sticky1: 'Hear what happened to Chih-ning',
  sticky2: 'Take apart the email and the fake site',
  sticky3: 'Help her get her account back',
  sticky4: 'Find who leaked the data',
  clockDate: 'Wed 9 Dec ',
  termDate: 'Wed Dec  9',
  lockedToast: ['Not yet', 'Finish talking to Chih-ning and accept her files first.'],
  // the client: Chou Chih-ning
  client: 'Chou Chih-ning',
  clientAvatar: 'CN',
  clientColor: '#7cc49a',
  headClient: 'Chou Chih-ning · safety number verified',
  headClientTyping: 'Chou Chih-ning is typing…',
  typingAria: 'Chou Chih-ning is typing',
  zipName: 'from-chih-ning.zip',
  zipMeta: '1.2 MB · sent encrypted',
  zipSent: 'Sent a file: from-chih-ning.zip',
  zipReceived: 'Received from-chih-ning.zip · unpacked to ~/from-chih-ning',
  awuHello: "I'm Fog. Chih-ning's case is yours. Did her files come through?",
  openFiles: 'Open Chih-ning’s files',
  // the fake member centre's cancel form
  trap: ['Wait. Did you just send details through that “Member Centre” form?', 'Even if they were fake, they now know someone bit, on this browser at this time, and the next step is an “agent” calling. When you check a fake site, look but never fill in or send anything. Your rank for this case drops a level.'],
  // tools
  qrRead: 'Read',
  // viewer
  viewerEmpty: 'No image open yet.<br>Tap an image in Files to open it.',
  // terminal
  help: `Commands:
  <span class="k">ls</span> [folder]           list files
  <span class="k">cd</span> &lt;folder&gt;           change folder (cd .. goes up)
  <span class="k">pwd</span>                   show where you are
  <span class="k">cat</span> &lt;file&gt;             show a text file (.eml shows the whole original email)
  <span class="k">grep</span> [-i] &lt;text&gt; &lt;files...&gt;  search files for text; *.csv works
  <span class="k">whois</span> &lt;domain&gt;         look up a domain's registration
  <span class="k">dig</span> txt &lt;domain&gt;       look up a domain's TXT records (such as SPF)
  <span class="k">file</span> &lt;file&gt;            tell a file's type
  <span class="k">open</span> &lt;file&gt;            open it in its app
  <span class="k">clear</span>                 clear the screen
<span class="d">Tip: Tab completes file names; ↑ ↓ bring back earlier commands.</span>`,
  usageGrep: 'usage: grep [-i] &lt;text&gt; &lt;files...&gt;</span>\n<span class="d">e.g. grep -i authentication *.eml',
  usageWhois: 'usage: whois &lt;domain&gt;</span>\n<span class="d">e.g. whois beatbird.app',
  usageDig: 'usage: dig txt &lt;domain&gt;</span>\n<span class="d">e.g. dig txt kq3fz.idv.tw',
  digNone: '(no TXT records)',
  // board
  noClues: 'Nothing yet. Reading the emails, looking up domains and checking things with the tools records clues here.',
  noPins: 'Tap “📌 Pin” next to web pages, emails and tables to save them here.',
  // report
  reportNote: 'Your report to Chih-ning and BeatBird’s data protection officer. Back every answer with evidence; if you name the wrong person, the data protection officer will tell you.',
  q1: '1. Which tricks did the billing notice use? (choose all that apply)',
  q2: '2. What did the QR code the fake agent asked Chih-ning to scan do?',
  q3: '3. Which two files were combined to make the scammers’ list? (choose all that apply)',
  q4: '4. Who leaked the data?',
  fb1: '✕ Look at the email and its original again. Did it really come from beatbird.app? Does it have an attachment?',
  fb2: '✕ Decode the image with “QR reader” in Mistport Tools, then compare it with Chih-ning’s linked devices.',
  fb3: '✕ Which fields does the scam use? In data-provided.csv, which two files together have them all?',
  clientWrong: 'The data protection officer read your report and says the evidence doesn’t fit that person… Could you look again? I don’t want anyone wrongly accused.',
  clientSolved: '…So that’s how it happened. Thank you. I’ll take the report to 165 and to BeatBird.',
  ranks: [['Chief Onion Investigator', 'The scammers are still waiting for their next bite, and you’ve found their source.'], ['Senior Privacy Volunteer', 'Chih-ning has her account back, and the list’s source is found.'], ['Trainee Investigator', 'At least next time a plan is “now active, billed monthly”, you’ll open the app and check for yourself.']],
  rankStats: (hints, wrong, mistakes) => `You used ${hints} hint${hints === 1 ? '' : 's'} and named the wrong person ${wrong} time${wrong === 1 ? '' : 's'}${mistakes ? ', and sent the fake site’s form' : ''}. `,
});
