export const getToken = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('token', (result) => {
            resolve(result.token);
        });
    });
}

export const removeToken = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.remove('token', () => {
            resolve(true);
        });
    });
}