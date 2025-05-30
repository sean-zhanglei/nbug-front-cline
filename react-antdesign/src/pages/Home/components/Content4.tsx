import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Image, Spin, Flex } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

interface FormData {
  leftFields: {id: number, value: string}[];
  bottomLeftFields: {id: number, value: string}[];
  bottomCenterFields: {id: number, value: string}[];
  bottomRightFields: {id: number, value: string}[];
}

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
  container: {
    padding: '10px'
  },
  formContainer: {
    background: '#fff',
    padding: '10px',
    borderRadius: '2px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: '16px'
  }
};

interface CustomContentProps {
  onClose: () => void;
  params: {
    id: string;
    type: string;
  };
}

const CustomContent4: React.FC<CustomContentProps> = ({ onClose, params }) => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    leftFields: Array(8).fill(null).map((_, i) => ({ id: i+1, value: '' })),
    bottomLeftFields: Array(7).fill(null).map((_, i) => ({ id: i+1, value: '' })),
    bottomCenterFields: Array(10).fill(null).map((_, i) => ({ id: i+1, value: '' })),
    bottomRightFields: Array(5).fill(null).map((_, i) => ({ id: i+1, value: '' }))
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
      <div style={styles.container}>
        <Flex gap="small" >
          {/* 左侧表单 */}
          <Flex vertical flex={3} style={styles.formContainer}>
            <Form {...formItemLayout} layout="vertical" initialValues={formData}>
              {formData.leftFields.map((field) => (
                <Form.Item key={`left-${field.id}`} label={`字段${field.id}`}>
                  <Input placeholder={`请输入字段${field.id}`} />
                </Form.Item>
              ))}
            </Form>
          </Flex>

          <Flex vertical flex={7} gap="small" >
            {/* 图片区域 */}
            <Flex justify='center' align='center' style={{ borderRadius: '2px', height: '200px' }}>
              <Image 
                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" 
                alt="Ant Design"
                height={200}
              />
            </Flex>

            {/* 底部表单区域 */}
            <Flex gap="small" style={{ flex: 1 }}>
              <Flex vertical flex={1} style={styles.formContainer}>
                <Form {...formItemLayout} layout="vertical" initialValues={formData}>
                  {formData.bottomLeftFields.map((field) => (
                    <Form.Item key={`bottom-left-${field.id}`} label={`字段${field.id}`}>
                      <Input placeholder={`请输入字段${field.id}`} />
                    </Form.Item>
                  ))}
                </Form>
              </Flex>

              <Flex vertical flex={1} style={styles.formContainer}>
                <Form {...formItemLayout} layout="vertical" initialValues={formData}>
                  {formData.bottomCenterFields.map((field) => (
                    <Form.Item key={`bottom-center-${field.id}`} label={`字段${field.id}`}>
                      <Input placeholder={`请输入字段${field.id}`} />
                    </Form.Item>
                  ))}
                </Form>
              </Flex>

              <Flex vertical flex={1} style={{...styles.formContainer, justifyContent: 'space-between'}}>
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
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </div>
    </Spin>
  );
};

export default CustomContent4;
