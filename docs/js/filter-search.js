document.addEventListener('DOMContentLoaded', function() {
  console.log('Filter-search script loaded');

  const pathname = window.location.pathname;
  const currentLang = pathname.endsWith('.en.html') ? 'en' : 'ru';
  console.log('Current lang:', currentLang);

  const searchResultsContainer = document.querySelector('.md-search-result .md-search-result__list');

  if (!searchResultsContainer) {
    console.warn('Search results container not found - check selector');
    const fallback = document.querySelector('.md-search__output ul');
    if (fallback) {
      searchResultsContainer = fallback;
      console.log('Using fallback selector');
    } else {
      return;
    }
  }
  console.log('Container found:', searchResultsContainer);

  // Heuristic for English text
  function isEnglishText(text) {
    if (!text) return false;
    const latinCount = (text.match(/[a-zA-Z]/g) || []).length;
    const cyrillicCount = (text.match(/[а-яёА-ЯЁ]/g) || []).length;
    return latinCount > cyrillicCount || cyrillicCount === 0;
  }

  function filterResults() {
    console.log('Filtering results...');
    const results = searchResultsContainer.querySelectorAll('li');
    let hiddenCount = 0;
    results.forEach((li, index) => {
      const link = li.querySelector('a');
      const titleEl = li.querySelector('.md-search-result__title');
      if (!link || !titleEl) return;

      const linkHref = link.getAttribute('href');
      const titleText = titleEl.textContent.trim();

      // Primary: Check href for .en.html
      let isEnPage = linkHref && linkHref.includes('.en.html');

      // Fallback: Text heuristic if no .en in href
      if (!isEnPage && titleText) {
        isEnPage = isEnglishText(titleText);
      }

      // Hide if mismatch
      const shouldHide = (currentLang === 'ru' && isEnPage) || (currentLang === 'en' && !isEnPage);
      if (shouldHide) {
        li.style.display = 'none';
        hiddenCount++;
      } else {
        li.style.display = 'block';
      }

      // Debug: Log first 3 results with details
      if (index < 3) {
        console.log(`Result ${index + 1}: HREF="${linkHref}" | Title="${titleText.substring(0, 50)}..." | Is EN: ${isEnPage} | Hide: ${shouldHide}`);
      }
    });
    console.log(`Filtered out ${hiddenCount} results out of ${results.length}`);
  }

  const observer = new MutationObserver((mutations) => {
    let shouldFilter = false;
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        shouldFilter = true;
      }
    });
    if (shouldFilter) {
      setTimeout(filterResults, 150);
    }
  });

  observer.observe(searchResultsContainer, { childList: true, subtree: true });

  setTimeout(filterResults, 300);

  const searchInput = document.querySelector('.md-search__input');
  if (searchInput) {
    searchInput.addEventListener('input', () => setTimeout(filterResults, 200));
  }

  const searchOverlay = document.querySelector('.md-search__overlay');
  if (searchOverlay) {
    searchOverlay.addEventListener('click', () => setTimeout(filterResults, 50));
  }
});