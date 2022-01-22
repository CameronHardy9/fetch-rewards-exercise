async function apiHandler(method) {
    try {
        const response = await fetch('https://frontend-take-home.fetchrewards.com/form', {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            method: method
        });
    
        const data = await response.json();
        return data
    }
    catch(e){
        console.error(e);
    }
};

export default apiHandler;