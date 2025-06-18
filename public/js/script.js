

const wireUpAllAmountSelectors= () => {
const allSelectors = document.querySelectorAll('.amount-selector');
allSelectors.forEach(selector => {
    const decrementBtn = selector.querySelector('.decrement');
    const incrementBtn = selector.querySelector('.increment');
    const input = selector.querySelector('input[type="number"]');

    decrementBtn.addEventListener('click', () => {
        let value = parseInt(input.value, 10) || 0;
        if (input.min !== undefined && value <= parseInt(input.min, 10)) return;
        input.value = value - 1;
        input.dispatchEvent(new Event('change'));
    });

    incrementBtn.addEventListener('click', () => {
        let value = parseInt(input.value, 10) || 0;
        if (input.max !== undefined && value >= parseInt(input.max, 10)) return;
        input.value = value + 1;
        input.dispatchEvent(new Event('change'));
    });
    

})
}
document.addEventListener('DOMContentLoaded', function() {

wireUpAllAmountSelectors();
});