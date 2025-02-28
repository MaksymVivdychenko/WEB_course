let button = document.querySelector('.submitButton');
button.addEventListener('click', function ()
{
    let count = parseInt(document.querySelector('.inputNumber').value);
    if(count > 5 || count <= 0)
    {
        alert('Введіть значення в межах від 1 до 5');
    }
    else if(document.querySelector('.createButton'))
    {
        alert('Спочатку видаліть форму');
    }
    else
    {
        let block3 = document.querySelector('.block3');
        for (let i = 0; i < count; i++)
        {
            // Створюємо контейнерний div
            let editingDiv = document.querySelector('.editingDiv');
            let containerDiv = document.createElement('div');
            containerDiv.classList.add('choiceDiv');
            containerDiv.style.display = 'flex'; // Вирівнюємо поля в один рядок
            containerDiv.style.justifyContent = 'space-between'; 
            containerDiv.style.alignItems = 'center';// Розділяємо поля
            containerDiv.style.marginBottom = '10px'; 
            containerDiv.style.width = '100%';
            containerDiv.style.height = '7%';
        
            // Створюємо поле для заголовка
            let inputFieldHeading = document.createElement('input');
            inputFieldHeading.style.fontSize = '1em';
            inputFieldHeading.placeholder = `елемент${i + 1} заг`;
            inputFieldHeading.type = 'text';
            inputFieldHeading.style.width = '30%';
            inputFieldHeading.style.marginRight = '5px';
            inputFieldHeading.style.height = '30px';
        
            // Створюємо поле для тексту
            let inputFieldText = document.createElement('input');
            inputFieldText.style.fontSize = '1em';
            inputFieldText.placeholder = `елемент${i + 1} текст`;
            inputFieldText.type = 'text';
            inputFieldText.style.width = '60%';
            inputFieldText.style.height = '30px';
        
            // Додаємо обидва поля в контейнерний div
            containerDiv.appendChild(inputFieldHeading);
            containerDiv.appendChild(inputFieldText);
        
            // Додаємо контейнер в основний блок
            editingDiv.appendChild(containerDiv);
        }    
        let button = document.createElement('button');
        button.classList.add('createButton');
        button.type = 'button';
        button.textContent = 'Створити';
        button.style.fontSize = '1em';
        button.style.width = '40%';
        button.style.marginTop = '20px'; // Додаємо відступ зверху
        block3.appendChild(button);

        let buttonDelete = document.createElement('button');
        buttonDelete.classList.add('deleteButton');
        buttonDelete.type = 'button';
        buttonDelete.textContent = 'Видалити';
        buttonDelete.style.width = '40%';
        buttonDelete.style.fontSize = '1em';
        buttonDelete.style.marginTop = '20px'; // Додаємо відступ зверху
        buttonDelete.style.marginLeft = '5%';
        block3.appendChild(buttonDelete);
        buttonDelete.addEventListener('click', deleteForm);
        button.addEventListener('click', () => {
            let data = [];
            let isFull = true;
            let isManyLetters = false;
            const fields = document.querySelectorAll('.choiceDiv');
            fields.forEach((field, index) => {
                const heading = field.querySelector('input[type="text"]:nth-child(1)').value;
                const text = field.querySelector('input[type="text"]:nth-child(2)').value;
                if(heading === '' || text === '')
                {
                    isFull = false;
                }
                if(heading.length > 12)
                {
                    alert("Забагато символів");
                    isManyLetters = true;
                }
                else if(text.length > 20)
                {
                    alert("Забагато символів");
                    isManyLetters = true;
                }
            });
            if(isFull === true && isManyLetters === false)
            {
                fields.forEach((field, index) => {
                    const heading = field.querySelector('input[type="text"]:nth-child(1)').value;
                    const text = field.querySelector('input[type="text"]:nth-child(2)').value;
                    data.push({
                        title: heading.trim(),
                        content: text.trim()
                    });
                });

                // Відправлення даних на сервер
                fetch('save.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(result => {
                    console.log('Дані успішно збережено:', result);
                    alert('Дані успішно збережено!');
                })
                .catch(error => {
                    console.error('Помилка збереження даних:', error);
                    alert('Помилка збереження даних.');
                });
            }
            else{
                if(isManyLetters === false)
                {
                alert('Заповність всі поля!');
                }
                else{
                    alert('Забагато символів!');
                }
            }
        });
    }
    }
)
function deleteForm()
{
    let removeDiv = document.querySelectorAll('.choiceDiv');
    let button = document.querySelector('.createButton');
    let buttonDelete = document.querySelector('.deleteButton');
    removeDiv.forEach(element => {
        element.remove();
    });
    button.remove();
    buttonDelete.remove();
}
