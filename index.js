const html = document.getElementById('html');

// Ambil referensi elemen navbar
const navbar = document.querySelector('.offcanvas-navbar');

// Ambil referensi semua item navbar
const navbarItems = navbar.querySelectorAll('.nav-link');
const navbarItemsDropdown = navbar.querySelectorAll('.dropdown-item');

// Loop melalui setiap item navbar dan tambahkan event listener klik
navbarItems.forEach(function (item) {
	item.addEventListener('click', function (event) {
		// Cek apakah item memiliki dropdown
		const dropdownMenu = item.nextElementSibling;
		if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
			// Jika item adalah dropdown, jangan menyembunyikan navbar
			event.stopPropagation();
			return;
		}

		// Tutup offcanvas navbar dengan memanggil fungsi hide() dari objek Offcanvas
		const offcanvasNavbar = bootstrap.Offcanvas.getInstance(
			document.getElementById('offcanvasDarkNavbar'),
		);
		setTimeout(() => {
			offcanvasNavbar.hide();
		}, 1000);
	});
});
navbarItemsDropdown.forEach(function (item) {
	item.addEventListener('click', function () {
		// Tutup offcanvas navbar dengan memanggil fungsi hide() dari objek Offcanvas
		const offcanvasNavbar = bootstrap.Offcanvas.getInstance(
			document.getElementById('offcanvasDarkNavbar'),
		);
		setTimeout(() => {
			offcanvasNavbar.hide();
		}, 1000);
	});
});

window.addEventListener('scroll', parallaxScroll);
function parallaxScroll() {
	const scrolled = window.pageYOffset;

	// Nilai Kecepatan Parallax
	const speed = 0.8;

	const layers = document.querySelectorAll('.parallax-layer');

	layers.forEach((layer) => {
		const distance = scrolled * speed;
		layer.style.transform = `translateY(${distance}px)`;
	});
}

const body = document.body,
	c1 = document.getElementById('about'),
	c3 = document.getElementById('wtd'),
	btnIds = document.querySelectorAll('#buttonId1, #buttonId2, #buttonId3'),
	c4 = document.getElementById('oleholeh'),
	c4Cards = document.querySelectorAll('.c4-card-body'),
	footer = document.querySelector('footer'),
	moons = document.querySelectorAll('#moon, #moonMobile'),
	suns = document.querySelectorAll('#sun, #sunMobile');

moons.forEach((moon) => {
	moon.style.opacity = '0';
});
suns.forEach((sun) => {
	sun.style.opacity = '0';
});

let darkMode = localStorage.getItem('isDarkMode');
if (darkMode === 'true') {
	html.setAttribute('data-bs-theme', 'dark');
	body.classList.add('dark');
	c1.classList.add('dark');
	c3.classList.add('dark');
	c4.classList.add('dark');
	c4Cards.forEach(function (c4Card) {
		c4Card.classList.add('dark');
	});
	btnIds.forEach(function (btnId) {
		btnId.classList.add('btn-secondary');
		btnId.classList.remove('btn-dark');
	});
	footer.classList.add('dark-footer');
	suns.forEach((sun) => {
		sun.style.opacity = '1';
	});
} else {
	html.removeAttribute('data-bs-theme', 'dark');
	body.classList.remove('dark');
	c1.classList.remove('dark');
	c3.classList.remove('dark');
	c4.classList.remove('dark');
	c4Cards.forEach(function (c4Card) {
		c4Card.classList.remove('dark');
	});
	btnIds.forEach(function (btnId) {
		btnId.classList.add('btn-dark');
		btnId.classList.remove('btn-secondary');
	});
	footer.classList.remove('dark-footer');
	moons.forEach((moon) => {
		moon.style.opacity = '1';
	});
}

function darkModeSwitch() {
	body.classList.toggle('dark');
	c1.classList.toggle('dark');
	c3.classList.toggle('dark');
	c4.classList.toggle('dark');
	c4Cards.forEach(function (c4Card) {
		c4Card.classList.toggle('dark');
	});
	footer.classList.toggle('dark-footer');

	darkMode = body.classList.contains('dark');
	if (darkMode) {
		suns.forEach((sun) => {
			sun.style.opacity = '1';
		}); // Menampilkan sun saat isDarkMode = true
		moons.forEach((moon) => {
			moon.style.opacity = '0';
		}); // Menampilkan moon saat isDarkMode = true
		html.setAttribute('data-bs-theme', 'dark');
		btnIds.forEach(function (btnId) {
			btnId.classList.add('btn-secondary');
			btnId.classList.remove('btn-dark');
		});
	} else {
		suns.forEach((sun) => {
			sun.style.opacity = '0';
		}); // Menyembunyikan sun saat isDarkMode = false
		moons.forEach((moon) => {
			moon.style.opacity = '1';
		}); // Menampilkan moon saat isDarkMode = false
		html.removeAttribute('data-bs-theme', 'dark');
		btnIds.forEach(function (btnId) {
			btnId.classList.add('btn-dark');
			btnId.classList.remove('btn-secondary');
		});
	}

	localStorage.setItem('isDarkMode', darkMode);
}

// console.log(role);

// Function to start the counter animation
function startCounter(counterElement, target) {
	const countElement = counterElement.querySelector('.count');
	let count = parseInt(countElement.innerText);
	const duration = 3000; // Duration in milliseconds

	const increment = Math.ceil((target - count) / (duration / 50)); // Calculate the increment based on the duration

	const interval = setInterval(function () {
		count += increment;
		countElement.innerText = count;

		if (increment > 0 && count >= target) {
			count = target;
			clearInterval(interval);
		} else if (increment < 0 && count <= target) {
			count = target;
			clearInterval(interval);
		}
	}, 50);
}

// Callback function when a counter element is intersecting
function handleIntersection(entries) {
	entries.forEach(function (entry) {
		if (entry.isIntersecting) {
			const counterElement = entry.target;
			const target = parseInt(counterElement.getAttribute('data-target'));
			startCounter(counterElement, target);
			observer.unobserve(counterElement);
		}
	});
}

// Create an Intersection Observer
const counters = document.querySelectorAll('.counter');
const observer = new IntersectionObserver(handleIntersection);

// Start observing each counter element
counters.forEach(function (counter) {
	observer.observe(counter);
});
