/* Blue Magpie's interface text, 简体中文, on top of the engine's (engine/ui.zh-cn.js).
   Converted from ui.zh.js (scripts/zhcn.py), then edited by hand.
   Keys used in the page's HTML as {{key}} must be plain strings; the rest may be functions. */
const UI = Object.assign({}, ENGINE_UI, {
  lang: 'zh-Hans',
  caseTitle: '蓝鹊事件',
  pdfName: '蓝鹊事件.pdf',
  description: '隐私推理游戏：一封没有链接的扣款通知，一个「验证会员身份」的 QR code。拆穿这套诈骗，找出是谁把会员数据卖了出去。',
  // no-JS notice (HTML)
  nojsBody: '《蓝鹊事件》交互版模拟一台调查员的电脑，需要 JavaScript 才能运行。你的浏览器目前停用了 JavaScript，例如 Tor Browser 的「最安全」安全等级。',
  nojsPdf: '想离线或打印出来玩，也可以<a href="blue-magpie.pdf" download="蓝鹊事件.pdf">下载 PDF 版</a>（解答在最后几页）。',
  // desktop
  sticky1: '听芷宁说发生了什么',
  sticky2: '拆穿扣款信和假网站',
  sticky3: '帮她把账号拿回来',
  sticky4: '找出数据从谁手上流出',
  clockDate: '12月9日 周三 ',
  termDate: 'Wed Dec  9',
  lockedToast: ['还不能开始调查', '先和芷宁聊完、收下她整理的数据。'],
  // the client: 周芷宁
  client: '周芷宁',
  clientAvatar: '芷',
  clientColor: '#7cc49a',
  headClient: '周芷宁 · 安全码已验证',
  headClientTyping: '周芷宁正在输入…',
  typingAria: '周芷宁正在输入',
  zipName: '芷宁给的资料.zip',
  zipMeta: '1.2 MB · 加密发送',
  zipSent: '发送了一个文件：芷宁给的资料.zip',
  zipReceived: '已接收 芷宁给的资料.zip · 解压缩到 ~/芷宁给的资料',
  awuHello: '我是阿雾。芷宁的案子交给你了，数据都收到了吗？',
  openFiles: '打开芷宁给的资料',
  // the fake member centre's cancel form
  trap: ['等等，你在那个「会员中心」的表单送出数据了？', '就算填的是假的，对方也知道这个浏览器、这个时间有人上钩，下一步就是专员来电。查假网站只看、不填、不送出。这次结案评级会降一级。'],
  // tools
  qrRead: '读取',
  // viewer
  viewerEmpty: '还没有打开任何图片。<br>在「文件」里点一下图片就能打开。',
  // terminal
  help: `可用命令：
  <span class="k">ls</span> [文件夹]          列出文件
  <span class="k">cd</span> &lt;文件夹&gt;          切换文件夹（cd .. 回上一层）
  <span class="k">pwd</span>                  显示目前位置
  <span class="k">cat</span> &lt;文件&gt;           显示文本文件内容（.eml 会显示完整原始信件）
  <span class="k">grep</span> [-i] &lt;字&gt; &lt;文件...&gt;  在文件中搜索文本，支持 *.csv
  <span class="k">whois</span> &lt;域名&gt;         查找域名的注册数据
  <span class="k">dig</span> txt &lt;域名&gt;       查找域名的 TXT 记录（例如 SPF）
  <span class="k">file</span> &lt;文件&gt;          判断文件类型
  <span class="k">open</span> &lt;文件&gt;          用图形界面打开
  <span class="k">clear</span>                清除画面
<span class="d">小技巧：按 Tab 自动补全文件名，↑ ↓ 调出之前的命令。</span>`,
  usageGrep: '用法：grep [-i] &lt;要找的字&gt; &lt;文件...&gt;</span>\n<span class="d">例如：grep -i authentication *.eml',
  usageWhois: '用法：whois &lt;域名&gt;</span>\n<span class="d">例如：whois beatbird.app',
  usageDig: '用法：dig txt &lt;域名&gt;</span>\n<span class="d">例如：dig txt kq3fz.idv.tw',
  digNone: '（没有 TXT 记录）',
  // board
  noClues: '还没有发现。读信件、查域名、用小工具检查，找到的线索都会记录在这里。',
  noPins: '在网页、信件、表格旁按「📌 钉住」，就会存到这里。',
  // report
  reportNote: '交给芷宁和 BeatBird 数据保护长的报告。每一题都要有证据支撑；指认错人，数据保护长会告诉你。',
  q1: '1. 这封扣款通知用了哪些手法？（多选）',
  q2: '2. 假客服要芷宁扫的 QR code 做了什么？',
  q3: '3. 诈骗名单是用哪两份数据拼起来的？（多选）',
  q4: '4. 是谁把数据流出去的？',
  fb1: '✕ 再看一次信件和原始邮件。它真的是从 beatbird.app 寄的吗？有没有附件？',
  fb2: '✕ 用雾港小工具的「QR 读取」解开那张图，再对照芷宁的已关联设备。',
  fb3: '✕ 诈骗信用到哪些字段？对照数据提供记录，哪两份合起来才有这些字段？',
  clientWrong: '数据保护长看了你的报告，说证据对不上这个人……可以再查一次吗？我不想有人被冤枉。',
  clientSolved: '……原来是这样。谢谢你，我会把报告交给 165 和 BeatBird。',
  ranks: [['洋葱首席调查员', '诈骗集团还在等下一个上钩的人，你已经把源头找出来了。'], ['资深隐私志愿者', '芷宁的账号拿回来了，名单的源头也找到了。'], ['见习调查员', '至少你知道下次看到「已开通、按月扣款」，要先打开 App 自己查了。']],
  rankStats: (hints, wrong, mistakes) => `用了 ${hints} 个提示、误判 ${wrong} 次${mistakes ? '，还在假网站送出了表单' : ''}。`,
});
