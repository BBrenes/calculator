const calculator = {
    displayValue : 0,
    firstOperand: null,
    initDigit: false,
    operation: null,
    secondOp : false,
    afterEqual : false
}

function add (a, b){
	return a + b;
}

function subtract (a, b){
	return a - b;
}

function multiply (a, b){
	return Math.round((a*b) * 100) / 100;
}

function divide(a, b){
    if(b == '0'){
        return 'Error';
    } else{
    res = a / b;
    return +res.toFixed(4);
    }
}

function operate(operator, a, b){
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
    case 'add':
    return add(a, b);
    break;
    case 'subtract':
    return subtract(a, b);
    break;
    case 'multiply':
    return multiply(a, b);
    break;
    case 'divide':
    return divide(a, b);
    break;
    }
}

function updateDisplay(){
    const display = document.querySelector('.display');
    display.value = calculator.displayValue;
  }

function enterDigit(digit){
if (calculator.operation !== null && calculator.initDigit === true || calculator.displayValue == 'Error' ||
calculator.afterEqual === true){
    calculator.displayValue = 0;
    calculator.initDigit = false;
    calculator.afterEqual = false;
}
if(calculator.operation != null){
    calculator.secondOp =  true;
}
if(calculator.displayValue === 0){
    if(digit === '.'){
        calculator.displayValue = '0.';
    }
    else if(digit === '0'){
        calculator.displayValue = 0;
    }else{
        calculator.displayValue = digit;
    }
} else{
    if(digit === '.'){
        if(!calculator.displayValue.includes('.')){
        calculator.displayValue += digit;
        }
    }else{
        calculator.displayValue += digit;
    }
}
updateDisplay();
}

function manageOperation(newOperation){
    if(calculator.operation != null && calculator.secondOp == true){
        calculator.displayValue = operate(calculator.operation, calculator.firstOperand, calculator.displayValue);
        updateDisplay();
    }
    calculator.firstOperand = calculator.displayValue;
    calculator.operation = newOperation;
    calculator.initDigit = true;
    calculator.secondOp = false;
}

function manageEqual(){
    if(calculator.operation != null){
        calculator.displayValue = operate(calculator.operation, calculator.firstOperand, calculator.displayValue);
        updateDisplay();
    }
    calculator.firstOperand = calculator.displayValue;
    calculator.operation = null;
    calculator.initDigit = true;
    calculator.secondOp = false;
    calculator.afterEqual = true;
}

const keys = document.querySelectorAll('button')
keys.forEach(key => key.addEventListener('click', (e) => {
    switch (e.target.value) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
        case '.':
            enterDigit(e.target.value);
        break;
        case 'add':
        case 'subtract':
        case 'multiply':
        case 'divide':
            manageOperation(e.target.value);
        break;
        case 'equal':
            manageEqual();
        break;
        case 'sign':
            calculator.displayValue = parseFloat(calculator.displayValue) * -1;
            updateDisplay();
        break;
        case 'percent':
            calculator.displayValue = parseFloat(calculator.displayValue) / 100;
            updateDisplay();
        break;
        case 'AC':
            calculator.displayValue = 0;
            calculator.firstOperand = null;
            calculator.initDigit = false;
            calculator.operation = null;
            updateDisplay();
        break;
    }
}));