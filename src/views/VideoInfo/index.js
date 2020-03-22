import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {Button, message, Form, Table, Divider, Card, Col, Row, Typography, Comment, Tooltip, Avatar, Input} from 'antd';
import moment from 'moment';

const {TextArea} = Input;
const {Title, Paragraph} = Typography;

export default class VideoInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video: {
                video_id: "",
                video_name: "",
                Tag: {
                    Tag_Id: "",
                    Tag_Name: ""
                },
                Info: {
                    video_info: "",
                    video_url: "",
                    video_actor: "",
                    play_sum: "",
                    star_sum: "",
                    Content: [{
                        content_id: "",
                        "video_id": "",
                        "user_id": "",
                        "user_name": "",
                        "user_logo": "",
                        "star_sum": "",
                        "video_content": "",
                        "add_time": ""
                    }],
                },
                video_content: "",
                video_imgurl: "",
                video_isvip: ""
            }
        }
    }

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    GetVideoInfo = (video_id) => {  //api请求函数
        let api = 'http://127.0.0.1:8000/api/admin/videos/getvideobyid';
        axios.get(api, {
            params: {
                token: localStorage.token,
                video_id: video_id,
                priority: 2
            }
        }).then((response) => {
            if (response.data.code === 200) {
                this.setState({
                    video: response.data.data.info
                });
                console.log("video", this.state.video);
            } else {
                message.error('验证失败，请重新登录');
                this.props.history.push('/login');
            }
        })
    };

    AdminDeleteComment = (content_id) => {
        var api = 'http://127.0.0.1:8000/api/admin/comment/deletecomment';
        axios.get(api, {
            params: {
                token: localStorage.token,
                content_id: content_id,
                priority: 2
            }
        }).then((response) => {
            if (response.data.code === 200) {
                message.success("删除成功")
                this.GetVideoInfo(this.state.video.video_id);
            } else {
                message.error('验证失败，请重新登录');
                this.props.history.push('/login');
            }
        })
    };

    componentDidMount() {
        let video_id = this.props.location.state.video_id;
        this.GetVideoInfo(video_id)
    }

    render() {
        return (
            <div className="messageWrap">
                <div className="labelTitle" style={{marginLeft: 670}}>
                    <span>视频信息</span>
                </div>
                <div className="displayCode clearfix">
                    <div className="codeSection" style={{width: '100%'}}>
                        <div className="example">
                            <p>视频名称：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.video.video_name}</p>
                            <p>视频标签：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.video.Tag.Tag_Name}</p>
                            <p>视频简介：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.video.video_content}</p>
                            <p>视频详情：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.video.Info.video_info}</p>
                            <p>主演：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.video.Info.video_actor}</p>
                            <p>视频地址：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.video.Info.video_url}</p>
                            <p>热度：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.video.Info.play_sum}</p>
                            <p>收藏总数：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.video.Info.star_sum}</p>
                            <p>封面图链接：&nbsp;&nbsp;{this.state.video.video_imgurl}</p>
                            <Button type="primary" htmlType="submit" className="login-form-button" size="large"
                                    onClick={this.submit}>
                                确认修改
                            </Button>

                            {
                                this.state.video.Info.Content.map((value, key) => {
                                    return (
                                        <Comment
                                            author={<a>{value.user_name}</a>}
                                            avatar={
                                                <Avatar
                                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                                    alt="Han Solo"
                                                />
                                            }
                                            content={
                                                <p>
                                                    {value.video_content}
                                                </p>
                                            }
                                            datetime={
                                                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                                    <span>{value.add_time}</span>
                                                    <Button size={"small"} style={{marginLeft: 150}}
                                                            onClick={() => this.AdminDeleteComment(value.content_id)}>删除评论</Button>
                                                </Tooltip>
                                            }
                                        />
                                    )
                                })

                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
