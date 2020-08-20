import { Button } from 'antd';
import { setState } from '@/pages/filemanage/Utils/state';
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
        render: () => <Button type={"primary"}>Download</Button>,
      },
      {
        title: 'Delete',
        dataIndex: 'delete',
        key: 'delete',
        render: () => <Button type={"primary"}>Delete</Button>,
      },
    ],
    data: [],
    path: ''
  },
  reducers: {
    // changeData(state,)
    // changeTable(state,{ payload }){
    //   console.log(payload);
    //   return setState(state,payload);
    // }
  },
  effects: {
    *changeTable(action, { select }) {
      const data =
      console.log()
    }
  }
}