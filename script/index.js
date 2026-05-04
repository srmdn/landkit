// landkit gallery — loads templates.json and renders the grid

(async function () {
  const gallery = document.getElementById('gallery');
  const search = document.getElementById('search');

  let templates = [];

  try {
    const res = await fetch('templates.json');
    templates = await res.json();
  } catch (e) {
    gallery.innerHTML = '<div class="empty-state"><p>Failed to load templates. Check back soon.</p></div>';
    return;
  }

  function render(filter = '') {
    const q = filter.toLowerCase().trim();
    const filtered = q
      ? templates.filter(t =>
          t.name.toLowerCase().includes(q) ||
          (t.description || '').toLowerCase().includes(q) ||
          (t.tags || []).some(tag => tag.toLowerCase().includes(q))
        )
      : templates;

    if (!filtered.length) {
      gallery.innerHTML = '<div class="empty-state"><p>No templates found for "' + filter + '"</p></div>';
      return;
    }

    gallery.innerHTML = filtered.map(t => `
      <a href="templates/${t.folder}/" class="card" style="text-decoration:none;color:inherit">
        <img src="templates/${t.folder}/preview.png" alt="${t.name}" loading="lazy">
        <div class="card-body">
          <h3>${t.name}</h3>
          <p>${t.description || ''}</p>
          <div class="card-tags">
            ${(t.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        </div>
      </a>
    `).join('');
  }

  search.addEventListener('input', () => render(search.value));
  render();
})();
