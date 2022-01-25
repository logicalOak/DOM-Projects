// 🌀 MARKUP
document.querySelector("#app").innerHTML = `
	<h1 class="app__title">Подсчет символов и слов</h1>
	<textarea class="app__textarea" data-character-area></textarea>
	<p class="app__result">
		Вы написали
		<span data-word-count>0</span> слов и
		<span data-character-count>0</span> символов.
	</p>
`;

// 🌀 VARS
const words = document.querySelector("[data-word-count]");
const characters = document.querySelector("[data-character-count]");
const area = document.querySelector("[data-character-area]");
// 🌀 FUNCTIONS
const inputHandler = (e) => {
	const count = e.target.value
		.split(/[\n\r\s]+/g)
		.filter((word) => word.length > 0);
	words.textContent = count.length;
	characters.textContent = e.target.value.length;
};

// 🌀 EVENTS
area.addEventListener("input", inputHandler);
