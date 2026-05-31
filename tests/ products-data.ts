type Product = {
    name: string;
    price: number;
    inStock: boolean;
};
const product1: Product = {
    name: "Pen",
    price: 4.99,
    inStock: true,
};
const product2: Product = {
    name: "Pencil",
    price: 2.99,
    inStock: true,
};
function formatPrice(price: number): string {
    return `$${price}`;
}

console.log(formatPrice(product1.price));
console.log(formatPrice(product2.price));