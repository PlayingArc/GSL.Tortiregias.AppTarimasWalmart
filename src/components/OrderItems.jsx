// components/OrderItems.jsx
import React from 'react';
import {
    Card,
    Typography,
    Space,
    Empty,
    Alert
} from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { useDroppable} from '@dnd-kit/core';
import DraggableItem from './DraggableItem';

const { Title } = Typography;

const OrderItems = ({ items, onItemClick }) => {
    if (items.length === 0) {
        return (
            <Card
                title={
                    <Space>
                        <AppstoreOutlined />
                        <Title level={3} style={{ margin: 0 }}>Inventario</Title>
                    </Space>
                }
                style={{ height: 'fit-content' }}
            >
                <Empty
                    description="Agrega items para ver el inventario"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            </Card>
        );
    }

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <Card
            title={
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Space>
                        <AppstoreOutlined />
                        <Title level={3} style={{ margin: 0 }}>Inventario</Title>
                    </Space>
                    <Typography.Text type="secondary">
                        {totalItems} cajas
                    </Typography.Text>
                </Space>
            }
            style={{ height: 'fit-content' }}
        >
            <div className="inventory-grid">
                {items.map((item) => (
                    <DraggableItem
                        key={item.id}
                        item={item}
                        onItemClick={onItemClick}
                    />
                ))}
            </div>
        </Card>
    );
};

export default OrderItems;