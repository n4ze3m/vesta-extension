import { getToken } from "~utils/token";

export { }

const endpoint = 'https://vesta-list.vercel.app/api/keep/link'


chrome.contextMenus.create({
    title: "Save url to Vesta",
    id: "vesta",
    contexts: ["page"],
});


const fetchCurrentSite = () => {
    const url = new URL(window?.location?.href)
    const title = document?.title || url.hostname
    const metaImage = document.querySelector("meta[property='og:image']")
    const image = metaImage ? metaImage.getAttribute("content") : ""
    const metaDescription = document.querySelector("meta[property='og:description']")
    return {
        title: title,
        image: image,
        target_url: url.href,
        description: metaDescription ? metaDescription.getAttribute("content") : "",
    }
}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId == "vesta") {
        const tabId = tab.id
        const response = await chrome.scripting.executeScript({
            target: {
                tabId: tabId
            },
            func: fetchCurrentSite
        })
        if (response.length !== 0) {
            const data = response[0]["result"]
            if (data) {
                const userId = await getToken()
                if (userId) {
                    let requestHeaders: any = { 'user_id': userId };
                    await fetch(endpoint, {
                        method: "POST",
                        headers: requestHeaders,
                        body: JSON.stringify(data)
                    })
                }

            }
        }
    }
})

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    // if (request.jwt) {
    const method = request.method;
    switch (method) {
        case 'connect':
            const token = request.token;
            chrome.storage.local.set({ token }, () => {
                sendResponse({ message: true });
            }
            );
            break;
        case 'connected':
            chrome.storage.local.get('token', (result) => {
                console.log(result);
                sendResponse({ message: result.token ? true : false });
            })
            break;
        default:
            sendResponse({ message: false });
    }
    // }
});