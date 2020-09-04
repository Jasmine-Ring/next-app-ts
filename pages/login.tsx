import React, { useContext } from 'react'
import { LoginUser, setLoginUser } from '~/action/index'
import styles from '~/styles/Login.module.scss'
import { useRouter } from 'next/router'
import {Form, Input, Button, Checkbox, message} from 'antd'
import { GlobalContext } from '~/pages/_app'

export default function LoginPage () {
  const globalContext: any = useContext(GlobalContext)

  const router = useRouter()
  const [form] = Form.useForm()
  const layout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
  }
  const tailLayout = {
    wrapperCol: {offset: 6, span: 18}
  }

  // @ts-ignore
  const onFinish = (loginUser: any) => {
    globalContext.dispatch(setLoginUser(loginUser))
    message.success('登录成功！')
    router.push('/')
  }

  const onFinishFailed = (err: any) => {
    message.error('请核对表单内容！')
    console.log(err, 'err')
  }

  const resetFrom = () => {
    form.resetFields()
  }

  return (
    <div className={styles.container}>
      <h3>登录{ globalContext.indexState.count }</h3>
      <Form {...layout} name="login" form={form} initialValues={{ ...globalContext.loginState }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item name="username" label="用户名：" rules={[{required: true, message: '请输入用户名！'}]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="密码：" rules={[{required: true, message: '请输入密码！'}]}>
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>记住密码</Checkbox>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">登录</Button>
          <Button onClick={resetFrom}>取消</Button>
        </Form.Item>
      </Form>
    </div>
  )
}