export function dtoProducts(arrayProducts) {

    let arrayProductsDto = [];

    arrayProducts.forEach(product => {

        let productDto = {

            id: product._id,

            title: product.title,

            description: product.description,

            price: calculoPrice(product.price, product.discountPercentage),

            discountPercentage: product.discountPercentage,

            discount: calculoDiscount(product.price, product.discountPercentage),

            thumbnail: product.thumbnail,

        };

        arrayProductsDto.push(productDto);

    });

    return arrayProductsDto;

};

function calculoPrice(price, discountPercentage) {

    return (price - (price * discountPercentage / 100)).toFixed(2);

};

function calculoDiscount(price, discountPercentage) {

    return (price * discountPercentage / 100).toFixed(2);

};