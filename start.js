let AM_square = {
	//---------------------------------------
	style: {
		perspective: {
			perspective: '1000px',
		},
		wrapper: {
			transform: 'rotateY(0deg)',
			transition: 'ease-out 0.5s',			
		},
		side: {
			position: 'absolute',
			border: '2px solid white',
			opacity: '.9',
		},
		left: {
			background: 'red;',
		},
		right: {
			background: 'blue;',
		},
		front: {

			background: 'green;',
		},
		back: {

			background: 'black',
		},
	},
	clickFunc: {
		left: '',
		right: '',
		back: '',
		front: '',
	},

	size: 40,
	sizeFormat: 'em',
	rotate: 0,

	userClick: false,
	deleyClick: true,
	coordinates: '',
	//---------------------------------------
	addSquare(addWhere){						//добавление куба страниц PS 
		addWhere.innerHTML = `
			<div onmousedown='AM_square.userClick = true; AM_square.coordinates = event.clientX' onmouseup='AM_square.userClick = false' onmousemove='AM_square.shiftSquere(event.clientX,this)' style='${this.getCssForElem(this.style.perspective)}'>
				<div class='AM_container' style='user-select: none; transform-style: preserve-3d; width: ${this.size + this.sizeFormat}; height: ${this.size + this.sizeFormat}; ${this.getCssForElem(this.style.wrapper)}'>
					<div onclick='${this.clickFunc.left}'	class='AM_left'		style='transform: translateX(${-(this.size/2) + this.sizeFormat}) rotateY(${this.rotate+90}deg); width: ${this.size + this.sizeFormat}; height: ${this.size + this.sizeFormat}; ${this.getCssForElem(this.style.left) + this.getCssForElem(this.style.side)}'></div>
					<div onclick='${this.clickFunc.right}'	class='AM_right'	style='transform: translateX(${ (this.size/2) + this.sizeFormat}) rotateY(${this.rotate+90}deg); width: ${this.size + this.sizeFormat}; height: ${this.size + this.sizeFormat }; ${this.getCssForElem(this.style.right) + this.getCssForElem(this.style.side)}'></div>
					<div onclick='${this.clickFunc.front}'	class='AM_front'	style='transform: translateZ(${ (this.size/2) + this.sizeFormat}) rotateY(${this.rotate}deg); width: ${this.size + this.sizeFormat}; height: ${this.size + this.sizeFormat }; ${this.getCssForElem(this.style.front) + this.getCssForElem(this.style.side)}'></div>
					<div onclick='${this.clickFunc.back}'	class='AM_back'		style='transform: translateZ(${-(this.size/2) + this.sizeFormat}) rotateY(${this.rotate}deg); width: ${this.size + this.sizeFormat}; height: ${this.size + this.sizeFormat }; ${this.getCssForElem(this.style.back) + this.getCssForElem(this.style.side)}'></div>	
				</div>
			</div>
		`
	},
	//---------------------------------------
	setCss(whatSide,whatParam,whatValue){		//изменение/получение стиля указанных сторон
		try{
			this.style[whatSide][whatParam] = whatValue
			alert(this[whatSide][whatParam])
		}
		catch (err){
			console.log(err)
		}
	},
	//---------------------------------------
	setClick(side,whatSetup){					//устанавливает onClick
		this.clickFunc[side] = whatSetup
	},
	//---------------------------------------
	setRotate(whatSetup){						//устанавливает 'крылья'
		this.rotate = whatSetup
	},
	//---------------------------------------
	setSize(whatSize,whatPX){					//устанавливает размер и измерения
		this.size = whatSize
		this.sizeFormat = whatPX
	},
	//---------------------------------------
	getCssForElem(whatCss){						//стиль в 1 строку
		let temp = ''
		for (let i in whatCss){
			temp += i + ': ' + whatCss[i] + '; '
		}
		return temp
	},
	//---------------------------------------
	shiftSquere(n,whoRotate){					//вращение куба
		if(this.userClick && this.deleyClick){
			this.deleyClick = false
			setTimeout(()=>{

				let j = whoRotate.firstElementChild.style.transform.indexOf('rotateY(') + 8
				let g = whoRotate.firstElementChild.style.transform.indexOf('deg)',j)
				let num = +whoRotate.firstElementChild.style.transform.slice(j,g)
				let word = whoRotate.firstElementChild.style.transform.slice(0,j);
				
				num += -(this.coordinates - n)/4
				
				word += num
				word += whoRotate.firstElementChild.style.transform.slice(g)
				whoRotate.firstElementChild.style.transform = word
				
				this.coordinates = n
				this.deleyClick = true
				
			},100)
		}
	},
	//---------------------------------------
}

AM_square.setClick('back','alert("back")')
AM_square.setClick('left','alert("left")')
AM_square.setClick('right','alert("right")')
AM_square.setClick('front','alert("front")')
AM_square.setSize(10, 'em')
AM_square.addSquare(document.body)

