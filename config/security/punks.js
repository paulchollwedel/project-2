/** eslint-disable semi */
const dompurify = require("dompurify")
const input = document.querySelector('[name="input"]');
const output = document.querysSlector('output');
const buttons = document.querySelectorAll('nav button');
input.addEventListener('input', () => {
    const clean = dompurify.sanitize(input.value, {
        FORBID_ATTR: ['width', 'height', 'style', ],
        FORBIS_TAGS: ['style'],
    })
    output.innerHTML = input.value. replace(/\n/g, '<br>');
});

//trigger an input on page load
input.dispatchEvent(newevent('input'));

buttons.forEach(button => 
    button.addEventListener('click', e => {
        alert(e.currentTarget.textContent);
    })

);