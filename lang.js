// ?lang=zh|en wins, then an earlier choice, then the browser's language
(function () {
  const ok = l => l === 'zh' || l === 'en';
  const q = new URLSearchParams(location.search).get('lang');
  let saved = null; try { saved = localStorage.getItem('lang'); } catch (e) {}
  const nav = (navigator.language || '').toLowerCase().startsWith('zh') ? 'zh' : 'en';
  const lang = ok(q) ? q : ok(saved) ? saved : nav;
  const root = document.documentElement;
  root.lang = lang === 'zh' ? 'zh-CN' : 'en';
  document.title = lang === 'zh' ? root.dataset.titleZh : root.dataset.titleEn;
  document.addEventListener('DOMContentLoaded', () => {
    const sel = document.getElementById('langSel');
    sel.value = lang;
    sel.addEventListener('change', () => {
      try { localStorage.setItem('lang', sel.value); } catch (e) {}
      const u = new URL(location.href); u.searchParams.set('lang', sel.value); location.href = u.pathname + u.search;
    });
  });
})();
