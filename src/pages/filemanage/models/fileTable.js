import { Button } from 'antd'

export default {
  namespace: 'fileContent',
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
    data: []
  },
  reducers: {
    changeClick(state,{payload}){
      console.log("修改文件夹点击状态");
      const isclick = state.isclick.fill(false);
      isclick.splice(payload,1,true);
      const newState = JSON.parse(JSON.stringify(state));
      newState.isclick = isclick;
      return newState;
    },

    changeTable(state,{ payload }){
      console.log("修改文件列表");

    }


  }
};