import DataChart from '../views/DataChart';
import Basic from '../views/Basic';
import Form from '../views/Form';
import Message from '../views/Message';
import Alert from '../views/Alert';
import Spin from '../views/Spin';
import Progress from '../views/Progress';
import Checkbox from '../views/Checkbox';
import Cascader from '../views/Cascader';
import Tag from '../views/Tag';
import AddTag from "../components/AddTagModel";
import Video from "../views/Video";
import VideoInfo from "../views/VideoInfo";

export const routes = [
    {
        path: '/dataCount',
        component: DataChart
    },
    {
        path: '/videoinfo',
        component: VideoInfo
    },
    {
        path: '/tag',
        component: Tag
    },
    {
        path: '/addtag',
        component: AddTag
    },
    {
        path: '/videos',
        component: Video
    },
    {
        path: '/basic',
        component: Basic
    },
    {
        path: '/form',
        component: Form
    },
    {
        path: "/alert",
        component: Alert
    },
    {
        path: '/message',
        component: Message
    },
    {
        path: '/spin',
        component: Spin
    },
    {
        path: '/progress',
        component: Progress
    },
    {
        path: '/checkbox',
        component: Checkbox
    },
    {
        path: '/cascader',
        component: Cascader
    }]
