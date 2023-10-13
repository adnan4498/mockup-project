import React from 'react';
import { Provider } from 'react-redux'; 
import store from '../src/redux/Store'; 
import { Layout, Space } from 'antd';
import SiderMenu from './component/siderMenu/SiderMenu';
import Navbar from './component/navbar/Navbar';
import Home from './pages/Home';

const { Header, Content, Sider } = Layout;

function App() {
  return (
    <Provider store={store}>
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]} className='md:block hidden'>
        <Layout className="!h-screen">
          <Sider
            className="!bg-[#015249] md:block hidden px-10  pt-7 rounded-e-xl"
            width={240}
            style={{ position: 'fixed', height: '100%', left: 0 }}
          >
            <SiderMenu />
          </Sider>
          <Layout style={{ marginLeft: 240 }}>
            <Header className="bg-white flex items-center py-12 shadow-md">
              <Navbar />
            </Header>
            <Content style={{ padding: '20px', overflowY: 'auto' }}>
              <Home />
            </Content>
          </Layout>
        </Layout>
      </Space>



    {/* Mobile Respnsivess */}

    <div className='block md:hidden'>
      <Home/>
      </div>
    </Provider>
  );
}

export default App;
