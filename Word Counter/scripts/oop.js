document.addEventListener("DOMContentLoaded", () => {
	// 🌀 CLASS
	class WordCounter {
		constructor() {
			this.render();
			this.words = document.querySelector("[data-word-count]");
			this.characters = document.querySelector("[data-character-count]");
			this.area = document.querySelector("[data-character-area]");
			this.area.addEventListener("input", (e) => this.inputHandler(e));
		}

		// Обработчик поля
		inputHandler(e) {
			const value = e.target.value;
			const count = value
				.split(/[\n\r\s]+/g)
				.filter((word) => word.length > 0);
			this.words.textContent = count.length;
			this.characters.textContent = value.length;
		}

		// Рендер разметки
		render() {
			document.querySelector("#app").innerHTML = `
			<h1 class="app__title">Подсчет символов и слов</h1>
			<textarea class="app__textarea" data-character-area></textarea>
			<p class="app__result">
				Вы написали
				<span data-word-count>0</span> слов и
				<span data-character-count>0</span> символов.
			</p>`;
		}
	}

	// 🌀 VARS
	new WordCounter();
});
