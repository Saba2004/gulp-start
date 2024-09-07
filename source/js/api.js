export const fetchParams =  async (url) => {
    const response = await fetch(url);
    if(response.ok){
        const data = response.json();
        return data;
    } else {
        throw new Error(`${response.status}: ${response.statusText}`)
    }
}