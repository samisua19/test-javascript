
const textInput = document.getElementById('Op-Form');

const btnNumber = document.querySelectorAll('.btn-number');
const btnOperation = document.querySelectorAll('.btn-operation');
const btnClear = document.querySelectorAll('.btn-clear');
const btnDelete = document.querySelectorAll('.btn-delete');
const btnEqual = document.querySelectorAll('.btn-equal');

let status = false;
let op = '';
let result;

btnNumber.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (status) {
            if (op == '+') {
                result =result + parseFloat(e.target.dataset.number);
                status = false;
                textInput['Text-operation'].value = result;
                textInput['Text-input'].value += e.target.dataset.number;

            } else if (op == '-') {
                result =result - parseFloat(e.target.dataset.number);
                status = false;
                textInput['Text-operation'].value = result;
                textInput['Text-input'].value += e.target.dataset.number;
            } else if (op == '*') {

                result =result * parseFloat(e.target.dataset.number);
                status = false;
                textInput['Text-operation'].value = result;
                textInput['Text-input'].value += e.target.dataset.number;
            } else {
                result =result / parseFloat(e.target.dataset.number);
                status = false;
                textInput['Text-operation'].value = result;
                textInput['Text-input'].value += e.target.dataset.number;
            }
        } else {
            textInput['Text-input'].value += e.target.dataset.number;
            result = parseFloat(textInput['Text-input'].value);
        }
    })
})

btnOperation.forEach(btn => {
    btn.addEventListener('click', (e) => {
        op = e.target.dataset.operation;
        if(op != ','){    
        status = true
        }else{
        status = false;
        }
        textInput['Text-input'].value += e.target.dataset.operation;
    })
})

btnClear.forEach(btn => {
    btn.addEventListener('click', (e) => {
        textInput['Text-input'].value = '';
        textInput['Text-operation'].value = '';
    })
}
)
btnDelete.forEach(btn => {
    btn.addEventListener('click', (e) => {
        let string = textInput['Text-input'].value;
        textInput['Text-input'].value = string.substring(0, string.length - 1);
    })
})

btnDelete.forEach(btn => {
    btn.addEventListener('click', (e) => {
        let string = textInput['Text-input'].value;
        textInput['Text-input'].value = string.substring(0, string.length - 1);
    })
})

