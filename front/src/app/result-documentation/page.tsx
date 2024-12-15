"use client";
import Spacer from "@/components/Universal/Spacer/Spacer";
import Page from "@/components/Page/Page";
import "./result-documentation.css";
import React from "react";
import { Button, Result } from "antd";

export default function DocumentationResult() {
    return (
        <Page className="result-documentation-page">
            <Spacer space={40} />

            {/* Контейнер для Result */}
            <div className="result-container">
                <Result
                    status="success"
                    title="Новая документация добавлена"
                    subTitle="Вы можете вернуться к списку или добавить новую документацию"
                    extra={[
                        <Button type="primary" key="back" style={{ marginRight: "10px" }}>
                            Назад к списку
                        </Button>,
                        <Button key="add-new">Добавить новую</Button>,
                    ]}
                />
            </div>
        </Page>
    );
}