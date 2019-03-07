document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.social-media-list a').forEach((el) => {
    el.target = '_blank';
    console.log(el)
  })
});
