// components/PalletsList.jsx
import React from 'react';
import { Card, Button, Typography, Space } from 'antd';
import { PlusOutlined, InboxOutlined } from '@ant-design/icons';
import PalletCard from './PalletCard';

const { Title } = Typography;

const PalletsList = ({ pallets, onCreatePallet, onSelectPallet }) => {
    return (
        <Card
            title={
                <Space>
                    <InboxOutlined />
                    <Title level={3} style={{ margin: 0 }}>Tarimas</Title>
                </Space>
            }
            style={{ height: 'fit-content' }}
        >
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
                {pallets.map(pallet => (
                    <PalletCard
                        key={pallet.id}
                        pallet={pallet}
                        onSelect={() => onSelectPallet(pallet)}
                    />
                ))}

                <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={onCreatePallet}
                    block
                    size="large"
                >
                    Agregar tarima
                </Button>
            </Space>
        </Card>
    );
};

export default PalletsList;