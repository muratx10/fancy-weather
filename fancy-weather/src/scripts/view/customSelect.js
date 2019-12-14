export default function () {
  for (const dropdown of document.querySelectorAll('.custom-select-wrapper')) {
    dropdown.addEventListener('click', function () {
      this.querySelector('.custom-style').classList.toggle('open');
    });
  }

  for (const option of document.querySelectorAll('.custom-option')) {
    option.addEventListener('click', function () {
      if (!this.classList.contains('selected')) {
        this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
        this.classList.add('selected');
        this.closest('.custom-style').querySelector('.custom-style__trigger span').textContent = this.textContent;
      }
    });
  }

  window.addEventListener('click', (e) => {
    for (const select of document.querySelectorAll('.custom-style')) {
      if (!select.contains(e.target)) {
        select.classList.remove('open');
      }
    }
  });
}
