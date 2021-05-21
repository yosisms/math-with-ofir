// game configuration:
let questionsMode = 'add';
let difficulty = 'hard';
let maxNumber = 10;
let minNumber = 0;
let drillMode = 'simple';
let correctCounter = 0;
let wrongCounter = 0;

// target HTML elements:
// - nav buttons:
const navItems = [
	{element: document.getElementById('add'), value: 'add'},
	{element: document.getElementById('sub'), value: 'sub'},
	{element: document.getElementById('multiple'), value: 'multiple'},
	{element: document.getElementById('divide'), value: 'divide'}
];
// - data:
const correctAnswerDisplay = document.getElementById('correct-answer-display');
const wrongAnswerDisplay = document.getElementById('wrong-answer-display');
// - question:
const questionDisplay = document.getElementById('question__display');
// - answers:
const answersSection = document.getElementById('answers-options');

// helpers:
const getRandomNum = ({max, min}) => {
	return Math.floor(Math.random() * (+max ?? 1 - +min ?? 0) + +min ?? 0);
}

const addCorrectAnswerChange = () => {
	correctCounter++;
	correctAnswerDisplay.textContent = `תשובות נכונות: ${correctCounter}`;
}

const addWrongAnswerChange = () => {
	wrongCounter++;
	wrongAnswerDisplay.textContent = `תשובות לא נכונות: ${wrongCounter}`;
}

const getOperatorFromQuestionsMode = () => {
	switch (questionsMode) {
		case "add":
			return '+';
		case "sub":
			return '-';
		case 'multiple':
			return '*';
		case "divide":
			return '/';
		default: return '+';
	}
}

const getOptionalAnswersCountFromDifficulty = () => {
	switch (difficulty) {
		case 'hard':
			return 6;
		case 'easy':
			return 3;
	}
}

// colorNavItems:
const colorNavItems = () => {
	navItems.forEach(item => {
		if(item.value === questionsMode) {
			item.element.classList.add('nav__list-item--chosen');
		} else {
			item.element.classList.remove('nav__list-item--chosen');
		}
	})
}

// generate question:
const generateQuestion = () => {
	let a = getRandomNum({max: maxNumber, min: minNumber});
	let b = getRandomNum({max: maxNumber, min: minNumber});
	let drill;
	if(drillMode === 'simple') {
		drill = `${a} ${getOperatorFromQuestionsMode()} ${b}`;
		while (!(eval(drill) >= minNumber && eval(drill) <= maxNumber) || !Number.isInteger(eval(drill))) {
			a = getRandomNum({max: maxNumber, min: minNumber});
			b = getRandomNum({max: maxNumber, min: minNumber});
			drill = `${a} ${getOperatorFromQuestionsMode()} ${b}`;
		}
	}
	return drill;
}
// change operation sign if needed:
const changeOperationSign = ({drill}) => {
	let drillString = `${drill}`.replace('*', 'X');
	return drillString.replace('/', '÷');
}

// generate optional answers:
const generateOptionalAnswers = ({question}) => {
	const answers = [];
	let answersCount = getOptionalAnswersCountFromDifficulty();
	let realQuestionAdded = getRandomNum({max: answersCount, min: 1});
	for (let i = 1; i <= answersCount; i++) {
		if(i === realQuestionAdded) {
			answers.push(eval(question));
		} else {
			let optionalAnswer = eval(generateQuestion());
			while (optionalAnswer === eval(question) || answers.includes(optionalAnswer)) {
				optionalAnswer = eval(generateQuestion());
			}
			answers.push(optionalAnswer);
		}
	}
	return answers;
}

// handle pick answer option:
const handlePickAnswer = ({question, element}) => {
	if(+element.textContent === eval(question)) {
		addCorrectAnswerChange();
		handleChangeQuestion();
	} else {
		element.classList.add('section-answers--option--wrong');
		setTimeout(() => {
			element.style.display = 'none';
		}, 800);
		addWrongAnswerChange();
	}
}

// add answers options to HTML:
const addAnswersOptionsToHTML = ({question}) => {
	answersSection.innerHTML = '';
	const answersOptions = generateOptionalAnswers({question});
	answersOptions.forEach(option => {
		const element = document.createElement('div');
		element.textContent = option;
		element.classList.add('section-answers--option');
		element.addEventListener('click', () => {
			handlePickAnswer({question, element});
		});
		answersSection.appendChild(element);
	})
}

// handle change question:
function handleChangeQuestion () {
	let question = generateQuestion();
	questionDisplay.textContent = changeOperationSign({drill: question});
	addAnswersOptionsToHTML({question});
}

// change questions mode:
const handleChangeQuestionsMode = ({mode}) => {
	questionsMode = mode;
	colorNavItems();
	handleChangeQuestion();
}

// add eventListeners for nav list to change questionsMode:
navItems.forEach(item => item.element.addEventListener('click', () => handleChangeQuestionsMode({mode:item.value})));

const init = () => {
	correctAnswerDisplay.textContent = `תשובות נכונות: ${correctCounter}`;
	wrongAnswerDisplay.textContent = `תשובות לא נכונות: ${wrongCounter}`;
	handleChangeQuestionsMode({mode: questionsMode});
}

init();