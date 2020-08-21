import React from 'react';
import { connect } from 'dva';
import icon from '../../../statics/iconfont/iconfont.css'
import style from './index.css'

function FolderItem(props){
  const jiantou = () => {
    if(props.isdevelop === "false"){
      return <span
        className={icon.iconfont}
        style={{fontSize: "20px",float: "left", cursor: "pointer"}}
        onClick={() => {props.dispatch({
          type:'folderList/changeDevelop',
          payload: {
            path: props.path,
            isdevelop: props.isdevelop
          }
        })}}>&#xe616;</span>
    }else{
      return <span
        className={icon.iconfont}
        style={{fontSize: "20px",float: "left", cursor: "pointer"}}
        onClick={() => {props.dispatch({
          type:'folderList/changeDevelop',
          payload: {
            path: props.path,
            isdevelop: props.isdevelop
          }
        })}}>&#xe641;</span>
    }
  }
  const space = parseInt(props.index)*20+50+"px";

  return (
    <div className={props.isclick==="true" ? style.Item_click:style.Item}>
      <div className={style.Content} style={{marginLeft: space}}>
        {jiantou()}
        <span className={icon.iconfont} style={{fontSize: "25px",float: "left"}}>&#xe640;</span>
        <div
          className={style.FolderName}
          // 点击选中文件夹事件
          onClick={() => {
            props.dispatch({
              type:'folderList/changeClick',
              payload:{"path":props.path,value:{"isclick":true}}
            });
            props.dispatch({
              type:'tableContent/changeData',
              payload:{"path":props.path}
            })
          }}>{props.name}</div>
      </div>
    </div>
  )
}

export default connect()(FolderItem);