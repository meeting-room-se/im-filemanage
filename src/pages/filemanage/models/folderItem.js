import { setState, getFolderName } from '@/pages/filemanage/Utils/state';

export default {
  namespace: 'folderItem',
  state: {
    name: 'test',
    children: [1,2,3],
    isclick: false,
    isdevelop: false,
  },
  reducers: {

    // 初始化左边栏文件夹选项
    initFolderItem(state, { payload }) {
      const name = getFolderName(payload);
      const isclick = [].fill(false,0,name.length-1)
      return setState(state,{"name": name,"isclick": isclick});
    },
    // 改变文件夹点击状态
    changeClick(state,{ payload }){
      console.log("修改文件夹点击状态");
      const isclick = state.isclick.fill(false);
      isclick.splice(payload,1,true);
      return setState(state,{
        "isclick": isclick
      });
    }
  },
};