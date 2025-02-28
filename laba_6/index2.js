async function fetchDataAndCreateAccordion() {
    try {
        // Надсилання GET-запиту до load.php
        const response = await fetch('load.php');

        // Перевірка статусу відповіді
        if (!response.ok) {
            throw new Error(`HTTP помилка! Статус: ${response.status}`);
        }

        // Отримання та розбір JSON-відповіді
        const result = await response.json();

        // Перевірка статусу відповіді сервера
        if (result.status !== 'success') {
            throw new Error(result.message || 'Невідома помилка сервера');
        }

        // Дані для акордеону
        const data = result.data;
        CreateAccordionByData(data);
    } catch (error) {
        // Обробка помилок
        console.error('Помилка під час отримання даних:', error.message);

        // Виведення повідомлення про помилку на сторінку
        const block3 = document.querySelector('.block3');
        block3.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}
const data = [
    { title: "Заголовок 1", content: "Текст для першого елемента акордеону." },
    { title: "Заголовок 2", content: "Текст для другого елемента акордеону." },
    { title: "Заголовок 3", content: "Текст для третього елемента акордеону." },
    { title: "Заголовок 4", content: "Текст для четвертого елемента акордеону." },
    { title: "Заголовок 5", content: "Текст для п'ятого елемента акордеону." }
  ];
function CreateAccordionByData(data)
{
    const accordionContainer = document.querySelector('.accordion');
      accordionContainer.innerHTML = ''; // Очищення контейнера

      data.forEach((item) => {
        const accordionItem = document.createElement('div');
        accordionItem.classList.add('accordion-item');

        const accordionHeader = document.createElement('div');
        accordionHeader.classList.add('accordion-header');
        accordionHeader.textContent = item.title;

        const accordionContent = document.createElement('div');
        accordionContent.classList.add('accordion-content');
        accordionContent.innerHTML = `<p>${item.content}</p>`;

        accordionHeader.addEventListener('click', () => {
          const isActive = accordionHeader.classList.contains('active');

          // Закриваємо всі відкриті панелі
          document.querySelectorAll('.accordion-header').forEach(header => {
            header.classList.remove('active');
            header.nextElementSibling.style.maxHeight = null;
          });

          // Відкриваємо або закриваємо поточну панель
          if (!isActive) {
            accordionHeader.classList.add('active');
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
          }
        });

        accordionItem.appendChild(accordionHeader);
        accordionItem.appendChild(accordionContent);
        accordionContainer.appendChild(accordionItem);
      });
}

// Виклик функції для створення акордеону
fetchDataAndCreateAccordion();