import React from "react";
import { Input, Form , Button, Checkbox } from 'antd';

const TodoForm = ({ addTask }) => {

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
    addTask(values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
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
            label="task"
            name="task"
            rules={[
              {
                required: true,
                message: '해야할 일을 입력',
              },
            ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
            label="ref"
            name="ref"
            rules={[
              {
                required: true,
                message: '참조하는 Todo 입력',
              },
            ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
  )
}

export default TodoForm;