async function apiHandler(method, body) {
    try {
        const response = await fetch('https://frontend-take-home.fetchrewards.com/form', {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            method: method,
            body: JSON.stringify(body)
        });
        
        if (method === "POST") {
            return response;
        }
        
        const data = await response.json();
        return data
    }
    catch(e){
        console.error(e);
    }
};

export default apiHandler;