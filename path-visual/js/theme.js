let hasUserOverride = false;

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

function applySystemTheme() {
  document.documentElement.removeAttribute('data-theme');
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

// Toggle simples: só light <-> dark
function toggleTheme() {
  hasUserOverride = true;

  const isDark =
    document.documentElement.getAttribute('data-theme') === 'dark' ||
    (!document.documentElement.hasAttribute('data-theme') && mediaQuery.matches);

  const nextTheme = isDark ? 'light' : 'dark';
  applyTheme(nextTheme);
  updateBrowserThemeColor(nextTheme);
}

// Se o sistema mudar e NÃO houver override, respeita
mediaQuery.addEventListener('change', () => {
  if (!hasUserOverride) {
    applySystemTheme();
  }
});

// Ao carregar: nunca força nada
window.addEventListener('DOMContentLoaded', () => {
  applySystemTheme();
});

function updateBrowserThemeColor(theme) {
  const meta = document.getElementById('theme-color-meta');
  if (!meta) return;

  meta.setAttribute(
    'content',
    theme === 'dark' ? '#0f0f0f' : '#ffffff'
  );
}