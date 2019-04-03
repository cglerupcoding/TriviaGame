var triviaQuestions = [{
	question: "How Did Remus Lupins parents Meet",
	answerList: ["When his muggle mom was attacked by a boggart", "When his mud-blood mom was testing her first wand", "When his muggle dad was attacked by a dementor", "When his muggle dad was attacked by a werewolf"],
	answer: 0
},{
	question: "Which creatures pull the carriages that take students from the Hogwarts Express to the Castle?",
	answerList: ["Hippogriffs", "Thestrals", "Centaurs", "Manticores"],
	answer: 1
},{
	question: "Slughorn teaches his students that Amortentia smells different to each person. What food does Harry smell?",
	answerList: ["Pumpkin Juice", "Mrs. Weasleys Fudge", "Lemon Drops", "Treacle Tart"],
	answer: 3
},{
	question: "How many staircases does Hogwarts have?",
	answerList: ["142", "143", "163", "152"],
	answer: 0
},{
	question: "What is the name of the book Hermione supposes Voldemort used to learn about Horcruxes?",
	answerList: ["Magic Moste Evil", "Secrets of the Darkest Arts", "A guide to Medievil Sorcery", "Most Potent Potions"],
	answer: 1
},{
	question: "What color is Petunia Dursleys hair?",
	answerList: ["Blonde", "Red", "Auburn", "Green"],
	answer: 0
},{
	question: "According to Mr Olivander, James Potter's wand was exceptionally good at?",
	answerList: ["Potions", "Transfiguration", "Conjouring", "Flying"],
	answer: 1
},{
	question: "When Sirius breaks into the Gryffindor common room and everyone has to sleep in the Great Hall, what color are the sleeping bags?",
	answerList: ["Gold", "Red", "Silver", "Purple	"],
	answer: 3
},{
	question: "What does Professor Dumbledore find in the Room of Requirement?",
	answerList: ["A study full of telescopes", "A wardrobe full of clean pajamas", "A room full of chamber pots", "A cupboard full of feather dusters"],
	answer: 2
},{
	question: "Who was Headmaster of Hogwarts before Albus Dumbledore?",
	answerList: ["Phineus Black", "Galatea Merrythought", "Armando Dippet", "Silvanus Kettleburn"],
	answer: 2
},{
	question: "What is the name of Fred and George's joke shop?",
	answerList: ["Weasley Joke Eporium", "Fred & Georges Wonder Eporium", "Zonko's Joke Shop", "Weasley's Wizard Wheezes"],
	answer: 3
},{
	question: "Which of these is NOT one of the Unforgivable Curses?",
	answerList: ["Cruciatus Curse", "Imperius Curse", "Avada Kedavra", "Sectum Sempra"],
	answer: 3
},{
	question: "A wizard who cannot do magic is known as a:",
	answerList: ["Bleaker", "Squib", "Duddle", "Wizaint"],
	answer: 1
},{
	question: "The three kinds of balls used in Quidditch are Bludgers, Snitches, and...",
	answerList: ["Quaffles", "Sniffles", "Farticles", "Fuddruckers"],
	answer: 0
},{
	question: "Who has been stealing Harry's letters from Ron and Hermione at the beginning of 'Harry Potter and the Chamber of Secrets'?",
	answerList: ["Dumbledore", "Hermoine", "Dobby", "Draco"],
	answer: 2
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}