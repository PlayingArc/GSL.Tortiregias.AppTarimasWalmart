import React from "react";
import { Card, Button, Typography, Space, Empty } from "antd";
import { PrinterOutlined, TagOutlined } from "@ant-design/icons";
import Barcode from "react-barcode";

const { Title } = Typography;

const PalletLabel = ({ pallet, orderData, size = "medium" }) => {
    const handlePrint = () => {
        window.print();
    };

    if (!pallet) {
        return (
            <Card
                title={
                    <Space>
                        <TagOutlined />
                        <Title level={3} style={{ margin: 0 }}>
                            Etiqueta
                        </Title>
                    </Space>
                }
                style={{ height: "fit-content" }}
            >
                <Empty
                    description="Selecciona una tarima para ver su etiqueta"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            </Card>
        );
    }

    // Label size presets
    const sizePresets = {
        small: { width: 300, barcodeHeight: 40 },
        medium: { width: 400, barcodeHeight: 60 },
        large: { width: 500, barcodeHeight: 80 },
    };

    const { width, barcodeHeight } = sizePresets[size] || sizePresets.medium;

    // Sanitize helper to ensure pasted input reflects correctly (trim spaces, coerce to string)
    const sanitize = (v) => String(v ?? "").trim();

    // Group items by UPC to show total quantity per product
    const groupedItems = pallet.items.reduce((acc, item) => {
        const upc = sanitize(item.upc);
        if (!acc[upc]) {
            acc[upc] = { product: item.product, upc, quantity: 0 };
        }
        acc[upc].quantity += Number(item.quantity) || 0;
        return acc;
    }, {});

    // Calculate total cajas directly from items
    const totalCajas = pallet.items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

    return (
        <Card
            title={
                <Space>
                    <TagOutlined />
                    <Title level={3} style={{ margin: 0 }}>
                        Etiqueta
                    </Title>
                </Space>
            }
            style={{ height: "fit-content" }}
        >
            <div
                id="printable-label"
                style={{ display: "flex", justifyContent: "center" }}
            >
                <div
                    style={{
                        border: "1px solid black",
                        padding: 20,
                        width: `${width}px`,
                        textAlign: "center",
                    }}
                >
                    {/* CEDIS */}
                    <div style={{ marginBottom: 20 }}>
                        <div style={{ textAlign: "left", fontWeight: "bold" }}>CEDIS</div>
                        <Barcode value={sanitize(orderData.cedis || "0000")} height={barcodeHeight} />
                    </div>

                    {/* OC */}
                    <div style={{ marginBottom: 20 }}>
                        <div style={{ textAlign: "left", fontWeight: "bold" }}>OC</div>
                        <Barcode
                            value={sanitize(orderData.orderNumber || "000000")}
                            height={barcodeHeight}
                        />
                    </div>

                    {/* UPCs with quantities */}
                    <div style={{ marginBottom: 20 }}>
                        <div style={{ textAlign: "left", fontWeight: "bold" }}>UPC</div>
                        {Object.values(groupedItems).map((item) => (
                            <div
                                key={item.upc}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: 8,
                                }}
                            >
                                <Barcode value={sanitize(item.upc)} height={barcodeHeight} />
                                <Barcode value={String(item.quantity)} height={barcodeHeight} />
                                <span
                                    style={{
                                        fontWeight: "bold",
                                        marginLeft: 10,
                                        fontSize: "1.2em",
                                    }}
                                >
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* NUMERO TOTAL DE CAJAS + CONSECUTIVO TARIMA */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: 30,
                        }}
                    >
                        <div style={{ textAlign: "center" }}>
                            <Barcode
                                value={String(totalCajas || 0)}
                                height={barcodeHeight}
                            />
                            <div style={{ fontWeight: "bold", marginTop: 5 }}>
                                NUMERO TOTAL DE CAJAS
                            </div>
                        </div>

                        <div style={{ textAlign: "center" }}>
                            <Barcode value={String(pallet.consecutivo)} height={barcodeHeight} />
                            <div style={{ fontWeight: "bold", marginTop: 5 }}>
                                CONSECUTIVO TARIMA
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Button
                type="primary"
                icon={<PrinterOutlined />}
                onClick={handlePrint}
                size="large"
                block
            >
                Imprimir Etiqueta
            </Button>
        </Card>
    );
};

export default PalletLabel;