import React, { createContext, useContext, useState } from 'react';

// 创建Context
const TabsContext = createContext<{
  activeTab: string;
  setActiveTab: (tab: string) => void;
} | null>(null);

// 父组件
export function Tabs({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

// Tab组件
export function Tab({ id, children }: { id: string; children: React.ReactNode }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === id;

  return (
    <button
      className={`tab ${isActive ? 'active' : ''}`}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
}

// TabPanel组件
export function TabPanel({ id, children }: { id: string; children: React.ReactNode }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used within Tabs');

  const { activeTab } = context;
  return activeTab === id ? <div className="tab-panel">{children}</div> : null;
}

// 使用示例
export function CompoundComponentDemo() {
  return (
    <Tabs>
      <div className="tab-list">
        <Tab id="tab1">Tab 1</Tab>
        <Tab id="tab2">Tab 2</Tab>
      </div>
      <TabPanel id="tab1">
        <h3>Tab 1 Content</h3>
        <p>This is tab 1 content</p>
      </TabPanel>
      <TabPanel id="tab2">
        <h3>Tab 2 Content</h3>
        <p>This is tab 2 content</p>
      </TabPanel>
    </Tabs>
  );
}
