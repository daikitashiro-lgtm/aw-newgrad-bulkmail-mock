(() => {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ---------- ダミーデータ ----------
  const JOBS = [
    { id: '1234590', type: 'course', season: 'IS', name: '冬のインターンシップ（5days）', years: ['28'], created: '2026/11/05', posted: true, place: '東京都・本社' },
    { id: '1234591', type: 'entry', season: 'IS', name: '株式会社サンプル 企業エントリー（IS期）', years: ['28'], created: '2026/10/30', posted: true, place: '' },
    { id: '1234588', type: 'course', season: 'IS', name: '秋の1day仕事体験（オンライン）', years: ['28'], created: '2026/10/12', posted: true, place: 'オンライン' },
    { id: '1234587', type: 'course', season: 'IS', name: '秋の1day仕事体験（東京）', years: ['28'], created: '2026/10/10', posted: true, place: '東京都・本社' },
    { id: '1234582', type: 'course', season: 'IS', name: '夏の1day仕事体験（大阪）', years: ['28'], created: '2026/06/20', posted: false, place: '大阪府・大阪支社' },
    { id: '1234581', type: 'course', season: 'IS', name: '夏のインターンシップ（3days）', years: ['28'], created: '2026/06/15', posted: true, place: '東京都・本社' },
    { id: '1234570', type: 'seminar', season: 'main', name: '会社説明会・座談会', years: ['27', '28'], created: '2026/11/02', posted: true, place: '東京都' },
    { id: '1234575', type: 'entry', season: 'main', name: '株式会社サンプル 企業エントリー', years: ['27'], created: '2026/10/28', posted: true, place: '' },
    { id: '1234580', type: 'course', season: 'main', name: '総合職コース（関西）', years: ['27'], created: '2026/10/20', posted: true, place: '大阪府・大阪支社' },
    { id: '1234573', type: 'seminar', season: 'main', name: '大阪会場 会社説明会', years: ['27'], created: '2026/10/15', posted: true, place: '大阪府' },
    { id: '1234569', type: 'course', season: 'main', name: '営業職コース', years: ['27'], created: '2026/10/03', posted: true, place: '東京都・本社／大阪府・大阪支社' },
    { id: '1234567', type: 'course', season: 'main', name: '総合職コース', years: ['27'], created: '2026/10/01', posted: true, place: '東京都・本社' },
    { id: '1234568', type: 'course', season: 'main', name: 'エンジニアコース', years: ['28'], created: '2026/09/20', posted: true, place: '東京都・本社' },
    { id: '1234572', type: 'seminar', season: 'main', name: 'エンジニア向け説明会', years: ['28'], created: '2026/09/15', posted: true, place: 'オンライン' },
  ];
  const SLOTS = {
    '1234570': [
      { id: 'a', mon: '2026年10月', label: '10/24（土）10:00〜11:00', venue: '東京都・本社', cap: 30, past: true },
      { id: 'b', mon: '2026年10月', label: '10/31（土）14:00〜15:00', venue: 'オンライン', cap: 50, past: true },
      { id: 'c', mon: '2026年12月', label: '12/5（土）10:00〜11:00', venue: '東京都・本社（A日程）', cap: 30 },
      { id: 'd', mon: '2026年12月', label: '12/5（土）14:00〜15:00', venue: '東京都・本社（B日程）', cap: 6 },
      { id: 'e', mon: '2026年12月', label: '12/12（土）10:00〜11:00', venue: '大阪府・大阪支社', cap: 30 },
      { id: 'f', mon: '2026年12月', label: '12/19（土）13:00〜14:00', venue: 'オンライン', cap: 50 },
      { id: 'g', mon: '2027年1月', label: '1/9（土）10:00〜11:00', venue: '東京都・本社', cap: 30 },
    ],
    '1234573': [
      { id: 'a', mon: '2026年12月', label: '12/13（日）10:00〜11:00', venue: '大阪府・大阪支社', cap: 20 },
      { id: 'b', mon: '2027年1月', label: '1/17（日）10:00〜11:00', venue: '大阪府・大阪支社', cap: 20 },
    ],
    '1234572': [
      { id: 'a', mon: '2026年11月', label: '11/7（土）19:00〜20:00', venue: 'オンライン', cap: 100, past: true },
      { id: 'b', mon: '2026年12月', label: '12/8（火）19:00〜20:00', venue: 'オンライン', cap: 100 },
    ],
  };
  const TYPE_LABEL = { course: ['コース', ''], seminar: ['説明会', 'ev'], entry: ['企業エントリー', 'en'] };
  const STATUSES = ['未対応', '書類送付依頼', '書類選考中', '書類合格', '面接調整開始', '面接日確定', '面接合格', '面接不合格', '内定通知'];
  const NOTICES = ['新着応募', '新着メールあり', '面接日回答あり'];

  const people = [
    ['青空 太郎', 21, '男性', '大学生', '東京都', '27'], ['青空 花子', 22, '女性', '大学生', '神奈川県', '27'], ['海野 さくら', 21, '女性', '大学生', '東京都', '28'],
    ['森田 健太', 22, '男性', '大学院生', '東京都', '27'], ['川口 美咲', 21, '女性', '大学生', '千葉県', '27'], ['山本 大輔', 22, '男性', '大学生', '大阪府', '27'],
    ['小林 葵', 21, '女性', '短大生', '埼玉県', '27'], ['佐藤 優花', 21, '女性', '大学生', '東京都', '28'], ['鈴木 翔', 20, '男性', '大学生', '大阪府', '28'],
    ['田中 陽菜', 21, '女性', '大学生', '神奈川県', '27'], ['高橋 蓮', 22, '男性', '大学院生', '埼玉県', '27'], ['伊藤 美月', 20, '女性', '大学生', '千葉県', '28'],
    ['渡辺 大和', 22, '男性', '大学生', '愛知県', '27'], ['山田 結衣', 21, '女性', '短大生', '東京都', '27'], ['中村 湊', 21, '男性', '大学生', '兵庫県', '28'],
    ['小川 凛', 20, '女性', '大学生', '京都府', '28'], ['加藤 悠真', 22, '男性', '大学生', '東京都', '27'], ['吉田 心春', 21, '女性', '大学生', '神奈川県', '28'],
    ['松本 陽向', 21, '男性', '大学生', '福岡県', '27'], ['井上 紬', 20, '女性', '大学生', '東京都', '28'], ['木村 蒼', 22, '男性', '大学生', '大阪府', '27'],
    ['林 杏', 21, '女性', '大学生', '埼玉県', '28'], ['清水 樹', 22, '男性', '大学院生', '東京都', '27'], ['斎藤 澪', 21, '女性', '大学生', '千葉県', '27'],
  ];
  const MEMOS = ['', '', '', 'IS参加済み', 'IS参加済み', '説明会参加済み', '説明会予約済み', 'ES提出依頼済み', 'IS参加済み／ES提出依頼済み', '一次合格', '1day参加済み', '書類提出済み', '営業職を第一志望'];
  let seed = 7;
  const rnd = (n) => { seed = (seed * 9301 + 49297) % 233280; return Math.floor((seed / 233280) * n); };

  const APPS = [];
  let n = 0;
  const day = (k) => { const d = new Date(2026, 10, 11 - k, 8 + (k * 7) % 14, (k * 13) % 60); return d; };
  const fmt = (d) => `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  people.forEach((p, i) => {
    const cand = JOBS.filter((j) => j.years.includes(p[5]));
    const cnt = i % 4 === 0 ? 3 : i % 3 === 0 ? 2 : 2;
    const picked = new Set();
    const when = day(i % 40);
    for (let k = 0; k < cnt; k++) {
      let j = cand[rnd(cand.length)];
      let guard = 0;
      while (picked.has(j.id) && guard++ < 10) j = cand[rnd(cand.length)];
      if (picked.has(j.id)) continue;
      picked.add(j.id);
      let slot = null;
      if (j.type === 'seminar') {
        const s = SLOTS[j.id];
        const r = rnd(4);
        slot = r === 0 ? null : s[rnd(s.length)].id;
      }
      const labels = [];
      if (rnd(5) === 0) labels.push(['pk', '新着メール']);
      if (rnd(6) === 0) labels.push(['pk', '面接日回答あり']);
      if (rnd(5) === 0) labels.push(['bl', 'New']);
      if (rnd(8) === 0) labels.push(['gy', '送信予約中']);
      const d = k === 0 || i % 4 === 0 ? when : day((i * 3 + k * 5) % 40);
      APPS.push({
        id: ++n, name: p[0], age: p[1], gender: p[2], school: p[3], pref: p[4], year: p[5],
        job: j.id, slot, status: STATUSES[rnd(STATUSES.length)], memo: MEMOS[rnd(MEMOS.length)], labels, date: d,
      });
    }
  });
  APPS.sort((a, b) => b.date - a.date || a.id - b.id);
  const jobById = (id) => JOBS.find((j) => j.id === id);

  // ---------- 状態 ----------
  const F = { years: [], jobs: [], slots: [], memo: '', kw: '', memoEmpty: false, prefs: [], date: '', statuses: [], notice: '' };
  let detailOpen = false;
  let page = 1;
  const PER = 30;
  let selected = new Set();
  let results = [];

  // ---------- 絞り込み ----------
  const within = (d, days) => (new Date(2026, 10, 11) - d) / 86400000 < days;
  function filterApps() {
    return APPS.filter((a) => {
      if (F.years.length && !F.years.includes(a.year)) return false;
      if (F.jobs.length || F.slots.length) {
        const hitJob = F.jobs.includes(a.job);
        const hitSlot = F.slots.some((s) => { const [jid, sid] = s.split(':'); return jid === a.job && (sid === 'none' ? a.slot === null : a.slot === sid); });
        if (!hitJob && !hitSlot) return false;
      }
      if (F.memoEmpty && a.memo) return false;
      if (F.memo && !F.memo.split(/\s+/).every((w) => a.memo.includes(w))) return false;
      if (F.kw) {
        const j = jobById(a.job);
        const hay = [a.name, j.name, j.id, j.place, '正社員', '新卒'].join(' ');
        if (!F.kw.split(/\s+/).every((w) => hay.includes(w))) return false;
      }
      if (F.prefs.length && !F.prefs.includes(a.pref)) return false;
      if (F.date && !within(a.date, Number(F.date))) return false;
      if (F.statuses.length && !F.statuses.includes(a.status)) return false;
      if (F.notice === '新着応募' && !a.labels.some((l) => l[1] === 'New')) return false;
      if (F.notice === '新着メールあり' && !a.labels.some((l) => l[1] === '新着メール')) return false;
      if (F.notice === '面接日回答あり' && !a.labels.some((l) => l[1] === '面接日回答あり')) return false;
      return true;
    });
  }

  function search(keepSelection) {
    results = filterApps();
    page = 1;
    if (!keepSelection) selected = new Set();
    render();
  }

  // ---------- 表示 ----------
  const slotLabel = (jid, sid) => (sid === 'none' ? '未予約' : SLOTS[jid].find((s) => s.id === sid).label);
  function courseSummary() {
    const nj = F.jobs.length;
    const ns = F.slots.length;
    if (!nj && !ns) return '';
    if (nj === 1 && !ns) return jobById(F.jobs[0]).name;
    const parts = [];
    if (nj) parts.push(`${nj}求人`);
    if (ns) parts.push(`${ns}枠`);
    return parts.join('・');
  }

  function renderSearch() {
    $('yearVal').innerHTML = F.years.length ? `<span class="on-v">${F.years.map((y) => y + '卒').join('、')}</span>` : 'すべて';
    const cs = courseSummary();
    $('courseVal').innerHTML = cs ? `<span class="on-v">${esc(cs)}</span>` : 'すべて';
    $('memoEmptyBox').classList.toggle('on', F.memoEmpty);
    $('memoBox').classList.toggle('dis', F.memoEmpty);
    $('memoIn').disabled = F.memoEmpty;
    const detailCount = [F.prefs.length, F.date, F.statuses.length, F.notice].filter(Boolean).length;
    $('moreBtn').textContent = detailOpen ? '詳しい条件を閉じる ▲' : `詳しい条件${detailCount ? `（${detailCount}件適用中）` : ''} ▼`;
    $('detail').classList.toggle('open', detailOpen);
    const chip = (btn, val, on, text) => { $(btn).classList.toggle('on', on); $(val).textContent = text; };
    chip('prefBtn', 'prefVal', F.prefs.length > 0, F.prefs.length ? (F.prefs.length > 1 ? `${F.prefs[0]} ほか${F.prefs.length - 1}件` : F.prefs[0]) : 'すべて');
    chip('dateBtn', 'dateVal', !!F.date, F.date ? `直近${F.date}日` : '指定なし');
    chip('statusBtn', 'statusVal', F.statuses.length > 0, F.statuses.length ? (F.statuses.length > 1 ? `${F.statuses[0]} ほか${F.statuses.length - 1}件` : F.statuses[0]) : 'すべて');
    chip('noticeBtn', 'noticeVal', !!F.notice, F.notice || 'すべて');
  }

  function renderApplied() {
    const tags = [];
    if (F.years.length) tags.push(['years', `卒業年度：${F.years.map((y) => y + '卒').join('、')}`]);
    F.jobs.forEach((j) => tags.push([`job:${j}`, jobById(j).name]));
    F.slots.forEach((s) => { const [jid, sid] = s.split(':'); tags.push([`slot:${s}`, `${jobById(jid).name}：${slotLabel(jid, sid)}`]); });
    if (F.memo) tags.push(['memo', `メモ：${F.memo}`]);
    if (F.kw) tags.push(['kw', `応募者名・求人：${F.kw}`]);
    if (F.memoEmpty) tags.push(['memoEmpty', 'メモが空の人だけ']);
    if (F.prefs.length) tags.push(['prefs', `現住所：${F.prefs.join('、')}`]);
    if (F.date) tags.push(['date', `応募日：直近${F.date}日`]);
    if (F.statuses.length) tags.push(['statuses', `対応状況：${F.statuses.join('、')}`]);
    if (F.notice) tags.push(['notice', `お知らせ：${F.notice}`]);
    $('applied').innerHTML = tags.length
      ? `<span class="t">絞り込み中</span>${tags.map(([k, t]) => `<span class="tag">${esc(t)}<span class="x" data-k="${esc(k)}">✕</span></span>`).join('')}<span class="all" id="clearAll">条件をすべてクリア</span>`
      : '';
  }

  function pageRows() { return results.slice((page - 1) * PER, page * PER); }

  function renderTable() {
    const rows = pageRows();
    $('total').textContent = results.length.toLocaleString();
    $('empty').style.display = results.length ? 'none' : 'block';
    $('tbody').innerHTML = rows.map((a) => {
      const j = jobById(a.job);
      const lbls = a.labels.length ? `<div class="lbls">${a.labels.map((l) => `<span class="lbl ${l[0]}">${l[1]}</span>`).join('')}</div>` : '';
      let sub = j.place;
      if (j.type === 'seminar') {
        if (a.slot) { const s = SLOTS[j.id].find((x) => x.id === a.slot); sub = `${s.label}　${s.venue}`; } else sub = '参加希望（特定の日程なし）';
      }
      const st = a.status === '未対応' ? '<div class="st ng">⚠ 未対応<span class="cv">▼</span></div>' : `<div class="st">${a.status}<span class="cv">▼</span></div>`;
      const mm = a.memo ? `<div class="mm"><span class="pen">✎</span>${esc(a.memo)}</div>` : '<div class="mm ph"><span class="pen">✎</span>メモを入力できます</div>';
      const on = selected.has(a.id);
      return `<tr class="${on ? 'sel' : ''}"><td><span class="box ${on ? 'on' : ''}" data-id="${a.id}"></span></td>
        <td>${lbls}<div class="dt">${fmt(a.date)}</div><div class="nm">${esc(a.name)}</div><div class="mt">${a.age}歳／${a.gender}／${a.school}／${a.pref}</div></td>
        <td><span class="jt">正社員・新卒${a.year}卒</span><div>[${j.id}] ${esc(j.name)}</div>${sub ? `<div class="js">${esc(sub)}</div>` : ''}</td>
        <td>${st}</td><td>${mm}</td><td class="ops">編集<br>削除</td></tr>`;
    }).join('');
    const pages = Math.max(1, Math.ceil(results.length / PER));
    $('pager').innerHTML = results.length > PER
      ? `<span data-p="${Math.max(1, page - 1)}">‹</span>${Array.from({ length: pages }, (_, i) => `<span class="${i + 1 === page ? 'on' : ''}" data-p="${i + 1}">${i + 1}</span>`).join('')}<span data-p="${Math.min(pages, page + 1)}">›</span>`
      : '';
    $('pinfo').textContent = results.length ? `${results.length}件中 ${(page - 1) * PER + 1}〜${Math.min(page * PER, results.length)}件目` : '';
  }

  function renderBar() {
    const rows = pageRows();
    const total = results.length;
    const pageN = rows.length;
    const cnt = selected.size;
    const pageAllSel = pageN > 0 && rows.every((a) => selected.has(a.id));
    const allSel = total > 0 && cnt === total;
    const pageActive = pageAllSel && !allSel && cnt === pageN;
    $('headBox').classList.toggle('on', pageAllSel);
    const cls = cnt === 0 ? 'none' : allSel ? 'all' : '';
    $('bar2').className = `bar2 ${cls}`;
    $('bar2').innerHTML = `<span class="sc"><b>${cnt}</b>件を選択中</span>
      <div class="selbtns"><span class="sb ${pageActive ? 'on' : ''}" id="selPage">このページの全件を選択<span class="n">${pageN}件</span></span><span class="sb ${allSel ? 'on' : ''}" id="selAll">検索結果の全件を選択<span class="n">${total}件</span></span></div>
      <span class="rs" id="selClear">${cnt ? '選択を解除' : ''}</span>
      <div class="primary ${cnt ? '' : 'dis'}" id="sendBtn">${cnt ? `選択した${cnt}件にメールを送る` : '選択した応募にメールを送る'}</div>`;
  }

  function renderAlerts() {
    const mail = $('demoMail').value;
    const dl = $('demoDl').value;
    const lines = [];
    const subj = '【12/5開催】会社説明会のご案内';
    if (mail === 'rsv' || mail === 'rsv2') {
      lines.push(`<div class="sl info"><span class="ic">◷</span><span class="cat">一括メール</span><span class="msg"><b>12/1（月）10:00</b> に送信予約中</span><span class="sub">件名：${subj}　宛先：46件${mail === 'rsv2' ? '　ほかに予約1件' : ''}</span><span class="sp"></span><span class="lk" data-toast="一括送付履歴（モックでは省略）">一括送付履歴で確認・取り消し</span></div>`);
    } else if (mail === 'run' || mail === 'runrsv') {
      lines.push(`<div class="sl info"><span class="ic">↻</span><span class="cat">一括メール</span><span class="msg"><b>送信中</b>：${subj}</span>${mail === 'runrsv' ? '<span class="sub">ほかに予約1件（12/1（月）10:00）</span>' : ''}<span class="sp"></span><span class="lk" data-toast="画面を開き直したときと同じく、状況を取り直します">更新して状況を確認する</span>${mail === 'runrsv' ? '<span class="lk" data-toast="一括送付履歴（モックでは省略）">一括送付履歴</span>' : ''}</div>`);
    }
    if (dl === 'run') lines.push('<div class="sl info"><span class="ic">↻</span><span class="cat">ダウンロード</span><span class="msg">ダウンロードデータを作成しています</span><span class="sp"></span><span class="lk" data-toast="画面を開き直したときと同じく、状況を取り直します">更新して状況を確認する</span></div>');
    if (dl === 'ok') lines.push('<div class="sl ok"><span class="ic">✓</span><span class="cat">ダウンロード</span><span class="msg">ダウンロードデータを作成しました</span><span class="sub">11/12（木）9:44 までダウンロードできます</span><span class="sp"></span><span class="mini" data-toast="ファイルをダウンロードします（モック）">一括ダウンロードする</span></div>');
    if (dl === 'ng') lines.push('<div class="sl ng"><span class="ic">!</span><span class="cat">ダウンロード</span><span class="msg">データ作成途中で失敗しました。再度一括ダウンロードを行なってください。</span><span class="sp"></span></div>');
    $('alerts').innerHTML = lines.join('');
    const dlBtn = $('dlBtn');
    dlBtn.classList.toggle('dis', dl === 'run');
    dlBtn.textContent = dl === 'run' ? '⤓ 一括ダウンロードする（作成中）' : '⤓ 一括ダウンロードする';
  }

  function render() { renderSearch(); renderApplied(); renderTable(); renderBar(); renderAlerts(); }

  let toastTimer;
  function toast(msg) { const t = $('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2200); }

  // ---------- ドロップダウン ----------
  function closeDDs(except) { document.querySelectorAll('.dd.open').forEach((d) => { if (d !== except) d.classList.remove('open'); }); }
  function multiDD(btnId, ddId, title, options, getSel, setSel) {
    $(btnId).addEventListener('click', (e) => {
      e.stopPropagation();
      const dd = $(ddId);
      if (dd.classList.contains('open')) { dd.classList.remove('open'); return; }
      closeDDs(dd);
      const tmp = new Set(getSel());
      const draw = () => {
        dd.innerHTML = `<div class="dh">${title}</div>${options.map((o) => `<label data-v="${esc(o.v)}"><span class="box ${tmp.has(o.v) ? 'on' : ''}"></span>${esc(o.t)}</label>`).join('')}<div class="df"><span data-a="clear">すべて解除</span><span class="ok" data-a="ok">決定</span></div>`;
      };
      draw();
      dd.onclick = (ev) => {
        ev.stopPropagation();
        const l = ev.target.closest('label');
        const a = ev.target.closest('[data-a]');
        if (l) { const v = l.dataset.v; tmp.has(v) ? tmp.delete(v) : tmp.add(v); draw(); }
        if (a && a.dataset.a === 'clear') { tmp.clear(); draw(); }
        if (a && a.dataset.a === 'ok') { setSel(options.map((o) => o.v).filter((v) => tmp.has(v))); dd.classList.remove('open'); search(); }
      };
      dd.classList.add('open');
    });
  }
  function singleDD(btnId, ddId, options, get, set) {
    $(btnId).addEventListener('click', (e) => {
      e.stopPropagation();
      const dd = $(ddId);
      if (dd.classList.contains('open')) { dd.classList.remove('open'); return; }
      closeDDs(dd);
      dd.innerHTML = options.map((o) => `<div class="opt ${get() === o.v ? 'on' : ''}" data-v="${esc(o.v)}">${esc(o.t)}</div>`).join('');
      dd.onclick = (ev) => { ev.stopPropagation(); const o = ev.target.closest('.opt'); if (!o) return; set(o.dataset.v); dd.classList.remove('open'); search(); };
      dd.classList.add('open');
    });
  }
  document.addEventListener('click', () => closeDDs());

  multiDD('yearBtn', 'yearDD', '学生の卒業年度（複数選べます）', ['26', '27', '28', '29'].map((y) => ({ v: y, t: y + '卒' })), () => F.years, (v) => { F.years = v; });
  const prefList = [...new Set(APPS.map((a) => a.pref))];
  multiDD('prefBtn', 'prefDD', '現住所の都道府県（複数選べます）', prefList.map((p) => ({ v: p, t: p })), () => F.prefs, (v) => { F.prefs = v; });
  singleDD('dateBtn', 'dateDD', [{ v: '', t: '指定なし' }, { v: '7', t: '直近7日' }, { v: '30', t: '直近30日' }], () => F.date, (v) => { F.date = v; });
  multiDD('statusBtn', 'statusDD', '対応状況（複数選べます）', STATUSES.map((s) => ({ v: s, t: s })), () => F.statuses, (v) => { F.statuses = v; });
  singleDD('noticeBtn', 'noticeDD', [{ v: '', t: 'すべて' }, ...NOTICES.map((s) => ({ v: s, t: s }))], () => F.notice, (v) => { F.notice = v; });

  // ---------- 検索欄 ----------
  $('searchBtn').onclick = () => { F.memo = F.memoEmpty ? '' : $('memoIn').value.trim(); F.kw = $('kwIn').value.trim(); search(); };
  ['memoIn', 'kwIn'].forEach((id) => $(id).addEventListener('keydown', (e) => { if (e.key === 'Enter') $('searchBtn').onclick(); }));
  $('memoEmptyLbl').onclick = () => {
    F.memoEmpty = !F.memoEmpty;
    if (F.memoEmpty) { $('memoIn').value = ''; F.memo = ''; }
    search();
  };
  $('moreBtn').onclick = () => { detailOpen = !detailOpen; renderSearch(); };
  function clearAll() {
    Object.assign(F, { years: [], jobs: [], slots: [], memo: '', kw: '', memoEmpty: false, prefs: [], date: '', statuses: [], notice: '' });
    $('memoIn').value = ''; $('kwIn').value = '';
    search();
  }
  $('clearBtn').onclick = clearAll;
  $('applied').addEventListener('click', (e) => {
    if (e.target.id === 'clearAll') { clearAll(); return; }
    const k = e.target.dataset.k;
    if (!k) return;
    if (k.startsWith('job:')) F.jobs = F.jobs.filter((j) => j !== k.slice(4));
    else if (k.startsWith('slot:')) F.slots = F.slots.filter((s) => s !== k.slice(5));
    else if (k === 'memo') { F.memo = ''; $('memoIn').value = ''; }
    else if (k === 'kw') { F.kw = ''; $('kwIn').value = ''; }
    else if (k === 'memoEmpty') F.memoEmpty = false;
    else if (k === 'date' || k === 'notice') F[k] = '';
    else F[k] = [];
    search();
  });

  // ---------- 選択 ----------
  $('tbody').addEventListener('click', (e) => {
    const b = e.target.closest('.box[data-id]');
    if (!b) return;
    const id = Number(b.dataset.id);
    selected.has(id) ? selected.delete(id) : selected.add(id);
    renderTable(); renderBar();
  });
  $('headBox').onclick = () => {
    const rows = pageRows();
    const all = rows.length && rows.every((a) => selected.has(a.id));
    rows.forEach((a) => (all ? selected.delete(a.id) : selected.add(a.id)));
    renderTable(); renderBar();
  };
  $('bar2').addEventListener('click', (e) => {
    const t = e.target.closest('[id]');
    if (!t) return;
    const rows = pageRows();
    if (t.id === 'selPage') {
      const active = t.classList.contains('on');
      selected = new Set(active ? [] : rows.map((a) => a.id));
    } else if (t.id === 'selAll') {
      const active = t.classList.contains('on');
      selected = new Set(active ? [] : results.map((a) => a.id));
    } else if (t.id === 'selClear') {
      selected = new Set();
    } else if (t.id === 'sendBtn') {
      if (selected.size) toast(`メール作成へ進みます（${selected.size}件）。このモックでは省略しています`);
      return;
    } else return;
    renderTable(); renderBar();
  });
  $('pager').addEventListener('click', (e) => {
    const p = e.target.dataset.p;
    if (!p) return;
    page = Number(p);
    renderTable(); renderBar();
  });
  $('dlBtn').onclick = () => { if (!$('dlBtn').classList.contains('dis')) { $('demoDl').value = 'run'; renderAlerts(); toast('ダウンロードデータの作成を始めました'); } };
  document.body.addEventListener('click', (e) => { const t = e.target.closest('[data-toast]'); if (t) toast(t.dataset.toast); });
  $('demoMail').onchange = renderAlerts;
  $('demoDl').onchange = renderAlerts;

  // ---------- コース・日程枠モーダル ----------
  const M = { season: 'IS', tab: 'all', q: '', year: '', ended: false, focus: null, showPast: false, jobs: new Set(), slots: new Set() };
  const appsOfJob = (jid) => APPS.filter((a) => a.job === jid);
  function visibleJobs(ignoreTab) {
    return JOBS.filter((j) => (M.season === 'all' || j.season === M.season)
      && (ignoreTab || M.tab === 'all' || j.type === M.tab)
      && (M.ended || j.posted)
      && (!M.year || j.years.includes(M.year))
      && (!M.q || j.name.includes(M.q) || j.id.includes(M.q)))
      .sort((a, b) => b.created.localeCompare(a.created));
  }
  function openModal() {
    Object.assign(M, { season: 'IS', tab: 'all', q: '', year: '', ended: false, focus: null, showPast: false, jobs: new Set(F.jobs), slots: new Set(F.slots) });
    const firstSel = [...M.jobs, ...[...M.slots].map((s) => s.split(':')[0])].map(jobById)[0];
    if (firstSel) M.season = firstSel.season;
    $('mdQ').value = ''; $('mdYear').value = '';
    $('ov').classList.add('open'); $('md').classList.add('open');
    renderModal();
  }
  function closeModal() { $('ov').classList.remove('open'); $('md').classList.remove('open'); }
  function renderModal() {
    const isIS = M.season === 'IS';
    $('mdDesc').textContent = isIS
      ? '絞り込みたい求人を選んでください。IS期の求人は、コース求人と企業エントリー求人だけです（日程枠はありません）。'
      : '絞り込みたい求人を左で選んでください。説明会日程求人は、右で日程枠や「未予約」まで選べます（任意）。';
    const cnt = (s) => JOBS.filter((j) => (s === 'all' || j.season === s) && (M.ended || j.posted)).length;
    $('kseg').innerHTML = [['IS', 'IS期の求人'], ['main', '就活期の求人'], ['all', 'すべて']].map(([k, t]) => `<span class="${M.season === k ? 'on' : ''}" data-s="${k}">${t}<b>${cnt(k)}</b></span>`).join('');
    $('endedBox').classList.toggle('on', M.ended);
    const base = visibleJobs(true);
    const tabs = [['all', 'すべて'], ['course', 'コース求人'], ['seminar', '説明会日程求人'], ['entry', '企業エントリー求人']].filter(([k]) => !(isIS && k === 'seminar'));
    if (isIS && M.tab === 'seminar') M.tab = 'all';
    $('mtabs').innerHTML = tabs.map(([k, t]) => `<span class="${M.tab === k ? 'on' : ''}" data-t="${k}">${t}<b>${k === 'all' ? base.length : base.filter((j) => j.type === k).length}</b></span>`).join('');
    const jobs = visibleJobs(false);
    if (M.focus && !jobs.some((j) => j.id === M.focus)) M.focus = null;
    $('jobList').innerHTML = jobs.length ? jobs.map((j) => {
      const [tl, tc] = TYPE_LABEL[j.type];
      const on = M.jobs.has(j.id);
      const ns = [...M.slots].filter((s) => s.startsWith(j.id + ':')).length;
      return `<div class="it ${on ? 'sel1' : ''} ${M.focus === j.id ? 'focus' : ''} ${j.posted ? '' : 'ended'}" data-j="${j.id}">
        <span class="box ${on ? 'on' : ''}" data-check="${j.id}"></span>
        <div class="main"><div class="t1"><span class="ty ${tc}">${tl}</span>${esc(j.name)}${ns ? `<span class="picked">${ns}枠を選択中</span>` : ''}</div>
        <div class="t2">求人番号 ${j.id}・${j.years.map((y) => y + '卒').join('、')}${j.posted ? '' : '・掲載終了'}</div></div>
        <div class="r">応募 ${appsOfJob(j.id).length}件</div>
        ${j.type === 'seminar' ? `<span class="slotlk">日程枠 ${SLOTS[j.id].length} ›</span>` : ''}</div>`;
    }).join('') : '<div class="rempty">条件に合う求人はありません。</div>';
    $('panes').classList.toggle('full', isIS);
    renderRight();
    const chosen = [...M.jobs].map((j) => [`j:${j}`, jobById(j).name]).concat([...M.slots].map((s) => { const [jid, sid] = s.split(':'); return [`s:${s}`, `${jobById(jid).name}：${slotLabel(jid, sid)}`]; }));
    $('chosen').innerHTML = chosen.length ? `<span class="lb2">選択中</span>${chosen.map(([k, t]) => `<span class="tag">${esc(t)}<span class="x" data-c="${esc(k)}">✕</span></span>`).join('')}<span class="clr" data-c="all">すべて解除</span>` : '<span class="lb2" style="color:#AAA;font-weight:400">まだ選んでいません（選ばなければ、すべての求人が対象です）</span>';
  }
  function renderRight() {
    const r = $('rightPane');
    const j = M.focus && jobById(M.focus);
    if (!j || j.type !== 'seminar') {
      r.innerHTML = '<div class="rempty">説明会日程求人の「日程枠 ›」を押すと、<br>ここに日程枠が出ます。<br>日程枠を選ばなくても、求人にチェックを付ければ<br>その求人の応募すべてが対象になります。</div>';
      return;
    }
    const slots = SLOTS[j.id];
    const up = slots.filter((s) => !s.past);
    const past = slots.filter((s) => s.past);
    const apps = appsOfJob(j.id);
    const row = (sid, t1, t2, rr) => { const key = `${j.id}:${sid}`; const on = M.slots.has(key); return `<div class="slr ${on ? 'on' : ''}" data-slot="${key}"><span class="box ${on ? 'on' : ''}"></span><div class="main"><div>${t1}</div><div class="t2">${t2}</div></div><div class="r">${rr}</div></div>`; };
    let html = row('none', '日程の予約なし（未予約）', '応募したが、まだ日程枠を予約していない人', `${apps.filter((a) => a.slot === null).length}件`);
    let mon = '';
    const list = M.showPast ? past.concat(up) : up;
    list.forEach((s) => {
      if (s.mon !== mon) { mon = s.mon; html += `<div class="mon">${mon}${s.past ? '（開催済み）' : ''}</div>`; }
      const n = apps.filter((a) => a.slot === s.id).length;
      html += row(s.id, s.label, s.venue, `予約 ${n}件／定員 ${s.cap}${n >= s.cap ? '<span class="full">満席</span>' : ''}`);
    });
    r.innerHTML = `<div class="rh"><div class="t">${esc(j.name)} の日程枠<span>（これから ${up.length}枠・開催済み ${past.length}枠）</span></div><span class="all" data-allslots="1">すべての日程枠を選ぶ</span></div>
      <div class="slots">${html}</div>${past.length ? `<div class="past" data-past="1">${M.showPast ? '開催済みの日程枠を隠す ▲' : `開催済みの日程枠（${past.length}枠）を表示 ▼`}</div>` : ''}`;
  }
  $('courseBtn').onclick = openModal;
  $('mdClose').onclick = closeModal;
  $('mdCancel').onclick = closeModal;
  $('ov').onclick = closeModal;
  $('mdApply').onclick = () => { F.jobs = [...M.jobs]; F.slots = [...M.slots]; closeModal(); search(); };
  $('kseg').onclick = (e) => { const s = e.target.closest('[data-s]'); if (s) { M.season = s.dataset.s; M.focus = null; renderModal(); } };
  $('mtabs').onclick = (e) => { const t = e.target.closest('[data-t]'); if (t) { M.tab = t.dataset.t; renderModal(); } };
  $('mdQ').oninput = () => { M.q = $('mdQ').value.trim(); renderModal(); };
  $('mdYear').onchange = () => { M.year = $('mdYear').value; renderModal(); };
  $('endedLbl').onclick = () => { M.ended = !M.ended; renderModal(); };
  $('jobList').onclick = (e) => {
    const c = e.target.closest('[data-check]');
    if (c) { const id = c.dataset.check; M.jobs.has(id) ? M.jobs.delete(id) : M.jobs.add(id); renderModal(); return; }
    const it = e.target.closest('[data-j]');
    if (!it) return;
    const j = jobById(it.dataset.j);
    if (j.type === 'seminar') { M.focus = j.id; M.showPast = false; }
    else { M.jobs.has(j.id) ? M.jobs.delete(j.id) : M.jobs.add(j.id); }
    renderModal();
  };
  $('rightPane').onclick = (e) => {
    const s = e.target.closest('[data-slot]');
    if (s) { const k = s.dataset.slot; M.slots.has(k) ? M.slots.delete(k) : M.slots.add(k); renderModal(); return; }
    if (e.target.closest('[data-past]')) { M.showPast = !M.showPast; renderRight(); return; }
    if (e.target.closest('[data-allslots]')) {
      const j = M.focus;
      const keys = ['none', ...SLOTS[j].filter((x) => M.showPast || !x.past).map((x) => x.id)].map((sid) => `${j}:${sid}`);
      const allOn = keys.every((k) => M.slots.has(k));
      keys.forEach((k) => (allOn ? M.slots.delete(k) : M.slots.add(k)));
      renderModal();
    }
  };
  $('chosen').onclick = (e) => {
    const c = e.target.dataset.c;
    if (!c) return;
    if (c === 'all') { M.jobs.clear(); M.slots.clear(); }
    else if (c.startsWith('j:')) M.jobs.delete(c.slice(2));
    else M.slots.delete(c.slice(2));
    renderModal();
  };

  search();
  if (location.hash === '#modal' || location.hash === '#modal-is') {
    openModal();
    if (location.hash === '#modal') { M.season = 'main'; M.focus = '1234570'; M.jobs.add('1234567'); M.slots.add('1234570:none'); renderModal(); }
  }
  if (location.hash === '#open') { detailOpen = true; renderSearch(); }
})();
