const saveLoginData = (key, value) => {
    if(key && value)
        localStorage.setItem(key, value);
}

const getLoginData = (key) => {
    if(key)
        return localStorage.getItem(key);
}

export {
    saveLoginData,
    getLoginData
}