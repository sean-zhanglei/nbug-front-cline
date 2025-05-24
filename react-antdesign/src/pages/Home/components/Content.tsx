import React, { useState, useEffect } from 'react';
import { Layout, Button, Form, Input, Image, Spin } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const { Content } = Layout;

interface FormData {
  leftFields: {id: number}[];
  bottomLeftFields: {id: number}[];
  bottomCenterFields: {id: number}[];
  bottomRightFields: {id: number}[];
}

// 模拟异步获取表单数据
const fetchFormData = async (params: {id: string, type: string}): Promise<FormData> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const count = parseInt(params.id) || 1;
      resolve({
        leftFields: Array(8).fill(null).map((_, i) => ({ 
          id: i+1,
          value: `${params.type}-${i+1}-${count}`
        })),
        bottomLeftFields: Array(7).fill(null).map((_, i) => ({ 
          id: i+1,
          value: `${params.type}-${i+1}-${count}`
        })),
        bottomCenterFields: Array(10).fill(null).map((_, i) => ({ 
          id: i+1,
          value: `${params.type}-${i+1}-${count}`
        })),
        bottomRightFields: Array(5).fill(null).map((_, i) => ({ 
          id: i+1,
          value: `${params.type}-${i+1}-${count}`
        }))
      });
    }, 1000);
  });
};

const styles: Record<string, React.CSSProperties> = {
  rootLayout: {
    height: '100%',
    flexDirection: 'row',
    gap: '10px'
  },
  leftContent: {
    padding: '4px',
    background: '#fff',
    width: '30%',
    flex: '1 1 auto',
    overflow: 'auto'
  },
  rightLayout: {
    width: '70%',
    gap: '10px'
  },
  imageContent: {
    padding: '0 4px',
    background: '#235eb6'
  },
  bottomLayout: {
    flexDirection: 'row',
    gap: '10px'
  },
  formContent: {
    padding: '4px',
    background: '#fff',
    flex: '1 1 auto',
    overflow: 'auto'
  },
  rightBottomContent: {
    height: '100%',
    padding: '4px',
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  closeButton: {
    alignSelf: 'flex-end'
  }
};

interface CustomContentProps {
  onClose: () => void;
  params: {
    id: string;
    type: string;
  };
}

const CustomContent: React.FC<CustomContentProps> = ({ onClose, params }) => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    leftFields: Array(8).fill(null).map((_, i) => ({ id: i+1 })),
    bottomLeftFields: Array(7).fill(null).map((_, i) => ({ id: i+1 })),
    bottomCenterFields: Array(10).fill(null).map((_, i) => ({ id: i+1 })),
    bottomRightFields: Array(5).fill(null).map((_, i) => ({ id: i+1 }))
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFormData(params);
        setFormData(data);
      } catch (error) {
        console.error('加载数据失败:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [params]);

  const formItemLayout = {
    labelCol: { 
      flex: '0 0 30%',
      style: { 
        textAlign: 'left' as const,
        paddingRight: 8 
      }
    },
    wrapperCol: { flex: '1 1 70%' },
    style: { width: '100%', margin: 0 }
  };

  return (
    <Spin spinning={loading} tip="数据加载中..." size="large">
      <Layout style={styles.rootLayout}>
        {/* 左侧Form */}
        <Content style={styles.leftContent}>
          <Form {...formItemLayout} layout="vertical" initialValues={formData}>
            {formData.leftFields.map((field) => (
              <Form.Item key={`left-${field.id}`} label={`字段${field.id}`}>
                <Input placeholder={`请输入字段${field.id}`} />
              </Form.Item>
            ))}
          </Form>
        </Content>

        <Layout style={styles.rightLayout}>
          <Content style={styles.imageContent}>
            <Image 
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" 
              alt="Ant Design"
              height={200}
            />
          </Content>

          <Layout style={styles.bottomLayout}>
            {/* 右下左Form */}
            <Content style={styles.formContent}>
              <Form {...formItemLayout} layout="vertical" initialValues={formData}>
                {formData.bottomLeftFields.map((field) => (
                  <Form.Item key={`bottom-left-${field.id}`} label={`字段${field.id}`}>
                    <Input placeholder={`请输入字段${field.id}`} />
                  </Form.Item>
                ))}
              </Form>
            </Content>

            {/* 右下中Form */}
            <Content style={styles.formContent}>
              <Form {...formItemLayout} layout="vertical" initialValues={formData}>
                {formData.bottomCenterFields.map((field) => (
                  <Form.Item key={`bottom-center-${field.id}`} label={`字段${field.id}`}>
                    <Input placeholder={`请输入字段${field.id}`} />
                  </Form.Item>
                ))}
              </Form>
            </Content>

            {/* 右下右 */}
            <Content style={styles.rightBottomContent}>
              <Form {...formItemLayout} layout="vertical" initialValues={formData}>
                {formData.bottomRightFields.map((field) => (
                  <Form.Item key={`bottom-right-${field.id}`} label={`字段${field.id}`}>
                    <Input placeholder={`请输入字段${field.id}`} />
                  </Form.Item>
                ))}
              </Form>
              <Button 
                type="dashed" 
                icon={<CloseCircleOutlined />} 
                onClick={onClose}
                style={styles.closeButton}
              >
                关闭
              </Button>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Spin>
  );
};

export default CustomContent;
