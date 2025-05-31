const steps = ['one', 'two', 'three'];
function listTemplate(step) {
    return `<li>${step}</li>`;
}
const stepsHtml = steps.map(listTemplate);
document.querySelector('#myList').innerHTML = stepsHtml.join();

const grades = ['A', 'B', 'A'];
function gpaConvertion(grade) {
    let gpa = 0;
    if (grade === 'A') {
        gpa = 4;
    } else if (grade === 'B') {
        gpa = 3;
    }
    return gpa
}
const gpaScore = grades.map(gpaConvertion)
console.log(gpaScore);
const gpaTotal = gpaScore.reduce(function (total, item) {
    return total + item;
});
const gpa = gpaTotal / gpaScore.length;
console.log(gpa);

const fruits = ['watermelon', 'peach', 'apple', 'tomato', 'grape']
const shortfruits = fruits.filter(function (fruit) {
    return fruit.length < 6;
});
console.log(shortfruits);

const numbers = [12, 34, 21, 54];
const luckyNumber = 21;
let luckyIndex =numbers.indexOf(luckyNumber);
console.log(luckyIndex); 
console.log(numbers[luckyIndex]);
// Kyle Green
