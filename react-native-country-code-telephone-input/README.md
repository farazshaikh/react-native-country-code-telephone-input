# React native phone number picker and Numeric pin picker
Ready-to-use components for building a Whatsapp style user onboarding workflow

* Accept user phone input
* Basic validation for user phone input based on country code
* Country calling code picker
* Validate 6 digit pin
* Works for both android and iOS
* little emphasis on look and feel and more on functionality. Users can always change color/images etc

Dependency: React-Native


### Example
```
npm install react-native-country-code-telephone-input --save
```

```javascript
import PhoneNumberPicker from 'react-native-country-code-telephone-input'

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
#git clone https://github.com/farazshaikh/react-native-country-code-telephone-input
#cd react-native-country-code-telephone-input/ExampleTelephoneInput
#npm install
#react-native run-ios
```




![](https://raw.githubusercontent.com/farazshaikh/react-native-country-code-telephone-input/master/ExampleTelephoneInput/screenshots/3.png)
![](https://raw.githubusercontent.com/farazshaikh/react-native-country-code-telephone-input/master/ExampleTelephoneInput/screenshots/4.png)
![](https://raw.githubusercontent.com/farazshaikh/react-native-country-code-telephone-input/master/ExampleTelephoneInput/screenshots/7.png)
![](https://raw.githubusercontent.com/farazshaikh/react-native-country-code-telephone-input/master/ExampleTelephoneInput/screenshots/8.png)


![](https://raw.githubusercontent.com/farazshaikh/react-native-country-code-telephone-input/master/ExampleTelephoneInput/screenshots/1.png)
![](https://raw.githubusercontent.com/farazshaikh/react-native-country-code-telephone-input/master/ExampleTelephoneInput/screenshots/2.png)
![](https://raw.githubusercontent.com/farazshaikh/react-native-country-code-telephone-input/master/ExampleTelephoneInput/screenshots/5.png)
![](https://raw.githubusercontent.com/farazshaikh/react-native-country-code-telephone-input/master/ExampleTelephoneInput/screenshots/6.png)


### Changelog
- 0.0.1 first version




[MIT](LICENSE)



Contributions welcome.
