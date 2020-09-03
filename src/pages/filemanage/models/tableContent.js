import { Button, message, Popover, Image } from 'antd';
import { formatFileSize, formatTableData, setState } from '@/pages/filemanage/Utils/state';
import moment from 'moment';
import { deleteRemoteFile, getFolder, remoteurl } from '@/pages/filemanage/service';
import React from 'react';
import icon from '@/pages/filemanage/statics/iconfont/iconfont.css';
import styles from '../components/fileContent/index.css'


const onDeleteFile = (text) => {
  window.g_app._store.dispatch({
    type: 'tableContent/removeFile',
    payload: {
      fileName: text.name,
      path: text.path
    }
  })
}

export default {
  namespace: 'tableContent',
    state: {
      columns: [],
      data:[],
      path: ''
    },
  reducers: {

    changeTable(state,{ payload }) {
      const list = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          width: 150,
          align: 'center',
          className: styles.TableFont,
          render(text){
            if(text.type === 'jpg' || text.type === 'png'){
              return (<Popover content={(
                  <Image width={200} src={remoteurl+"/res/file"+text.path}/>
              )}><a href={'#'}>{text.name}</a></Popover>)
            }else{
              return text.name;
            }

          }
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
          width: 100,
          align: 'center',
          className: styles.TableFont,
          render(text) {
            if(text === "folder"){
              return <span className={icon.iconfont} style={{fontSize: "25px"}}>&#xe640;</span>
            }else{
              return <span className={icon.iconfont} style={{fontSize: "25px"}}>&#xe6c8;</span>
            }
          }
        },
        {
          title: 'Size',
          dataIndex: 'size',
          key: 'size',
          width: 50,
          align: 'center',
          className: styles.TableFont,
          sorter:(a,b) => a.size - b.size,
          render(text) {
            if(text !== -1){
              return formatFileSize(text);
            }else{
              return "";
            }
          }
        },
        {
          title: 'LastModified',
          dataIndex: 'lastmodified',
          key: 'lastmodified',
          width: 150,
          align: 'center',
          className: styles.TableFont,
          sorter: (a,b) => a.lastmodified - b.lastmodified,
          render(text) {
            return moment(text).format("YYYY/MM/DD HH:mm");
          }
        },
        {
          title: 'Download',
          dataIndex: 'download',
          key: 'download',
          width: 150,
          align: 'center',
          className: styles.TableFont,
          render(text){
            if(text.type === "folder"){
              return <Button type={"primary"} onClick={() => {
                message.info({
                  content: 'Folder No Download!',
                  duration: 1,
                  style: {
                    marginTop: '50px',
                    fontSize: '14px'
                  },
                })
              }} >Download</Button>
            }else{
              return <Button type={"primary"}><a href={remoteurl+"/download?fileName="+text} download>Download</a></Button>
            }
          },
        },
        {
          title: 'Delete',
          dataIndex: 'delete',
          key: 'delete',
          width: 150,
          align: 'center',
          className: styles.TableFont,
          render: (text) => (<Button type={"primary"} onClick={() => (onDeleteFile(text))}>Delete</Button>)
        },
      ];
      return setState(state,{"columns": list,"data": payload["data"],"path": payload["path"]});
    },



  },
  effects: {
    *changeData({ payload },{ call, put }) {
      const data = yield call(getFolder,payload["path"]);
      yield put({
        type: 'changeTable',
        payload:{
          data: formatTableData(data),
          path: payload["path"]
        }
      })
    },

    *removeFile({ payload }, { call, put, select }) {
      console.log(payload);
      const result = yield call(deleteRemoteFile, {fileName: payload["fileName"],filename: payload["path"]});
      const path = yield select(state => state.tableContent.path);
      const data = yield call(getFolder,path);
      yield put({
        type: 'changeTable',
        payload:{
          data: formatTableData(data),
          path: payload.path.replace(payload.fileName,"")
        }
      })

    }
  },
  subscriptions: {

  }
}