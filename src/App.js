import Todolist from "./Todolist";
import { Layout } from 'antd';
import 'antd/dist/antd.css';

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
      <Content>
        <h1>투두리스트</h1>
        <Todolist/>
      </Content>
  );
}

export default App;
