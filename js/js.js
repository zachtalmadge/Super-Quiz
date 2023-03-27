$(function () {
    // inital questionBank setup 
    const questionBank = []
    function Question(questionText, answers, correctAnswer) {
        this.questionText = questionText,
            this.answers = answers,
            this.correctAnswer = correctAnswer
    };
    const q1  =  new Question('Burning Man is how many days long?', ['3', '5', '7', '4'], 2);
    const q2  =  new Question('Pink Floyd\'s "Dark Side Of The Moon" album was released in what year?', ['1973', '1984', '1995', '1968'], 0);
    const q3  =  new Question('Skrillex made popular what sub-genre of EDM?', ['House', 'Dubstep', 'Trap', 'Techno'], 1);
    const q4  =  new Question('How many members of \"The Beatles\" were there?', ['3', '5', '4', '2'], 2);
    const q5  =  new Question('Dave Grohl is a former member of what band?', ['Disturbed', 'Nirvana', 'All-American Rejects', 'The Who'], 1);
    const q6  =  new Question('Which of the following artists are from Michigan?', ['Griz', 'Eminem', 'RHCP\'s Anthony Kiedis', 'All of the above'], 3);
    const q7  =  new Question('Where was Tupac born?', ['New York', 'Los Angeles', 'Houston', 'Detroit'], 0);
    const q8  =  new Question('Ultra Music Festival takes place in what city?', ['Austin, TX', 'New Orleans, LA', 'Miami, FL', 'Las Vegas, NV'], 2);
    const q9  =  new Question('What year did the first Woodstock take place?', ['1978', '1984', '1993', '1969'], 3);
    const q10 =  new Question('Electric Forest takes place in which state?', ['Michigan', 'Connecticut', 'Washington', 'Florida'], 0);
    questionBank.push(q1, q2, q3, q4, q5, q6, q7, q8, q9, q10); // push in questions rather than create them by scratch as requested by criteria
    let total = questionBank.length; // initalize total in case user chooses not to input their own question

    // Globals and DOM nodes that are referred to more than once
    const home = document.querySelector('#home');
    const quiz = document.querySelector('#quiz');
    const score = document.querySelector('#score');
    const result = document.querySelector('#result');
    const quizForm = document.querySelector('#form');
    const correctBlock = document.querySelector('#correct-element');
    const incorrectBlock = document.querySelector('#incorrect-element');
    const submission = document.querySelector('#question-submission');
    const next = document.querySelector('#next-question')
    let correctAnswerNumber;
    let scoreCount = 0;

    // form submission
    document.querySelector('#add-question').addEventListener('click', () => {
        home.classList.add('hidden');
        quizForm.classList.remove('hidden');
    });
    document.querySelector('#back-to-home-0').addEventListener('click', (e) => {
        e.preventDefault();
        quizForm.classList.add('hidden');
        home.classList.remove('hidden');
    });
    document.querySelector('button[type="submit"]').addEventListener('click', (e) => {
        e.preventDefault();
        // form validation
        if ($('#user-question').val() === '' || 
            $('#user-answer0').val() === '' || 
            $('#user-answer1').val() === '' || 
            $('#user-answer2').val() === '' || 
            $('#user-answer3').val() === '' || 
            $('#user-correct-answer').val() === '') {
            alert('You must fill in all fields')
        }
        else {
            let userQandA = new Question($('#user-question').val(), 
            [$('#user-answer0').val(), $('#user-answer1').val(), $('#user-answer2').val(), $('#user-answer3').val()],
            parseInt($('#user-correct-answer').val()) - 1)
            questionBank.push(userQandA);
            total = questionBank.length; // updates total that now includes user submission
            quizForm.classList.add('hidden');
            submission.classList.remove('hidden');
            $('#user-question, #user-answer0, #user-answer1, #user-answer2, #user-answer3, #user-correct-answer').val('') // clear out form
        };
    });
    document.querySelector('#return-home').addEventListener('click', () => {
        submission.classList.add('hidden');
        home.classList.remove('hidden');
    });
    document.querySelector('#add-another').addEventListener('click', () => {
        submission.classList.add('hidden');
        quizForm.classList.remove('hidden');
    });
    // quiz logic below // 
    document.querySelector('#play-now').addEventListener("click", () => {
        home.classList.add('hidden');
        quiz.classList.remove('hidden');
        newQuestion();
    });
    function newQuestion() { // checks length of question bank and updates the current question & possible answers
        if (questionBank.length === 0) {
            quiz.classList.add('hidden');
            score.classList.remove('hidden');
            document.querySelector('#number-correct').textContent = scoreCount;
            document.querySelector('#question-bank-length').textContent = total;
        }
        else {
            let number = Math.floor(Math.random() * (questionBank.length))
            // splice function to guarantee no question is repeated
            let currentQandA = questionBank.splice(number, 1); 
            document.querySelector('#question').textContent = currentQandA[0].questionText;
            for (i = 0 ; i < 4; i ++) {
                document.querySelector(`#answer${i}`).textContent = currentQandA[0].answers[`${i}`];}
            // assigns correctAnswer value from question object to be compared when user picks answer
            correctAnswerNumber = currentQandA[0].correctAnswer; 
        };
    };
    $('#possible-answers button').on('click', () => { // captures all click events to answer buttons
        quiz.classList.add('hidden');
        result.classList.remove('hidden');
        if (questionBank.length === 0) {
            next.textContent = "See your score!"
        }
        else {
            next.textContent = "Next Question"
        };
        if (parseInt(event.target.dataset.index) === correctAnswerNumber) { // if user is correct
            scoreCount++
            correctBlock.classList.remove('hidden');
            incorrectBlock.classList.add('hidden');
        }
        else { // if user is incorrect
            correctBlock.classList.add('hidden');
            incorrectBlock.classList.remove('hidden');
        };
    });
    document.querySelector('#next-question').addEventListener('click', () => {
        result.classList.add('hidden');
        quiz.classList.remove('hidden');
        newQuestion();
    });
    function restart() { 
        // reset the quiz
        scoreCount = 0;
        // reset the question bank
        questionBank.push(q1, q2, q3, q4, q5, q6, q7, q8, q9, q10); 
    };
    document.querySelector('#back-to-home').addEventListener('click', () => {
        restart();
        score.classList.add('hidden');
        home.classList.remove('hidden');
    });
    document.querySelector('#play-again').addEventListener('click', () => {
        restart();
        score.classList.add('hidden');
        quiz.classList.remove('hidden');
    });
}); // end document ready