import React, { useRef } from 'react';
import { Input, Button, Table, Modal, Upload, message, Radio, Form, Progress, Popover, Image } from 'antd';
import { connect } from 'dva';
import styles from './index.css'
import icon from '../../statics/iconfont/iconfont.css'

function FileContent(props){
  const columns = props.columns;
  const data = props.data;
  const uploadpath = useRef(null);
  // 是否显示上传路径函数
  function UploadPath(){
    if(props.havepath){
      return <div className={styles.UploadPath}>
        <Form>
          <Form.Item
            label="Path"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            key={props.path}
            initialValue={props.path}
            style={{ marginBottom: "0" }}
          >
            <Input style={{width: "350px"}} value={props.path} ref={uploadpath}/>
          </Form.Item>
        </Form>
      </div>
    }
  }

  function getBase64(img, callback){
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    // 读取文件
    reader.readAsDataURL(img);
  }

  return (
    <div className={styles.Wrapper}>
      {/*搜索*/}
      <div className={styles.Title}>
        <Input id={styles.SearchInput}/>
        <Button type={"primary"} id={styles.SearchBtn}>
          <span className={icon.iconfont} style={{fontSize:"22px",marginTop: "-3px"}}>&#xe60c;</span>
        </Button>
        <a className={styles.More}><span className={icon.iconfont} style={{fontSize: "28px"}}>&#xe7ac;</span></a>
      </div>
      {/*表格*/}
      <div className={styles.Content}>
        <div style={{verticalAlign: "middle",height: "40px"}}>
          <div className={styles.FolderName}>{props.path}</div>
          <Button type={'primary'} className={styles.UploadBtn} onClick={() => {props.dispatch({type: 'uploadModal/changeState',payload: {visible: true}})}}>上传</Button>
          {/*上传模态框*/}
          <Modal
            title="FILE UPLOADER"
            visible={props.visible}
            className={styles.UploadModal}
            onCancel={
              () => {
                props.dispatch({
                  type: 'uploadModal/changeState',
                  payload: {
                    visible: false
                  }
                })
              }
            }
            onOk={
              () => {
                if(props.haveprogress){
                  props.dispatch({
                    type: 'uploadModal/initModal'
                  })

                  return
                }
                props.dispatch({
                  type: 'uploadModal/changeState',
                  payload:{
                    haveprogress: true
                  }
                })
                if (props.havepath){
                  props.dispatch({
                    type: 'uploadModal/commit',
                    payload: {
                      path: uploadpath.current.props.value,
                      uploadurl: props.uploadurl,
                      filelist: props.filelist
                    }
                  })
                }else{
                  console.log(props.filelist);
                  props.dispatch({
                    type: 'uploadModal/commit',
                    payload: {
                      path: "",
                      uploadurl: props.uploadurl,
                      file: props.filelist[0]
                    }
                  })
                }
              }
            }
          >
            {/*上传组件*/}
            <Upload
              key={Math.random()}
              name="file"
              multiple={true}
              showUploadList={false}

              beforeUpload={(file) => {
                props.dispatch({
                  type: 'uploadModal/addFile',
                  payload: file
                })
                return false;
              }}
            >
              <div className={styles.AddFile}>
                click here or drop file here
              </div>
            </Upload>
            {/*上传文件列表*/}
            {props.filelist.map((value, index) => {
              console.log(value);
              if(value.type === "image/jpeg"){
                return <div className={styles.FileItem} key={value.name}>
                  <span className={icon.iconfont} style={{fontSize: "20px", float:"left", marginLeft: "5px"}}>&#xe64a;</span>
                  <Popover content={(
                    <Image width={100} src={props.imgdata}/>
                  )} trigger="click">
                    <a style={{marginLeft:"5px",float:"left"}} onClick={() => getBase64(value,(res) => {props.dispatch({ type: 'uploadModal/changeState',payload:{imgdata: res} })})}>{value.name}</a>
                  </Popover>
                  <div className={styles.FileItemDelete} style={{float:"right",marginRight:"5px"}} onClick={() => {props.dispatch({
                    type: 'uploadModal/removeFile',
                    payload: value
                  })}}>
                    <span className={icon.iconfont} style={{fontSize: "20px"}}>&#xe62a;</span></div>
                  </div>
              }else{
                return <div className={styles.FileItem} key={value.name}>
                  <span className={icon.iconfont} style={{fontSize: "20px", float:"left",marginLeft: "5px"}}>&#xe689;</span>
                  <a style={{marginLeft:"5px",float:"left"}}>{value.name}</a>
                  <div className={styles.FileItemDelete} style={{float:"right",marginRight:"5px"}} onClick={() => {props.dispatch({
                    type: 'uploadModal/removeFile',
                    payload: value
                  })}} >
                    <span className={icon.iconfont} style={{fontSize: "20px"}}>&#xe62a;</span></div>
                  </div>
              }
            })}

            {/*上传类型*/}
            <Radio.Group value={props.radiovalue} hidden style={{ marginTop: "20px",marginLeft: "120px"  }} onChange={
            (e) => {
              props.dispatch({
                type: 'uploadModal/changeRadio',
                payload: {
                  radiovalue: e.target.value
                }
              })
            }
          }>
              <Radio value={1}>UnKeepName</Radio>
              <Radio value={2}>KeepName</Radio>
            </Radio.Group>
            {/*判断是否显示上传路径*/}
            {
              UploadPath()
            }
            {props.haveprogress ? <Progress percent={props.progress}/> : ""}

          </Modal>
        </div>
        <Table columns={columns} dataSource={data} pagination={{position: ['bottomCenter']}}/>
      </div>
    </div>
  )
}

function mapStateToProps({ tableContent,uploadModal  }){
  return {
    columns: tableContent.columns,
    data: tableContent.data,
    path: tableContent.path,
    uploadurl: uploadModal.uploadurl,
    radiovalue: uploadModal.radiovalue,
    visible: uploadModal.visible,
    havepath: uploadModal.havepath,
    progress: uploadModal.progress,
    haveprogress: uploadModal.haveprogress,
    filelist: uploadModal.filelist,
    imgdata: uploadModal.imgdata
  }
}

export default connect(mapStateToProps)(FileContent);