// components/PalletCard.jsx
import React from 'react';
import DraggableItem from './DraggableItem';
import { useDroppable } from '@dnd-kit/core';
import { Card, Typography, Space, Tag, List } from 'antd';
import { BoxPlotOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const PalletCard = ({ pallet, onSelect }) => {
    const { isOver, setNodeRef } = useDroppable({
        id: `pallet-${pallet.id}`,
    });

    const getItemIcon = (product) => {
        return product.toLowerCase().includes('tortilla') ? '🫓' : '🌮';
    };

    return (
        <div ref={setNodeRef}>
            <Card
                size="small"
                hoverable
                onClick={onSelect}
                style={{
                    cursor: 'pointer',
                    backgroundColor: isOver ? '#e6f7ff' : 'white',
                    border: isOver ? '2px dashed #1890ff' : '1px solid #d9d9d9',
                }}
            >
                <Space direction="vertical" style={{ width: '100%' }} size="small">
                    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                        <Space>
                            <BoxPlotOutlined />
                            <Title level={5} style={{ margin: 0 }}>{pallet.name}</Title>
                        </Space>
                        <Tag color="geekblue">{pallet.items.length} items</Tag>
                    </Space>

                    {pallet.items.length > 0 && (
                        <List
                            size="small"
                            dataSource={pallet.items}
                            renderItem={(item, index) => (
                                <List.Item style={{ padding: '4px 0' }}>
                                    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                                        <Space>
                                            <span>{getItemIcon(item.product)}</span>
                                            <Text>{item.product}</Text>
                                        </Space>
                                        <Tag>{item.quantity}</Tag>
                                    </Space>
                                </List.Item>
                            )}
                        />
                    )}

                    {isOver && (
                        <div style={{
                            textAlign: 'center',
                            color: '#1890ff',
                            fontWeight: 'bold',
                            padding: '8px'
                        }}>
                            Drop item here
                        </div>
                    )}
                </Space>
            </Card>
        </div>
    );
};

export default PalletCard;