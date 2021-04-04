import React, { useState } from "react";
import { Input, Form, Button, Row, Select } from 'antd';
import { useSelector } from "react-redux";

const { Option } = Select;

const TodoForm = ({ handleTodoCreate }) => {
  const todos = useSelector(state => state.todos.todos)

  const [ref, setRef] = useState(new Set());

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

  // 셀렉박스 참조 선택
  function handleChange(newRef) {
      setRef(previousState => new Set([...ref, newRef]))
    console.log(`selected ${newRef}`);
  }


  const onFinish = (values) => {
    handleTodoCreate(values.todo, ref, values.completed);
    setRef(new Set());
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
          >
            <Select defaultValue='없음' style={{ width: 120 }} onChange={handleChange}>
              {todos.map(cv => {
                return (
                  <Option key={cv.id + '_' + cv.todo} value={cv.id}>{cv.id + ": " + cv.todo}</Option>
                )
              })}
            </Select>
            {[...ref].map(cv => {
            return(
                <div>@{cv}</div>
            )
            })}
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
