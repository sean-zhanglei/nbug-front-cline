import React, { useState } from 'react';
import { Button, Drawer, Select } from 'antd';
import { useIntl, setLocale } from 'umi';
import CustomContent from '@/pages/Home/components/Content';
import CustomContent2 from '@/pages/Home/components/Content2';
import CustomContent3 from '@/pages/Home/components/Content3';
import CustomContent4 from '@/pages/Home/components/Content4';
import CustomContent5 from '@/pages/Home/components/Content5';
import CustomContent6 from '@/pages/Home/components/Content6';

const drawerConfigs = [
  { Component: CustomContent, buttonKey: 'button1' },
  { Component: CustomContent2, buttonKey: 'button2' },
  { Component: CustomContent3, buttonKey: 'button3' },
  { Component: CustomContent4, buttonKey: 'button4' },
  { Component: CustomContent5, buttonKey: 'button5' },
  { Component: CustomContent6, buttonKey: 'button6' }
];

const Home: React.FC = () => {
  const { formatMessage } = useIntl();
  const [openStates, setOpenStates] = useState(drawerConfigs.map(() => false));

  const toggleDrawer = (index: number, open: boolean) => {
    const newStates = [...openStates];
    newStates[index] = open;
    setOpenStates(newStates);
  };

  const handleLocaleChange = (value: string) => {
    setLocale(value, false);
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
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Select
          defaultValue="zh-CN"
          style={{ width: 120 }}
          onChange={handleLocaleChange}
          options={[
            { value: 'zh-CN', label: '中文' },
            { value: 'en-US', label: 'English' }
          ]}
        />
      </div>
      <h1>{formatMessage({ id: 'welcome' })}</h1>
      {drawerConfigs.map((config, index) => (
        <React.Fragment key={index}>
          <Button 
            type="primary" 
            onClick={() => toggleDrawer(index, true)}
            style={{ marginRight: 8 }}
          >
            {formatMessage({ id: config.buttonKey })}
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
