import React, {Fragment} from "react";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import 'antd/dist/antd.css';
import { Emoji, emojiIndex } from 'emoji-mart';

import styles from './App.module.css';
import  axios from "axios";
import { Button, Input, Popover } from 'antd';
export default class App extends React.Component {
    state = {
        inputValue: "",
        emoji:""
    };
    render() {
        return (
          <Fragment>
              <div style={{textAlign: "center"}}>
                  <Picker
                    showPreview={false}
                    showSkinTones={false}
                    onSelect={(emoji) => {
                        console.log(emoji);
                        this.setState({
                            inputValue:this.state.inputValue+emoji.native,
                            emoji: emoji
                        })
                    }}
                  />
                  <Input value={this.state.inputValue} >
                  </Input>
                  <Emoji emoji={this.state.emoji} size={16} />
              </div>
            <Popover content={<Picker i18n={{ search: 'Recherche', categories: { search: 'Résultats de recherche', recent: 'Récents' } }} />}>
              <Button>hhh</Button>
            </Popover>


          </Fragment>
        );
    }
}