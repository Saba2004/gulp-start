export const getStorage = (storageName) => {
    return JSON.parse(localStorage.getItem(storageName))
}

export const addToStorage = (storageName,data) => {
    let storageArr = [data]
    let storageData = JSON.parse(localStorage.getItem(storageName))

    if(storageData){
        storageArr = [...storageData, ...storageArr]
    }
    localStorage.setItem(storageName,JSON.stringify(storageArr))
}


export const removeFromStorage = (storageName,productId, all = false) => {
    let storageData = JSON.parse(localStorage.getItem(storageName))

    if(!storageData){
        return;
    }



    if(all === true){
        storageData = storageData.filter(el => el.id != productId);
    } else {
        storageData.splice(storageData.map(el => el.id).indexOf(productId),1)
    }
    
    
    

    if(!storageData.length){
        localStorage.removeItem(storageName);
        return;
    }

    localStorage.setItem(storageName,JSON.stringify(storageData))
}

export const amountCostCart = (storageName) => {
    let storageData = JSON.parse(localStorage.getItem(storageName));

    return storageData
        .map(el => +el.price)
        .reduce((total,price) => total += price)

}