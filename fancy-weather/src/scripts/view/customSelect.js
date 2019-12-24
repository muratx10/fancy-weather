export default function () {
  document.querySelectorAll('.custom-select-wrapper').forEach((el) => {
    el.addEventListener('click', () => {
      el.querySelector('.custom-style').classList.toggle('open');
    });
  });

  document.querySelectorAll('.custom-option').forEach((el) => {
    el.addEventListener('click', () => {
      if (!el.classList.contains('selected')) {
        el.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
        el.classList.add('selected');
        el.closest('.custom-style').querySelector('.custom-style__trigger span').textContent = el.textContent;
      }
    });
  });

  window.addEventListener('click', (e) => {
    document.querySelectorAll('.custom-style').forEach((el) => {
      if (!el.contains(e.target)) {
        el.classList.remove('open');
      }
    });
  });
}
