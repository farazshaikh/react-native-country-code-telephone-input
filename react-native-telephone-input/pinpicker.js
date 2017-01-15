// Copyright (c) 2014-Present All rights reserved.
// The Authors at Excubito Pvt Ltd.

'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux'
import {
   Text,
   StyleSheet,
   TextInput,
   View,
}  from 'react-native';

import RegisterAPI    from '../../lib/libregisterapi'
import FilledButton   from '../filledbutton'
import CommonStyles   from '../commonstyles'
import LoginPINVerify from './loginpinverify'

import Icon from 'react-native-vector-icons/FontAwesome'

import { parse, format, asYouType } from 'libphonenumber-js'
/* maps callingCode -> CCA2        */
import CallingCodeToCCA2 from 'libphonenumber-js/metadata.min'

import CountryPicker from './countrypicker'
/* maps CCA2 -> CountryLocalDetails */
import Countries     from './data'


var styles = StyleSheet.create({
    containerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
});


class PinPicker extends React.Component {
    constructor (props) {
       super(props)
       let digits = []
       let releaseFocus = []
       for (let i = 0; i  < this.props.numDigits; i++) {
          digits[i] = ""
          releaseFocus[i] = 0
       }

       this.state = {
          digits:digits,
          releaseFocus:releaseFocus,
          setFocusIdx:0
      }
   }

   updateFocus() {
      if (this.state.setFocusIdx !== undefined)
         this.refs[Math.min(this.state.setFocusIdx, this.props.numDigits - 1)].focus()
   }

   pinChanged() {
      let pin=""
      for (let i = 0; i  < this.props.numDigits; i++) {
          pin += this.state.digits[i]
      }
      pin = pin.replace(/\D/g,'');
      this.props.onPinChanged(pin)
      this.updateFocus()
   }

   renderPinInput() {
      let pinBoxes = []
      for (let i = 0; i < this.props.numDigits; i ++) {
         let onChangeText = (text) => {
            let setFocusIdx = i
            if (text.length) {
               setFocusIdx = i + 1
            }

            var digits = this.state.digits.slice()
            digits[i] = text
            this.setState({digits:digits, setFocusIdx:setFocusIdx},
                          this.pinChanged.bind(this))
         }

         let onKeyPress = () => {
            /* detect a backspace and focus on the prior element */
            if (i == 0) {
               return
            }

            let focusIdx = i
            if (this.state.digits[i] === undefined ||
                this.state.digits[i].length == 0) {
                   /* detect backspace pressed twice in a row with contents being empty */
                   var releaseFocus = this.state.releaseFocus.slice()
                   releaseFocus[i] = releaseFocus[i] + 1
                   if (releaseFocus[i] > 1) {
                      releaseFocus[i] = 0
                      focusIdx =  i - 1
                   }
                   this.setState({releaseFocus:releaseFocus, setFocusIdx:focusIdx},
                                 this.updateFocus.bind(this))
            }
         }

         pinBoxes.push(
            <TextInput key={i}
            autoFocus={i == 0}
            style={{fontSize:20, height:100, width:20}}
            value={this.state.digits[i]}
            ref={i}
            onChangeText={onChangeText.bind(this)}
            maxLength={1}
            placeholder={"#"}
            onKeyPress={onKeyPress.bind(this)}
            keyboardType="numeric"
            />)
      }
      return pinBoxes
   }

   render() {
      return (
         <View style={[styles.containerRow, {marginHorizontal: 0}]}>
         {this.renderPinInput()}
         </View>
      );
    }
}

PinPicker.PropTypes = {
    onChangePin: React.PropTypes.func.isRequired,
    numDigits: React.PropTypes.number,
}

PinPicker.defaultProps = {
    numDigits: 6
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(PinPicker)
