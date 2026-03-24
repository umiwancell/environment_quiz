let currentQuestion = 0
let score = 0
let wrongQuestions = []

let questions = []
let time = 0
let timer
let correctCount = 0

const titleScreen = document.getElementById("title-screen")
const levelScreen = document.getElementById("level-screen")
const quizScreen = document.getElementById("quiz-screen")
const resultScreen = document.getElementById("result-screen")

const startBtn = document.getElementById("startBtn")
const characters = document.querySelectorAll(".character")

const questionText = document.getElementById("question")
const choicesDiv = document.getElementById("choices")
const resultImage = document.getElementById("result-image")



function changeBackground(image){
document.body.style.backgroundImage = "url('img/"+image+"')"
}




/* スタート */

startBtn.onclick = () => {

titleScreen.style.display="none"
levelScreen.style.display="block"

}


/* レベル選択 */

characters.forEach(character => {

character.onclick = () => {

const level = character.dataset.level

if(level === "beginner") questions = beginnerQuestions
if(level === "middle") questions = middleQuestions
if(level === "hard") questions = hardQuestions

levelScreen.style.display="none"
quizScreen.style.display="block"

changeBackground("bg_quiz.png")
showQuestion()
startTimer()

}

})


/* 問題表示 */

function showQuestion(){

const q = questions[currentQuestion]

document.getElementById("progress").textContent =
(currentQuestion+1)+" / "+questions.length

questionText.textContent = q.question

choicesDiv.innerHTML=""

q.choices.forEach((choice,index)=>{

const button = document.createElement("button")

button.textContent = choice

button.onclick = ()=>checkAnswer(index)

choicesDiv.appendChild(button)

})

}


/* 回答 */

function checkAnswer(index){
const q = questions[currentQuestion]

if(index === q.answer){

resultImage.src="img/correct.png"
correctCount++

}else{

resultImage.src="img/wrong.png"
wrongQuestions.push(q)

}

resultImage.style.display="block"

setTimeout(()=>{

resultImage.style.display="none"

currentQuestion++

if(currentQuestion < questions.length){

showQuestion()
startTimer()

}else{

showResult()

}

},1000)

}



function nextQuestion(){

currentQuestion++

if(currentQuestion < questions.length){

showQuestion()
startTimer()

}else{

showResult()

}

}






/* 結果 */

function showResult(){

clearInterval(timer)

quizScreen.style.display="none"
resultScreen.style.display="block"

let questionScore = correctCount * 10
let timeScore = 300 - time

if(timeScore < 0){
timeScore = 0
}

let finalScore = questionScore + timeScore

document.getElementById("score").textContent =
"คะแนน："+finalScore

document.getElementById("time").textContent =
"ระยะเวลาดำเนินการ："+time+"วินาที"

document.getElementById("correct").textContent =
"จำนวนคำตอบที่ถูกต้อง："+correctCount+" / "+questions.length


const exp = document.getElementById("explanations")

wrongQuestions.forEach(q=>{

const p = document.createElement("p")

p.textContent="คำอธิบาย："+q.explanation

exp.appendChild(p)

})

changeBackground("bg_result.png")

}


function startTimer(){

if(timer) return   // ←これ追加（すでに動いてたら何もしない）

time = 0

timer = setInterval(()=>{

time++

document.getElementById("timer").textContent =
time + "วินาที"

},1000)

}


changeBackground("bg_title.png")
