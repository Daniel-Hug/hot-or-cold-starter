/* Table of Contents
	- game logic
	- event listeners
	- view helpers
	- start game
*/


// game logic
var hotCold = {
	start: function() {
		this.secretNumber = (Math.floor(Math.random()*100));
		console.log('Secret number: ' + this.secretNumber);
	},
	getFeedback: function(guess) {
		var diff = Math.abs(guess - this.secretNumber);
		return diff === 0 ? 'You have won!' :
			diff > 40 ? 'Freezing!' :
			diff > 30 ? 'very cold' :
			diff > 20 ? 'cold' :
			diff > 15 ? 'warm' :
			diff > 10 ? 'hot' :
			'Burning!';
	},
	getError: function(guess){
		//checks if it's NaN
		return isNaN(guess) ? 'Please enter a valid number' :
			(guess > 100 || guess < 1) ? 'Please enter a number between 1 and 100' :
			null;
	}
};



// Event listeners

// new game button
$('a.new').click(newGame);

// Show information modal
$('.what').click(function(){
	$('.overlay').fadeIn(1000);
});

// Hide information modal
$('a.close').click(function(){
	$('.overlay').fadeOut(1000);
});

// on guess submit
$('.guess-form').submit(function(event){
	// don't reload
	event.preventDefault();

	// get guess
	var guessNum = parseInt(this.guessNum.value, 10);

	// check if valid
	var errorMsg = hotCold.getError(guessNum);

	// give feedback
	if (errorMsg) {
		setMessage(errorMsg);
	} else {
		setMessage(hotCold.getFeedback(guessNum));
		guessLog.log(guessNum);
		guessCounter.increment();
	}

	// reset form
	this.reset();
});



// view helpers

var setMessage = (function() {
	var $el = $('#feedback');

	return function(msg) {
		$el.text(msg);
	};
})();

var guessLog = (function() {
	var $ul = $('ul#guessList');

	return {
		log: function(guess) {
			var $li = $('<li/>').text(guess);
			$ul.append($li);
		},
		clear: function() {
			$ul.empty();
		}
	};
})();

var guessCounter = (function() {
	var count = 0;
	var el = $('#count')[0];

	return {
		updateView: function() {
			el.textContent = count;
		},
		increment: function() {
			count++;
			this.updateView();
		},
		reset: function() {
			count = 0;
			this.updateView();
		}
	};
})();



//start game
function newGame(){
	hotCold.start();
	guessCounter.reset();
	guessLog.clear();
}
newGame();