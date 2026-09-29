// components/DemoBanner.jsx
import React from 'react';

const DemoBanner = () => (
    <div className="demo-banner">
        <div>
            <strong>Demo con datos de ejemplo</strong> · <a href="/">← gsanchez.me</a>
        </div>
        <div className="demo-banner-note">
            Captura un pedido, reparte sus cajas en tarimas y genera la etiqueta logística de cada una.
        </div>
    </div>
);

export default DemoBanner;
