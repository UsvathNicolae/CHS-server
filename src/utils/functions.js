const convertBufferToString = (value) => {
    return Buffer.from(value).toString();
};

const formatDate = (date) => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '.' + mm + '.' + yyyy;
};

const formatDateAndTime = (date) => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();

    let hrs = date.getHours();
    let mins = date.getMinutes();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    if (hrs < 10) hrs = '0' + hrs;
    if (mins < 10) mins = '0' + mins;

    return dd + '.' + mm + '.' + yyyy + ' ' + hrs + ':' + mins;
};

const listReturnsHandlebar = (items) => {
    let itemsAsHtml = items?.map(
        (item) =>
            `<div class='row'>
    <div class='col-3 border text-left'>
        <p class='no-spacing'>${item.providerName}</p>
    </div>
    <div class='col-2 border text-center'>
        <p class='no-spacing'>${item.docNumber}</p>
    </div>
    <div class='col-1 border text-right'>
        <p class='no-spacing'>${item.amount}</p>
    </div>
    <div class='col-2 border text-center'>
        <p class='no-spacing'>RON</p>
    </div>
    <div class='col-4 border text-left'>
        <p class='no-spacing'></p>
    </div>
</div>`,
   );

    let emptySpaces = [];

    if (items.length < 10)
        for (let i = 0; i < 18 - items.length; i++) {
            emptySpaces.push(`<div class='row'>
    <div class='col-3 border text-left'>
        <p class='p-1'></p>
    </div>
    <div class='col-2 border text-center'>
        <p class='p-1'></p>
    </div>
    <div class='col-1 border text-right'>
        <p class='p-1'></p>
    </div>
    <div class='col-2 border text-center'>
        <p class='p-1'></p>
    </div>
    <div class='col-4 border text-left'>
        <p class='p-1'></p>
    </div>
</div>`);
        }
    itemsAsHtml = [...itemsAsHtml, ...emptySpaces];

    return itemsAsHtml.join('');
};

module.exports = {
    convertBufferToString,
    formatDate,
    formatDateAndTime,
    listReturnsHandlebar,
};
