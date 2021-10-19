function xwSwiper(selector, imgArr) {
	var styleDom = document.createElement('style');
	styleDom.innerHTML = `
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}
		
		.swiper {
			margin: auto;
			display: flex;
			background-color: lightgray;
			width: 100%;
			height: 100%;
			position: relative;
			overflow-x: hidden;
			color: crimson;
			font-size: 50px;
			font-weight: 500;
		}
		
		.swiper .leftbtn,
		.swiper .rightbtn {
			background-image: url(./img/icon-slides.png);
			width: 40px;
			height: 70px;
			position: absolute;
			margin-top: -50px;
			top: 50%;
			background-size: auto 100%;
			background-repeat: no-repeat;
		}
		
		.swiper .leftbtn {
			background-position: -85px 0px;
			right: auto;
			left: 0;
		}
		
		.swiper .leftbtn:hover {
			background-position: 0px 0px;
		}
		
		.swiper .rightbtn {
			background-position: -125px 0px;
			right: 0;
			left: auto;
		}
		
		.swiper .rightbtn:hover {
			background-position: -45px 0px;
		}
		
		.imglist {
			width: 100%;
			height: 100%;
			position: relative;
		}
		
		.imglist .imgitem {
			width: 100%;
			height: 100%;
			background-position: center;
			background-size: auto 100%;
			background-repeat: no-repeat;
			position: absolute;
			opacity: 0;
			transition: all 0.5s;
			/* flex-shrink: 0; */
		}
		
		.imglist .imgitem.active {
			opacity: 1;
		}
		
		.imglist .imgitem.active.left {
			animation: leftactive 0.5s;
		}
		
		.imglist .imgitem.active.right {
			animation: rightactive 0.5s;
		}
		
		@keyframes leftactive {
			from {
				transform: translateX(-100%);
			}
		
			to {
				transform: translateX(0%);
			}
		}
		
		@keyframes rightactive {
			from {
				transform: translateX(100%);
			}
		
			to {
				transform: translateX(0%);
			}
		}
		
		.imglist .imgitem.leftbefore {
			animation: leftbefore 1s;
		}
		
		.imglist .imgitem.rightbefore {
			animation: rightbefore 1s;
		}
		
		@keyframes leftbefore {
			from {
				transform: translateX(0%);
			}
		
			to {
				transform: translateX(100%);
			}
		}
		
		@keyframes rightbefore {
			from {
				transform: translateX(0%);
			}
		
			to {
				transform: translateX(-100%);
			}
		}
		
		.circlelist {
			width: 100px;
			height: 20px;
			position: absolute;
			left: 45%;
			bottom: 20px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}
		
		.circlelist .circleitem {
			width: 10px;
			height: 10px;
			border-radius: 5px;
			background-color: lightgray;
			transition: all 0.5s;
		}
		
		.circlelist .circleitem.active {
			background-color: aqua;
		}
		
		.circlelist .circleitem:hover {
			background-color: gray;
		}
	`
	var selectorDiv = document.querySelector(selector);
	// selectorDiv.className += ' swiper';
	selectorDiv.innerHTML = `
		<div class="swiper">
			<div class="imglist">				
			</div>
			<div class="circlelist">				
			</div>
			<div class="leftbtn"></div>
			<div class="rightbtn"></div>
		</div>
	`
	selectorDiv.appendChild(styleDom);
	if (selectorDiv.clientHeight == 0 || selectorDiv.clientWidth == 0) {
		selectorDiv.style.setProperty('width', '400px');
		selectorDiv.style.setProperty('height', '200px');
	}
	var imglistDiv = document.querySelector(selector + ' .imglist');
	var circlelistDiv = document.querySelector(selector + ' .circlelist');
	imgArr.forEach(function(item, index) {
		if (index == 0) {
			imglistDiv.innerHTML += `
				<div class="imgitem active" style="background-image:url(${item})" data-index="${index}"></div>
			`
			circlelistDiv.innerHTML += `
				<div class="circleitem active" data-index="${index}"></div>
			`
		} else {
			imglistDiv.innerHTML += `
				<div class="imgitem" style="background-image:url(${item})" data-index="${index}"></div>
			`
			circlelistDiv.innerHTML += `
				<div class="circleitem" data-index="${index}"></div>
			`
		}
	})

	var body = document.querySelector('body');
	var imglist = document.querySelectorAll(selector + ' .imgitem');
	var circlelist = document.querySelectorAll(selector + ' .circleitem');
	var leftbtn = document.querySelector(selector + ' .leftbtn');
	var rightbtn = document.querySelector(selector + ' .rightbtn');
	body.onkeydown = function(event) {
		if (event.key == 'ArrowLeft' || event.key == 'Left') {
			swiperpage('leftbtn');
		} else if (event.key == 'ArrowRight' || event.key == 'Right') {
			swiperpage('rightbtn');
		}
	}
	leftbtn.onclick = function() {
		swiperpage('leftbtn');
	}
	rightbtn.onclick = function() {
		swiperpage('rightbtn');
	}

	for (var i = 0; i < circlelist.length; i++) {
		circlelist[i].onclick = function(e) {
			var curpage = document.querySelector(selector + ' .imgitem' + '.active');
			var curindex = curpage.dataset.index;
			var deltaindex = e.target.dataset.index - curindex;
			if (curindex == circlelist.length - 1 && e.target.dataset.index == 0) {
				deltaindex = 1;
			} else if (curindex == 0 && e.target.dataset.index == circlelist.length - 1) {
				deltaindex = -1;
			}
			if (deltaindex > 0) {
				intervalswiperpage('rightbtn', deltaindex);
				// for (var i = 0; i < Math.abs(deltaindex); i++) {
				// 	swiperpage('rightbtn');
				// }
			} else if (deltaindex < 0) {
				intervalswiperpage('leftbtn', deltaindex);
				// for (var i = 0; i < Math.abs(deltaindex); i++) {
				// 	swiperpage('leftbtn');
				// }
			}
		}
	}

	function tstart(e) {
		console.log(e);
	}

	function tmove(e) {
		console.log(e);
	}

	function tend(e) {
		console.log(e);
	}

	var tstartx = 0;
	var tstarty = 0;
	imglistDiv.addEventListener('touchstart', function(e) {
		tstartx = e.changedTouches[0].pageX;
		tstarty = e.changedTouches[0].pageY;
	});
	imglistDiv.addEventListener('touchmove', function(e) {
		// console.log(e);
	});
	imglistDiv.addEventListener('touchend', function(e) {
		if (e.changedTouches[0].pageX - tstartx > 0) {
			swiperpage('leftbtn');
		} else if (e.changedTouches[0].pageX - tstartx < 0) {
			swiperpage('rightbtn');
		}
	});

	function swiperpage(btnname) {
		var curpage = document.querySelector(selector + ' .imgitem' + '.active');
		var curcircle = document.querySelector(selector + ' .circleitem' + '.active');
		curpage.className = 'imgitem';
		curcircle.className = 'circleitem';
		var curindex = curpage.dataset.index;
		var leftbeforepage = document.querySelector(selector + ' .leftbefore');
		if (leftbeforepage != null) {
			leftbeforepage.className = 'imgitem';
		}
		var rightbeforepage = document.querySelector(selector + ' .rightbefore');
		if (rightbeforepage != null) {
			rightbeforepage.className = 'imgitem';
		}
		if (btnname == 'rightbtn') {
			curpage.className = 'imgitem rightbefore';
			if (curindex == imglist.length - 1) {
				curindex = 0;
			} else {
				curindex++;
			}
			imglist[curindex].className += ' active right';
		} else if (btnname == 'leftbtn') {
			curpage.className = 'imgitem leftbefore';
			if (curindex == 0) {
				curindex = imglist.length - 1;
			} else {
				curindex--;
			}
			imglist[curindex].className += ' active left';
		}
		circlelist[curindex].className += ' active';
	}

	function intervalswiperpage(btnname, deltaindex) {
		var n = 0;
		swiperpage(btnname);
		if (Math.abs(deltaindex) > 1) {
			var id = setInterval(function() {
				swiperpage(btnname);
				if (n == Math.abs(deltaindex) - 2) {
					clearInterval(id);
				} else {
					n++;
				}
			}, 500);
		}
	}
}
