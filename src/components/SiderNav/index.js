import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import Logo from '../../assets/images/logo.svg';
import './index.css';
const { Sider } = Layout;
const {SubMenu } = Menu;
//侧边按钮栏
export default class SiderNav extends Component{
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    };
    render(){
        return(
            <Sider
                    breakpoint="lg"
                    collapsedWidth="80"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <div className="logoIcon">
                        <img src={Logo} alt="system" className ="Icon"/>
                        {/* <span className="title">RtSystem</span> */}
                    </div>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1','sub2']}
                        mode="inline"
                        theme="dark"
                        collapsed={this.state.collapsed.toString()}
                    >

                        <Menu.Item key="2">
                            <Link to="/basic">
                                <Icon type="desktop" />
                                <span className="navTitle">
                                    用户管理
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Link to="/tag">
                                <Icon type="link" />
                                <span>标签管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Link to="/videos">
                                <Icon type="link" />
                                <span>视频管理</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
        )
    }
}
