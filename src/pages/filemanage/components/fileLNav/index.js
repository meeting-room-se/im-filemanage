import React, { Fragment } from 'react';
import FolderItem from '@/pages/filemanage/components/fileLNav/folderItem';
import JsxParser from 'react-jsx-parser'
import { connect } from 'dva';
import icon from '../../statics/iconfont/iconfont.css'
import style from './index.css'


function getFolders(list,index){
  if(list.length === 0){
    return "";
  }else{
    let result='';
    for(const i in list){
      const children = getFolders(list[i].children,index+1);
      result = result+
        "<FolderItem name='"+list[i].name+"' isempty='"+list[i].isempty+"' isclick='"+list[i].isclick+"' index='"+index+"' isdevelop='"+list[i].isdevelop+"' path='"+list[i].path+"'> </FolderItem>\ "
        +children;
    }
    return result;
  }


}

function FileLNav(props){
  return (
    <div className={style.Wrapper}>
      <div className={style.Title}>
        <span className={icon.iconfont} style={{fontSize: "30px"}} >&#xe666;</span>
        <a className={style.Home} href={"/filemanage"}>FILE MANAGE</a>
      </div>
      <hr className={style.Hr}/>

      <div className={style.Folder}>
        <JsxParser
          components={{ FolderItem }}
          jsx={getFolders(props.list,0)}
        />
      </div>

    </div>
  )
}

function mapStateToProps({ folderList }) {
  return {
    list: folderList.list
  };
}

export default connect(mapStateToProps)(FileLNav);