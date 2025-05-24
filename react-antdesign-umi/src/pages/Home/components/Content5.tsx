import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Image, Spin } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

// 创建响应式组件
const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  height: 100%;
  box-sizing: border-box;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const LeftForm = styled.div`
  width: 30%;
  background: #fff;
  padding: 10px;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-right: 10px;
  overflow: auto;

  @media (max-width: 992px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const RightContent = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;

  @media (max-width: 992px) {
    width: 100%;
  }
`;

const ImageContainer = styled.div`
  background: #235eb6;
  padding: 20px;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  height: 200px;
`;

const BottomForms = styled.div`
  display: flex;
  flex: 1;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormSection = styled.div`
  flex: 1;
  background: #fff;
  padding: 10px;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const styles: Record<string, React.CSSProperties> = {
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: '16px'
  }
};

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

interface CustomContentProps {
  onClose: () => void;
  params: {
    id: string;
    type: string;
  };
}

const CustomContent5: React.FC<CustomContentProps> = ({ onClose, params }) => {
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
      <Container>
        {/* 左侧表单 */}
        <LeftForm>
          <Form {...formItemLayout} layout="vertical" initialValues={formData}>
            {formData.leftFields.map((field) => (
              <Form.Item key={`left-${field.id}`} label={`字段${field.id}`}>
                <Input placeholder={`请输入字段${field.id}`} />
              </Form.Item>
            ))}
          </Form>
        </LeftForm>

        <RightContent>
          {/* 图片区域 */}
          <ImageContainer>
            <Image 
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" 
              alt="Ant Design"
              height={200}
            />
          </ImageContainer>

          {/* 底部表单区域 */}
          <BottomForms>
            <FormSection>
              <Form {...formItemLayout} layout="vertical" initialValues={formData}>
                {formData.bottomLeftFields.map((field) => (
                  <Form.Item key={`bottom-left-${field.id}`} label={`字段${field.id}`}>
                    <Input placeholder={`请输入字段${field.id}`} />
                  </Form.Item>
                ))}
              </Form>
            </FormSection>

            <FormSection>
              <Form {...formItemLayout} layout="vertical" initialValues={formData}>
                {formData.bottomCenterFields.map((field) => (
                  <Form.Item key={`bottom-center-${field.id}`} label={`字段${field.id}`}>
                    <Input placeholder={`请输入字段${field.id}`} />
                  </Form.Item>
                ))}
              </Form>
            </FormSection>

            <FormSection>
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
            </FormSection>
          </BottomForms>
        </RightContent>
      </Container>
    </Spin>
  );
};

export default CustomContent5;
