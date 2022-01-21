/*
ЗАДАЧА ИГРЫ:
- Игрок должен угадать число от 1 до 10
- Игрок получает определенное количество догадок
- Уведомить игрока об оставшихся догадках
- Уведомить игрока о правильном ответе
- Позволить игроку выбрать играть снова
*/

class GuessNumber {
	constructor() {
		this.secretNumber = Math.floor(Math.random() * (10 - 0 + 1)) + 0; // Генерирует случайно число
		this.counter = 3; // Счетчик
		this.create(); // Функция для создания разметки
		this.game(); // Функция с логикой приложения
		console.clear();
		console.log(`Псс, загаданное число - ${this.secretNumber}`); // Ответ в консоли для тестирования
	}

	// Генерация и показ сообщений
	message(type = "", text = "", input = "") {
		const message = document.querySelector(".app__message");
		let time;
		message.textContent = text;
		message.classList.add("show");

		switch (type) {
			case "error":
				message.classList.add("error");
				input.classList.add("error");
				time = 2000;
				break;

			case "success":
				message.classList.add("success");
				time = 5000;
				break;

			default:
				break;
		}

		setTimeout(() => {
			message.classList.remove("error", "success", "show");
			input.classList.remove("error");
		}, time);
	}

	// Формирование логики
	game() {
		const form = document.querySelector(".app__form");
		const messageArea = document.querySelector(".app__message");

		form.addEventListener("submit", (e) => {
			e.preventDefault();
			const self = e.currentTarget;
			const field = self.guess;
			const value = Number(field.value);

			if (isNaN(value) || value < 0 || value > 10) {
				this.message(
					"error",
					"Пожалуйста, введите цифру от 0 до 10!",
					field
				);
			} else {
				if (value === this.secretNumber) {
					this.message("success", "Вы угадали 👌!", field);
					field.remove();
					messageArea.insertAdjacentHTML(
						"afterend",
						`<button class="app__play">Играть сначала?</button>`
					);
					this.replay();
				}

				if (value !== this.secretNumber) {
					this.counter--;
					if (this.counter === 0) {
						form.reset();
						field.remove();
						messageArea.insertAdjacentHTML(
							"afterend",
							`<p class="app__message error">Ты проиграл 😜! Загаданное число - ${this.secretNumber}</p>
						<button class="app__play">Играть сначала?</button>`
						);
						this.replay();
					} else {
						this.message(
							"error",
							`Мимо! Попробуйте снова. Попыток осталось ${this.counter}`,
							field
						);
						form.reset();
					}
				}
			}
		});
	}

	// Перезагрузка страницы
	replay() {
		const button = document.querySelector(".app__play");
		if (button) {
			button.addEventListener("click", () => location.reload());
		}
	}

	// Создание разметки
	create() {
		const app = document.querySelector("#app");
		app.innerHTML = `
		<header class="header">
			<a class="header__logo">
				<img alt="Dmitry Mozhnyy" src="images/logo.png">
			</a>
			<button class="theme-button">
				<i class="uil uil-moon change-theme" id="theme-button"></i>
			</button>
		</header>
		<h2 class="app__title">Угадай число</h2>
		<p class="app__description">
			Угадай число - игра, в которой вы должны угадать число, загаданное компьютером между интервалом от 0 до 10. Используйте как можно меньше попыток. Удачи!</p>
		<form class="app__form">
			<input type="number" class="app__input" name="guess" placeholder="Введите число">
		</form>
		<p class="app__message hide"></p>
		`;
	}
}

// Новый экземпляр класса
new GuessNumber();

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
