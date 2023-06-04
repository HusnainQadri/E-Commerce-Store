//write a function to fetch the products from the api 'https://fakestoreapi.com/products' and return the data

const API_URL="http://localhost:3000/api"
const getToken = () => {
    return localStorage.getItem('token');
  };
export const  fetchAllProducts = async () => {
    const response = await fetch(`${API_URL}/products`,
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        }
    }
    );
    const data = await response.json();
    console.log(data)
    return data;
}
export const fetchCategories = async () => {
    const response = await fetch(`${API_URL}/products/categories/all`,
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        }
    });
    const data = await response.json();
    console.log(data)
    return data;
}
export const getProductsByCategory = async (category) => {
    const response = await fetch(`${API_URL}/products/categories/${category}`,
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        }
    });
    const data = await response.json();
    return data;
}
export const getProductById = async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`,
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        }
    });
    const data = await response.json();
    return data;
}


export const signin_helper = async (username, password) => {

    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    return data;
}

export const signup_helper = async (username, password,email) => {
        console.log("here is the signin")
        const response = await fetch(`${API_URL}/login/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify({ username,email,password })
        });
        const data = await response.json();
        return data;
    }

export const addToCart_helper =async (user_id, date,products) => {
    const response = await fetch(`${API_URL}/shoppingcart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,

        },
        body: JSON.stringify({ user_id, date,products })
    });
    const data = await response.json();
    return data;
}


