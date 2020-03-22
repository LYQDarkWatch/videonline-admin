import React,{Component } from 'react';
import {withRouter} from 'react-router-dom';
import { message,Form, Icon, Input, Button } from 'antd';
import {fakeAuth} from '../../util/fakeAuth';
import loginBg from '../../assets/images/login_bg.svg';
import Logo from '../../assets/images/logo.svg';
import Name from '../../assets/images/name.svg';
import './index.css';

var storage = window.localStorage;
class LoginForm extends Component{
    constructor(props) {  
        super(props);
        this.state = {
            admin_name:'',
            admin_passwd:'',
        };
        this.adminChange = this.adminChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.submit = this.submit.bind(this);
        this.LoginSubmit = this.LoginSubmit.bind(this);
    }
    adminChange(e){
        this.setState({ admin_name : e.target.value })
    }

    passwordChange(e){
        this.setState({ admin_passwd : e.target.value })
    }

    submit(){
        this.LoginSubmit();
    }
    LoginSubmit(){  //api请求函数
        let text = {Admin_Name:this.state.admin_name,Admin_Passwd:this.state.admin_passwd}; //获取数据
        let send = JSON.stringify(text);   //重要！将对象转换成json字符串
        // fetch(`http://172.16.119.153:30650/login`,{   //Fetch方法
        fetch(`http://127.0.0.1:8000/admin/login`,{ 
            method: 'POST',
            headers: {'Content-Type': 'text/plain'},
            body: send
        }).then(res => res.json()).then(
            data => {
                // this.setState({data})
                if(data.data.token){
                    storage.token  = data.data.token;
                    storage.adminname = this.state.admin_name;
                    console.log(storage.adminname);
                    fakeAuth.setToken(data.data.token);
                    message.success('验证成功，欢迎登录');
                    this.props.history.push('/basic');
                } 
                console.log(data.data.token);
                if(data.code===412) message.error('验证失败，用户名或密码错误')
                
            }
        ).then()
    }

    render(){
        return (
            <div className="loginWrap">
                <div className="contentWrap">
                    <div className="leftSide">
                        <img src={loginBg} className="loginBg" alt="login"/>
                    </div>
                    <div className="loginForm">
                        <div className="title">
                            <img src={Logo} alt="Ant Design后台管理系统" className="logo"/>
                            <img src={Name} alt="VideOnline后台管理系统" className="name"/>
                        </div>
                        <div className="dataWrap">                             
                                        <Input
                                        size="large"
                                        id='admin_name' 
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="请输入管理员账号"
                                        onChange={this.adminChange}
                                        />,                                                                                    
                                        <Input
                                        size="large"
                                        id='admin_passwd' 
                                        type='password' 
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="请输入密码"
                                        onChange={this.passwordChange}
                                        />,                                                                                             
                                    <Button type="primary" htmlType="submit" className="login-form-button" size="large" onClick={this.submit}>
                                        登录
                                    </Button>
                        
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Form.create({ name: 'loginForm' })(LoginForm));