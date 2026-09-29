import React, { useLayoutEffect, useRef, useState } from "react";
import { Card, Button, Typography, Space, Empty } from "antd";
import { PrinterOutlined, TagOutlined } from "@ant-design/icons";
import Barcode from "react-barcode";

const { Title } = Typography;

const LABEL_WIDTH = 400;
const BARCODE_HEIGHT = 60;

// Shrinks the fixed-width label to fit narrow screens; print always uses full size (App.css)
const useFitScale = (width) => {
    const ref = useRef(null);
    const [scale, setScale] = useState(1);

    useLayoutEffect(() => {
        const node = ref.current;
        if (!node) return;
        const observer = new ResizeObserver(([entry]) => {
            setScale(Math.min(1, entry.contentRect.width / width));
        });
        observer.observe(node);
        return () => observer.disconnect();
    });

    return [ref, scale];
};

const PalletLabel = ({ pallet, orderData }) => {
    const [fitRef, scale] = useFitScale(LABEL_WIDTH);

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
                ref={fitRef}
                style={{ display: "flex", justifyContent: "center" }}
            >
                <div
                    className="label-sheet"
                    style={{
                        border: "1px solid black",
                        padding: 20,
                        width: LABEL_WIDTH,
                        textAlign: "center",
                        zoom: scale,
                    }}
                >
                    {/* CEDIS */}
                    <div style={{ marginBottom: 20 }}>
                        <div style={{ textAlign: "left", fontWeight: "bold" }}>CEDIS</div>
                        <Barcode value={sanitize(orderData.cedis || "0000")} height={BARCODE_HEIGHT} />
                    </div>

                    {/* OC */}
                    <div style={{ marginBottom: 20 }}>
                        <div style={{ textAlign: "left", fontWeight: "bold" }}>OC</div>
                        <Barcode
                            value={sanitize(orderData.orderNumber || "000000")}
                            height={BARCODE_HEIGHT}
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
                                <Barcode value={sanitize(item.upc)} height={BARCODE_HEIGHT} />
                                <Barcode value={String(item.quantity)} height={BARCODE_HEIGHT} />
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
                                height={BARCODE_HEIGHT}
                            />
                            <div style={{ fontWeight: "bold", marginTop: 5 }}>
                                NUMERO TOTAL DE CAJAS
                            </div>
                        </div>

                        <div style={{ textAlign: "center" }}>
                            <Barcode value={String(pallet.consecutivo)} height={BARCODE_HEIGHT} />
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