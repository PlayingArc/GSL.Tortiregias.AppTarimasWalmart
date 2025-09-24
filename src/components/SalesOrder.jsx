// components/SalesOrder.jsx
import React, { useState } from "react";
import {
    Card,
    Form,
    Input,
    Select,
    DatePicker,
    InputNumber,
    Button,
    Typography,
    List,
    Tag,
    Space,
} from "antd";
import { PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

const SalesOrder = ({ orderData, setOrderData, onAddItem }) => {
    const [form] = Form.useForm();

    const availableProducts = [
        "Tortilla Blanca",
        "Tortilla Amarilla",
        "Tortilla Roja",
        "Tortilla Azul",
        "Tostada Blanca",
        "Tostada Amarilla",
        "Totopos",
    ];

    const productUPCs = {
        "Tortilla Blanca": "17503022581002",
        "Tortilla Amarilla": "17503022581019",
        "Tortilla Azul": "17503022581118",
        "Tostada Blanca": "17503022581095",
        "Tostada Amarilla": "17503022581125",
        "Totopos": "17503022581101"
    };

    const handleAddItem = (values) => {
        if (values.product && values.quantity) {
            onAddItem({
                product: values.product,
                quantity: values.quantity,
                upc: productUPCs[values.product] || "0000000000000", // attach UPC
            });
            form.resetFields(["product", "quantity"]);
        }
    };

    return (
        <Card
            title={
                <Space>
                    <ShoppingCartOutlined />
                    <Title level={3} style={{ margin: 0 }}>
                        Pedido
                    </Title>
                </Space>
            }
            style={{ height: "fit-content" }}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleAddItem}
                initialValues={{ quantity: 1 }}
            >
                <Form.Item label="Orden de Compra" name="orderNumber">
                    <Input
                        placeholder="1001"
                        value={orderData.orderNumber}
                        onChange={(e) =>
                            setOrderData((prev) => ({
                                ...prev,
                                orderNumber: e.target.value,
                            }))
                        }
                    />
                </Form.Item>

                {/* Replace Cliente with CEDIS */}
                <Form.Item label="CEDIS" name="cedis">
                    <Input
                        placeholder="7490"
                        value={orderData.cedis}
                        onChange={(e) =>
                            setOrderData((prev) => ({
                                ...prev,
                                cedis: e.target.value,
                            }))
                        }
                    />
                </Form.Item>

                <Form.Item
                    label="Producto"
                    name="product"
                    rules={[{ required: true, message: "Por favor, selecciona un producto" }]}
                >
                    <Select placeholder="Selecciona un producto...">
                        {availableProducts.map((product) => (
                            <Option key={product} value={product}>
                                {product}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Cantidad"
                    name="quantity"
                    rules={[{ required: true, message: "Por favor, ingresa la cantidad" }]}
                >
                    <InputNumber min={1} style={{ width: "100%" }} placeholder="1" />
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                    icon={<PlusOutlined />}
                    block
                >
                    Agregar item
                </Button>
            </Form>

            {orderData.items.length > 0 && (
                <div style={{ marginTop: 24 }}>
                    <Title level={4}>Orden de Compra</Title>
                    <List
                        dataSource={orderData.items}
                        renderItem={(item) => (
                            <List.Item>
                                <Space
                                    style={{ width: "100%", justifyContent: "space-between" }}
                                >
                                    <Text>
                                        {item.product} <small>({item.upc})</small>
                                    </Text>
                                    <Tag color="blue">{item.quantity}</Tag>
                                </Space>
                            </List.Item>
                        )}
                    />
                </div>
            )}
        </Card>
    );
};

export default SalesOrder;