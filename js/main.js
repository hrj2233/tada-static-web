$(function () {
	// header
	let curr = $(window).scrollTop();

	$('.apply button').click(function (e) {
		e.preventDefault();
		$(this).parent('li').toggleClass('active');
	});

	$(window).scroll(function () {
		let curr = $(window).scrollTop();
		let intro = $('.sc_intro').offset().top;
		if (curr >= intro) {
			$('header').addClass('fix');
		} else {
			$('header').removeClass('fix');
		}
	});

	$('.hamburger').click(function () {
		if ($('header').hasClass('menu_color_reversal')) {
			$('header').removeClass('menu_color_reversal');
		}

		if ($(this).hasClass('on')) {
			$(this).removeClass('on');
			$('.menu_wrapper').removeClass('on');
			$('body').removeClass('hidden');
			if (
				!$('header').hasClass('menu_color_reversal') &&
				$('.event_wrapper').hasClass('event_bg_on')
			) {
				$('header').addClass('menu_color_reversal');
			}
		} else {
			$(this).addClass('on');
			$('.menu_wrapper').addClass('on');
			$('body').addClass('hidden');

			// 현재 스크롤 비교해서 하는 모션
			if (window.scrollY < 891) {
				$('html,body').animate({ scrollTop: $(window).height() }, () => {
					$('.menu_wrapper').addClass('on');
				});
			} else {
				$('.menu_wrapper').addClass('on');
			}
		}
	});

	// video
	$('.video').addClass('active');

	$('.btn_wrapper button').click(function (e) {
		e.preventDefault();
		$(this).siblings('.link_wrapper').toggleClass('show');
	});

	// lineup
	const lineupCategory = [
		{
			type: '실시간',
			name: 'NEXT',
		},
		{
			type: '실시간',
			name: 'LITE',
		},
		{
			type: '실시간',
			name: 'PLUS',
		},
		{
			type: '예약',
			name: 'AIR',
		},
		{
			type: '예약',
			name: 'PRIVATE',
		},
		{
			type: '예약',
			name: 'GOLF',
		},
	];

	const lineupVideos = document.querySelectorAll('.swiper-wrapper iframe');

	const lineupPlayers = Array.from(lineupVideos).map(
		(video) => new Vimeo.Player(video)
	);

	const lineupSwiper = new Swiper('.lineup-slider', {
		// on: {
		// 	init: function () {
		// 		lineupPlayers[0].play();
		// 	},
		// },
		slidesPerView: 'auto',
		centeredSlides: true,
		loop: true,
		pagination: {
			el: '.lineup-slider .nav-wrapper',
			clickable: true,
			bulletClass: 'bullet',
			bulletActiveClass: 'vimeo-active active',
			renderBullet: function (index, className) {
				return `<li class=${className}>
          <button><span>${lineupCategory[index].type}</span>${lineupCategory[index].name}</button>
        </li>`;
			},
		},
		navigation: {
			nextEl: '.lineup-slider .next',
			prevEl: '.lineup-slider .prev',
		},
	});

	$('.bullet').click(function () {
		$(this).addClass('vimeo-active').siblings().removeClass('vimeo-active');
	});

	lineupSwiper.on('slideChange', function () {
		let idx = this.realIndex;
		lineupPlayers.forEach((element) => {
			element.unload();
		});
		// lineupPlayers[idx].play();
		$('.nav_wrapper li').eq(idx).addClass('on');
	});

	// event-bg
	let motion01 = gsap.timeline({});

	ScrollTrigger.create({
		animation: motion01,
		trigger: '.event_wrapper',
		start: 'top top',
		end: 'bottom top',
		// markers: true,
		scrub: 1,
		onLeave: () => {
			if ($('header').hasClass('on')) {
				return;
			}
			$('header').removeClass('menu_color_reversal');
			$('.hamburger').removeClass('active');
		},
		onLeaveBack: () => {
			if ($('header').hasClass('on')) {
				return;
			}
			$('header').removeClass('menu_color_reversal');
			$('.hamburger').removeClass('active');
		},
		onEnter: () => {
			if ($('header').hasClass('on')) {
				return;
			}
			$('header').addClass('menu_color_reversal');
			$('.hamburger').addClass('active');
		},
		onEnterBack: () => {
			if ($('header').hasClass('on')) {
				return;
			}
			$('header').addClass('menu_color_reversal');
			$('.hamburger').addClass('active');
		},
	});

	let motion02 = gsap.timeline({});

	ScrollTrigger.create({
		animation: motion02,
		trigger: '.event_wrapper',
		start: 'top 50%',
		end: 'bottom top',
		// markers: true,
		scrub: 1,
		onLeave: () => {
			$('.event_wrapper').removeClass('event_bg_on');
		},
		onLeaveBack: () => {
			$('.event_wrapper').removeClass('event_bg_on');
		},
		onEnter: () => {
			$('.event_wrapper').addClass('event_bg_on');
		},
		onEnterBack: () => {
			$('.event_wrapper').addClass('event_bg_on');
		},
	});

	const verticalSlider = (elem) => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: elem,
				start: '80% bottom',
				end: '80% top',
				scrub: true,
			},
		});

		tl.to(elem, {
			opacity: 0,
		});
		tl.to(elem, {
			opacity: 1,
		});
		tl.to(elem, {
			opacity: 1,
		});
		tl.to(elem, {
			opacity: 1,
		});
		tl.to(elem, {
			opacity: 0,
		});
	};

	gsap.utils.toArray('.vertical_motion li').forEach(function (elem) {
		ScrollTrigger.create({
			trigger: elem,
			onEnter: function () {
				verticalSlider(elem);
			},
		});
	});

	const description = document.querySelector('.desc');
	let descriptionHeight = description.getBoundingClientRect().height;

	window.onscroll = () => {
		const descriptionTop = description.getBoundingClientRect().top;

		if (descriptionTop < -(descriptionHeight - window.innerHeight)) {
			description.classList.add('background_absolute');
			description.classList.remove('background_fixed');
		} else if (descriptionTop < 0) {
			description.classList.add('background_fixed');
			description.classList.remove('background_absolute');
		} else {
			description.classList.remove('background_fixed');
		}
	};

	// howtouse
	let howtouseSwiper = new Swiper('.howtouse-slider', {
		centeredSlides: true,
		loop: true,
		slidesPerView: 'auto',
		allowTouchMove: false,
		speed: 700,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
	});

	// bye
	const bye = gsap.timeline({});

	ScrollTrigger.create({
		animation: bye,
		trigger: '.bye h2',
		start: 'top 80%',
		end: 'bottom top',
		// markers: true,
		scrub: 1,
		onEnter: () => {
			$('.bye h2').addClass('active');
		},
	});
});
