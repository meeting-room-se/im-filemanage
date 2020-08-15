import React from 'react';
import { connect } from 'dva';
import icon from '../../../statics/iconfont/iconfont.css'
import style from './index.css'

function FolderItem(props){
  return (
    <div className={props.isclick ? style.Item_click:style.Item} onClick={() => {props.dispatch({type:'folder/changeClick',payload:props.itemindex})}}>
      <div className={style.Content}>
        <span className={icon.iconfont} style={{fontSize: "25px",float: "left"}}>&#xe667;</span>
        <div className={style.FolderName}>{props.filename}</div>
      </div>
    </div>
  )
}


export default connect()(FolderItem);