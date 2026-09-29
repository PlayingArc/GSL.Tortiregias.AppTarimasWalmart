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
