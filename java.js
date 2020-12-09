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
const bgAudio = document.getElementById('bg-audio');

$(document).ready(function(){

	$('.intro button').click(function(){
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

// let character = 'Cat';

// if(character == 'Dog') {
// 	document.getElementById('character-name').innerHTML = 'Tom';
// } else {
// 	document.getElementById('character-name').innerHTML = 'Jane';
// }

//Button Scroll Code

let downScroll = document.getElementById('controller');
let lisa = document.getElementById('lisaIdle');
let interval = 0;

function scrollingRightAlong() {
	const currentScroll= game.scrollTop;
	game.scrollTop = currentScroll + 10;
	// console.log(currentScroll);
}

downScroll.addEventListener('mousedown', function() {
	lisa.src = 'images/lisa_walk.gif';
	interval = setInterval(() => {
		scrollingRightAlong();
	}, 50);
	walkAudio.play();
});
	walkAudio.currentTime = 0;

downScroll.addEventListener('mouseup', function() {
	lisa.src = 'images/lisa_idle.gif';
	clearInterval(interval);
	walkAudio.pause();
	
});

downScroll.addEventListener('mouseleave', function() {
	lisa.src = 'images/lisa_idle.gif';
	clearInterval(interval);
	walkAudio.pause();
});

game.addEventListener('wheel', function(e) {
	e.preventDefault();
});

// Display Hidden Text//

const voice01 = document.getElementById('voice01-audio');
const voice02 = document.getElementById('voice02-audio');
const voice03 = document.getElementById('voice03-audio');

lisa.addEventListener('mousedown', function() {
	if (game.scrollTop < 1500) {
		var clickLisa = document.getElementById('text01').style.display='block';
		voice01.play();
	} else if (game.scrollTop > 1500 && game.scrollTop < 3000) {
		var clickLisa = document.getElementById('text02').style.display='block';
		voice02.play();
	} else {
		var clickLisa = document.getElementById('text03').style.display='block';
		voice03.play();
	}
	// var clickLisa = document.getElementById('text02').style.display='block';
});

lisa.addEventListener('mouseup', function() {
	var lisaQuiet = document.getElementsByClassName('dialog');

	for (let i=0; i<lisaQuiet.length-1; i++){
		lisaQuiet[i].style.display = "none";
	}
});

