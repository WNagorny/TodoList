let todoInput // miejsce , gdzie użytkownuk wpisuje treść zadania
let errorInfo // onfo o braku zadań / konieczności wpisania tekstu
let addBtn // przycisk ADD - dodaje nowe elementy do listy
let ulList // lista zadań, tagi UL
let newTodos



let popup  // sam popup
let popupInfo  // tekst w popupie, jak sie doda pusty tekst
let todoToEdit  // Edytowany Todo
let popupInput  // input w popupie
let popupAddBtn  // przycisk  'zatwierdź' w popupie
let popupCloseBtn // przycisk 'anuluj' w popupie







// 1.
const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
}

const prepareDOMElements = () => {
    // pobieramy wszystkie elemnty
    todoInput= document.querySelector('.todo-input')
    errorInfo= document.querySelector('.error-info')
    addBtn= document.querySelector('.btn-add')
    ulList= document.querySelector('.todolist ul')
    deleteTodos = document.querySelector('delete')

    // pobieramy elementy popup

    popup = document.querySelector('.popup')
    popupInfo = document.querySelector('.popup-info')
    popupInput = document.querySelector('.popup-input')
    popupAddBtn = document.querySelector('.accept')
    popupCloseBtn = document.querySelector('.cancel')
}

const prepareDOMEvents = () => {
    // nadajemy nasłuchiwanie
    addBtn.addEventListener('click', addNewTodo)

    ulList.addEventListener('click', checkClick)

    popupCloseBtn.addEventListener('click', closePopup)

    popupAddBtn.addEventListener('click', changeTodoText)

    todoInput.addEventListener('keyup', enterKeyCheck)          // nasłuchiwanie na entera
}




// 2. Tworzenie fukcji która będzie odpowiadała za tworzenie nowych todosów na naszej liście

/*
    1. Tworzy nowy element 'li'
    2. Dodaje nowy element do ul listy
    3.Funkcja odpalana na click w przycisk ADD
    4. Przechwytuje treść z inputa i umieszcza go w nowo utworzonym 'li'
    5. Funkcja nie doda do listy pustego 'todosa'
*/

const addNewTodo = () => {
    if(todoInput.value !== ''){
        newTodos = document.createElement('li')   // 1
        newTodos.textContent = todoInput.value    // 4\

        createToolsArea()                           // wywołujemy funkcję która dodaje przyciski do nowych li

        ulList.append(newTodos)                   // 2
        todoInput.value = ''
        errorInfo.textContent = ''
    } else {
        errorInfo.textContent = 'Wpisz treść zadania!'  // 5
    }
}

// 3. Teraz musimy napisać fukcje która będzie tworzyła nam panel boczny z przyciskamii ich klasami(odwzorować div 'tools')

const createToolsArea = () => {

    const toolsPanel = document.createElement('div')
    toolsPanel.classList.add('tools')
    newTodos.append(toolsPanel)                         // umiściliśmy nasz stworzony div w zmienną 'new Todos' która tworzy nowy 'li'

    const completeBtn = document.createElement('button')
    completeBtn.classList.add('complete')
    completeBtn.innerHTML = '<i class="fas fa-check"></i'

    const editteBtn = document.createElement('button')
    editteBtn.classList.add('edit')
    editteBtn.textContent = 'EDIT'

    const deleteteBtn = document.createElement('button')
    deleteteBtn.classList.add('delete')
    deleteteBtn.innerHTML = '<i class="fas fa-times"></i>'


    toolsPanel.append(completeBtn,editteBtn,deleteteBtn)    // w naszego diva umieściliśmy wszytkie utworzone przyciski

}

//  4. Tworzymy funckje nasłuchiwanie na kliknięcie na boczny panel

const checkClick = e => {
    if(e.target.matches('.complete')) {
       e.target.closest('li').classList.toggle('completed') // dodaliśmy klase 'completed' z css do naszego 'li' przy kliknięciu na ptaszek
       e.target.classList.toggle('completed')
    } else if(e.target.matches('.edit')){
        editTodo(e)                          // wywołujemy funkcje po kliknięciu na 'edit'

    } else if(e.target.matches('.delete')){
        deleteTodo(e)
    }


}

// 5. Tworymy funkcje która będzie otwierała naszego 'popup'


const editTodo = (e) => {
    todoToEdit = e.target.closest('li')                     // robimy tak żeby po kliknięciu na odpowiedni edit otwierał się nam rodzic tego li, czyli tekst
    popupInput.value = todoToEdit.firstChild.textContent    // robimy tak,żeby istniejący tekst był już wpisany do popupinputa i był gotowy do zmieniania. 
    popup.style.display = 'flex'                             // zmieniamy dla  popup dispal z 'none' na  'flex', żeby te cechy które są w CSS się przypisały do popup. 
}

// 6. Funkcja zamykania 'popup'
const closePopup = () => {
    popup.style.display = 'none'            // zmieniamy dla  popup dispal z 'flex' na  'none', żeby popupnam się schował 
    popupInfo.textContent = ""              // czyścimy alert o konieczności wpisania czegoś
    
}

// 7. Tworzymy funkcje która umożliwi zapisanie zmienionego todosa na miejsce starego

const changeTodoText = () => {
    if(popupInput.value !==  '') {
         todoToEdit.firstChild.textContent = popupInput.value 
         popup.style.display = 'none'                               // zamykanie 'popup' po zatwierdzeniu zmiany

    } else {
        popupInfo.textContent = "Musisz podać jakiś tekst"
    }
}

// 8. Funkcja usuwania naszych todosów


const deleteTodo = (e) => {
    e.target.closest('li').remove()

    const allTodos = ulList.querySelectorAll('li')      // tworzymy informację która będzie się wyświetlać gdy będdzie brak zadań

    if(allTodos.length === 0) {
        errorInfo.textContent = 'Brak zadań na liście'
    }

}

// 9. Dodawanie todosa za pomocą klawisza 'ENTER'

const enterKeyCheck = (e) => {
    if(e.key === 'Enter') {
        addNewTodo()
    }
}


document.addEventListener('DOMContentLoaded', main)   // Czyli, kiedy cały nasz dokument/DOM zostanie załadowany dopiero wtedy wykonaj funkcje 'main'. Funkcja main natomiast pobierze wszystkie nasze elementy oraz nada nasłuchiwania.