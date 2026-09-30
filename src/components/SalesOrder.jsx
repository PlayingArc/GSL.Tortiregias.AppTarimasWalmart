// components/SalesOrder.jsx
import React from "react";
import {
    Card,
    Form,
    Input,
    Select,
    InputNumber,
    Button,
    Typography,
    List,
    Tag,
    Space,
} from "antd";
import { PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { availableProducts, productUPCs, cedisPlaceholder } from "../catalog";

const { Title, Text } = Typography;
const { Option } = Select;

const SalesOrder = ({ orderData, setOrderData, onAddItem }) => {
    const [form] = Form.useForm();

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
                initialValues={{
                    orderNumber: orderData.orderNumber,
                    cedis: orderData.cedis,
                    quantity: 1,
                }}
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

                <Form.Item label="CEDIS" name="cedis">
                    <Input
                        placeholder={cedisPlaceholder}
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