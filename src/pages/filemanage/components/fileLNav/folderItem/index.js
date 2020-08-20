import React from 'react';
import { connect } from 'dva';
import icon from '../../../statics/iconfont/iconfont.css'
import style from './index.css'

function FolderItem(props){
  const jiantou = () => {
    if(props.children.length === 0){
      return
    }
    if(props.isdevelop === "false"){
      return <span className={icon.iconfont} style={{fontSize: "20px",float: "left"}}>&#xe600;</span>
    }else{
      return <span className={icon.iconfont} style={{fontSize: "20px",float: "left"}}>&#xe643;</span>
    }
  }
  const space = parseInt(props.index)*20+"px";

  return (
    <div className={props.isclick==="true" ? style.Item_click:style.Item} onClick={() => {props.dispatch({type:'folderList/changeList',payload:{"path":props.path,value:{"isclick":true}}})}}>
      <div className={style.Content} style={{marginLeft: space}}>
        {jiantou()}
        {/*<span className={icon.iconfont} style={{fontSize: "25px",float: "left"}}>&#xe667;</span>*/}
        <div className={style.FolderName}>{props.name}</div>
      </div>
    </div>
  )
}

export default connect()(FolderItem);