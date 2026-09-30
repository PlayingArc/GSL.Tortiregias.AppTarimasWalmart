// catalog.js
// The default build carries the real GTINs; `vite build --mode demo` swaps in sample data.
export const isDemo = import.meta.env.VITE_DEMO === 'true';

const realUPCs = {
    "Tortilla Blanca": "17503022581002",
    "Tortilla Amarilla": "17503022581019",
    "Tortilla Azul": "17503022581118",
    "Tostada Blanca": "17503022581095",
    "Tostada Amarilla": "17503022581125",
    "Totopos": "17503022581101"
};

// GS1 restricted-circulation (02…) GTINs with valid check digits: never a real product.
const demoUPCs = {
    "Tortilla Blanca": "02000001000014",
    "Tortilla Amarilla": "02000001000021",
    "Tortilla Roja": "02000001000038",
    "Tortilla Azul": "02000001000045",
    "Tostada Blanca": "02000001000052",
    "Tostada Amarilla": "02000001000069",
    "Totopos": "02000001000076"
};

export const availableProducts = [
    "Tortilla Blanca",
    "Tortilla Amarilla",
    "Tortilla Roja",
    "Tortilla Azul",
    "Tostada Blanca",
    "Tostada Amarilla",
    "Totopos",
];

export const productUPCs = isDemo ? demoUPCs : realUPCs;

export const cedisPlaceholder = isDemo ? "1234" : "7490";

// The demo opens mid-order: boxes still to place and one pallet already labelled.
const demoItem = (id, product, quantity) => ({ id, product, quantity, upc: demoUPCs[product] });

export const initialOrder = isDemo
    ? {
        orderNumber: "4500012345",
        cedis: "1234",
        items: [
            demoItem(1, "Tortilla Blanca", 24),
            demoItem(2, "Tortilla Amarilla", 16),
            demoItem(3, "Tostada Blanca", 12),
            demoItem(4, "Totopos", 8),
        ],
    }
    : { orderNumber: "", cedis: "", items: [] };

export const initialPallets = isDemo
    ? [{
        id: 1,
        consecutivo: 1,
        name: "Tarima 1",
        items: [
            demoItem(5, "Tortilla Blanca", 30),
            demoItem(6, "Tortilla Azul", 12),
        ],
    }]
    : [];
