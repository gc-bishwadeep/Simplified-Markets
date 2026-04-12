const TOPICS = [
  // ── MODULE 1: What Is the Market? (Posts 1–8) ──
  "What Is the Stock Market?",
  "What Is a Stock or Share?",
  "What Is a Stock Exchange? (NSE and BSE)",
  "Who Are the Players in the Stock Market?",
  "How Does Trading Actually Work?",
  "What Is SEBI and Why Does It Matter?",
  "What Is a Bull Market and Bear Market?",
  "What Is Market Sentiment?",

  // ── MODULE 2: Indian Market Foundations (Posts 9–18) ──
  "What Is the NIFTY 50?",
  "What Is the SENSEX?",
  "What Is Market Capitalisation?",
  "What Is an IPO?",
  "What Is a Demat Account?",
  "What Is a Trading Account?",
  "What Is a Broker and How to Choose One?",
  "What Are Market Timings in India?",
  "What Is the Difference Between NSE and BSE?",
  "What Is SEBI and How Does It Protect Investors?",

  // ── MODULE 3: Stock Basics (Posts 19–28) ──
  "What Is a Dividend?",
  "What Is a Bonus Share?",
  "What Is a Stock Split?",
  "What Is a Rights Issue?",
  "What Is a Portfolio?",
  "What Is Diversification?",
  "Buy vs Sell vs Hold — What Should You Do?",
  "What Is a Large Cap, Mid Cap and Small Cap Stock?",
  "What Are Penny Stocks?",
  "What Is the Difference Between Equity and Debt?",

  // ── MODULE 4: Types of Investing (Posts 29–36) ──
  "What Is Long-Term Investing?",
  "What Is Short-Term Trading?",
  "What Is Intraday Trading?",
  "What Is Delivery Trading?",
  "What Is Swing Trading?",
  "What Is Positional Trading?",
  "What Is a Mutual Fund?",
  "What Is an Index Fund?",

  // ── MODULE 5: Reading the Market (Posts 37–46) ──
  "What Is an ETF?",
  "What Is a SIP (Systematic Investment Plan)?",
  "What Is Dollar Cost Averaging?",
  "How to Read a Stock Price?",
  "What Is 52-Week High and Low?",
  "What Is Volume in the Stock Market?",
  "What Is Liquidity?",
  "What Are Circuit Breakers in Indian Markets?",
  "What Is the Upper and Lower Circuit?",
  "What Is a Stock Market Index?",

  // ── MODULE 6: Risk and Money (Posts 47–54) ──
  "What Is Risk vs Reward?",
  "What Is Volatility?",
  "What Is a Stop Loss?",
  "What Is a Take Profit Target?",
  "What Is Position Sizing?",
  "What Is Capital Preservation?",
  "What Is the Risk-Reward Ratio?",
  "How Much Money Do You Need to Start Investing in India?",

  // ── MODULE 7: Technical Analysis Basics (Posts 55–66) ──
  "What Is Technical Analysis?",
  "What Is a Candlestick Chart?",
  "What Are Bullish and Bearish Candlestick Patterns?",
  "What Is Support and Resistance?",
  "What Is a Trend Line?",
  "What Is an Uptrend and Downtrend?",
  "What Is a Moving Average?",
  "What Is SMA vs EMA?",
  "What Is the RSI Indicator?",
  "What Is the MACD Indicator?",
  "What Are Bollinger Bands?",
  "What Is the Volume Indicator?",

  // ── MODULE 8: Chart Patterns (Posts 67–74) ──
  "What Is the Head and Shoulders Pattern?",
  "What Is a Double Top and Double Bottom?",
  "What Is the Cup and Handle Pattern?",
  "What Is a Flag and Pennant Pattern?",
  "What Is a Triangle Pattern?",
  "What Is a Breakout in Trading?",
  "What Is a Breakdown in Trading?",
  "What Is Fibonacci Retracement?",

  // ── MODULE 9: Fundamental Analysis (Posts 75–86) ──
  "What Is Fundamental Analysis?",
  "What Is the P/E Ratio?",
  "What Is EPS (Earnings Per Share)?",
  "What Is the P/B Ratio?",
  "What Is Return on Equity (ROE)?",
  "What Is Debt-to-Equity Ratio?",
  "What Is Free Cash Flow?",
  "What Is Revenue vs Profit?",
  "How to Read a Company Balance Sheet?",
  "How to Read an Earnings Report?",
  "What Is a Moat in Business?",
  "How to Analyse a Stock Before Buying?",

  // ── MODULE 10: Advanced Concepts (Posts 87–96) ──
  "What Is Fundamental vs Technical Analysis?",
  "What Is Sector Rotation?",
  "What Are Defensive Stocks?",
  "What Are Growth Stocks vs Value Stocks?",
  "What Is Short Selling?",
  "What Is Margin Trading?",
  "What Is Options Trading?",
  "What Are Calls and Puts?",
  "What Is a Futures Contract?",
  "What Is a Derivatives Market?",

  // ── MODULE 11: The Indian Economy & Markets (Posts 97–106) ──
  "How Does RBI Policy Affect the Stock Market?",
  "What Is Inflation and How Does It Affect Stocks?",
  "What Is GDP and Why Does It Matter for Investors?",
  "What Are FII and DII and How Do They Move Markets?",
  "What Is a Budget and How Does It Affect the Market?",
  "What Is a Recession and How to Invest During One?",
  "What Are Government Bonds and T-Bills in India?",
  "What Is the Role of the Finance Ministry in Markets?",
  "How Do Global Markets Affect Indian Markets?",
  "What Is the Impact of Oil Prices on Indian Stocks?",

  // ── MODULE 12: Psychology and Mistakes (Posts 107–114) ──
  "What Is Trading Psychology?",
  "What Is FOMO in Investing?",
  "What Is Loss Aversion and Why It Kills Returns?",
  "What Is Confirmation Bias in Investing?",
  "What Is Herd Mentality in the Stock Market?",
  "What Is Overtrading and How to Avoid It?",
  "The 10 Most Common Mistakes Indian Beginners Make?",
  "How to Build a Trading Routine That Works?",

  // ── MODULE 13: Viral and Special Topics (Posts 115–120) ──
  "Why Do Stock Markets Crash?",
  "How to Spot a Pump and Dump Scheme?",
  "What Is Insider Trading and Is It Legal?",
  "The 5 Golden Rules of Investing in India",
  "How to Build Your First Investment Plan in India?",
  "What Is Financial Freedom and How to Achieve It?"
];


function getAutoIdx(){ let i=parseInt(localStorage.getItem('sm_idx')||'0'); return i>=TOPICS.length?0:i; }
function advanceIdx(){ localStorage.setItem('sm_idx',(getAutoIdx()+1)%TOPICS.length); }
function setP(pct,txt){ document.getElementById('progFill').style.width=pct+'%'; document.getElementById('progLbl').textContent=txt; }

const WORKER_URL = 'https://sm-proxy.hello-simplifiedmarkets.workers.dev';

async function callAI(sys, usr){
  const r = await fetch(WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ system: sys, user: usr })
  });
  if(!r.ok){
    const err = await r.text();
    throw new Error('Worker error ' + r.status + ': ' + err);
  }
  const d = await r.json();
  if(d.error) throw new Error(d.error);
  return d.text;
}

async function generate(){
  const sel=document.getElementById('topicSel').value;
  const topicIdx = sel==='auto' ? getAutoIdx() : parseInt(sel);
  const topic = TOPICS[topicIdx];
  const postNum = document.getElementById('postNum').value || (topicIdx+1);

  document.getElementById('genBtn').disabled=true;
  document.getElementById('progWrap').style.display='block';
  document.getElementById('outWrap').style.display='none';
  document.getElementById('capPanel').style.display='none';
  setP(5,'Sending to AI…');

  const sys=`You are a finance educator writing Instagram carousel content for "Simplified Markets" — an Indian stock market education page for complete beginners.

Imagine your reader is a 20-year-old college student or a 30-year-old salaried employee who has heard about the stock market but has never invested a single rupee. They are curious but scared. They use Groww or Zerodha ads but have never opened an account. Your job is to make them feel confident and informed — not overwhelmed.

CRITICAL RULES — READ CAREFULLY:
1. ZERO jargon without explanation. Every technical word must be defined in the same sentence it appears.
2. Write like you are explaining to a friend at a chai tapri in simple, warm, conversational English.
3. Use ONLY Indian life analogies — kirana shops, cricket matches, train journeys, gold at weddings, dabbawalas, school exams, Diwali shopping, IPL auctions, etc.
4. Make every fact feel REAL — the Indian stock market is a massive opportunity. Every slide should make the reader feel "I need to learn this."
5. Content must be DETAILED enough that a complete beginner walks away actually understanding the topic — not just a vague one-liner.
6. NO markdown formatting. No asterisks (*), no double asterisks (**), no underscores, no hashes. Plain text only inside all JSON values.
7. ZERO individual company or stock names. Use only generic terms like "a large banking stock" or "a well-known IT sector company."
8. Every statistic must be 100% accurate for India. Use only verified facts: BSE founded 1875, SEBI formed 1992, NIFTY 50 launched 1996. If unsure of a number, use a descriptive phrase instead.
9. The analogy must be a FULL SENTENCE story — not just a label. Example: "Think of it like buying a small piece of your friend's kirana shop — if his business grows, your share grows too, and he shares some profit with you every year as dividend."

Return ONLY a valid JSON object. No markdown fences, no backticks, no explanation. Start with { and end with }:
{
  "hookWord": "2-4 words ALL CAPS punchy label — the topic name simplified",
  "hookSub": "6-9 words — what the reader will understand after this post",
  "context": "25-35 words — explain WHY this stock market topic matters to an Indian beginner right now. Be specific. Mention a real scenario or Indian context.",
  "emojis": ["emoji1","emoji2","emoji3","emoji4"],
  "whatIsIt": "50-65 words — a rich plain-English explanation. Define it fully, then explain what it does in practice with a concrete Indian example. No jargon at all.",
  "analogy": "40-55 words — a full story analogy rooted in Indian everyday life. Start with a scene the reader will recognise instantly. Make it feel real and relatable. This is the most important field.",
  "quickPointIcon": "emoji",
  "quickPoint": "25-35 words — one genuinely surprising or powerful must-know fact about this topic. Make it feel like insider knowledge.",
  "step1Icon": "emoji",
  "step1Title": "4-6 words — name of step 1",
  "step1Desc": "35-45 words — explain this step fully. Use simple language. Tell the reader what happens and why it matters for an Indian investor.",
  "step2Icon": "emoji",
  "step2Title": "4-6 words — name of step 2",
  "step2Desc": "35-45 words — explain this step fully. Use simple language. Tell the reader what happens and why it matters for an Indian investor.",
  "step3Icon": "emoji",
  "step3Title": "4-6 words — name of step 3",
  "step3Desc": "35-45 words — explain this step fully. Use simple language. Tell the reader what happens and why it matters for an Indian investor.",
  "statNumber": "a real verified Indian market number, year or percentage — only if 100% certain",
  "statLabel": "15-20 words — explain what this number means and why it matters for Indian investors",
  "fact1Icon": "emoji",
  "fact1": "25-35 words — a specific verified genuinely interesting fact about this topic in Indian market context. No company names.",
  "fact2Icon": "emoji",
  "fact2": "25-35 words — another specific verified fact. India-specific. No company names.",
  "fact3Icon": "emoji",
  "fact3": "25-35 words — a practical fact that tells the reader how this topic affects their money or investment decisions in India.",
  "mistakeText": "30-40 words — the single biggest mistake Indian beginners make about this topic. Be specific and describe the exact wrong belief or action.",
  "truthText": "30-40 words — correct that mistake with a clear practical explanation. End with what the reader should actually do or understand.",
  "captionHook": "12-18 words — a punchy curiosity-building opening line for the Instagram caption. Make people stop scrolling.",
  "tag1":"#hashtag","tag2":"#hashtag","tag3":"#hashtag","tag4":"#hashtag","tag5":"#hashtag"
}`;

  try{
    setP(22,'AI writing your 6 slides…');
    const raw = await callAI(sys, `Write carousel content for: "${topic}" (Post ${postNum} in the Simplified Markets India series)`);
    let d;
    try{ d=JSON.parse(raw); }
    catch{ const m=raw.match(/\{[\s\S]*\}/); if(m) d=JSON.parse(m[0]); else throw new Error("Could not parse AI response as JSON"); }
    // Strip all markdown stars and formatting from every string value
    function stripMd(s){ return typeof s==='string' ? s.replace(/\*\*|\*|__|##/g,'').trim() : s; }
    Object.keys(d).forEach(k=>{ if(typeof d[k]==='string') d[k]=stripMd(d[k]); });
    d.topic=topic; d.seriesNum=postNum;

    setP(80,'Rendering slides…');
    buildSlides(d, topic, postNum);
    buildCaption(d, topic, postNum);
    if(sel==='auto') advanceIdx();

    setP(100,'✅ Your 6 slides are ready!');
    document.getElementById('outWrap').style.display='block';
    document.getElementById('capPanel').style.display='block';
    document.getElementById('outTitle').textContent=`POST #${postNum} — ${topic.toUpperCase()}`;
    setTimeout(()=>document.getElementById('progWrap').style.display='none', 1400);
  } catch(e){
    setP(0,'⚠ Error: '+e.message);
    console.error(e);
  }
  document.getElementById('genBtn').disabled=false;
}

/* ── TOPBAR INSIDE SLIDE ── */
function tb(label='Save This Post'){
  return `<div class="s-top">
    <div class="s-top-brand">
      <img src="logo.png" alt="SM" crossorigin="anonymous"/>
      <span>SIMPLIFIED MARKETS</span>
    </div>
    <div class="s-save">${label} 🔖</div>
  </div>`;
}
function esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

/* ── SLIDE BUILDERS ── */
function buildSlide1(d, topic, postNum){
  const emojis = d.emojis||['📈','💰','📊','🏦'];
  return `<div class="slide s1" id="slide-0">
    <div class="s1-accent"></div><div class="s1-glow-r"></div><div class="s1-glow-l"></div><div class="s1-grid"></div>
    ${tb()}
    <div class="s1-series"><div class="s1-series-num">POST ${postNum}</div><div class="s1-series-txt">Simplified Markets · India Series</div></div>
    <div class="s1-hook"><span class="hl">${esc(d.hookWord)}</span><br><span style="font-size:30px;letter-spacing:.5px;">${esc(d.hookSub)}</span></div>
    <div class="s1-divider"></div>
    <div class="s1-context">${esc(d.context)}</div>
    <div class="s1-emojis">${emojis.map(e=>`<div class="s1-emoji-chip">${e}</div>`).join('')}</div>
    <div class="s1-swipe"><span class="s1-swipe-txt">Swipe to learn</span><span class="s1-swipe-arr">➜</span></div>
  </div>`;
}

function buildSlide2(d){
  return `<div class="slide s2" id="slide-1">
    <div class="s2-stripe"></div>
    ${tb()}
    <div class="s2-tag">WHAT IS IT?</div>
    <div class="s2-title">Understanding<br><span class="hl">${esc(d.hookWord)}</span></div>
    <div class="s2-def-box">
      <div class="s2-def-label">📖 DEFINITION</div>
      <div class="s2-def-text">${esc(d.whatIsIt)}</div>
    </div>
    <div class="s2-analogy-box">
      <div class="s2-analogy-label">💡 THINK OF IT LIKE THIS</div>
      <div class="s2-analogy-text">${esc(d.analogy)}</div>
    </div>
    <div class="s2-point">
      <span style="font-size:18px;flex-shrink:0;">${d.quickPointIcon||'⚡'}</span>
      <span class="s2-point-text">${esc(d.quickPoint)}</span>
    </div>
    <div class="s2-swipe">Swipe ➜</div>
  </div>`;
}

function buildSlide3(d){
  return `<div class="slide s3" id="slide-2">
    <div class="s3-band"></div>
    ${tb()}
    <div class="s3-tag">HOW IT WORKS</div>
    <div class="s3-title">Step by Step<br>Breakdown</div>
    <div class="s3-steps">
      <div class="s3-step"><div class="s3-step-num n1">${d.step1Icon||'①'}</div><div><div class="s3-step-label">STEP 01</div><div class="s3-step-title">${esc(d.step1Title)}</div><div class="s3-step-desc">${esc(d.step1Desc)}</div></div></div>
      <div class="s3-step"><div class="s3-step-num n2">${d.step2Icon||'②'}</div><div><div class="s3-step-label">STEP 02</div><div class="s3-step-title">${esc(d.step2Title)}</div><div class="s3-step-desc">${esc(d.step2Desc)}</div></div></div>
      <div class="s3-step"><div class="s3-step-num n3">${d.step3Icon||'③'}</div><div><div class="s3-step-label">STEP 03</div><div class="s3-step-title">${esc(d.step3Title)}</div><div class="s3-step-desc">${esc(d.step3Desc)}</div></div></div>
    </div>
    <div class="s3-swipe">Swipe ➜</div>
  </div>`;
}

function buildSlide4(d){
  return `<div class="slide s4" id="slide-3">
    <div class="s4-stripe"></div>
    ${tb()}
    <div class="s4-tag">WHAT YOU NEED TO KNOW</div>
    <div class="s4-title">Key Facts &amp;<br>Numbers</div>
    <div class="s4-stat">
      <div class="s4-stat-num">${esc(d.statNumber)}</div>
      <div class="s4-stat-txt">${esc(d.statLabel)}</div>
    </div>
    <div class="s4-facts">
      <div class="s4-fact"><span class="s4-fact-icon">${d.fact1Icon||'✅'}</span><span class="s4-fact-text">${esc(d.fact1)}</span></div>
      <div class="s4-fact"><span class="s4-fact-icon">${d.fact2Icon||'✅'}</span><span class="s4-fact-text">${esc(d.fact2)}</span></div>
      <div class="s4-fact"><span class="s4-fact-icon">${d.fact3Icon||'✅'}</span><span class="s4-fact-text">${esc(d.fact3)}</span></div>
    </div>
    <div class="s4-swipe">Swipe ➜</div>
  </div>`;
}

function buildSlide5(d){
  // mistake card: top=146, padding=13px top+bottom, text ~2 lines ~40px + label 20px = ~86px total → bottom ≈ 232
  // truth card height ~same → top at 310
  // VS midpoint = (232 + 310) / 2 = 271 → pill centre at 271 → top = 271 - 15 = 256
  return `<div class="slide s5" id="slide-4">
    ${tb()}
    <div class="s5-tag">⚠ COMMON MISTAKE</div>
    <div class="s5-title">Beginners <span class="red">Get This</span><br>Wrong Every Time</div>
    <div class="s5-mistake">
      <div class="s5-ml">❌ THE MISTAKE</div>
      <div class="s5-mt">${esc(d.mistakeText)}</div>
    </div>
    <div style="position:absolute;top:256px;left:14px;right:14px;z-index:10;display:flex;align-items:center;gap:0;">
      <div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.18));"></div>
      <div style="display:flex;align-items:center;gap:8px;padding:0 16px;background:#140820;border:1px solid rgba(255,255,255,.15);border-radius:999px;height:32px;flex-shrink:0;margin:0 8px;">
        <span style="font-size:12px;">❌</span>
        <span style="font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:3px;color:rgba(255,255,255,.5);">VS</span>
        <span style="font-size:12px;">✅</span>
      </div>
      <div style="flex:1;height:1px;background:linear-gradient(90deg,rgba(255,255,255,.18),transparent);"></div>
    </div>
    <div class="s5-truth" style="top:303px;">
      <div class="s5-tl">✅ THE TRUTH</div>
      <div class="s5-tt">${esc(d.truthText)}</div>
    </div>
    <div class="s5-swipe">Swipe ➜</div>
  </div>`;
}

function buildSlide6(){
  return `<div class="slide s6" id="slide-5">
    <div class="s6-glow"></div><div class="s6-grid"></div><div class="s6-accent"></div>
    ${tb('Follow Us')}
    <div class="s6-icon">📌</div>
    <div class="s6-headline">SAVE THIS<br><span class="gold">BEFORE</span><br><span class="teal">YOU FORGET</span></div>
    <div class="s6-rule"></div>
    <div class="s6-follow">
      <p>FOLLOW @SIMPLIFIEDMARKETS</p>
      <small>New lesson every day — from basics to advanced 📈</small>
    </div>
    <div class="s6-tags">
      <div class="s6-tag">#SimplifiedMarkets</div>
      <div class="s6-tag">#IndianStockMarket</div>
      <div class="s6-tag">#LearnToInvest</div>
      <div class="s6-tag">#NIFTY50</div>
    </div>
    <div class="s6-handle">@SIMPLIFIEDMARKETS</div>
  </div>`;
}

function buildSlides(d, topic, postNum){
  const row = document.getElementById('slidesRow');
  row.innerHTML = [
    buildSlide1(d, topic, postNum),
    buildSlide2(d),
    buildSlide3(d),
    buildSlide4(d),
    buildSlide5(d),
    buildSlide6()
  ].map((html,i)=>{
    const col = document.createElement('div');
    col.className='slide-col';
    col.innerHTML = html;
    return col.outerHTML;
  }).join('');
  document.getElementById('nav-logo').src='logo.png';
}

/* ── CAPTION ── */
function buildCaption(d, topic, postNum){
  const cap =
`📊 ${topic}

${d.captionHook||'Every Indian investor needs to understand this.'}

Swipe through all 6 slides — broken down simply so anyone can understand, even if you are starting from zero.

💾 Save this post — come back to it anytime.
🔁 Share it with someone learning about investing.
👇 Comment: What topic do you want to see next?

📲 Follow @SimplifiedMarkets for a new finance lesson every day.
From stock market basics to advanced strategies — simplified for India.

${d.tag1||''} ${d.tag2||''} ${d.tag3||''} ${d.tag4||''} ${d.tag5||''}
#SimplifiedMarkets #IndianStockMarket #NSE #BSE #SEBI #NIFTY50 #SENSEX #LearnToInvest #StockMarketIndia #InvestingForBeginners #FinancialLiteracy #ShareMarket #MoneyMatters #WealthBuilding #FinancialFreedom`;
  document.getElementById('capBody').textContent = cap;
}

function copyCaption(){
  navigator.clipboard.writeText(document.getElementById('capBody').textContent).then(()=>{
    const b=document.getElementById('copyBtn');
    b.textContent='✅ Copied!';
    setTimeout(()=>b.textContent='📋 COPY', 2000);
  });
}

/* ── DOWNLOAD — works natively when hosted on real domain ── */
// Shared: render one slide to canvas and return PNG blob
// Single click — downloads all 6 slides as individual PNGs one after another
async function downloadAll(){
  const btn = document.getElementById('dlBtn');
  btn.disabled = true;

  for(let i = 0; i < 6; i++){
    btn.textContent = `⏳ Saving slide ${i+1} of 6…`;
    try {
      const el = document.getElementById('slide-'+i);
      const canvas = await html2canvas(el, {
        scale: 3,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#0D1B35',
        logging: false,
        width: 432,
        height: 540
      });
      const link = document.createElement('a');
      link.download = `SM-slide-${i+1}.png`;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      await new Promise(r => setTimeout(r, 900));
    } catch(e){
      console.error('Slide '+i+' error:', e);
    }
  }

  btn.textContent = '⬇ Download All 6 Slides';
  btn.disabled = false;
}
