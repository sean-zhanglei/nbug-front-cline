import React, { useState } from 'react';
import { Button, Drawer, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import CustomContent from '@/pages/Home/components/Content';
import CustomContent2 from '@/pages/Home/components/Content2';
import CustomContent3 from '@/pages/Home/components/Content3';
import CustomContent4 from '@/pages/Home/components/Content4';
import CustomContent5 from '@/pages/Home/components/Content5';

const drawerConfigs = [
  { Component: CustomContent, buttonKey: 'button1' },
  { Component: CustomContent2, buttonKey: 'button2' },
  { Component: CustomContent3, buttonKey: 'button3' },
  { Component: CustomContent4, buttonKey: 'button4' },
  { Component: CustomContent5, buttonKey: 'button5' }
];

const Home: React.FC = () => {
  const { t } = useTranslation();
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

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Select
          defaultValue="zh"
          style={{ width: 120 }}
          onChange={changeLanguage}
          options={[
            { value: 'zh', label: '中文' },
            { value: 'en', label: 'English' }
          ]}
        />
      </div>
      <h1>{t('welcome')}</h1>
      {drawerConfigs.map((config, index) => (
        <React.Fragment key={index}>
          <Button 
            type="primary" 
            onClick={() => toggleDrawer(index, true)}
            style={{ marginRight: 8 }}
          >
            {t(config.buttonKey)}
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
