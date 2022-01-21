document.addEventListener("DOMContentLoaded", () => {
	document.querySelector("#app").innerHTML = `
	<header class="header">
		<a class="header__logo">
			<img alt="Dmitry Mozhnyy" src="images/logo.png">
		</a>
		<button>
			<i class="uil uil-moon change-theme" id="theme-button"></i>
		</button>
	</header>
	<h1 class="app__title">Угадай число</h1>
	<ul class="app__output"></ul>
	<form class="app__form">
		<input type="text" class="app__input">
	</form>
	<p class="app__message hide"></p>
	`;

	// 🌀 BLOCK: VARIABLES
	let name = "";
	let quantity = 0;
	let appOutput = document.querySelector(".app__output");
	let appPrompt = document.querySelector(".app__form");
	let appInput = document.querySelector(".app__input");
	const GUESS_NUMBER = Math.floor(Math.random() * 100);
	console.log(`Псс, правильный ответ: ${GUESS_NUMBER}`);

	// 🌀 BLOCK: FUNCTIONS
	function handleSubmit(e) {
		// remove default event
		e.preventDefault();
		// send input value to function
		processInput(appInput.value);
		// clear input value
		appInput.value = "";
	}

	function printMessages(message = "") {
		// create new DOM element
		let li = document.createElement("li");
		// add text to element
		li.textContent = message;
		// add element to ul
		appOutput.appendChild(li);
	}

	function clearOutput() {
		// clear ul
		for (let i = 0; i < appOutput.children.length; i++) {
			appOutput.removeChild(appOutput.children[i]);
		}
	}

	function processInput(value) {
		appInput.addEventListener("input", function () {
			this.value = this.value.replace(/[^0-9\\.]+/g, "");
		});
		// if not value -> message
		if (!value) addMessage("Введите число");
		// if not name -> agign name the value -> clear output -> print message
		if (!name) {
			name = value;
			clearOutput();
			printMessages(
				`${name}, загадано число от 0 до 100. Попробуйте отгадать его за наименьшее количество попыток. После каждой попытки будет сообщение с текстом - «Мало», «Много» или «Правильно»."`
			);
			return;
		}

		// create variable to save value
		let guess = Number.parseInt(value);
		// if not a number -> return
		if (isNaN(guess)) return;
		// print message
		printMessages(value);
		// increasing the number of attempts
		quantity++;
		// check conditions
		if (guess > GUESS_NUMBER) {
			printMessages("Много. Попробуйте еще раз");
		} else if (guess < GUESS_NUMBER) {
			printMessages("Мало. Попробуйте еще раз");
		} else {
			printMessages(`Правильно. Загаданное число: ${guess}`);
			printMessages(`Количество попыток: ${quantity}`);
			// remove input element
			appPrompt.remove();
			appOutput.insertAdjacentHTML(
				"afterend",
				`<button class="app__play">Играть сначала?</button>`
			);
			replay();
		}
	}

	// Reload page
	function replay() {
		const button = document.querySelector(".app__play");
		if (button) {
			button.addEventListener("click", () => location.reload());
		}
	}

	// Add message
	function addMessage(text) {
		const message = document.querySelector(".app__message");
		message.textContent = text;
		message.classList.add("show");

		setTimeout(() => {
			message.classList.remove("show");
		}, 2000);
	}

	// 🌀 BLOCK: BASIC SETTINGS
	appInput.focus();
	printMessages("Введите ваше имя");

	// 🌀 BLOCK: EVENT LISTENERS
	appPrompt.addEventListener("submit", handleSubmit);

	/*====== DARK LIGHT THEME ======*/
	const themeButton = document.getElementById("theme-button");
	const darkTheme = "dark-theme";
	const iconTheme = "uil-sun";

	// Previously selected topic (if user selected)
	const selectedTheme = localStorage.getItem("selected-theme");
	const selectedIcon = localStorage.getItem("selected-icon");
	// We obtain the current theme that the interface has by validating the dark-theme class
	const getCurrentTheme = () =>
		document.body.classList.contains(darkTheme) ? "dark" : "light";
	const getCurrentIcon = () =>
		themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

	// We validate if the user previously chose a topic
	if (selectedTheme) {
		// If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
		document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
			darkTheme
		);
		themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
			iconTheme
		);
	}

	// Activate / deactivate the theme manually with the button
	themeButton.addEventListener("click", () => {
		// Add or remove the dark / icon theme
		document.body.classList.toggle(darkTheme);
		themeButton.classList.toggle(iconTheme);
		// We save the theme and the current icon that the user chose
		localStorage.setItem("selected-theme", getCurrentTheme());
		localStorage.setItem("selected-icon", getCurrentIcon());
	});
});
