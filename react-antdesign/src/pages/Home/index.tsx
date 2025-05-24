import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import CustomContent from './components/Content';
import CustomContent2 from './components/Content2';
import CustomContent3 from './components/Content3';
import CustomContent4 from './components/Content4';

const drawerConfigs = [
  { Component: CustomContent, buttonText: 'Ant Design 按钮 Antd Layout' },
  { Component: CustomContent2, buttonText: 'Ant Design 按钮2 Grid' },
  { Component: CustomContent3, buttonText: 'Ant Design 按钮3 Antd Grid' },
  { Component: CustomContent4, buttonText: 'Ant Design 按钮4 Antd Flex' }
];

const Home: React.FC = () => {
  const [openStates, setOpenStates] = useState(drawerConfigs.map(() => false));

  const toggleDrawer = (index: number, open: boolean) => {
    const newStates = [...openStates];
    newStates[index] = open;
    setOpenStates(newStates);
  };

  const drawerStyle = {
    margin: '0 10px 10px 10px',
    width: 'calc(100% - 20px)',
    height: 'calc(100% - 10px)',
    borderRadius: '10px 10px 10px 10px',
  };

  const drawerBodyStyle = {
    padding: '10px'
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>欢迎来到首页</h1>
      {drawerConfigs.map((config, index) => (
        <React.Fragment key={index}>
          <Button 
            type="primary" 
            onClick={() => toggleDrawer(index, true)}
            style={{ marginRight: 8 }}
          >
            {config.buttonText}
          </Button>
          <Drawer
            placement="bottom"
            width="calc(100% - 40px)"
            height="calc(100% - 50px)"
            onClose={() => toggleDrawer(index, false)}
            closeIcon={false}
            open={openStates[index]}
            mask={true}
            maskClosable={true}
            style={drawerStyle}
            bodyStyle={drawerBodyStyle}
          >
            <config.Component 
              onClose={() => toggleDrawer(index, false)}
              params={{
                id: "122",
                type: "demo"
              }}
            />
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Home;
