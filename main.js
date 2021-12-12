window.onload = function() {
    let result = {};
    let step = 0;

    function showQuest (questionNumber) {
        document.querySelector(".question").innerHTML = quiz[step]['q'];
        let answer = '';
        for (let key in quiz[step]['a']) {
            answer+= `<li data-v="${key}" class="answer-var">${quiz[step]['a'][key]}</li>`;
        }
        document.querySelector(".answer").innerHTML = answer
    }

    document.onclick = function (event) {
        event.stopPropagation();
        if (event.target.classList.contains('answer-var') && step < quiz.length) {
            if (result[event.target.dataset.v] != undefined) {
                result[event.target.dataset.v]++;
            }
            else {
                result[event.target.dataset.v] = 0;
            }
            step++
            if (step == quiz.length) {
                document.querySelector('.question').remove();
                document.querySelector('.answer').remove();
                showResult();
            } else {
                showQuest(step);
            }
        }
        // console.log(result);
    }
    function showResult() {
        let key = Object.keys(result).reduce(function(a,b) {
            return result[a] > result[b] ? a : b;
        });
        // console.log(key);
        let divAnswer = document.createElement('div');
        divAnswer.classList.add('result');
        divAnswer.innerHTML = answer[key]['description'];
        document.querySelector('main').appendChild(divAnswer);
        
        let picAnswer = document.createElement('div');
        picAnswer.classList.add('result');
        picAnswer.innerHTML = `<img src="${answer[key]['image']}">`;
        document.querySelector('main').appendChild(picAnswer);
    }
    showQuest(step)
}