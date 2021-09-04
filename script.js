'use strict';

const form = document.querySelector('form');
let errorDetected = false;

function renderError(input, label, message = '') {
	input.classList.add('invalid');
	label.textContent = message;

	errorDetected = true;
}

form.addEventListener('submit', (e) => {
	// Prevent default action
	e.preventDefault();

	// Validate inputs
	errorDetected = false;
	const inputs = e.target.querySelectorAll('input');

	inputs.forEach((input) => {
		// Reset state
		input.classList.remove('invalid');

		// Get associated label
		const label = e.target.querySelector(`label[for="${input.name}"]`);
		label.textContent = '';

		// Define error handler
		const showError = renderError.bind(null, input, label);

		// Check for a value
		if (input.value === '') return showError(`${input.name} cannot be empty`);

		// Validate text inputs
		if (input.type === 'text') {
			// Check for numbers
			if (input.value.match(/[^((a-z)|(A-Z)|\s)]/g)) return showError(`${input.name} cannot contain numbers or symbols`);
		}
		// Validate email inputs
		if (input.type === 'email') {
			// Check for correct format
			if (!input.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) return showError(`Looks like this is not an email`);
		}

		// Validate password inputs
		if (input.type === 'password') {
			if (input.value.length < 8) return showError(`${input.name} must be at least 8 characters long`);
		}
	});

	// Send data
	if (!errorDetected) location.reload();
});
