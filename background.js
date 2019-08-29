class AutoScroller {
	isActivatedOnTab(tabId) {
		return new Promise((resolve) => {
			const key = 'state_' + tabId
			chrome.storage.sync.get([key], result => {
				resolve(result[key])
			})
		})
	}

	activate(tabId) {
		return new Promise((resolve) => {
			const key = 'state_' + tabId
			chrome.storage.sync.set({ [key]: true })
		})
	}

	deactivate(tabId) {
		return new Promise((resolve) => {
			const key = 'state_' + tabId
			chrome.storage.sync.set({ [key]: false })
		})
	}

	async toggle(tab) {
		if (await this.isActivatedOnTab(tab.id)) {
			chrome.tabs.sendMessage(tab.id, { scrolling: false }, response => {})

			await this.deactivate(tab.id)
		} else {
			chrome.tabs.sendMessage(tab.id, { scrolling: true }, response => {})

			await this.activate(tab.id)
		}
	}
}

let autoScroller

chrome.browserAction.onClicked.addListener(tab => {
	if (!autoScroller) {
		autoScroller = new AutoScroller()
	}
	autoScroller.toggle(tab)
})
