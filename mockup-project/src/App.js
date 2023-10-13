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
      <Space className='md:block hidden'>
        <Layout className="!h-screen">
          <Sider className="!bg-[#015249] md:block hidden pr-8 pl-5 pt-7 rounded-e-xl" width={240} style={{ position: 'fixed', height: '100%', }}>
            <SiderMenu />
          </Sider>
          <Layout className='ml-60'>
            <Header className="bg-white flex items-center py-12 shadow-md">
              <Navbar />
            </Header>
            <Content className='p-5 overflow-y-auto'>
              <Home />
            </Content>
          </Layout>
        </Layout>
      </Space>

      {/* Mobile Responsiveness */}
      <div className='block md:hidden'>
        <Home />
      </div>
    </Provider>
  );
}

export default App;
