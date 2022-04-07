const circle = document.getElementById('circle');
const circleStyle = circle.style;

// listener
document.addEventListener('mousemove', (e) => {
	circleStyle.top = `${e.clientY - circle.offsetHeight / 2}px`;
	circleStyle.left = `${e.clientX - circle.offsetWidth / 2}px`;
});
