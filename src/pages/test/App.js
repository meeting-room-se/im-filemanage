import React from "react";
import { Upload, Button, message } from 'antd';
import { Progress } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import styles from './App.module.css';
import  axios from "axios";
export default class App extends React.Component {
    state = {
        fileList: [],
        uploading: false,
        uploadPercent: 0,
    };

    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        console.log(fileList);
        fileList.forEach(file => {
            console.log(file);
            formData.append('files[]', file);
        });

        this.setState({
            uploading: true,
        });
        console.log(formData);

        const url = 'http://1.zmz121.cn:8010/file/upload/small';
        axios.post(url, formData,{
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: progressEvent => {
                let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
                this.setState({
                    uploadPercent: complete
                })
            }
        })
        .then((res) => {
            message.info(res.data)
        }).catch((error) => {
            message.error(error.data)
            console.log(error)
            this.setState({
                uploadPercent: 0
            }
            )
        });

    };

    render() {
        const { uploading, fileList } = this.state;
        const props = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };

        return (
            <div className={styles.container}>
                <Upload {...props}>
                    <Button>
                        <UploadOutlined /> Select File
                    </Button>
                </Upload>
                <Progress percent={this.state.uploadPercent} />
                <Button
                    type="primary"
                    onClick={this.handleUpload}
                    disabled={fileList.length === 0}
                    loading={false}
                    style={{ marginTop: 16 }}
                >
                    {uploading ? 'Uploading' : 'Start Upload'}
                </Button>
            </div>
        );
    }
}