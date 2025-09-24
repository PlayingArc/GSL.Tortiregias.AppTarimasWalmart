// App.jsx
import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import SalesOrder from './components/SalesOrder';
import OrderItems from './components/OrderItems';
import PalletsList from './components/PalletsList';
import PalletLabel from './components/PalletLabel';
import DraggableItem from './components/DraggableItem';
import 'antd/dist/reset.css';
import './App.css';

function App() {
    const [orderData, setOrderData] = useState({
        orderNumber: '',
        customer: '',
        date: '',
        items: []
    });
    const [pallets, setPallets] = useState([]);
    const [selectedPallet, setSelectedPallet] = useState(null);
    const [activeItem, setActiveItem] = useState(null);
    const [dragContext, setDragContext] = useState(null); // 'all' or 'one'

    const addItemToOrder = (item) => {
        setOrderData(prev => ({
            ...prev,
            items: [...prev.items, { ...item, id: Date.now() }]
        }));
    };

    const createPallet = () => {
        const newPallet = {
            id: Date.now(),
            consecutivo: pallets.length + 1,
            name: `Tarima ${pallets.length + 1}`,
            items: []
        };
        setPallets([...pallets, newPallet]);
        setSelectedPallet(newPallet);
    };

    const removeItemFromInventory = (itemId, quantityToRemove) => {
        setOrderData(prev => ({
            ...prev,
            items: prev.items.map(item => {
                if (item.id === itemId) {
                    const newQuantity = item.quantity - quantityToRemove;
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
                }
                return item;
            }).filter(Boolean) // Remove null items (quantity reached 0)
        }));
    };

    const addItemToPallet = (palletId, item, quantityToAdd) => {
        setPallets(prev => prev.map(pallet =>
            pallet.id === palletId
                ? {
                    ...pallet,
                    items: [...pallet.items, { ...item, quantity: quantityToAdd, id: Date.now() }]
                }
                : pallet
        ));
    };

    const handleItemClick = (item, clickType) => {
        setDragContext(clickType); // 'all' or 'one'
    };

    const handleDragStart = (event) => {
        setActiveItem(event.active.data.current);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (over && over.id.toString().startsWith('pallet-')) {
            const palletId = parseInt(over.id.toString().replace('pallet-', ''));
            const item = active.data.current;

            if (item && dragContext) {
                const quantityToMove = dragContext === 'all' ? item.quantity : 1;

                // Add to pallet
                addItemToPallet(palletId, item, quantityToMove);

                // Remove from inventory
                removeItemFromInventory(item.id, quantityToMove);
            }
        }

        setActiveItem(null);
        setDragContext(null);
    };

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div style={{
                minHeight: '100vh',
                background: '#f5f5f5',
                padding: '24px'
            }}>
                <div style={{
                    maxWidth: '1800px',
                    margin: '0 auto'
                }}>
                    <Row gutter={[16, 24]}>
                        <Col xs={24} xl={5}>
                            <SalesOrder
                                orderData={orderData}
                                setOrderData={setOrderData}
                                onAddItem={addItemToOrder}
                            />
                        </Col>

                        <Col xs={24} xl={5}>
                            <OrderItems
                                items={orderData.items}
                                onItemClick={handleItemClick}
                            />
                        </Col>

                        <Col xs={24} xl={5}>
                            <PalletsList
                                pallets={pallets}
                                onCreatePallet={createPallet}
                                onSelectPallet={setSelectedPallet}
                            />
                        </Col>

                        <Col xs={24} xl={9}>
                            <PalletLabel
                                pallet={selectedPallet}
                                orderData={orderData}
                            />
                        </Col>
                    </Row>
                </div>
            </div>

            <DragOverlay>
                {activeItem && (
                    <DraggableItem
                        item={activeItem}
                        isDragging
                        showQuantity={dragContext === 'all' ? activeItem.quantity : 1}
                    />
                )}
            </DragOverlay>
        </DndContext>
    );
}

export default App;