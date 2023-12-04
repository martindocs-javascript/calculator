const calculator = document.querySelector('#calculator-frame');
const display = document.querySelector('.current-display');
const buttonKeys = document.querySelector('.buttons');

// calculate result
function calculate(fvalue, operator, svalue){
	let result = '';
	const fValue = parseFloat(fvalue);
	const sValue = parseFloat(svalue);

	switch(operator){
		case 'add':
			result = fValue + sValue;
			break;
		case 'subtract':
			result = fValue - sValue;
			break;
		case 'divide':
			result = fValue / sValue;
			break;
		case 'times':
			result = fValue * sValue;
			break;
		case 'modulo':
			result = fValue % sValue;
			break;
	}
	return result;
}

// listen to button clicks
buttonKeys.addEventListener('click', (e) => {
	const key = e.target;
	// all calc buttons
	const keyContent = key.textContent;	
	// only target operators
	const action = key.dataset.action;
	// get hold on dispaly
	const displayNum = display.textContent;
	// prev pressed key
	const previousKeyType = calculator.dataset.previousKeyType;

	if(!action){
		if(displayNum === '0' || previousKeyType === 'operator' || previousKeyType === 'result'){
			display.textContent = keyContent;
			// delete data-previous-key-type to prevent from overriding second number
			delete calculator.dataset.previousKeyType;
		}else{
			display.textContent = displayNum + keyContent;		
		}
	}

	if(action === 'decimal'){
		if(previousKeyType === 'operator'){
			display.textContent = '0.';		
		}else if(!display.textContent.includes('.')){
			display.textContent = displayNum + '.';		
		}
	}

	if(action === 'modulo' || action === 'divide' || action === 'times' || action === 'subtract' || action === 'add'){
		calculator.dataset.previousKeyType = 'operator';
		calculator.dataset.firstValue = displayNum;
  		calculator.dataset.operator = action;
	}


	if(action === 'result'){
		let operator = calculator.dataset.operator;
		let firstValue = calculator.dataset.firstValue;		
		let secondValue = displayNum;

		if(firstValue && operator && previousKeyType !== 'operator'){
			if(previousKeyType === 'result'){
				// if equal was pressed change first value to current value
				firstValue = displayNum;
			}
			const calcValue = calculate(firstValue, operator,secondValue);			
			display.textContent = calcValue;
		}
		calculator.dataset.previousKeyType = 'result';
	}
	
	if(action === 'clear'){
		calculator.dataset.previousKeyType = '';
		calculator.dataset.firstValue = '';
		calculator.dataset.operator = '';

		display.textContent = '0';
		calculator.dataset.previousKeyType = 'clear';
	}

	if(action === 'delete'){
		display.textContent = '0';
		calculator.dataset.previousKeyType = 'delete';
	}

	if(action === 'plusMinus' && !display.textContent.includes('0')){				
		if(!display.textContent.includes('-')){
			display.textContent = '-' + displayNum;
			calculator.dataset.previousKeyType = 'minus';
		}else{
			display.textContent = displayNum.split('-')[1];
			calculator.dataset.previousKeyType = 'plus';
		}
	}

});

