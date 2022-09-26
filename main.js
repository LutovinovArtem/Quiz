//массив с вопросами
const questions = [
    {
        question: "Сложите: 2+2",
        answers: [4, 3, 2 , 1],
        correct: 1,
    },
    {
        question: "Сложите: 1+1",
        answers: [4, 3, 2, 1],
        correct: 3,
    },
    {
        question: "Возведите в квадрат: 1",
        answers: [4, 3, 2, 1],
        correct: 4
    }
];

//элементы
const headerContainer = document.querySelector('#Question');
const answersContainer= document.querySelector('#Answers');
const submBtn = document.querySelector('#answerButton');
//переменные игры
let score = 0; //правильные ответы
let questionIndex = 0; //текущий вопрос

//функция очистки
function clearPage() {
headerContainer.innerHTML = '';
answersContainer.innerHTML = '';
}

// функция отображения вопроса
function showQuestion(){
    const answerTemplate = `<div class="question" id="Question"> %title% </div>`; //шаблон заголовка
    const title = answerTemplate.replace('%title% ', questions[questionIndex]['question'])//генерация новой строчки
    headerContainer.innerHTML = title;
    //варианты ответов
    let answerNumber = 1;

    for (answerText of questions[questionIndex]['answers']){
        const questionTemplate = `<input value="%number%" type="radio" name="Answer" class="radio1" id="radio1"/> %answer% <br />`
        const answerHTML = questionTemplate.replace('%answer%', answerText).replace('%number%', answerNumber);

        answersContainer.innerHTML += answerHTML;

        answerNumber++;
    }
}

clearPage();
showQuestion();

submBtn.onclik = checkAnswer();

//если ответ не выбран, то выход из ф-ии

function checkAnswer(){
    const checkRadio = answersContainer.querySelector("input[type='radio']:checked")//нахождение выбранной радиокнопки

    if (!checkRadio){
         return;
    }

    const userAnswer = parseInt(checkRadio.value)//номер ответа пользователя
    
    if (userAnswer === questions[questionIndex]['correct']) {
        score++;
    }

    if (questionIndex !== questions.length - 1){
        questionIndex++;
        clearPage();
        showQuestion();
        return;
    } else {
        clearPage();
        showResults();

    }
    

    function showResults() {

    }
}

