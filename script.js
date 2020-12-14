var paperMenu = {
	$window: $('#paper-window'),
	$paperFront: $('#paper-front'),
	$hamburger: $('.hamburger'),
	offset: 1800,
	pageHeight: $('#paper-front').outerHeight(),
	
	open: function() {
		this.$window.addClass('tilt');
		this.$hamburger.off('click');
		$('#container, .hamburger').on('click', this.close.bind(this));
		this.hamburgerFix(true);
	},
	close: function() {
		this.$window.removeClass('tilt'); 
		$('#container, .hamburger').off('click');
		this.$hamburger.on('click', this.open.bind(this));
		this.hamburgerFix(false);
	},
	updateTransformOrigin: function() {
		scrollTop = this.$window.scrollTop();
		equation = (scrollTop + this.offset) / this.pageHeight * 100;
		this.$paperFront.css('transform-origin', 'center ' + equation + '%');
	},
	//hamburger icon fix to keep its position
	hamburgerFix: function(opening) {
			if(opening) {
				$('.hamburger').css({
					position: 'absolute',
					top: this.$window.scrollTop() + 30 + 'px'
				});
			} else {
				setTimeout(function() {
					$('.hamburger').css({
						position: 'fixed',
						top: '30px'
					});
				}, 300);
			}
		},
	bindEvents: function() {
		this.$hamburger.on('click', this.open.bind(this));
		$('.close').on('click', this.close.bind(this));
		this.$window.on('scroll', this.updateTransformOrigin.bind(this));
	},
	init: function() {
		this.bindEvents();
		this.updateTransformOrigin();
	},
};

paperMenu.init();

const walkAudio = document.getElementById('walk-audio');
const bgAudio = document.getElementById('bg-audio');;

$(document).ready(function(){

	$('.intro #intro-content .button').click(function(){
		$('.intro').fadeOut(function(){
			$('.game').fadeIn();
			
		});
		bgAudio.play();
	});
	
	// LG: Added Flashlight effect with new CSS
	// Based off of https://codepen.io/jmdev/pen/oNvMMxG
	let x,
		y;

	$(document).mousemove(function(e){
		x = e.pageX;
		y = e.pageY;
		$('.lighton').css('background','radial-gradient(circle at ' + x + 'px ' + y + 'px, transparent, #000 200px)');
	});
	
	$('.lighton').toggle();

	$('#light').click(function() {
		$('.lighton, .overlay').toggle();
		$('audio#light-audio')[0].play();
	});
});

const sliderBranch = document.querySelectorAll('.branch');

function animateStuff() {
	sliderBranch.forEach(function(sliderBranch) {

	const slideInAt = (game.scrollTop + (window.innerHeight/2)) - sliderBranch.offsetHeight / 2;
	const imageBottom = sliderBranch.offsetTop + sliderBranch.offsetHeight;
	const isHalfShown = slideInAt > sliderBranch.offsetTop;
	const isNotScrolledPast = game.scrollTop < imageBottom;
	if (isHalfShown && isNotScrolledPast) {
		sliderBranch.classList.add('active');
	} else {
		sliderBranch.classList.remove('active');
	}
});

}
const game = document.getElementById('paper-window');

game.addEventListener('scroll', function() {
	animateStuff();
});

animateStuff();

//Button Scroll Code

let downScroll = document.getElementById('controller');
let lisa = document.getElementById('lisaIdle');
let interval = null;

function scrollingRightAlong() {
	const currentScroll= game.scrollTop;
	game.scrollTop = currentScroll + 10;
	// console.log(currentScroll);
}

downScroll.addEventListener('mousedown', function() {
	lisa.src = 'images/ow_character_walk.gif';
	interval = setInterval(() => {
		scrollingRightAlong();
	}, 50);
	walkAudio.play();
});
	walkAudio.currentTime = 0;

downScroll.addEventListener('mouseup', function() {
	lisa.src = 'images/ow_character_idle.gif';
	clearInterval(interval);
	interval = null;
	walkAudio.pause();
	
});

downScroll.addEventListener('mouseleave', function() {
	lisa.src = 'images/ow_character_idle.gif';
	clearInterval(interval);
	interval = null;
	walkAudio.pause();
});

document.addEventListener('keydown', function(e) {
	console.log(interval)
	if(e.keyCode === 40 && interval === null) {
		lisa.src = 'images/ow_character_walk.gif';
		interval = setInterval(() => {
			scrollingRightAlong();
		}, 50);
		walkAudio.play();
	}
});

document.addEventListener('keyup', function(e) {
	lisa.src = 'images/ow_character_idle.gif';
	clearInterval(interval);
	walkAudio.pause();
	interval = null;
});

game.addEventListener('wheel', function(e) {
	e.preventDefault();
});

// Display Hidden Text//
const voice01 = document.getElementById('voice01-audio');
const voice02 = document.getElementById('voice02-audio');
const voice03 = document.getElementById('voice03-audio');
const voice04 = document.getElementById('voice04-audio');
const voice05 = document.getElementById('voice05-audio');
const voice06 = document.getElementById('voice06-audio');

lisa.addEventListener('mousedown', function() {
	if (game.scrollTop < 100) {
		typeWriter(0);
		var clickLisa = document.getElementById('text00').style.display='block';
		voice01.play();
	} else if (game.scrollTop > 100 && game.scrollTop < 2000) {
		typeWriter(1);
		var clickLisa = document.getElementById('text01').style.display='block';
		voice02.play();
	} else if (game.scrollTop > 2000 && game.scrollTop < 4500) {
		typeWriter(2);
		var clickLisa = document.getElementById('text02').style.display='block';
		voice03.play();
	} else if (game.scrollTop > 4500 && game.scrollTop < 5000) {
		console.log('are we called')
		typeWriter(3);
		var clickLisa = document.getElementById('text03').style.display='block';
		voice04.play();
	} else if((game.scrollTop > 5000 && game.scrollTop < 6000)) {
		typeWriter(4);
		var clickLisa = document.getElementById('text04').style.display='block';
		voice05.play();
	} else {
		typeWriter(5);
		var clickLisa = document.getElementById('text05').style.display='block';
		voice05.play();
	}
});

lisa.addEventListener('mouseup', function() {
	var lisaQuiet = document.getElementsByClassName('dialog');

	for (let i=0; i<lisaQuiet.length-1; i++){
		lisaQuiet[i].style.display = "none";
	}
});

// Text Animation
var i = 0;
var txt = document.getElementsByClassName('dialog'); /* The text */
var speed = 50; /* The speed/duration of the effect in milliseconds */

function typeWriter(index) {
	// this is the text we're getting or OG text
	const targetThatWeGetTextFrom = txt[index];
	// the element that we're adding the above text
	const replacingTarget = document.getElementById('text0' + (index));
	// console.log(i)
	// basically a `for` loop (iterate through the array, until we hit the end of our OG text's length)
  if (i < targetThatWeGetTextFrom.innerHTML.length - 1) {
  	// console.log('text')
    replacingTarget.innerHTML += targetThatWeGetTextFrom.innerHTML[i];
    i++;
    // after a set amount of time, call the actual effect
    setTimeout(function() {typeWriter(index, i)}, speed);
  } else if (i === targetThatWeGetTextFrom.innerHTML.length - 1) {
  	// Afte completing above loop, we reset i to 0, and remove our text block
  	setTimeout(function(){
  		i = 0;
  		replacingTarget.innerHTML = '';
  	}, 1000);
  }
}

// Spirit Text
let spirit= document.getElementById('idle');
let spirit02= document.getElementById('idle02');

spirit.addEventListener('mouseover', function() {
	typeWriter(6);
	var clickLisa = document.getElementById('text06').style.display='block';
	spirit.src = 'images/spirt_away.gif';
	voice06.play();
}); 

spirit02.addEventListener('mouseover', function() {
	typeWriter(7);
	var clickLisa = document.getElementById('text07').style.display='block';
	spirit02.src = 'images/spirt_away.gif';
	voice05.play();
}); 

// Foot Print Text
let foot01= document.getElementById('print01');
let foot02= document.getElementById('print02');
let foot03= document.getElementById('print03');
let foot04= document.getElementById('print04');

foot01.addEventListener('mousedown', function() {
	typeWriter(8);
	var clickLisa = document.getElementById('text08').style.display='block';
	voice01.play();
}); 

foot02.addEventListener('mousedown', function() {
	typeWriter(9);
	var clickLisa = document.getElementById('text09').style.display='block';
	voice02.play();
}); 

foot03.addEventListener('mousedown', function() {
	typeWriter(10);
	var clickLisa = document.getElementById('text10').style.display='block';
	voice03.play();
}); 

foot04.addEventListener('mousedown', function() {
	typeWriter(11);
	var clickLisa = document.getElementById('text11').style.display='block';
	voice04.play();
}); 

//Mute Button
var muteOn = document.getElementById("clickOn");
var muteOff = document.getElementById("clickOff");

muteOn.addEventListener('mousedown', function() {
	bgAudio.muted = true;
}); 

muteOff.addEventListener('mousedown', function() {
	bgAudio.muted = false;
}); 
