$(document).ready(function () {
    function colorChange(color) {
        addSelectedClass(color, '.container__informations__color-change-info button');
        location.reload();
    }

    function pocketChange(size) {
        addSelectedClass(size, '.container__informations__size-info button');
        location.reload();
    }

    function addToCart(title, price, color, size) {
        console.log(`Added to cart: ${title} for ${price}$ in configuration [${color}, ${size}]`);
    }

    function fetchData() {
        // like in my project in react, if URL with different kind of variations of product occured,
        // I would do something like this:
        


        //  const selectedColor = localStorage.getItem('.container__informations__color-change-info button') || 'navy';
        //  const selectedSize = localStorage.getItem('.container__informations__size-info button') || 'medium';

        //  let fetchUrl = 'https://fakestoreapi.com/products'
        //  if (selectedColor || selectedSize){
        //         fetchUrl += `/${selectedSize}/${selectedColor}`
        //  }


        $.ajax({
            url: 'https://fakestoreapi.com/products', // and there would be:   url: fetchUrl,
            method: 'GET',
            success: function (data) {
                const firstProduct = data[0];
                $('.container__image img').attr('src', firstProduct.image);
                $('.container__informations .container__informations__description p:nth-child(1)').text(firstProduct.category);
                $('.container__informations .container__informations__description p:nth-child(2)').text(firstProduct.title);
                $('.container__informations .container__informations__description p:nth-child(3)').text(firstProduct.description);
                $('.container__informations .container__informations__cart-details p:nth-child(1)').text(`${firstProduct.price}$`);
            },
            error: function (error) {
                console.error('Error fetching data:', error);
            }
        });
    }
    

    function addSelectedClass(selectedItem, selector) {
        $(selector).removeClass('selected');
        $(`${selector}[id='${selectedItem}']`).addClass('selected');
        localStorage.setItem(selector, selectedItem);
    }

    fetchData();

    const defaultColor = localStorage.getItem('.container__informations__color-change-info button') || 'navy';
    const defaultSize = localStorage.getItem('.container__informations__size-info button') || 'medium';

    addSelectedClass(defaultColor, '.container__informations__color-change-info button');
    addSelectedClass(defaultSize, '.container__informations__size-info button');

    const storedColor = localStorage.getItem('.container__informations__color-change-info button');
    if (storedColor) {
        addSelectedClass(storedColor, '.container__informations__color-change-info button');
    }

    const storedSize = localStorage.getItem('.container__informations__size-info button');
    if (storedSize) {
        addSelectedClass(storedSize, '.container__informations__size-info button');
    }

    $('#navy').click(() => colorChange('navy'));
    $('#red').click(() => colorChange('red'));
    $('#green').click(() => colorChange('green'));

    $('#small').click(() => pocketChange('small'));
    $('#medium').click(() => pocketChange('medium'));
    $('#large').click(() => pocketChange('large'));

    $('#add-to-cart').click(() => {
        const title = $('.container__informations .container__informations__description p:nth-child(2)').text();
        const price = parseFloat($('.container__informations__cart-details p').text());
        const selectedColor = $('.container__informations__color-change-info button.selected').attr('id');
        const selectedSize = $('.container__informations__size-info button.selected').attr('id');
        if (!title || !price || !selectedColor || !selectedSize){
            return;
        }else {
            addToCart(title, price, selectedColor, selectedSize);
        }
    });
});
