/* Night Heron's interface text, English, on top of the engine's (engine/ui.en.js). Same keys
   as ui.zh.js. Keys used in the page's HTML as {{key}} must be plain strings; the rest may be
   functions. */
const UI = Object.assign({}, ENGINE_UI, {
  lang: 'en',
  caseTitle: 'Night Heron',
  pdfName: 'night-heron.pdf',
  description: 'A privacy mystery: find the whistleblower who gave themselves away through a photo’s metadata, its background and their writing habits.',
  // no-JS notice (HTML)
  nojsBody: 'The interactive Night Heron simulates an investigator’s computer and needs JavaScript to run. Your browser has JavaScript turned off, for example at Tor Browser’s “Safest” security level.',
  nojsPdf: 'To play offline or on paper, <a href="night-heron.pdf" download="night-heron.pdf">download the PDF</a> (the solution is on the last pages).',
  // desktop
  sticky1: 'Read Night Heron’s messages',
  sticky2: 'Find what the photo gave away',
  sticky3: 'Narrow six people to one',
  sticky4: 'File the case report',
  langHref: '../../night-heron/',
  clockDate: 'Wed 16 Sep ',
  termDate: 'Wed Sep 16',
  lockedToast: ['Not yet', 'Finish talking to Night Heron and accept the files first.'],
  // the client: Night Heron
  client: 'Night Heron',
  clientAvatar: 'NH',
  clientColor: '#e3a33b',
  headClient: 'Night Heron · safety number verified',
  headClientTyping: 'Night Heron is typing…',
  typingAria: 'Night Heron is typing',
  zipName: 'heron-export.zip',
  zipMeta: '48 KB · sent encrypted',
  zipSent: 'Sent a file: heron-export.zip',
  zipReceived: 'Received heron-export.zip · unpacked to ~/heron-export',
  awuHello: "I'm Fog, on duty tonight. You've taken the Night Heron case?",
  openFiles: 'Open Night Heron’s export',
  // the online EXIF tool and its trap
  uploaded: 'Uploaded',
  upload: 'Upload',
  trap: ['Wait. Did you just upload Night Heron’s original photo to some website?', "That site has the photo now, along with your IP address and the upload time. If the company's investigators find it too…\nNext time, check it with a tool on your own computer, like exiftool in the terminal. Your rank for this case drops a level."],
  // files
  sideSlack: 'Slack logs',
  checkInTerminal: 'Check in terminal',
  // viewer
  viewerEmpty: 'No image open yet.<br>Tap an image in Downloads, or the forum attachment, to open it.',
  cameraInfo: 'Camera',
  noCamera: 'This file has no camera information.',
  tipDownloaded: 'Only common fields are listed here; some are left out. An EXIF tool can read the full metadata.',
  tipNotDownloaded: 'To see camera details, <b>download</b> the original first.',
  saveFile: 'Save this file to your computer',
  realJpeg: 'It’s a real JPEG; check it with your own tools too.',
  // terminal
  help: `Commands:
  <span class="k">ls</span> [folder]           list files
  <span class="k">cd</span> &lt;folder&gt;           change folder (cd .. goes up)
  <span class="k">pwd</span>                   show where you are
  <span class="k">cat</span> &lt;file&gt;             show a text file
  <span class="k">exiftool</span> &lt;file&gt;        read a file's metadata
  <span class="k">grep</span> [-i] &lt;text&gt; &lt;files...&gt;  search files for text; *.log works
  <span class="k">file</span> &lt;file&gt;            tell a file's type
  <span class="k">open</span> &lt;file&gt;            open it in its app
  <span class="k">clear</span>                 clear the screen
<span class="d">Tip: Tab completes file names; ↑ ↓ bring back earlier commands.</span>`,
  binary: '(binary file, unreadable gibberish… try exiftool or open)',
  usageExif: 'usage: exiftool &lt;file&gt;</span>\n<span class="d">e.g. exiftool PXL_20260914_144712345.jpg',
  usageGrep: 'usage: grep [-i] &lt;text&gt; &lt;files...&gt;</span>\n<span class="d">e.g. grep Pixel slack/*.log',
  // Fog's coaching (optional helper)
  coachStart: hasPhoto => hasPhoto
    ? 'I’ll walk you through it. The buttons under the terminal fill in commands: tap “cd Downloads”, then “Run” or Enter.'
    : 'I’ll walk you through it. First open the browser, go to “Nameless Square” on the bookmarks bar, and tap “Download original” on the leak post’s attachment. Then come back to the terminal.',
  coachDownloaded: 'Downloaded. Back in the terminal, tap “cd Downloads” and run it.',
  coachInDownloads: hasPhoto => hasPhoto ? 'Good, you’re in Downloads. Tap the “exiftool PXL_…” one and run it.' : 'You’re in Downloads, but there’s no photo yet. Download the attachment from the forum first.',
  coachAfterExif: 'That’s the data hidden in the photo, one field per line. Take your time: which lines did Night Heron never expect to leave behind?',
  // board
  noClues: 'Nothing yet. Reading the photo’s metadata or zooming into its details records clues here automatically.',
  noPins: 'Tap “📌 Pin” next to web pages, Slack logs and tables to save them here.',
  // report
  reportNote: 'Your report to Night Heron. Back every answer with evidence; if you name the wrong person, Night Heron will tell you.',
  q1: '1. What did the photo’s metadata give away? (choose all that apply)',
  q2: '2. What did the picture itself give away? (choose all that apply)',
  q3: '3. What did the post’s writing give away?',
  q4: '4. Who is Night Heron?',
  fb1: '✕ Look at the exiftool output again. What did Night Heron turn off, and what didn’t they?',
  fb2: '✕ Zoom into the photo in the image viewer. Two things in the picture tie back to the real world.',
  fb3: '✕ Night Heron used a new account and avoided the company network. What else could give them away?',
  clientWrong: 'I read your report… it isn’t them. But the company’s investigators could make the same mistake and blame an innocent colleague. Can you look again?',
  clientSolved: '…You found me. Thank you for getting there before they did. I’ll do what you suggest.',
  ranks: [['Chief Onion Investigator', 'The company’s investigators are still on their coffee and you’ve closed the case.'], ['Senior Privacy Volunteer', 'Night Heron is safe.'], ['Trainee Investigator', 'At least you’ll strip the EXIF before you post next time.']],
  rankStats: (hints, wrong, mistakes) => `You used ${hints} hint${hints === 1 ? '' : 's'} and named the wrong person ${wrong} time${wrong === 1 ? '' : 's'}${mistakes ? ', and uploaded the original photo to an online tool' : ''}. `,
});
// Saves from before the engine was shared refer to these names for the same lines
UI.yeluWrong = UI.clientWrong;
UI.yeluSolved = UI.clientSolved;
