import React from 'react';
import FolderItem from '@/pages/filemanage/fileLNav/folderItem';
import { connect } from 'dva';
import icon from'../statics/iconfont/iconfont.css'

import style from './index.css'

function FileLNav(props){
  return (
    <div className={style.Wrapper}>
      <div className={style.Title}>
        <span className={icon.iconfont} style={{fontSize: "30px"}} >&#xe666;</span>
        <a className={style.Home}>FILE MANAGE</a>
      </div>
      <hr/>
      <div className={style.Folder}>
        {/*{props.name.map((item) => {*/}
        {/*  return <FolderItem></FolderItem>*/}
        {/*})}*/}
      </div>

    </div>
  )
}

function mapStateToProps(state) {
  return {
    FolderName: state.name
  };
}

export default connect(mapStateToProps)(FileLNav);