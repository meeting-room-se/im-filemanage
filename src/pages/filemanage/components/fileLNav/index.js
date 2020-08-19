import React from 'react';
import FolderItem from '@/pages/filemanage/components/fileLNav/folderItem';
import { connect } from 'dva';
import icon from '../../statics/iconfont/iconfont.css'
import style from './index.css'

function FileLNav(props){
  return (
    <div className={style.Wrapper}>
      <div className={style.Title}>
        <span className={icon.iconfont} style={{fontSize: "30px"}} >&#xe666;</span>
        <a className={style.Home} href={"/filemanage"}>FILE MANAGE</a>
      </div>
      <hr className={style.Hr}/>

      <div className={style.Folder}>
        {props.FolderName.map((item,index) => {
          return <FolderItem key={item} filename={item} isclick={props.IsClick[index]} itemindex={index}> </FolderItem>
        })}
      </div>

    </div>
  )
}

function mapStateToProps(state) {
  return {
    FolderName: state.folderItem.name,
    IsClick: state.folderItem.isclick
  };
}



export default connect(mapStateToProps)(FileLNav);