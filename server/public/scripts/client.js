$(document).ready(onReady);

function onReady() {
    console.log('jq and js loaded');
    getAllShoes();
    //click listener for update buttons
    $('#shoesTableBody').on('click', '.updatePrice', updatePrice);
};

function getAllShoes() {
    //display shoes on dom; append to <table>
    $('#shoesTableBody').empty();
    $.ajax({
        method: 'GET', 
        url: '/shoes'
    }).then(function(response) {
        response.forEach(shoe => {
            $('#shoesTableBody').append(`
            <tr>
                <td>${shoe.name}</td>
                <td><input value=${shoe.cost}></input></td>
                <td><button class="updatePrice" data-id="${shoe.id}">Update Price</button></td>
            </tr>
            `)
        });
    });
};

function updatePrice() {
    //target THIS row.  -> .data().id is corresponding to html data-id="${shoe.id}"
    const shoeId = $(this).data().id;
    console.log(shoeId);
    const newPrice = $(this).parent().prev().children('input').val();
    console.log(newPrice);

    $.ajax({
        method: 'PUT',
        url: '/shoes',
        data: {
            //these key names are purposely named differently to demonstrate they don't have to be the same as the table
            theId: shoeId, 
            price: newPrice,
        }
    }).then(getAllShoes());

};