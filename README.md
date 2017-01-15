# React native phone number picker and Numeric pin picker
Ready-to-use components for building a Whatsapp style user onboarding workflow

* Accept user phone input
* Basic validation for user phone input based on country code
* Country calling code picker
* Validate 6 digit pin
* Works for both android and iOS
* little emphasis on look and feel and more on functionality. Users can always change color/images etc



Dependency: React-Native

![](https://github.com/farazshaikh/react-native-telephone-input/blob/master/ExampleTelephoneInput/screenshots/1.png =320x568)
![](https://github.com/farazshaikh/react-native-telephone-input/blob/master/ExampleTelephoneInput/screenshots/2.png)
![](https://github.com/farazshaikh/react-native-telephone-input/blob/master/ExampleTelephoneInput/screenshots/3.png)
![](https://github.com/farazshaikh/react-native-telephone-input/blob/master/ExampleTelephoneInput/screenshots/4.png)
![](https://github.com/farazshaikh/react-native-telephone-input/blob/master/ExampleTelephoneInput/screenshots/5.png)
![](https://github.com/farazshaikh/react-native-telephone-input/blob/master/ExampleTelephoneInput/screenshots/6.png)


### Changelog
- 0.0.1 first version

### Example

```javascript
import PhoneNumberPicker from 'react-native-telephone-input'

class UserOnBoarding extends React.Component {
        PhoneNumberPickerChanged(country, callingCode, phoneNumber) {
            this.setState({countryName: country.name, callingCode: callingCode, phoneNo:phoneNumber});
         }

         render() {
         <PhoneNumberPicker
         countryHint={{name: 'United States', cca2: 'US', callingCode:"1"}}
         onChange={this.PhoneNumberPickerChanged.bind(this)}/>
         }
}
```


See ExampleTelephoneInput for a sample.
```
#git clone https://github.com/farazshaikh/react-native-telephone-input
#cd react-native-telephone-input/ExampleTelephoneInput
#npm install
#react-native run-ios
```

[MIT](LICENSE)



Contributions welcome.
