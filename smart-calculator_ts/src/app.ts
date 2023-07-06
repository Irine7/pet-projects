const calculator = document.querySelector('.calculator') as HTMLElement;
const calculatorClearBlock = document.getElementById('c-clear') as HTMLElement;
const clearAllClickCount = 0;
let calculationHistory: (string | number)[] = [];
let allHistory: [Array<string | number>, string][] = [];
let tempNumber = '';
let operationType = '';
let isPercent = false;
let isEqual = false;

calculator.addEventListener('click', (event) => {
	const target = event.target as HTMLElement;
	if (target && target.classList.contains('calculator__col')) {
		const data = target.dataset.type;
		if (typeof data !== 'undefined') { // Добавлено условие проверки на наличие значения data
			const totalBlock = document.querySelector('.calculator__total') as HTMLElement;
			const historyBlock = document.querySelector('.calculator__history') as HTMLElement;
			operationTypeHendler(data);
			totalBlock.innerHTML = tempNumber;
			historyBlock.innerHTML = renderHistory(calculationHistory);
			historyBarRender(allHistory);
		}
	}
});

// Handling pressed buttons
function operationTypeHendler (data: string) {
	if (data !== 'clear' && data !== 'history') {
		calculatorClearBlock.innerHTML = 'C';
	}

	if (data === 'delete' && operationType === 'number') {
		tempNumber = tempNumber.substring(0, tempNumber.length - 1);
		tempNumber = tempNumber || '0';
		isPercent = false;
	} else if (!Number.isNaN(Number(data))) {
		operationType = 'number';
		tempNumber = tempNumber === '0' ? data : tempNumber + data;
	} else if (data === 'float') {
		operationType = 'number';
		if (!/\./.test(tempNumber)) {
			if (tempNumber) {
				tempNumber = tempNumber + '.';
			} else {
				tempNumber = '0.';
			}
		}
	} else if (['/', '*', '-', '+'].includes(data) && tempNumber) {
		operationType = data;
		calculationHistory.push(tempNumber);
		calculationHistory.push(operationType);
		tempNumber = '';
		isPercent = false;
	} else if (data === 'clear') {
		calculationHistory = [];
		tempNumber = '0';
		isPercent = false;
		if (calculatorClearBlock.innerText === 'C') {
			calculatorClearBlock.innerHTML = 'CA';
		} else {
			calculatorClearBlock.innerHTML = 'A';
			allHistory = [];
		}
	} else if (data === 'history') {
		openHistoryBlock();
	} else if (data === '%') {
		calculationHistory.push(tempNumber);
		isPercent = true;
		isEqual = false;
		tempNumber = mathOperation(calculationHistory, isPercent, isEqual);
	} else if (data === '=') {
		const historySegment: [(string | number)[], string] = [[], ''];
		if (!isPercent) {
			calculationHistory.push(tempNumber);
		}
		historySegment[0] = calculationHistory;
		isEqual = true;
		tempNumber = mathOperation(calculationHistory, isPercent, isEqual);
		historySegment[1] = tempNumber;
		allHistory.push(historySegment);
		calculationHistory = [];
		isPercent = false;
	}
}

// Creat HTML code and output of the math operation block
function renderHistory (historyArray: (string | number)[]) {
	let htmlElements = '';
	let isPreviousNumber = false;

	const numberRegex = /^\d+$/;

	historyArray.forEach((element) => {
		if (typeof element === 'number' || (typeof element === 'string' && numberRegex.test(element))) {
			if (isPreviousNumber) {
				htmlElements += `<span>${element}</span>`;
			} else {
				htmlElements += ` <span>${element}</span>`;
			}
			isPreviousNumber = true;
		} else if (['/', '*', '-', '+', '%'].includes(element)) {
			element = element === '*' ? 'x' : element === '/' ? '÷' : element;
			htmlElements += ` <strong>${element}</strong>`;
			isPreviousNumber = false;
		}
	});

	return htmlElements;
}

// Render of all history in the history block
function historyBarRender (allHistory: ([Array<string | number>, string])[]) {
	const historyContent: HTMLElement = document.getElementById('history-content') as HTMLElement;
	let historyBarHtml = '';
	allHistory.forEach((item: [Array<string | number>, string]) => {
		const html = `
			<div>
				<div class="calculator__history">
					${renderHistory(item[0])}
				</div>
				<div class="calculator__total">${item[1]}</div>
			</div>
		`;
		historyBarHtml = historyBarHtml + html;
	});
	historyContent.innerHTML = historyBarHtml;
}

// Count of the final value
function mathOperation (historyArray: (string | number)[], isPercent: boolean, isEqual: boolean) {
	let total = 0;
	historyArray.forEach((element: string | number, index: number) => {
		element = parseFloat(String(element));
		if (index === 0) { // If it's a first item of array (number)
			total = element; // Put the first item of array (number) as a value
		} else if (index - 2 >= 0 && isPercent && index - 2 === historyArray.length - 3) { // [0, *, 2, /, 4] => 5 -3
			const x: number = total;
			const operation = historyArray[index - 1] as string;
			const y: number = element;
			if (!isEqual) {
				total = calculatePercent(x, operation, y);
			} else {
				total = calculatePercentAndEqual(x, operation, y);
			}
		} else if (index - 2 >= 0) { // If we are on the third item of the array (index - 2), the second item is an operation item
			const mathSign = historyArray[index - 1] as string;
			if (typeof element === 'number') { // Check if the current item is a number
				if (mathSign === '+') { // Check the operation type
					total = total + element;
				} else if (mathSign === '-') {
					total = total - element;
				} else if (mathSign === '*') {
					total = total * element;
				} else if (mathSign === '/') {
					total = total / element;
				} else if (mathSign === '%') {
					total = total / 100 * element;
				}
			}
		}
	});
	return String(total);
}

// Percent button pressed
function calculatePercent (x: number, operation: string, y: number) {
	let total = 0;
	if (['+', '-'].includes(operation)) {
		total = x * (y / 100);
	} else if (['*', '/'].includes(operation)) {
		total = y / 100;
	}
	return total;
}

// Percent button pressed and then equal button pressed
function calculatePercentAndEqual (x: number, operation: string, y: number) {
	let total: number;
	if (operation === '+') {
		total = x + (y / 100 * x);
	} else if (operation === '-') {
		total = x - (y / 100 * x);
	} else if (operation === '*') {
		total = x * (y / 100);
	} else {
		throw new Error('Invalid arithmetic operation');
	}
	return total;
}

/* Percent logics */

// x - first number
// y - second number

/* Addition:
1. Percent button pressed:
x * (y / 100);
2. Percent button pressed and then equal button pressed:
x + (y / 100 * x);
*/

/* Subtraction:
1. Percent button pressed:
x * (y / 100);
2. Percent button pressed and then equal button pressed:
x - (y / 100 * x);
*/

/* Multiplication:
1. Percent button pressed:
y / 100;
2. Percent button pressed and then equal button pressed:
x * (y / 100);
*/

/* Division:
1. Percent button pressed:
y / 100;
*/

// Theme switch
const theme = document.querySelector('.theme') as HTMLElement;
theme.addEventListener('click', (event) => {
	theme.classList.toggle('theme_dark');
	calculator.classList.toggle('calculator_dark');
});

// Open/Close of history block
const historyBar = document.getElementById('history-display') as HTMLElement;
const closeHistory = historyBar.querySelector('#close') as HTMLElement;

closeHistory.addEventListener('click', (event) => {
	historyBar.classList.remove('open');
});

// Open history function
function openHistoryBlock () {
	historyBar.classList.add('open');
}
