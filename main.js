document.querySelectorAll('.image-button').forEach(button => {
    button.addEventListener('click', () => {
        const targetClass = button.getAttribute('data-target');
        const targetElement = document.querySelector(targetClass);
        if (targetElement) {
            // Получ текущ знач display
            const currentDisplay = window.getComputedStyle(targetElement).display;
            
            // Переключ видимость
            targetElement.style.display = currentDisplay === 'none' ? 'block' : 'none';
        }
    });
});
  const buttons = document.querySelectorAll('.image-button');

  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const img = this.querySelector('img');
      // Проверка текущ сост кнопки
      if (img.src.includes('but.svg')) {
        img.src = 'img/butt_close.svg'; // ченч на закрывающее изображение
      } else {
        img.src = 'img/but.svg'; // Возвращ исх изображение
      }
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const tkForm = document.getElementById('tkForm');
    const tkContainer = document.getElementById('tkContainer');
    const localStorageKey = 'tkImages';

    // Загруж img из localStorage
    const loadStoredImages = () => {
        const storedImages = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
        storedImages.forEach(imageData => {
            const img = document.createElement('img');
            img.src = imageData.src;
            img.alt = imageData.title;
            img.classList.add('img_tk');
            tkContainer.appendChild(img);
        });
    };

    // Отпр формы
    tkForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('tkTitle').value;
        const imageFile = document.getElementById('tkImage').files[0];

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = document.createElement('img');
            img.src = event.target.result;
            img.alt = title;
            img.classList.add('img_tk');
            tkContainer.appendChild(img);
            
            // Сохр в localStorage
            const storedImages = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
            storedImages.push({ title, src: event.target.result });
            localStorage.setItem(localStorageKey, JSON.stringify(storedImages));
        };

        if (imageFile) {
            reader.readAsDataURL(imageFile);
        }

        tkForm.reset(); // Сброс  
    });

    loadStoredImages(); // Загр img при загрузке страницы
});