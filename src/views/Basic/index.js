import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {Button, message, Table, Divider} from 'antd';
import './index.css';

export default class Basic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                {
                    user_id: "",
                    user_name: "",
                    user_display: "",
                    create_time: "",
                    priority: "",
                    user_phone: "",
                    user_email: "",
                    last_login: "",
                    can_comment: ""
                }
            ]
        }
    }

    GetAllUserInfo = () => {  //api请求函数
        var api = 'http://127.0.0.1:8000/api/admin/getusers'
        axios.get(api, {
            params: {
                token: localStorage.token,
                priority: 2
            }
        }).then((response) => {
            if (response.data.code === 20001) {
                window.alert('验证失败，请重新登录');
                this.props.history.push('/login');
            } else {
                this.setState({
                    users: response.data.data.user
                })
            }
        })
    };

    //禁言用户
    DisableUserComment = (user_id, user_name) => {
        // eslint-disable-next-line no-useless-concat
        console.log(user_id);
        console.log(user_name);
        var user_idint = user_id.toString();
        const token = localStorage.token;
        // eslint-disable-next-line no-template-curly-in-string
        let api = 'http://127.0.0.1:8000/api/admin/user/banusercomment?priority=2&token=' + token;
        axios.post(api, {
            admin_name: localStorage.adminname,
            user_id: user_idint,
            user_name: user_name,
        })
            .then((response) => {
                console.log(response);
                if (response.data.code === 200) {
                    message.success("禁言成功")
                    this.GetAllUserInfo()
                } else {
                    window.alert("禁言失败");
                }
            })
    };

    //解禁用户
    AbleUserComment = (user_id, user_name) => {
        var user_idint = user_id.toString();
        const token = localStorage.token;
        // eslint-disable-next-line no-template-curly-in-string
        let api = 'http://127.0.0.1:8000/api/admin/user/restorecomment?priority=2&token=' + token;
        axios.post(api, {
            admin_name: localStorage.adminname,
            user_id: user_idint,
            user_name: user_name,
        })
            .then((response) => {
                console.log(response);
                if (response.data.code === 200) {
                    message.success("解禁成功");
                    this.GetAllUserInfo()
                } else {
                    window.alert("禁言失败");
                }
            })
    };
    componentDidMount() {
        this.GetAllUserInfo()
    }

    textFomater(key) {
        if (key === 1) {
            return '已禁言'
        } else {
            return '正常'
        }
    }
    VipFomater(key) {
        if (key === 0) {
            return '非会员'
        } else {
            return '会员'
        }
    }

    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'user_id',
                key:'user_id',
                render: text => <a href="/">{text}</a>,
            },
            {
                title: '用户名',
                dataIndex: 'user_name',
                render: text => <a href="/">{text}</a>,
            },
            {
                title: '昵称',
                dataIndex: 'user_display',
                render: text => <a href="/">{text}</a>,
            },
            {
                title: '是否会员',
                dataIndex: 'priority',
                render: text => <text>{this.VipFomater(text)}</text>
            },
            {
                title: '手机号',
                dataIndex: 'user_phone',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
            },
            {
                title: '最后登录时间',
                dataIndex: 'last_login',
            },
            {
                title: '是否被禁止评论',
                dataIndex: 'can_comment',
                render: text => <text>{this.textFomater(text)}</text>
            },
            {
                title: 'Action',
                render: (text, record) => (
                    <span>
                  <Button className="btn"
                          onClick={() => this.DisableUserComment(record.user_id, record.user_name)}>禁言用户 </Button>
                        <Button className="btn"
                                onClick={() => this.AbleUserComment(record.user_id, record.user_name)}>解禁用户 </Button>
                  <Divider type="vertical"/>
                </span>
                ),
            },
        ];

        return (
            <div className="messageWrap">
                <div className="labelTitle">
                    用户管理
                </div>
                <div className="displayCode clearfix">
                    <div className="codeSection" style={{width: '100%'}}>
                        <div className="example">
                            <Table rowKey={record => record.user_id} columns={columns} dataSource={this.state.users}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
