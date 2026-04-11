const TOPICS = [
  "What Is the Stock Market?","What Is a Stock or Share?","What Is a Stock Exchange? (NSE and BSE)",
  "Who Are the Players in the Market?","How Does Trading Actually Work?","What Is SEBI and Why It Matters?",
  "What Is the NIFTY 50?","What Is the SENSEX?","What Is Market Capitalisation?","What Is an IPO?",
  "What Is a Dividend?","What Is a Demat Account?","What Is a Portfolio?","Buy vs Sell vs Hold",
  "Bulls vs Bears — Market Moods Explained","How to Read a Stock Price","What Are Market Hours in India?",
  "What Is Volume and Liquidity?","What Is an ETF?","What Is a Mutual Fund?","What Is an Index Fund?",
  "Risk vs Reward — The Golden Rule","Types of Orders: Market, Limit, Stop Loss","Bid-Ask Spread Explained Simply",
  "What Is the Circuit Breaker Rule?","What Is Short Selling?","What Is Intraday Trading?",
  "What Is Delivery Trading?","What Is Swing Trading?","What Is Position Sizing?",
  "Stop Loss and Take Profit Strategy","What Is a Trading Journal?","What Is Technical Analysis?",
  "Candlestick Charts Explained","Support and Resistance Levels","Trend Lines — How to Draw Them",
  "Moving Averages: SMA vs EMA","What Is RSI?","What Is MACD?","Bollinger Bands Explained",
  "Head and Shoulders Pattern","Double Top and Double Bottom","Fibonacci Retracement",
  "Cup and Handle Pattern","Fundamental vs Technical Analysis","What Is P/E Ratio?",
  "How to Read an Annual Report","What Is EPS?","What Is Free Cash Flow?",
  "What Is Debt-to-Equity Ratio?","How to Read Earnings Reports","Sector Rotation Explained",
  "Options — Calls and Puts","What Is Margin Trading?","Psychology of Trading",
  "Dollar Cost Averaging (SIP in Stocks)","What Is Compound Interest?","Value Investing vs Growth Investing",
  "Why Do Markets Crash?","How the RBI Moves the Market","How to Spot a Pump and Dump",
  "What Is Insider Trading?","Biases That Destroy Wealth","How to Build Your First Investment Plan",
  "The 5 Golden Rules of Investing in India"
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

STRICT RULES:
1. Audience: Indians who have NEVER invested. Use the simplest possible language.
2. India-first always: NSE, BSE, SEBI, NIFTY 50, SENSEX, ₹ Rupees, Indian market context.
3. ZERO individual stock or company names. Never mention any specific company. Use only generic terms like "a large-cap stock", "a well-known IT company", "a PSU bank stock". This is non-negotiable.
4. Any statistic or number you write MUST be 100% verified and accurate for India. Do not guess. Only use well-known confirmed facts (BSE founded 1875, SEBI formed 1992, NIFTY 50 launched 1996, etc.). If unsure of a number, use a descriptive phrase instead.
5. Analogies must use everyday Indian life: chai tapri, kirana shop, cricket match, train journey, dabba system, wedding gold, etc.

Return ONLY a valid JSON object. No markdown fences, no explanation:
{
  "hookWord": "2-4 words ALL CAPS punchy label for the topic",
  "hookSub": "5-8 words completing the hook sentence",
  "context": "max 20 words — why this matters to an Indian beginner right now",
  "emojis": ["emoji1","emoji2","emoji3","emoji4"],
  "whatIsIt": "max 35 words — plain English definition, India context",
  "analogy": "max 30 words — Indian everyday life analogy starting with a scene",
  "quickPointIcon": "one emoji",
  "quickPoint": "max 18 words — one essential must-know fact",
  "step1Icon": "emoji", "step1Title": "max 5 words", "step1Desc": "max 24 words plain English",
  "step2Icon": "emoji", "step2Title": "max 5 words", "step2Desc": "max 24 words plain English",
  "step3Icon": "emoji", "step3Title": "max 5 words", "step3Desc": "max 24 words plain English",
  "statNumber": "a verified Indian market number or year or ₹ amount — ONLY if 100% certain",
  "statLabel": "max 12 words explaining this statistic in Indian context",
  "fact1Icon": "emoji", "fact1": "max 18 words verified India-specific fact, no company names",
  "fact2Icon": "emoji", "fact2": "max 18 words verified India-specific fact, no company names",
  "fact3Icon": "emoji", "fact3": "max 18 words verified India-specific fact, no company names",
  "mistakeText": "max 22 words — the single most common mistake Indian beginners make about this topic",
  "truthText": "max 22 words — the correct understanding, actionable for an Indian beginner",
  "captionHook": "max 14 words — compelling Instagram caption opener for Indian investors",
  "tag1": "#hashtag", "tag2": "#hashtag", "tag3": "#hashtag", "tag4": "#hashtag", "tag5": "#hashtag"
}`;

  try{
    setP(22,'AI writing your 6 slides…');
    const raw = await callAI(sys, `Write carousel content for: "${topic}" (Post ${postNum} in the Simplified Markets India series)`);
    let d;
    try{ d=JSON.parse(raw); }
    catch{ const m=raw.match(/\{[\s\S]*\}/); if(m) d=JSON.parse(m[0]); else throw new Error("Could not parse AI response as JSON"); }

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
async function downloadAll(){
  const btn = document.getElementById('dlBtn');
  btn.disabled = true;

  try {
    // Slide dimensions: 432 x 540 px
    // PDF page size: same ratio — use mm (432/540 * 100 = 80 x 100mm)
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [108, 135]   // 432x540 at 4px per mm = 108x135 mm
    });

    for(let i = 0; i < 6; i++){
      btn.textContent = `⏳ Rendering slide ${i+1} of 6…`;

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

      const imgData = canvas.toDataURL('image/jpeg', 0.92);

      if(i > 0) pdf.addPage([108, 135], 'portrait');
      pdf.addImage(imgData, 'JPEG', 0, 0, 108, 135);

      await new Promise(r => setTimeout(r, 300));
    }

    btn.textContent = '💾 Saving PDF…';
    pdf.save('SimplifiedMarkets-Carousel.pdf');

  } catch(e) {
    console.error('PDF error:', e);
    alert('Error creating PDF: ' + e.message);
  }

  btn.textContent = '⬇ Download All 6 Slides (PDF)';
  btn.disabled = false;
}
