import { Button } from 'antd';
import { formatTableData, setState } from '@/pages/filemanage/Utils/state';
import getFolder from '@/pages/filemanage/service';
export default {
  namespace: 'tableContent',
  state: {
    columns: [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Size',
        dataIndex: 'size',
        key: 'size',
      },
      {
        title: 'LastModified',
        dataIndex: 'lastmodified',
        key: 'lastmodified',
      },
      {
        title: 'Download',
        dataIndex: 'download',
        key: 'download',
        render(text){
          return <Button type={"primary"}>Download</Button>
        },
      },
      {
        title: 'Delete',
        dataIndex: 'delete',
        key: 'delete',
        render: (text) => (<Button type={"primary"}>Delete</Button>)
      },
    ],
    data: [
      {
        key:"0",
        name:"pic",
        type:"folder",
        size:"",
        lastmodified:1597979042000,

      },
      {
        key:"1",
        name:"workspace",
        type:"folder",
        size:"",
        lastmodified:1597636059000,
      }
    ],
    path: ''
  },
  reducers: {
    changeTable(state,{ payload }) {
      const list = JSON.parse(JSON.stringify(state.columns));
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