import Todolist from "./Todolist";
import { Layout } from 'antd';
import 'antd/dist/antd.css';

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
      <Content>
        <Todolist/>
      </Content>
  );
}

export default App;
