export const getFetchData = async (apiURL: string, options={}) => {
    const response = await fetch(apiURL, options);
    if (!response.ok) {
        throw new Error(`Failed to fetch....`);
    }
    const data = await response.json();
    return data;
};
