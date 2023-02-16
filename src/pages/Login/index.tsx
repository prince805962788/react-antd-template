import { EyeFilled, EyeInvisibleFilled, LockFilled, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { login } from 'api/login';
import { useAppDispatch } from 'hooks/redux';
import { useNavigate } from 'react-router-dom';
import { setAccount } from 'store/userSlice';
import style from './style.module.less';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const confirm = async (params: { username: string; password: string }) => {
    login(params);
    dispatch(setAccount(params));
    navigate('/', { replace: true });
  };
  const onFinish = (values: { username: string; password: string }) => {
    console.log('Received values of form: ', values);
    confirm(values);
  };
  return (
    <div className={style.loginContainer}>
      <div className={style.left}>
        <Form
          name="normal_login"
          className={style.loginForm}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <label className={style.formLabel}>账号</label>
          <Form.Item name="username" rules={[{ required: true, message: '请输入账号' }]}>
            <Input
              className={style.formInput}
              prefix={<UserOutlined className={style.formInputIcon} />}
              placeholder="输入账号"
            />
          </Form.Item>
          <label className={style.formLabel}>密码</label>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password
              className={style.formInput}
              prefix={<LockFilled className={style.formInputIcon} />}
              type="password"
              size="large"
              placeholder="输入密码"
              iconRender={(visible) =>
                visible ? (
                  <EyeFilled className={style.formInputIcon} />
                ) : (
                  <EyeInvisibleFilled className={style.formInputIcon} />
                )
              }
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={style.confirmButton}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={style.right}></div>
    </div>
  );
};
export default LoginPage;
