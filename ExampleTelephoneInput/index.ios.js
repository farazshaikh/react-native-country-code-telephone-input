// Copyright (c) 2014-Present All rights reserved.
// The Authors at Excubito Pvt Ltd.

'use strict';

import React, {Component} from 'react';
import {
   AppRegistry,
   StyleSheet,
   Text,
   TextInput,
   View,
   ActivityIndicator
}  from 'react-native';

import {
   Button,
} from 'native-base'

import { parse, format, asYouType, isValidNumber } from 'libphonenumber-js'
import PhoneNumberPicker from 'react-native-telephone-input'

class LoginPin extends React.Component {
   constructor (props) {
      super(props)
      this.state = {
         networkRequestPending:false,
         errorMessage: "",
         countryName: "Unknown",
         callingCode:'1',
         phoneNo: '0000',
      }
   }

   networkRequestStarted() {
      //console.log(arguments.callee.name || "anonymous")
      return this.setState({errorMessage: "...", networkRequestPending:true})
   }

   networkRequestCompleted(errorMessage = "") {
      //console.log(arguments.callee.name || "anonymous")
      if (typeof errorMessage !== 'string') {
         console.log(errorMessage)
         debugger
         errorMessage = "errorMessageNotString"
      }
      return this.setState({errorMessage: errorMessage, networkRequestPending:false})
   }


   PhoneSubmit() {
      this.networkRequestStarted() 
      // your fetch call here with this.state.callingCode & this.state.phoneNumber
   }

   PhoneNumberPickerChanged(country, callingCode, phoneNumber) {
      this.setState({countryName: country.name, callingCode: callingCode, phoneNo:phoneNumber});
   }

   PickerIsValidPhoneNumber() {
      return isValidNumber("+" + this.state.callingCode + this.state.phoneNo)
   }

   render() {
      return (
         <View style= {{marginTop:64}}>
         <Text style={styles.infoMsg}>  We will send a SMS to verify your phone number. Enter your country code and phone number.
 </Text>

         <PhoneNumberPicker
         countryHint={this.props.countryHint}
         onChange={this.PhoneNumberPickerChanged.bind(this)}/>

         <Text style={styles.infoMsg}>
         {
            this.PickerIsValidPhoneNumber() ?
            "Phone number valid" :
            "Enter your phone number"
         }
         </Text>

         <Button disabled={this.PickerIsValidPhoneNumber() == false || this.state.networkRequestPending}
         style={{alignSelf:"center"}} onPress={this.PhoneSubmit.bind(this)}>
        Get login pin 
	</Button>

         <ActivityIndicator
         animating={this.state.networkRequestPending}
         style={{alignSelf:"center", width:40}}/>


         <Text style={styles.infoMsg}> Carrier SMS charges may apply </Text>
         <Text style={styles.infoMsg}> {this.state.errorMessage} </Text>


         {__DEV__ &&
            <Text style={styles.infoMsg}>
            {this.state.countryName} + {this.state.callingCode} - {this.state.phoneNo}
            </Text>
         }
         </View>
      );
   }
}

LoginPin.PropTypes = {
   countryHint: React.PropTypes.object,
   appStrings:  React.PropTypes.object.isRequired,
}

let styles = StyleSheet.create({
    infoMsg: {
        marginHorizontal:20,
        marginVertical:10,
        textAlign: 'center'
    },
});


AppRegistry.registerComponent('ExampleTelephoneInput', () => LoginPin);
