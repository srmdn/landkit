// landkit gallery: dark theme, smooth interactions

(function () {
  var gallery = document.getElementById('gallery');
  var search = document.getElementById('search');
  var filterBar = document.getElementById('category-filters');

  var templates = [];
  var activeCategory = 'all';

  function fetchTemplates() {
    return fetch('templates.json')
      .then(function (r) { return r.json(); })
      .catch(function () { return []; });
  }

  function buildCategoryFilters() {
    var categories = [];
    templates.forEach(function (t) {
      var cat = t.category || 'uncategorized';
      if (categories.indexOf(cat) === -1) categories.push(cat);
    });

    if (categories.length < 2) return;

    var html = '<button class="cat-btn active" data-cat="all">All</button>';
    categories.forEach(function (c) {
      html += '<button class="cat-btn" data-cat="' + c + '">' + c + '</button>';
    });
    filterBar.innerHTML = html;

    var buttons = filterBar.querySelectorAll('.cat-btn');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-cat');
        render(search.value);
      });
    });
  }

  function render(filter) {
    filter = (filter || '').toLowerCase().trim();
    var filtered = templates;

    if (activeCategory !== 'all') {
      filtered = filtered.filter(function (t) {
        return (t.category || 'uncategorized') === activeCategory;
      });
    }

    if (filter) {
      filtered = filtered.filter(function (t) {
        return (t.name || '').toLowerCase().indexOf(filter) !== -1 ||
               (t.description || '').toLowerCase().indexOf(filter) !== -1 ||
               (t.category || '').toLowerCase().indexOf(filter) !== -1 ||
               (t.tags || []).some(function (tag) { return tag.toLowerCase().indexOf(filter) !== -1; });
      });
    }

    if (!filtered.length) {
      gallery.innerHTML = '<div class="empty-state"><p>No templates found. Try a different search.</p></div>';
      return;
    }

    gallery.innerHTML = filtered.map(function (t) {
      var imgHtml = t.has_preview
        ? '<img src="templates/' + t.folder + '/' + (t.preview_file || 'preview.png') + '" alt="' + t.name + '" loading="lazy">'
        : '<div class="no-preview">Preview coming soon</div>';
      var tagsHtml = (t.tags || []).map(function (tag) {
        return '<span class="tag">' + tag + '</span>';
      }).join('');
      var catTag = '<span class="tag category">' + (t.category || 'uncategorized') + '</span>';

      return '<a href="templates/' + t.folder + '/" class="card">' +
        '<div class="card-img">' + imgHtml + '</div>' +
        '<div class="card-body">' +
          '<h3>' + t.name + '</h3>' +
          '<p>' + (t.description || '') + '</p>' +
          '<div class="card-tags">' + catTag + tagsHtml + '</div>' +
        '</div>' +
      '</a>';
    }).join('');
  }

  // Keyboard shortcut: / to focus search
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== search) {
      e.preventDefault();
      search.focus();
    }
    if (e.key === 'Escape' && document.activeElement === search) {
      search.blur();
    }
  });

  // Init
  fetchTemplates().then(function (data) {
    templates = data;
    buildCategoryFilters();
    render('');
  });

  search.addEventListener('input', function () {
    render(search.value);
  });

  // Ko-fi close
  var kofiCard = document.getElementById('kofiCard');
  var kofiClose = document.getElementById('kofiClose');
  if (kofiClose && kofiCard) {
    kofiClose.addEventListener('click', function () {
      kofiCard.style.display = 'none';
    });
  }
})();