// components/DraggableItem.jsx
import React from 'react';
import { useDraggable} from '@dnd-kit/core';
import { Card, Typography, Tag } from 'antd';

const { Text } = Typography;

const DraggableItem = ({ item, onItemClick, isDragging = false, dragMode = null, showQuantity = null }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
    } = useDraggable({
        id: `item-${item.id}`,
        data: item,
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 1000,
    } : undefined;

    const getItemIcon = (product) => {
        return product.toLowerCase().includes('tortilla') ? '🫓' : '🌮';
    };

    const handleMouseDown = (e) => {
        const mode = e.button === 2 ? 'one' : 'all'; // Right click = 2, Left click = 0
        if (onItemClick) {
            onItemClick(item, mode);
        }
        listeners?.onMouseDown?.(e);
    };

    // Touch has no right click, so a touch drag always moves the whole stack
    const handleTouchStart = (e) => {
        if (onItemClick) {
            onItemClick(item, 'all');
        }
        listeners?.onTouchStart?.(e);
    };

    const handleContextMenu = (e) => {
        e.preventDefault(); // Prevent right-click menu
    };

    const displayQuantity = showQuantity !== null ? showQuantity : item.quantity;
    const isPartialDrag = showQuantity !== null && showQuantity < item.quantity;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onContextMenu={handleContextMenu}
        >
            <Card
                size="small"
                hoverable
                className={`inventory-item ${isDragging ? 'dragging' : ''}`}
                style={{
                    cursor: isDragging ? 'grabbing' : 'grab',
                    opacity: isDragging ? 0.8 : 1,
                    margin: '4px',
                    minHeight: '90px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: isPartialDrag ? '2px solid #faad14' : '1px solid #d9d9d9',
                    backgroundColor: isPartialDrag ? '#fff7e6' : 'white'
                }}
            >
                <div style={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    <div style={{ fontSize: '28px' }}>
                        {getItemIcon(item.product)}
                    </div>
                    <Text style={{
                        fontSize: '11px',
                        textAlign: 'center',
                        lineHeight: '1.2',
                        fontWeight: '500'
                    }}>
                        {item.product}
                    </Text>
                    <Tag
                        size="small"
                        color={displayQuantity === item.quantity ? "blue" : "orange"}
                        style={{ margin: 0 }}
                    >
                        {displayQuantity}
                        {isPartialDrag && (
                            <span style={{ opacity: 0.6 }}>/{item.quantity}</span>
                        )}
                    </Tag>
                    {isDragging && (
                        <Text
                            type="secondary"
                            style={{ fontSize: '10px', fontWeight: 'bold' }}
                        >
                            {dragMode === 'all' ? 'ALL' : 'ONE'}
                        </Text>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default DraggableItem;