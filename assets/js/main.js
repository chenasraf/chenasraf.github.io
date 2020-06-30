document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.social-media-list a, .post-content a:not([href^="#"]):not([href^="/"])').forEach((el) => {
    el.target = '_blank';
  })
});

if (window.location.hostname === 'casraf.blog' && window.location.protocol !== 'https:') {
  window.location.protocol = 'https:'
}
