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
  const NOTICES = ['新着応募', '新着メールあり', '本日面接あり', '面接日回答あり'];

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
  APPS.forEach((a) => { if (a.status === '面接日確定' && a.id % 2 === 0) a.labels.push(['pk', '本日面接あり']); });
  APPS.sort((a, b) => b.date - a.date || a.id - b.id);
  const jobById = (id) => JOBS.find((j) => j.id === id);

  // ---------- 状態 ----------
  const F = { years: [], jobs: [], slots: [], kw: '', memoEmpty: false, prefs: [], date: '', statuses: [], notice: '' };
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
      if (F.kw) {
        const j = jobById(a.job);
        const hay = [a.memo, a.name, j.name, j.id, j.place, '正社員', '新卒'].join(' ');
        const words = F.kw.split(/[\s\u3000]+/).filter(Boolean);
        const inc = words.filter((w) => !/^[-－]/.test(w));
        const exc = words.filter((w) => /^[-－]./.test(w)).map((w) => w.slice(1));
        if (!inc.every((w) => hay.includes(w))) return false;
        if (exc.some((w) => hay.includes(w))) return false;
      }
      if (F.prefs.length && !F.prefs.includes(a.pref)) return false;
      if (F.date) {
        const d0 = new Date(a.date.getFullYear(), a.date.getMonth(), a.date.getDate());
        if (d0 < F.date.from || d0 > (F.date.to || F.date.from)) return false;
      }
      if (F.statuses.length && !F.statuses.includes(a.status)) return false;
      if (F.notice === '新着応募' && !a.labels.some((l) => l[1] === 'New')) return false;
      if (F.notice === '新着メールあり' && !a.labels.some((l) => l[1] === '新着メール')) return false;
      if (F.notice === '本日面接あり' && !a.labels.some((l) => l[1] === '本日面接あり')) return false;
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
  const ymd = (d) => `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
  const dateText = (r) => (r.to && r.to.getTime() !== r.from.getTime() ? `${ymd(r.from)}〜${ymd(r.to)}` : ymd(r.from));
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
    const detailCount = [F.prefs.length, F.date, F.statuses.length, F.notice].filter(Boolean).length;
    $('moreBtn').textContent = detailOpen ? '詳しい条件を閉じる ▲' : `詳しい条件${detailCount ? `（${detailCount}件適用中）` : ''} ▼`;
    $('detail').classList.toggle('open', detailOpen);
    const chip = (btn, val, on, text) => { $(btn).classList.toggle('on', on); $(val).textContent = text; };
    chip('prefBtn', 'prefVal', F.prefs.length > 0, F.prefs.length ? (F.prefs.length > 1 ? `${F.prefs[0]} ほか${F.prefs.length - 1}件` : F.prefs[0]) : 'すべて');
    chip('dateBtn', 'dateVal', !!F.date, F.date ? dateText(F.date) : '指定なし');
    chip('statusBtn', 'statusVal', F.statuses.length > 0, F.statuses.length ? (F.statuses.length > 1 ? `${F.statuses[0]} ほか${F.statuses.length - 1}件` : F.statuses[0]) : 'すべて');
    chip('noticeBtn', 'noticeVal', !!F.notice, F.notice || '新着／面接すべて');
  }

  function renderApplied() {
    const tags = [];
    if (F.years.length) tags.push(['years', `卒業年度：${F.years.map((y) => y + '卒').join('、')}`]);
    F.jobs.forEach((j) => tags.push([`job:${j}`, jobById(j).name]));
    F.slots.forEach((s) => { const [jid, sid] = s.split(':'); tags.push([`slot:${s}`, `${jobById(jid).name}：${slotLabel(jid, sid)}`]); });
    if (F.kw) tags.push(['kw', `フリーワード：${F.kw}`]);
    if (F.memoEmpty) tags.push(['memoEmpty', 'メモが空の人だけ']);
    if (F.prefs.length) tags.push(['prefs', `現住所：${F.prefs.join('、')}`]);
    if (F.date) tags.push(['date', `応募日：${dateText(F.date)}`]);
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
      return `<tr class="${on ? 'rsel' : ''}"><td><span class="box ${on ? 'on' : ''}" data-id="${a.id}"></span></td>
        <td>${lbls}<div class="dt">${fmt(a.date)}</div><div class="nm">${esc(a.name)}</div><div class="mt">${a.age}歳／${a.gender}／${a.school}／${a.pref}</div></td>
        <td><span class="jt">正社員・新卒${a.year}卒</span><div>[${j.id}] ${esc(j.name)}</div>${sub ? `<div class="js">${esc(sub)}</div>` : ''}</td>
        <td class="cm">${mm}</td><td class="cs">${st}</td><td class="ops">編集<br>削除</td></tr>`;
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

  const MI = { run: '【12/5開催】会社説明会のご案内', rsv: { when: '12/1（月）10:00', subj: '【12/5開催】会社説明会のご案内', count: 46 }, nRsv: 1 };
  function renderAlerts() {
    const mail = $('demoMail').value;
    const dl = $('demoDl').value;
    const lines = [];
    const r = MI.rsv;
    if (mail === 'rsv' || mail === 'rsv2') {
      lines.push(`<div class="sl info"><span class="ic">◷</span><span class="cat">一括メール</span><span class="msg"><b>${r.when}</b> に送信予約中</span><span class="sub">件名：${esc(r.subj)}　宛先：${r.count}件${mail === 'rsv2' ? `　ほかに予約${Math.max(1, MI.nRsv - 1)}件` : ''}</span><span class="sp"></span><span class="lk" data-toast="一括送付履歴（モックでは省略）">一括送付履歴で確認・取り消し</span></div>`);
    } else if (mail === 'run' || mail === 'runrsv') {
      lines.push(`<div class="sl info"><span class="ic">↻</span><span class="cat">一括メール</span><span class="msg"><b>送信中</b>：${esc(MI.run)}</span>${mail === 'runrsv' ? `<span class="sub">ほかに予約${MI.nRsv}件（${r.when}）</span>` : ''}<span class="sp"></span><span class="lk" data-toast="画面を開き直したときと同じく、状況を取り直します">更新して状況を確認する</span>${mail === 'runrsv' ? '<span class="lk" data-toast="一括送付履歴（モックでは省略）">一括送付履歴</span>' : ''}</div>`);
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
  // ---------- 現住所の設定モーダル（自動アプローチの対象条件と同じ） ----------
  const REGIONS = [
    ['北海道・東北', ['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県']],
    ['関東', ['東京都', '神奈川県', '埼玉県', '千葉県', '茨城県', '栃木県', '群馬県']],
    ['甲信越・北陸', ['新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県']],
    ['東海', ['岐阜県', '静岡県', '愛知県', '三重県']],
    ['関西', ['大阪府', '京都府', '兵庫県', '奈良県', '滋賀県', '和歌山県']],
    ['中国・四国', ['鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県']],
    ['九州・沖縄', ['福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県']],
  ];
  const PREF_ORDER = REGIONS.flatMap((r) => r[1]);
  let prefTmp = new Set();
  function drawPref() {
    $('pBody').innerHTML = REGIONS.map(([rn, ps]) => `<div class="preg"><div class="rn">${rn}</div><div class="ps">${ps.map((p) => `<label data-p="${p}"><span class="box ${prefTmp.has(p) ? 'on' : ''}"></span>${p}</label>`).join('')}</div></div>`).join('');
  }
  function closePref() { $('pov').classList.remove('open'); $('pmd').classList.remove('open'); }
  $('prefBtn').addEventListener('click', (e) => {
    e.stopPropagation(); closeDDs();
    prefTmp = new Set(F.prefs); drawPref();
    $('pov').classList.add('open'); $('pmd').classList.add('open');
  });
  $('pBody').addEventListener('click', (e) => { const l = e.target.closest('[data-p]'); if (!l) return; const p = l.dataset.p; prefTmp.has(p) ? prefTmp.delete(p) : prefTmp.add(p); drawPref(); });
  $('pClose').onclick = closePref;
  $('pov').onclick = closePref;
  $('pSave').onclick = () => { F.prefs = PREF_ORDER.filter((p) => prefTmp.has(p)); closePref(); search(); };
  // ---------- 応募日カレンダー（期間指定） ----------
  const TODAY = new Date(2026, 10, 11);
  const cal = { y: 2026, m: 10, from: null, to: null };
  const sameDay = (a, b) => a && b && a.getTime() === b.getTime();
  function drawCal() {
    const dd = $('dateDD');
    const first = new Date(cal.y, cal.m, 1);
    const start = new Date(cal.y, cal.m, 1 - first.getDay());
    let cells = '';
    for (let i = 0; i < 42; i++) {
      const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      const cls = ['cd'];
      if (d.getMonth() !== cal.m) cls.push('out');
      if (d.getDay() === 0) cls.push('sun');
      if (d.getDay() === 6) cls.push('sat');
      if (sameDay(d, TODAY)) cls.push('today');
      const to = cal.to || cal.from;
      if (cal.from && d >= cal.from && d <= to) cls.push('inr');
      if (sameDay(d, cal.from) || sameDay(d, cal.to)) cls.push('edge');
      cells += `<span class="${cls.join(' ')}" data-d="${d.getTime()}">${d.getDate()}</span>`;
    }
    dd.innerHTML = `<div class="calh"><span class="calclr" data-a="clr">クリア</span><b>${cal.y}年${cal.m + 1}月</b><span class="calnav"><span data-a="prev">‹</span><span data-a="next">›</span></span></div>
      <div class="calw"><span class="sun">日</span><span>月</span><span>火</span><span>水</span><span>木</span><span>金</span><span class="sat">土</span></div>
      <div class="calg">${cells}</div>
      <div class="calf">${cal.from && !cal.to ? '終了日を選んでください' : '枠外クリックでカレンダーを閉じます'}</div>`;
  }
  $('dateBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    const dd = $('dateDD');
    if (dd.classList.contains('open')) { dd.classList.remove('open'); return; }
    closeDDs(dd);
    cal.from = F.date ? F.date.from : null; cal.to = F.date ? F.date.to : null;
    const base = cal.from || TODAY; cal.y = base.getFullYear(); cal.m = base.getMonth();
    dd.classList.add('cal');
    drawCal();
    dd.classList.add('open');
  });
  $('dateDD').addEventListener('click', (e) => {
    e.stopPropagation();
    const a = e.target.closest('[data-a]');
    const c = e.target.closest('[data-d]');
    if (a) {
      if (a.dataset.a === 'prev') { cal.m--; if (cal.m < 0) { cal.m = 11; cal.y--; } }
      if (a.dataset.a === 'next') { cal.m++; if (cal.m > 11) { cal.m = 0; cal.y++; } }
      if (a.dataset.a === 'clr') { cal.from = null; cal.to = null; F.date = ''; $('dateDD').classList.remove('open'); search(); return; }
      drawCal(); return;
    }
    if (c) {
      const d = new Date(Number(c.dataset.d));
      if (!cal.from || cal.to) { cal.from = d; cal.to = null; drawCal(); return; }
      if (d < cal.from) { cal.to = cal.from; cal.from = d; } else cal.to = d;
      F.date = { from: cal.from, to: cal.to };
      $('dateDD').classList.remove('open');
      search();
    }
  });
  multiDD('statusBtn', 'statusDD', '対応状況（複数選べます）', STATUSES.map((s) => ({ v: s, t: s })), () => F.statuses, (v) => { F.statuses = v; });
  singleDD('noticeBtn', 'noticeDD', [{ v: '', t: '新着／面接すべて' }, ...NOTICES.map((s) => ({ v: s, t: s }))], () => F.notice, (v) => { F.notice = v; });

  // ---------- 検索欄 ----------
  $('searchBtn').onclick = () => { F.kw = $('kwIn').value.trim(); search(); };
  $('kwIn').addEventListener('keydown', (e) => { if (e.key === 'Enter') $('searchBtn').onclick(); });
  $('memoEmptyLbl').onclick = () => { F.memoEmpty = !F.memoEmpty; search(); };
  $('moreBtn').onclick = () => { detailOpen = !detailOpen; renderSearch(); };
  function clearAll() {
    Object.assign(F, { years: [], jobs: [], slots: [], kw: '', memoEmpty: false, prefs: [], date: '', statuses: [], notice: '' });
    $('kwIn').value = '';
    search();
  }
  $('clearBtn').onclick = clearAll;
  $('applied').addEventListener('click', (e) => {
    if (e.target.id === 'clearAll') { clearAll(); return; }
    const k = e.target.dataset.k;
    if (!k) return;
    if (k.startsWith('job:')) F.jobs = F.jobs.filter((j) => j !== k.slice(4));
    else if (k.startsWith('slot:')) F.slots = F.slots.filter((s) => s !== k.slice(5));
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
      if (selected.size) openMail();
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
  $('demoMail').onchange = () => { MI.nRsv = $('demoMail').value === 'rsv2' ? 2 : 1; renderAlerts(); };
  $('demoDl').onchange = renderAlerts;

  // ---------- コース・日程枠モーダル ----------
  const M = { season: 'IS', tab: 'all', q: '', year: '', ended: false, focus: null, showPast: false, jobs: new Set(), slots: new Set() };
  const appsOfJob = (jid) => APPS.filter((a) => a.job === jid);
  const allSlotKeys = (jid) => ['none', ...SLOTS[jid].map((x) => x.id)].map((sid) => `${jid}:${sid}`);
  const clearSlots = (jid) => { [...M.slots].forEach((k) => { if (k.startsWith(jid + ':')) M.slots.delete(k); }); };
  // 説明会日程求人の日程枠が全部選ばれたら、求人のチェックにまとめる
  const normalize = (jid) => {
    if (!SLOTS[jid]) return;
    const keys = allSlotKeys(jid);
    if (keys.every((k) => M.slots.has(k))) { clearSlots(jid); M.jobs.add(jid); }
  };
  const toggleSlot = (key) => {
    const jid = key.split(':')[0];
    if (M.jobs.has(jid)) {
      M.jobs.delete(jid);
      allSlotKeys(jid).forEach((k) => { if (k !== key) M.slots.add(k); });
    } else {
      M.slots.has(key) ? M.slots.delete(key) : M.slots.add(key);
      normalize(jid);
    }
  };
  const toggleJob = (jid) => {
    if (M.jobs.has(jid)) M.jobs.delete(jid);
    else { M.jobs.add(jid); }
    if (SLOTS[jid]) { clearSlots(jid); M.focus = jid; }
  };
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
    const jobOn = M.jobs.has(j.id);
    const row = (sid, t1, t2, rr) => { const key = `${j.id}:${sid}`; const on = jobOn || M.slots.has(key); return `<div class="slr ${on ? 'on' : ''}" data-slot="${key}"><span class="box ${on ? 'on' : ''}"></span><div class="main"><div>${t1}</div><div class="t2">${t2}</div></div><div class="r">${rr}</div></div>`; };
    let html = row('none', '日程の予約なし（未予約）', '応募したが、まだ日程枠を予約していない人', `${apps.filter((a) => a.slot === null).length}件`);
    let mon = '';
    const list = M.showPast ? past.concat(up) : up;
    list.forEach((s) => {
      if (s.mon !== mon) { mon = s.mon; html += `<div class="mon">${mon}${s.past ? '（開催済み）' : ''}</div>`; }
      const n = apps.filter((a) => a.slot === s.id).length;
      html += row(s.id, s.label, s.venue, `予約 ${n}件／定員 ${s.cap}${n >= s.cap ? '<span class="fullb">満席</span>' : ''}`);
    });
    r.innerHTML = `<div class="rh"><div class="t">${esc(j.name)} の日程枠<span>（これから ${up.length}枠・開催済み ${past.length}枠）</span></div><span class="all" data-allslots="1">${jobOn ? 'すべての日程枠の選択を外す' : 'すべての日程枠を選ぶ'}</span></div>
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
    if (c) { toggleJob(c.dataset.check); renderModal(); return; }
    const it = e.target.closest('[data-j]');
    if (!it) return;
    const j = jobById(it.dataset.j);
    if (j.type === 'seminar') { M.focus = j.id; M.showPast = false; }
    else toggleJob(j.id);
    renderModal();
  };
  $('rightPane').onclick = (e) => {
    const s = e.target.closest('[data-slot]');
    if (s) { toggleSlot(s.dataset.slot); renderModal(); return; }
    if (e.target.closest('[data-past]')) { M.showPast = !M.showPast; renderRight(); return; }
    if (e.target.closest('[data-allslots]')) {
      const j = M.focus;
      if (M.jobs.has(j)) { M.jobs.delete(j); clearSlots(j); }
      else { clearSlots(j); M.jobs.add(j); }
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

  // ---------- 一括メール（作成 → 送信内容の確認 → 受け付け） ----------
  const COMPANY = '株式会社サンプル';
  const TEMPLATES = [
    { id: 't1', name: '会社説明会のご案内（予約のお願い）', subj: '【株式会社サンプル】会社説明会のご案内', body: '{{name}}様\n\nこの度は{{company_name}}にご応募いただき、誠にありがとうございます。\n採用担当の●●です。\n\n下記の日程で会社説明会を開催いたします。\nご都合のよい日程を、マイページからご予約ください。\n\n【日程】\n・12/5（土）10:00〜11:00　東京都・本社\n・12/12（土）10:00〜11:00　大阪府・大阪支社\n・12/19（土）13:00〜14:00　オンライン\n\nお会いできることを楽しみにしております。\n\n--------------------\n{{company_name}}　採用担当　●●\nTEL：●●-●●●●-●●●●' },
    { id: 't2', name: '面接日 前日リマインド', subj: '【株式会社サンプル】明日の面接について', body: '{{name}}様\n\n{{company_name}}採用担当の●●です。\n明日の面接につきまして、確認のご連絡です。\n\n【日時】●月●日（●）●●:●●〜\n【場所】●●●●\n【持ち物】筆記用具\n\n当日体調不良などでお越しになれなくなった場合は、ご一報くださいませ。\n明日、お会いできることを楽しみにしております。\n\n--------------------\n{{company_name}}　採用担当　●●' },
    { id: 't3', name: '各種書類送付依頼', subj: '【株式会社サンプル】書類送付のお願い', body: '{{name}}様\n\nこの度は{{company_name}}にご応募いただき、誠にありがとうございます。\n選考にあたり、下記の書類をご送付ください。\n\n・履歴書（写真付き）\n・職務経歴書\n\n【締切】●月●日（●）\n【送付先】●●●●\n\nご不明な点がございましたら、お気軽にお問い合わせください。\n\n--------------------\n{{company_name}}　採用担当　●●' },
    { id: 't4', name: '書類選考 不合格通知', subj: '【株式会社サンプル】選考結果のご連絡', body: '{{name}}様\n\nこの度は{{company_name}}にご応募いただき、また書類をお送りいただき誠にありがとうございました。\n\n慎重に選考を重ねました結果、誠に残念ながら、今回はご期待に添えない結果となりました。\n\n{{name}}様の今後のご活躍を心よりお祈り申し上げます。\n\n--------------------\n{{company_name}}　採用担当　●●' },
    { id: 't5', name: '面接 合格通知', subj: '【株式会社サンプル】選考結果のご連絡', body: '{{name}}様\n\n先日は面接にお越しいただき、誠にありがとうございました。\n\n慎重に選考を重ねました結果、{{name}}様に内定をお出しすることになりました。\n初回出社日などの詳細は、追ってご連絡いたします。\n\n--------------------\n{{company_name}}　採用担当　●●' },
  ];
  const BLOCKED = ['ade', 'adp', 'app', 'bat', 'bin', 'bz2', 'chm', 'cmd', 'com', 'cpl', 'dll', 'dmg', 'docm', 'exe', 'gz', 'hta', 'img', 'ins', 'iso', 'isp', 'jar', 'js', 'jse', 'lib', 'lnk', 'mde', 'msc', 'msi', 'msp', 'mst', 'php', 'pkg', 'pif', 'ps1', 'py', 'rar', 'scr', 'sct', 'sh', 'shb', 'sys', 'tbz', 'tbz2', 'tgz', 'vb', 'vbe', 'vbs', 'vxd', 'wsc', 'wsf', 'wsh', 'zip', '7z'];
  const MB = 1048576;
  const LIM = { each: 10 * MB, count: 5, total: 15 * MB };
  const extOf = (n) => (n.includes('.') ? n.split('.').pop().toLowerCase() : '');
  const totalSize = () => X.files.reduce((t, f) => t + f.size, 0);
  const tip = (html) => `<span class="qtip">?<span class="qbox">${html}</span></span>`;
  const FILE_TIP = tip('1ファイル10MBまで、1通に5ファイル・合計15MBまで添付できます。');
  const WD = ['日', '月', '火', '水', '木', '金', '土'];
  const fmtWhen = (d, withYear) => `${withYear ? d.getFullYear() + '/' : ''}${d.getMonth() + 1}/${d.getDate()}（${WD[d.getDay()]}）${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
  const isoDay = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const fsize = (b) => (b >= 1048576 ? `${(b / 1048576).toFixed(1)}MB` : `${Math.max(1, Math.round(b / 1024))}KB`);
  const fill = (s, a) => s.replaceAll('{{name}}', a.name).replaceAll('{{company_name}}', COMPANY);
  const X = { step: 'edit', ids: [], tpl: '', subj: '', body: '', files: [], fileErr: '', when: 'now', date: '', hh: '10', mi: '00', showTo: false, sending: false, at: null };

  function confirmDlg(title, desc, yes, onYes, onNo) {
    $('cdT').textContent = title; $('cdD').textContent = desc; $('cdYes').textContent = yes;
    $('cdov').classList.add('open'); $('cdlg').classList.add('open');
    const close = () => { $('cdov').classList.remove('open'); $('cdlg').classList.remove('open'); };
    $('cdYes').onclick = () => { close(); onYes(); };
    $('cdNo').onclick = () => { close(); if (onNo) onNo(); };
  }
  function openMail() {
    const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
    Object.assign(X, { step: 'edit', ids: results.filter((a) => selected.has(a.id)).map((a) => a.id), tpl: '', subj: '', body: '', files: [], fileErr: '', when: 'now', date: isoDay(tomorrow), hh: '10', mi: '00', showTo: false, sending: false, at: null });
    $('xov').classList.add('open'); $('xmd').classList.add('open');
    renderMail();
  }
  function closeMail() { $('xov').classList.remove('open'); $('xmd').classList.remove('open'); }
  function askCloseMail() {
    if (X.step === 'done') { finishMail(); return; }
    if (X.subj.trim() || X.body.trim() || X.files.length) confirmDlg('作成中のメールを破棄しますか？', '入力した件名・本文・添付ファイルは保存されません。', '破棄する', closeMail);
    else closeMail();
  }
  const canConfirm = () => X.subj.trim() && X.body.trim();
  function schedErr() {
    if (X.when !== 'at') return '';
    const at = new Date(`${X.date}T${X.hh}:${X.mi}:00`);
    const now = new Date();
    const max = new Date(now.getTime() + 7 * 86400000);
    if (Number.isNaN(at.getTime())) return '日時を選んでください。';
    if (at <= now) return '過去の日時は選べません。';
    if (at > max) return '予約できるのは7日後までです。';
    return '';
  }

  function renderMail() {
    const body = $('xBody'); const foot = $('xFoot');
    $('xmd').classList.toggle('narrow', X.step === 'done');
    const apps = X.ids.map((id) => APPS.find((a) => a.id === id));
    if (X.step === 'edit') {
      $('xTitle').textContent = 'メールを作成';
      body.innerHTML = `
        <div class="mxr"><div class="mxl flat">宛先</div><div class="mxv flat"><span class="mxcnt"><b>${apps.length}</b>件</span><div class="mxnote">選んだ応募ごとに1通ずつ送ります。同じ学生の複数の応募を選んでいるときは、その学生に複数通届きます。</div></div></div>
        <div class="mxr"><div class="mxl">テンプレート</div><div class="mxv"><select class="mxsel" id="xTpl"><option value="">テンプレートを使わない</option>${TEMPLATES.map((t) => `<option value="${t.id}" ${X.tpl === t.id ? 'selected' : ''}>${esc(t.name)}</option>`).join('')}</select><div class="mxnote">選ばなくても送れます。選ぶと、件名と本文をテンプレートの内容に差し替えます。テンプレートは今あるメールテンプレート（中途と共用）です。</div></div></div>
        <div class="mxr"><div class="mxl">件名<span class="mxreq">必須</span></div><div class="mxv"><input class="mxin" id="xSubj" value="${esc(X.subj)}" placeholder="件名を入力してください"></div></div>
        <div class="mxr"><div class="mxl">本文<span class="mxreq">必須</span></div><div class="mxv"><div class="mxtags">置換タグ（押すと本文に入ります）<span class="mxtg" data-tag="{{name}}">{{name}} 応募者名</span><span class="mxtg" data-tag="{{company_name}}">{{company_name}} 企業名</span></div><textarea class="mxta" id="xText" placeholder="本文を入力してください">${esc(X.body)}</textarea></div></div>
        <div class="mxr"><div class="mxl">添付ファイル${FILE_TIP}</div><div class="mxv"><div class="mxfile"><span class="mxfbtn ${X.files.length >= LIM.count ? 'dis' : ''}" id="xFileBtn">ファイルを選択</span><span class="mxnote" style="margin:0">${X.files.length ? `${X.files.length}/${LIM.count}ファイル・合計${fsize(totalSize())}/15MB` : '選択されていません'}</span></div>${X.files.length ? `<div class="mxchips">${X.files.map((f, i) => `<span class="mxchip">${esc(f.name)}<span class="sz">${fsize(f.size)}</span><span class="x" data-frm="${i}">✕</span></span>`).join('')}</div>` : ''}<div class="mxerr">${X.fileErr}</div><div class="mxnote">全員に同じファイルを添付できます（任意）。テンプレートには保存されません。</div></div></div>`;
      foot.innerHTML = '<span class="sp"></span><span class="mbtn" id="xBack">閉じる</span><span class="mbtn pr" id="xNext">内容を確認</span>';
      const sync = () => { $('xNext').classList.toggle('dis', !canConfirm()); };
      $('xSubj').oninput = (e) => { X.subj = e.target.value; sync(); };
      $('xText').oninput = (e) => { X.body = e.target.value; sync(); };
      $('xTpl').onchange = (e) => {
        const t = TEMPLATES.find((x) => x.id === e.target.value);
        if (!t) { X.tpl = ''; return; }
        const apply = () => { X.tpl = t.id; X.subj = t.subj; X.body = t.body; renderMail(); };
        if (X.body.trim()) confirmDlg('本文を差し替えますか？', '入力中の件名と本文は、テンプレートの内容に置き換わります。', '差し替える', apply, () => { e.target.value = X.tpl; });
        else apply();
      };
      body.querySelectorAll('.mxtg').forEach((g) => { g.onclick = () => {
        const ta = $('xText'); const s = ta.selectionStart ?? ta.value.length; const en = ta.selectionEnd ?? s;
        ta.value = ta.value.slice(0, s) + g.dataset.tag + ta.value.slice(en);
        X.body = ta.value; ta.focus(); ta.selectionStart = ta.selectionEnd = s + g.dataset.tag.length; sync();
      }; });
      $('xFileBtn').onclick = () => { $('xFile').value = ''; $('xFile').click(); };
      body.querySelectorAll('[data-frm]').forEach((x) => { x.onclick = () => { X.files.splice(Number(x.dataset.frm), 1); X.fileErr = ''; renderMail(); }; });
      $('xBack').onclick = askCloseMail;
      $('xNext').onclick = () => { if (canConfirm()) { X.step = 'confirm'; renderMail(); } };
      sync();
    } else if (X.step === 'confirm') {
      $('xTitle').textContent = '送信内容の確認';
      const first = apps[0];
      const err = schedErr();
      body.innerHTML = `
        <div class="mxr"><div class="mxl flat">宛先</div><div class="mxv flat"><span class="mxcnt"><b>${apps.length}</b>件</span><span class="mxlk" id="xToTgl">${X.showTo ? '宛先を閉じる ▲' : '宛先を確認する（1件ずつ外せます） ▼'}</span>
          ${X.showTo ? `<div class="mxto">${apps.map((a) => { const j = jobById(a.job); return `<div class="tr"><span class="nm2">${esc(a.name)}</span><span class="jb">[${j.id}] ${esc(j.name)}</span><span class="rm" data-rm="${a.id}">✕ 外す</span></div>`; }).join('') || '<div class="tr">宛先がありません。</div>'}</div>` : ''}
          ${apps.length ? '' : '<div class="mxerr">宛先が0件です。戻って選び直してください。</div>'}</div></div>
        <div class="mxr"><div class="mxl flat">件名</div><div class="mxv flat">${first ? esc(fill(X.subj, first)) : esc(X.subj)}</div></div>
        <div class="mxr"><div class="mxl flat">本文</div><div class="mxv flat"><div class="mxprev"><div class="ph">${first ? `プレビュー：宛先の1人目（${esc(first.name)}さん）で置換タグを置き換えて表示しています` : 'プレビュー'}</div><div class="pb">${esc(first ? fill(X.body, first) : X.body)}</div></div></div></div>
        <div class="mxr"><div class="mxl flat">添付ファイル</div><div class="mxv flat">${X.files.length ? `<div class="mxchips" style="margin:0">${X.files.map((f) => `<span class="mxchip">${esc(f.name)}<span class="sz">${fsize(f.size)}</span></span>`).join('')}</div>` : 'なし'}</div></div>
        <div class="mxr"><div class="mxl">送信タイミング</div><div class="mxv mxtime">
          <div class="wopt" data-w="now"><span class="rd ${X.when === 'now' ? 'on' : ''}"></span>今すぐ送る</div>
          <div class="wopt" data-w="at"><span class="rd ${X.when === 'at' ? 'on' : ''}"></span>日時を指定して予約する
            <span class="when ${X.when === 'at' ? '' : 'dis'}"><input type="date" id="xDate" value="${X.date}" min="${isoDay(new Date())}" max="${isoDay(new Date(Date.now() + 7 * 86400000))}">
            <select id="xHH">${Array.from({ length: 24 }, (_, h) => String(h).padStart(2, '0')).map((h) => `<option ${h === X.hh ? 'selected' : ''}>${h}</option>`).join('')}</select>:<select id="xMI">${['00', '10', '20', '30', '40', '50'].map((m) => `<option ${m === X.mi ? 'selected' : ''}>${m}</option>`).join('')}</select></span></div>
          <div class="mxerr" id="xSchedErr">${esc(err)}</div>
          <div class="mxnote">予約できるのは7日後までです。予約は、送信予定の5分前まで一括送付履歴から取り消せます。</div>
          <div class="mxfix">受け付けた時点の宛先${apps.length}件と添付ファイルで送ります。予約した日時に、一覧の絞り込みはやり直しません。</div>
        </div></div>`;
      const label = X.when === 'at' ? '予約する' : '送信する';
      foot.innerHTML = `<span class="sp"></span><span class="mbtn" id="xBack">戻る</span><span class="mbtn pr ${!apps.length || err || X.sending ? 'dis' : ''}" id="xSend">${X.sending ? '受け付けています…' : label}</span>`;
      $('xToTgl').onclick = () => { X.showTo = !X.showTo; renderMail(); };
      body.querySelectorAll('[data-rm]').forEach((r) => { r.onclick = () => { X.ids = X.ids.filter((id) => id !== Number(r.dataset.rm)); renderMail(); }; });
      body.querySelectorAll('[data-w]').forEach((l) => { l.onclick = (e) => { if (e.target.closest('.when') && X.when === 'at') return; if (X.when !== l.dataset.w) { X.when = l.dataset.w; renderMail(); } }; });
      $('xDate').onchange = (e) => { X.date = e.target.value; renderMail(); };
      $('xHH').onchange = (e) => { X.hh = e.target.value; renderMail(); };
      $('xMI').onchange = (e) => { X.mi = e.target.value; renderMail(); };
      $('xBack').onclick = () => { X.step = 'edit'; renderMail(); };
      $('xSend').onclick = () => {
        if (X.sending || !apps.length || schedErr()) return;
        X.sending = true; renderMail();
        setTimeout(() => { X.at = X.when === 'at' ? new Date(`${X.date}T${X.hh}:${X.mi}:00`) : null; X.step = 'done'; renderMail(); }, 900);
      };
    } else {
      $('xTitle').textContent = '受け付けました';
      body.innerHTML = `<div class="mxdone"><div class="h">${X.at ? '送信の予約を受け付けました。' : '送信を受け付けました。'}</div><div class="s">結果は、一覧左下の「一括送付履歴を確認」から確認できます。${X.at ? '予約は、送信予定の5分前まで取り消せます。' : '受け付けた順に送ります。'}</div>
        <div class="mxkv"><span class="k">件名</span><span>${esc(X.subj)}</span><span class="k">宛先</span><span>${apps.length}件</span><span class="k">送信予定</span><span>${X.at ? fmtWhen(X.at, true) : '今すぐ'}</span><span class="k">添付ファイル</span><span>${X.files.length ? X.files.map((f) => esc(f.name)).join('<br>') : 'なし'}</span></div></div>`;
      foot.innerHTML = '<span class="sp"></span><span class="mbtn" id="xBack">閉じる</span>';
      $('xBack').onclick = finishMail;
    }
  }
  function finishMail() {
    closeMail();
    const cur = $('demoMail').value;
    const hasRsv = ['rsv', 'rsv2', 'runrsv'].includes(cur);
    const hasRun = ['run', 'runrsv'].includes(cur);
    if (X.at) {
      MI.rsv = { when: fmtWhen(X.at), subj: X.subj, count: X.ids.length };
      MI.nRsv = hasRsv ? MI.nRsv + 1 : 1;
      $('demoMail').value = hasRun ? 'runrsv' : MI.nRsv > 1 ? 'rsv2' : 'rsv';
      X.ids.forEach((id) => { const a = APPS.find((x) => x.id === id); if (!a.labels.some((l) => l[1] === '送信予約中')) a.labels.push(['gy', '送信予約中']); });
    } else {
      MI.run = X.subj;
      $('demoMail').value = hasRsv ? 'runrsv' : 'run';
    }
    selected = new Set();
    render();
    toast(X.at ? '送信を予約しました。画面上部に予約中と出ます' : '送信を受け付けました。画面上部に送信中と出ます');
  }
  $('xClose').onclick = askCloseMail;
  $('xov').onclick = askCloseMail;
  $('xFile').onchange = (e) => {
    const errs = [];
    [...e.target.files].forEach((f) => {
      const ext = extOf(f.name);
      if (BLOCKED.includes(ext)) errs.push(`「${esc(f.name)}」は添付できない形式です（.${esc(ext)}）。`);
      else if (f.size > LIM.each) errs.push(`「${esc(f.name)}」は10MBを超えています。`);
      else if (X.files.length >= LIM.count) errs.push(`「${esc(f.name)}」を追加できません。1通に添付できるのは5ファイルまでです。`);
      else if (totalSize() + f.size > LIM.total) errs.push(`「${esc(f.name)}」を追加できません。合計15MBを超えます。`);
      else X.files.push({ name: f.name, size: f.size });
    });
    X.fileErr = errs.join('<br>');
    renderMail();
    if (errs.length) $('xBody').scrollTop = $('xBody').scrollHeight;
  };

  search();
  if (location.hash.startsWith('#mail')) {
    selected = new Set(results.slice(0, 3).map((a) => a.id)); renderTable(); renderBar(); openMail();
    if (location.hash !== '#mail') { const t = TEMPLATES[0]; Object.assign(X, { tpl: t.id, subj: t.subj, body: t.body, files: [{ name: '会社説明会のご案内.pdf', size: 482000 }, { name: 'ES記入用紙.docx', size: 61000 }] }); }
    if (location.hash === '#mail-confirm' || location.hash === '#mail-at' || location.hash === '#mail-done') X.step = 'confirm';
    if (location.hash === '#mail-at' || location.hash === '#mail-done') X.when = 'at';
    if (location.hash === '#mail-done') { X.at = new Date(`${X.date}T10:00:00`); X.step = 'done'; }
    renderMail();
  }
  if (location.hash === '#modal' || location.hash === '#modal-is') {
    openModal();
    if (location.hash === '#modal') { M.season = 'main'; M.focus = '1234570'; M.jobs.add('1234567'); M.slots.add('1234570:none'); renderModal(); }
  }
  if (location.hash === '#modal-all') { openModal(); M.season = 'main'; toggleJob('1234570'); renderModal(); }
  if (location.hash === '#open' || location.hash === '#cal') { detailOpen = true; renderSearch(); }
  if (location.hash === '#pref') { detailOpen = true; renderSearch(); F.prefs = ['東京都', '神奈川県', '埼玉県']; $('prefBtn').click(); }
  if (location.hash === '#cal') {
    $('dateBtn').click();
    [2, 8].forEach((d) => document.querySelector(`#dateDD [data-d="${new Date(2026, 10, d).getTime()}"]`).click());
    $('dateBtn').click();
  }
})();
