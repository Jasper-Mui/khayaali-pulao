/* eslint-disable no-template-curly-in-string */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { Layout, Typography, Form, Input, Button, Select, Alert } from "antd";
import randomColor from "../../utils/randomColor";

import "./post.css";
// import { useHistory } from "react-router-dom";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: "${label} is required!",
    types: {
        email: "${label} is not validate email!",
    },
};

const Post = () => {
    const [err, setErr] = useState();
    const [success, setSuccess] = useState();
    const [loading, setLoading] = useState(false);
    // const history = useHistory();

    const onFinish = (values) => {
        setLoading(true);
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            responseType: "json",
            body: JSON.stringify(values.postAKhayaal),
        };
        fetch(
            "https://glacial-waters-08199.herokuapp.com/khayaal/addKhayaal",
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => setSuccess(data))
            .then(() => setLoading(false))
            // .then(() => history.push("/"))
            .catch((error) => setErr(error) && setLoading(false));
        console.log(values.postAKhayaal);
    };

    return (
        <Layout className="post-body" style={{ background: "inherit" }}>
            <Typography.Title style={{ color: randomColor() }}>
                Post a Khayaal!
            </Typography.Title>
            <Form
                className="post-form"
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
            >
                <Form.Item name={["postAKhayaal", "name"]} label="Name">
                    <Input placeholder="It won't be visible to audience, it is your khayaal your choice :')" />
                </Form.Item>
                <Form.Item
                    name={["postAKhayaal", "email"]}
                    label="Email"
                    rules={[{ type: "email" }]}
                >
                    <Input placeholder="It won't be visible to audience, just to let you know, when you khayaal is loved by people." />
                </Form.Item>
                <Form.Item
                    name={["postAKhayaal", "title"]}
                    label="Title of the Khayaal"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="First Impression :3" />
                </Form.Item>
                <Form.Item
                    name={["postAKhayaal", "khayaal"]}
                    label="Khayaal"
                    rules={[{ required: true }]}
                >
                    <Input.TextArea
                        autoSize
                        placeholder="Khayaal, khayaal, khayaal. You can probably add your name or email or phone number here if you want it visible to all. This is the only box that will be visible. :) #YourKhayaalYourChoice"
                    />
                </Form.Item>
                <Form.Item
                    name={["postAKhayaal", "tags"]}
                    label="Tag your Khayaal"
                    rules={[
                        {
                            required: true,
                            type: "array",
                        },
                    ]}
                >
                    <Select
                        mode="tags"
                        placeholder="Add no more or less than 5 tags, 5 is for your khayaal to not be lost."
                        tokenSeparators={[","]}
                    />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button
                        type="primary"
                        style={{
                            background: randomColor(),
                            color: "#000000",
                        }}
                        htmlType="submit"
                        loading={loading}
                    >
                        Submit
                    </Button>
                </Form.Item>
                {err ? (
                    <Alert
                        message="Sorry! Your khayaal didn't react us."
                        type="error"
                        showIcon
                        closable
                    />
                ) : null}
                {success ? (
                    <Alert
                        message="Your Khayaal has been posted!"
                        type="success"
                        showIcon
                    />
                ) : null}
            </Form>
        </Layout>
    );
};

export default Post;
