import React from "react";
import { Input, Form, Button, Row } from 'antd';

const TodoForm = ({ handleTodoCreate }) => {

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };


  const onFinish = (values) => {

    // addTask(values);
    handleTodoCreate(values.todo, values.ref, values.completed);
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
      <Row>
        <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
          <Form.Item
              label="할일"
              name="todo"
              rules={[
                {
                  required: true,
                  message: '해야할 일을 입력',
                },
              ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
              label="참조"
              name="ref"
              rules={[
                {
                  message: '참조하는 Todo 입력',
                },
              ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              저장
            </Button>
          </Form.Item>
        </Form>
      </Row>
  )
}

export default TodoForm;
