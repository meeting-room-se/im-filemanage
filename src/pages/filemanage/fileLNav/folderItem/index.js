import React, { Fragment } from 'react';
import icon from '../../statics/iconfont/iconfont.css'
import style from './index.css'

function FolderItem(props){
  return (
    <div className={style.Item}>
      <div className={style.Content}>
        <span className={icon.iconfont} style={{fontSize: "25px",float: "left"}}>&#xe667;</span>
        <div className={style.FolderName}>test</div>
      </div>
    </div>
  )
}

export default FolderItem;