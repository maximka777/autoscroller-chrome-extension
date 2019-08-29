let distanceDelta = 1 // px

let timeDelta = 100

let interval

function scrollDown(element, delta) {
	const currentScrollY = element.scrollTop || element.scrollY || 0
	element.scrollTo({
		top: currentScrollY + delta,
		left: 0,
		behavior: 'smooth'
	})
}

function findScrollableElement() {
	return window
}

let scrollableElement = findScrollableElement()

function start() {
	if (interval) {
		stop()
	}

	interval = setInterval(() => {
		scrollDown(scrollableElement, distanceDelta)
	}, timeDelta)
}

function stop() {
	clearInterval(interval)
	interval = null
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.scrolling === true) {
		start()
	} else {
		stop()
	}
	sendResponse({ ok: true })
})
