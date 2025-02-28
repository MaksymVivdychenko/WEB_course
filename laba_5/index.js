

// завдання 1
   function swapText() {
        const block1 = document.querySelector('.headerText');
        const block6 = document.querySelector('.block6Text');
        
        const block1Text = block1.textContent;
        const block6Text = block6.textContent;

        block1.textContent = block6Text;
        block6.textContent = block1Text;
    }

// завдання 2
    function CircleSquare(a)
    {
        const area = Math.PI*a**2
        const block5 = document.querySelector('.block5');
        block5.innerHTML += `<br>
        <span class = "square">${area.toFixed(3)}</span>`;
    }

// завдання 3
window.onload = () => 
    {
        localStorage.removeItem('tableData'); // це для 5 завдання
        let cookieValue = document.cookie.toString().split('=');
        const form = document.querySelector('.InputForm');
        if(cookieValue[1] != "-1" && cookieValue[1] !== undefined)
        {
            form.style.display = 'none';
            setTimeout(() => 
            {
                if (confirm(`Last digit was ${cookieValue[1]}. Delete cookies ?`))
                {
                    form.style.display = 'grid';
                    document.cookie = "isDigitFound=-1;";
                }
                else
                {
                    alert("Перевантажте сторінку, щоб отримати доступ до форми, інакше партія забере миска рис і кішка-дівчина")
                }
            }, 100);
        }
};
    function FindSmallestNum()
    {
        let minDigit = 9;
        const inputNum = document.querySelector('.inputNumber');
        const num = parseInt(inputNum.value);
        if(isNaN(num) == false)
        {
            const digits = num.toString().split('');
            for(const digit of digits)
            {
                let value = Number(digit);
                if(value < minDigit)
                {
                    minDigit = value;
                }
            }
            alert(minDigit);
            document.cookie = `isDigitFound=${minDigit};`;
        }
        else
        {
            alert("Field is empty!")
        }
    }

// завдання 4
function changeColor(){
	const block6Text = document.querySelector('.block6Text');
	const colorPicker = document.querySelector('.colorPicker');
	const savedColor = localStorage.getItem('block6TextColor');

   	if (savedColor) {
        block6Text.style.color = savedColor; 
    }

    block6Text.addEventListener('mouseup', function() {
	    const selectedColor = colorPicker.value;
	    block6Text.style.color = selectedColor;  

	    localStorage.setItem('block6TextColor', selectedColor);
	});
}

// завдання 5
const block =  document.querySelector('.block7')
block.addEventListener('mouseleave', () => 
    {
        if(!document.querySelector('table'))
        {
            createTable();
        }
    })
block.addEventListener('touchend', () => 
    {
        if(!document.querySelector('table'))
        {
            createTable();
        }
    })

function createTable()
{
    const table = document.createElement('table');
      const cellCount = prompt("Введіть кількість клітинок у таблиці НАТУРАЛЬНИМ числом з верхнею межею 40:", "4");
      const numCells = parseInt(cellCount);
      if (isNaN(numCells) || numCells <= 0  || numCells > 40) 
        {
        alert("Невірна кількість клітинок");
        return;
      }
      const row1 = document.createElement('tr');
      const row2 = document.createElement('tr');
      const button = document.createElement('button');
      button.textContent = 'Save data';
      button.classList.add('task5Button');

      if(numCells % 2 != 0)
      {
        for (let i = 0; i < numCells; i++) {
            const cell = document.createElement('td');
            cell.contentEditable = "true";
            cell.textContent = `Cell ${i + 1}`;
            row1.appendChild(cell)
          }
      }
      else
      {
        for (let i = 0; i < numCells; i++) {
            const cell = document.createElement('td');
            cell.style.border = '1px solid black';
            cell.style.textAlign = 'center';
            cell.contentEditable = "true";
            cell.textContent = `Cell ${i + 1}`;
            if (i % 2 === 0) {
              row1.appendChild(cell);
            } else {
              row2.appendChild(cell);
            }
          }
      }

      table.appendChild(row1);
      if (numCells > 1 && numCells % 2 === 0) {
        table.appendChild(row2);
      }
      button.addEventListener('click', () =>
    {
        const rows = table.querySelectorAll('tr');
        const tableData = [];
        rows.forEach(row => 
        {
            const cells = row.querySelectorAll('td');
            const rowData = [];
            cells.forEach(cell => rowData.push(cell.textContent));
            tableData.push(rowData);
        }
        )
        localStorage.setItem('tableData', JSON.stringify(tableData));
        alert('Дані збережено в localStorage');
    })

      block.appendChild(table);
      block.appendChild(button);
}
// виклик функцій
     CircleSquare(2);
     swapText();
     changeColor();