document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.social-media-list a').forEach((el) => {
    el.target = '_blank';
  })
});

if (window.location.hostname === 'casraf.blog' && window.location.protocol !== 'https:') {
  window.location.protocol = 'https:'
}
