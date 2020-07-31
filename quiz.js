//declare constants and variables
const currentQuestion = document.querySelector('.current-question');
const quizContainer = document.querySelector('.quiz-container');
var questionOptions = document.querySelectorAll('.current-question-options span');
const timer = document.querySelector('.count-down-time');
const previousQuestion = document.querySelector('.previous-question');
const nextQuestion = document.querySelector('.next-question');
const submit = document.querySelector('.submit');
const finalScore = document.querySelector('.result');
const questionAndOptions = document.querySelector('.questions');
const questionNumber = document.querySelector('.question-numbers');
const currentQuestionNumber = document.querySelector('.current-question-number');
const previewQuestions = document.querySelector('.preview-questions');
const previewBtn = document.querySelector('.preview');
const themeBox = document.querySelector('.theme-box')
const themeSlide = document.querySelector('.theme-slide');
const darkLight = document.querySelector('.dark-light');
let correctAnswers = [];
let counttime = 40;
let currentNumber = 1;
let question_step = 0;
let option1, option2, option3, option4, selectedOption, userAnswer, correctAnswer, number = 0; 



// append questions to the quiz app
function appendQuestion(increment){
    for (let i = 0; i < questions.length; i++) {
     question_step = Math.floor(Math.random() * questions.length);
     option1 = questions[question_step].a;
     option2 = questions[question_step].b;
     option3 = questions[question_step].c;
     option4 = questions[question_step].d;   
    
    }

    currentNumber += increment;
    if (currentNumber == questions.length ) {
        nextQuestion.style.display = 'none';
        submit.style.display = 'block';
    }else{
        nextQuestion.style.display = 'block';

    }
    if (currentNumber <= 0) {
        previousQuestion.style.display = 'none';
    }else{
        previousQuestion.style.display = 'block';

    }
    
    currentQuestion.innerHTML = `
    <p class="question">${questions[question_step].question}</p>
    <div class="current-question-options">
        <span class="option">${option1}</span>
        <span class="option">${option2}</span>
        <span class="option">${option3}</span>
        <span class="option">${option4}</span>
    </div>
    `;
    questionOptions = document.querySelectorAll('.current-question-options span');
questionNumber.textContent = `${currentNumber}/${questions.length}`;
currentQuestionNumber.textContent = currentNumber;

}


// enable the options to be clicked on
function optionsEnabling(){
    questionOptions = document.querySelectorAll('.current-question-options span');

    for (let i = 0; i < questionOptions.length; i++) {
        questionOptions[i].style.backgroundColor = 'dodgerblue';
        questionOptions[i].addEventListener('click', checkAnswer, false);
    }

    // checkAnswer
    

}

function checkAnswer(option){
    selectedOption = option.target.innerText;
    if(option.target){
        option.target.style.backgroundColor = '#46C0B4';
    }
    if(selectedOption === questions[question_step].answer.toString()){
        correctAnswers.push(selectedOption);
        console.log(correctAnswers);
    }else{
        console.log('wrong answer');
    }
    for (let i = 0; i < questionOptions.length; i++) {
        questionOptions[i].removeEventListener('click', checkAnswer)
    
    }
previewques();

}
//time the quiz
function countDownTime(){
    counttime = counttime - 1;

    if(counttime == 0){
        clearInterval(countDownInterval);
        nextQuestion.style.display = 'none';
        previousQuestion.style.display = 'none';
        submit.style.display = 'block';
        previewBtn.style.display = 'block';
        result();

    }
    if (counttime < 10) {
        counttime = '0' + counttime;
    }

    timer.innerHTML = `00:${counttime.toString()}`;
}

//result
function result() {
    questionAndOptions.style.display = 'none';
    finalScore.style.display = 'block';
    questionNumber.style.display = 'none';
    submit.style.display = 'none';
    previewBtn.style.display = 'block';
    
    clearInterval(countDownInterval);

    let userScore = correctAnswers.length * 2;
    let totalScore = questions.length * 2;
    let compliment;
    if (userScore >= (totalScore / 2)) {
        compliment = 'Congratulation, you passed this quiz';
    }else{
        compliment = 'Sorry, you failed this quiz';
    }
    finalScore.insertAdjacentHTML('beforeend', `
        <h2>Result</h2>
        <p class="compliment">${compliment}</p>
        <p>You scored ${userScore} out of ${totalScore}</p>
    `);
    
}

//preview questions
function previewques() {
    let previewDiv = document.createElement('div');
    let previewPara1 = document.createElement('p');
    let previewPara2 = document.createElement('p');
    let answerCheck = document.createElement('span');
    let answerSpan = document.createElement('span');

    number++;
    userAnswer = selectedOption;
    correctAnswer = questions[question_step].answer;
    answerCheck.setAttribute('class', 'check-answer');
    previewPara2.setAttribute('class', 'answer')
    answerCheck.innerHTML = userAnswer;
    if (selectedOption === correctAnswer)  {
        answerCheck.style.color = 'green';
    }else{
        answerCheck.style.color = 'red';
    }
    
    previewPara1.textContent = `${number}. ${questions[question_step].question}`;
    answerSpan.innerHTML = `answer: ${questions[question_step].answer}`;
    previewPara2.appendChild(answerSpan);
    previewPara2.appendChild(answerCheck);
    previewDiv.appendChild(previewPara1);
        
    previewDiv.appendChild(previewPara2);
    previewQuestions.appendChild(previewDiv);       
}

//check
function changeTheme() {
            let disabled = themeBox.classList.contains('disabled');
            if(disabled){
                themeBox.classList.remove('disabled');
                themeBox.style.backgroundColor = 'blue';
                themeBox.style.border = 'none';
                themeSlide.style.left = '55%';
                document.body.style.background = '#000';
                document.body.style.color = '#eee';
                quizContainer.classList.remove('box-shadow');
                darkLight.textContent = 'Light Theme';


            }
            else{
                themeBox.classList.add('disabled');
                themeSlide.style.left = '0';
                themeBox.style.backgroundColor = '#333';
                document.body.style.background = 'linear-gradient(45deg, azure, transparent)';
                document.body.style.color = '#222';
                quizContainer.classList.add('box-shadow');
                darkLight.textContent = 'Dark Theme';

                
            }
}

//update UI

questionNumber.textContent = `${currentNumber}/${questions.length}`;
currentQuestionNumber.textContent = currentNumber;

let countDownInterval = setInterval(countDownTime, 1000);

optionsEnabling();

nextQuestion.onclick = () => {appendQuestion(1), optionsEnabling()};
previousQuestion.onclick = () => {appendQuestion(-1);};
submit.addEventListener('click', () => {
    clearInterval(countDownInterval);
    result();
});
previewBtn.onclick = () => {
    previewQuestions.style.display = 'block';  
    finalScore.style.display = 'none';
    document.body.style.overflow = 'visible';
};
themeBox.addEventListener('click', changeTheme, true);
