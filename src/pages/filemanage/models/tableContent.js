import { Button } from 'antd';
import { formatFileSize, formatTableData, setState } from '@/pages/filemanage/Utils/state';
import moment from 'moment';
import getFolder, { remoteurl } from '@/pages/filemanage/service';
import React from 'react';
import icon from '@/pages/filemanage/statics/iconfont/iconfont.css';
import styles from '../components/fileContent/index.css'
export default {
  namespace: 'tableContent',
    state: {
      columns: [],
      data:[],
      path: '',
      uploadurl: ""
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
          render(text) {
            return formatFileSize(text);
          }
        },
        {
          title: 'LastModified',
          dataIndex: 'lastmodified',
          key: 'lastmodified',
          width: 150,
          align: 'center',
          className: styles.TableFont,
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
            console.log(text);
            return <Button type={"primary"}><a href={remoteurl+"/download?fileName="+text} download>Download</a></Button>
          },
        },
        {
          title: 'Delete',
          dataIndex: 'delete',
          key: 'delete',
          width: 150,
          align: 'center',
          className: styles.TableFont,
          render: (text) => (<Button type={"primary"}>Delete</Button>)
        },
      ];
        return setState(state,{"columns": list,"data": payload["data"],"path": payload["path"]});
    }
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
    }
  },
  subscriptions: {

  }
}