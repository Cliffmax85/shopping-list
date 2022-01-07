
const SUPABASE_URL = 'https://rfwnchvtfqbachqhdfbi.supabase.co';


const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTUwODU3MCwiZXhwIjoxOTU1MDg0NTcwfQ.b9_dCGIQkWfhzS3QZihLzQkD3n-sAt3L9swaEU7JzqI';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createItem(item, quantity){
    const response = await client 
        .from('shopping')
        .insert([{ item, quantity }]);
    return checkError(response);
} 

export async function deleteAllItems() {
    const response = await client
        .from('shopping')
        .delete();
    return checkError(response);
}

export async function getItems() {
    const response = await client
        .from('shopping')
        .select();
    return checkError(response);

}

export async function buyItem(id) {
    const response = await client 
        .from('shopping')
        .update({ bought: true })
        .match(({ id: id }));
    return checkError(response);
}

export async function getUser() {
    return client.auth.session();
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./shopping');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
