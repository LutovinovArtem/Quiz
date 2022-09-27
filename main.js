//массив с вопросами
const questions = [
  {
    question: "Сложите: 2+2",
    answers: [4, 3, 2, 1],
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
    correct: 4,
  },
];

//элементы
const headerContainer = document.querySelector("#Question");
const answersContainer = document.querySelector("#Answers");
const submBtn = document.querySelector("#AnswerButton");
//
const button = document.querySelector("#button"); //костыль
//переменные игры
let score = 0; //правильные ответы
let questionIndex = 0; //текущий вопрос

//функция очистки
function clearPage() {
  headerContainer.innerHTML = "";
  answersContainer.innerHTML = "";
}

// функция отображения вопроса
function showQuestion() {
  const title = `<div class="question" id="Question"> ${questions[questionIndex]["question"]} </div>`; //шаблон заголовка
  //генерация новой строчки
  headerContainer.innerHTML = title;
  //варианты ответов
  let answerNumber = 1;

  for (answerText of questions[questionIndex]["answers"]) {
    const answerHTML = `<input value="${answerNumber}" type="radio" name="Answer" class="radio1" id="radio1"/> ${answerText} <br />`;

    answersContainer.innerHTML += answerHTML;

    answerNumber++;
  }
}

clearPage();
showQuestion();

submBtn.onclick = checkAnswer();

//если ответ не выбран, то выход из ф-ии

function checkAnswer() {
  const checkRadio = answersContainer.querySelector(
    "input[type='radio']:checked"
  ); //нахождение выбранной радиокнопки

  if (!checkRadio) {
    return;
  }

  const userAnswer = parseInt(checkRadio.value); //номер ответа пользователя

  if (userAnswer === questions[questionIndex]["correct"]) {
    score++;
  }

  if (questionIndex !== questions.length - 1) {
    questionIndex++;
    clearPage();
    showQuestion();
    return;
  } else {
    clearPage();
    showResults();
  }

  function showResults() {
    let title, message;
    //варианты заголовков и текста
    if (score === questions.length) {
      title = "Поздравляем! 🥳";
      message = "Вы ответили на все вопросы верно! 👍";
    } else if ((score * 100) / questions.lenght > 50) {
      title = "Неплохой результат!  😉";
      message = "Вы ответили верно на большинство вопросов! 👍";
    } else {
      title = "Результат не очень...  🤔";
      message = "У вас слишком мало правильных ответов! 🫵";
    }

    //результат
    let result = `${score} из ${questions.length}`;

    //последнее сообщение
    const finalMessageTemplate = `<h2 class="title"> ${title} </h2>
    <h3 class="summary"> ${message} </h3>
    <p class="result"> ${result} </p>`;

    headerContainer.innerHTML = finalMessageTemplate;

    //играть снова
    button.innerText = "Пройти заново"; //по идее должно работать через submBtn, но не работает
    button.onclick = () => history.go(); //обновить страницу
  }
}
