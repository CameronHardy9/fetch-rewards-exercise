async function apiHandler(method, body) {
    try {
        console.log(JSON.stringify(body));
        const response = await fetch('https://frontend-take-home.fetchrewards.com/form', {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            method: method,
            body: JSON.stringify(body)
        });
    
        const data = await response.json();
        return data
    }
    catch(e){
        console.error(e);
    }
};

export default apiHandler;