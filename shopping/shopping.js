import { 
    checkAuth,
    logout,
    createItem,
    deleteAllItems,
    getItems,
    buyItem
     
} from '../fetch-utils.js';
import { renderItem } from '../render-utils.js';

checkAuth();

const itemFrom = document.querySelector('.shopping-form');
const deleteButton = document.querySelector('.delete-button');
const itemsEl = document.querySelector('.lists');

console.log(itemsEl);
const logoutButton = document.getElementById('logout');

itemFrom.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(itemFrom);
    const item = data.get('item');
    const quantity = data.get('quantity');
    console.log(createItem);

    await createItem(item, quantity);
    displayItems();
    itemFrom.reset();


});

async function displayItems() {
    const list = await getItems();
    //console.log(typeof list);

    itemsEl.textContent = '';

    for (let item of list) { 
        const itemEl = renderItem(item);
        itemEl.addEventListener('click', async() => {
            await buyItem(item.id);
            displayItems();
        });
        itemsEl.append(itemEl);

    }
    

}

window.addEventListener('load', async() => {
    await displayItems();
});



logoutButton.addEventListener('click', () => {
    logout();
});

deleteButton.addEventListener('click', async() => {
    await deleteAllItems();
    displayItems();
});