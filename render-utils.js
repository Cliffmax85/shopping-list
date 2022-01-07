export function renderItem(item) {
    const itemDiv = document.createElement('div');
    const itemP = document.createElement('p');

    if (item.bought) {
        itemDiv.classList.add('bought', 'item');

    } else {
        itemDiv.classList.add('unbought', 'item');
    }

    itemP.textContent = `${item.item} ${item.quantity}`;

    itemDiv.append(itemP);
    
    return itemDiv;
}