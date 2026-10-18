/* Night Heron's interface text, 简体中文, on top of the engine's (engine/ui.zh-cn.js).
   Converted from ui.zh.js (scripts/zhcn.py), then edited by hand.
   Keys used in the page's HTML as {{key}} must be plain strings; the rest may be functions. */
const UI = Object.assign({}, ENGINE_UI, {
  lang: 'zh-Hans',
  caseTitle: '夜鹭事件',
  pdfName: '夜鹭事件.pdf',
  description: '隐私推理游戏：从一张照片的元数据、背景与文本习惯，找出不小心暴露身份的吹哨者。',
  // no-JS notice (HTML)
  nojsBody: '《夜鹭事件》交互版模拟一台调查员的电脑，需要 JavaScript 才能运行。你的浏览器目前停用了 JavaScript，例如 Tor Browser 的「最安全」安全等级。',
  nojsPdf: '想离线或打印出来玩，也可以<a href="night-heron.pdf" download="夜鹭事件.pdf">下载 PDF 版</a>（解答在最后几页）。',
  // desktop
  sticky1: '读夜鹭的消息',
  sticky2: '找出照片泄露了什么',
  sticky3: '把 6 人缩到 1 人',
  sticky4: '交出结案报告',
  clockDate: '9月16日 周三 ',
  termDate: 'Wed Sep 16',
  lockedToast: ['还不能开始调查', '先和夜鹭聊完、收下资料再说。'],
  // the client: Night Heron
  client: '夜鹭',
  clientAvatar: '鹭',
  clientColor: '#e3a33b',
  headClient: '夜鹭 · 安全码已验证',
  headClientTyping: '夜鹭正在输入…',
  typingAria: '夜鹭正在输入',
  zipName: '夜鹭导出.zip',
  zipMeta: '48 KB · 加密发送',
  zipSent: '发送了一个文件：夜鹭导出.zip',
  zipReceived: '已接收 夜鹭导出.zip · 解压缩到 ~/夜鹭导出',
  awuHello: '我是阿雾，今晚值班。夜鹭的案子你接了吧？',
  openFiles: '打开夜鹭导出的数据',
  // the online EXIF tool and its trap
  uploaded: '已上传',
  upload: '上传',
  trap: ['等一下，你刚把夜鹭的原始照片上传到一个不明网站？', '那个网站现在也有这张照片了，还记下了你的 IP 和上传时间。要是公司的调查员也找上它……\n下次请用自己电脑上的工具查，例如终端的 exiftool。这次结案评级会降一级。'],
  // files
  sideSlack: 'Slack 记录',
  checkInTerminal: '终端检查',
  // viewer
  viewerEmpty: '还没有打开任何图片。<br>在「文件」的「下载」里，或论坛附件上点一下就能打开。',
  cameraInfo: '相机信息',
  noCamera: '这个文件没有相机信息。',
  tipDownloaded: '这里只列出常见字段，有些字段不会显示。用 EXIF 工具可以读到更完整的元数据。',
  tipNotDownloaded: '要查看相机信息，请先把源文件<b>下载</b>下来。',
  saveFile: '把这个文件存到你的电脑',
  realJpeg: '它是真的 JPEG，也可以用你自己的工具检查。',
  // terminal
  help: `可用命令：
  <span class="k">ls</span> [文件夹]          列出文件
  <span class="k">cd</span> &lt;文件夹&gt;          切换文件夹（cd .. 回上一层）
  <span class="k">pwd</span>                  显示目前位置
  <span class="k">cat</span> &lt;文件&gt;           显示文本文件内容
  <span class="k">exiftool</span> &lt;文件&gt;      读取文件的元数据
  <span class="k">grep</span> [-i] &lt;字&gt; &lt;文件...&gt;  在文件中搜索文本，支持 *.log
  <span class="k">file</span> &lt;文件&gt;          判断文件类型
  <span class="k">open</span> &lt;文件&gt;          用图形界面打开
  <span class="k">clear</span>                清除画面
<span class="d">小技巧：按 Tab 自动补全文件名，↑ ↓ 调出之前的命令。</span>`,
  binary: '（二进制文件，看不懂的乱码……试试 exiftool 或 open）',
  usageExif: '用法：exiftool &lt;文件&gt;</span>\n<span class="d">例如：exiftool PXL_20260914_144712345.jpg',
  usageGrep: '用法：grep [-i] &lt;要找的字&gt; &lt;文件...&gt;</span>\n<span class="d">例如：grep Pixel slack/*.log',
  // 阿雾's coaching (optional helper)
  coachStart: hasPhoto => hasPhoto
    ? '我带你。终端下方的按钮会帮你填好命令：先点「cd Downloads」，再按「运行」或 Enter。'
    : '我带你。先打开浏览器，到书签栏的「无名广场」，在爆料文的附件按「下载源文件」。下载好再回来终端。',
  coachDownloaded: '下载好了。回到终端，点「cd Downloads」再按运行。',
  coachInDownloads: hasPhoto => hasPhoto ? '很好，你现在在「下载」里。点「exiftool PXL_…」那一颗，再按运行。' : '你已经在「下载」里了，不过里面还没有照片。先去论坛把附件下载下来。',
  coachAfterExif: '这些就是藏在照片里的数据，每一行是一个字段。慢慢看：有哪几行，是夜鹭没想到会留下来的？',
  // board
  noClues: '还没有发现。读取照片的元数据、放大照片细节，都会自动记录在这里。',
  noPins: '在网页、Slack 记录、表格旁按「📌 钉住」，就会存到这里。',
  // report
  reportNote: '交给夜鹭的报告。每一题都要有证据支撑；指认错人，夜鹭会告诉你。',
  q1: '1. 照片的元数据泄露了哪些信息？（多选）',
  q2: '2. 照片画面本身泄露了什么？（多选）',
  q3: '3. 爆料文的文本泄露了什么？',
  q4: '4. 夜鹭是谁？',
  fb1: '✕ 再看一次 exiftool 的输出。夜鹭关掉了什么？没关掉什么？',
  fb2: '✕ 用看图 App 放大照片，画面里有两样东西能对应到现实。',
  fb3: '✕ 夜鹭用了新账号、没用公司网络。剩下能出卖人的是什么？',
  clientWrong: '我读了你的报告……不是那个人。但公司的调查员也可能这样误判，冤枉一个无辜的同事。可以再查一次吗？',
  clientSolved: '……你找到我了。谢谢你比他们早一步。我会照你的建议处理。',
  ranks: [['洋葱首席调查员', '公司的调查员还在喝咖啡，你已经破案了。'], ['资深隐私志愿者', '夜鹭得救了。'], ['见习调查员', '至少你知道下次发文前要先清 EXIF 了。']],
  rankStats: (hints, wrong, mistakes) => `用了 ${hints} 个提示、误判 ${wrong} 次${mistakes ? '，还把原始照片上传到在线工具' : ''}。`,
});
// Saves from before the engine was shared refer to these names for the same lines
UI.yeluWrong = UI.clientWrong;
UI.yeluSolved = UI.clientSolved;
