document$.subscribe(function() {
  const searchInput = document.querySelector('.md-search__input');
  const searchResultsList = document.querySelector('.md-search-result__list');

  if (!searchInput || !searchResultsList) return;

  function filterSearchResults() {
    const currentLang = document.documentElement.lang;  // 'ru' или 'en'

    document.querySelectorAll('.md-search-result__list li').forEach(li => {
      const a = li.querySelector('a');
      if (a) {
        const href = a.getAttribute('href');
        const itemLang = href.includes('.en/') ? 'en' : 'ru';
        li.style.display = (itemLang === currentLang) ? '' : 'none';
      }
    });
  }

  // Observer для изменений в списке результатов
  const observer = new MutationObserver(filterSearchResults);
  observer.observe(searchResultsList, { childList: true, subtree: true });

  // Дополнительно: фильтр при фокусе на инпуте (на случайной подгрузки)
  searchInput.addEventListener('focus', filterSearchResults);
  searchInput.addEventListener('input', () => setTimeout(filterSearchResults, 100));  // С задержкой для асинхронных результатов
});