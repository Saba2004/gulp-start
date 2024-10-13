export const fetchParams =  async (url) => {
    const response = await fetch(url);
    if(response.ok){
        const data = response.json();
        return data;
    } else {
        throw new Error(`${response.status}: ${response.statusText}`)
    }
};


export const createOrder = async (url,data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return await response.json()
}