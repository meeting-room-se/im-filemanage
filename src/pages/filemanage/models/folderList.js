import { setState, setFolderProps } from '@/pages/filemanage/Utils/state';

export default {
  namespace: 'folderList',
  state: {
    list: [
      {
        name: 'test1',
        children: [
          {
            name: 'test3',
            children: [],
            isclick: false,
            isdevelop: false,
            isempty: false,
            path: "/test1/test3"
          }
        ],
        isclick: false,
        isdevelop: true,
        isempty: false,
        path: "/test1"
      },
      {
        name: 'test2',
        children: [

          ],
        isclick: false,
        isdevelop: false,
        isempty: true,
        path: "/test2"
      },
    ],
    currentfolder: ''
  },
  reducers: {
    changeList(state,{ payload }){
      setFolderProps(state.list,payload["path"],payload["value"]);
      setFolderProps(state.list,state.currentfolder,{"isclick": false});
      console.log(state.list);
      const list = JSON.parse(JSON.stringify(state.list));
      return setState(state,{"list":list,"currentfolder": payload["path"]});
    }
  },
};