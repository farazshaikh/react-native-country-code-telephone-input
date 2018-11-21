// Copyright (c) 2014-Present All rights reserved.
// The Authors at Excubito Pvt Ltd.

'use strict';

import React, { Component } from 'react';
import {
    Image,
    TextInput,
    ScrollView,
    View,
    TouchableOpacity,
    Modal,
    Text,
    StyleSheet
} from 'react-native';

import dataCountries from './data'

var styles = StyleSheet.create({
    containerCol: {
        flexDirection: 'column',
        marginVertical:8,
        marginHorizontal:8
    },

    containerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    viewBottomBorder: {
        marginHorizontal:8,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },

    TextCountryName: {
        fontSize:20,
        color:'#5890FF',
        marginVertical: 8,
        marginHorizontal: 8
    },

    searchBar: {
        padding: 3,
        paddingLeft: 8,
        height: 30,
        marginVertical: 8,
        marginHorizontal: 8,
        fontSize: 20,

    },
});


class CountryPicker extends Component {
    static propTypes = {
        onChange: React.PropTypes.func.isRequired,
    }

    constructor (props) {
        super(props)
        this.state = {
            modalVisible: false,
            search: "",
            rawCountryItem:{}
        }
    }

    notifyChange() {
        this.props.onChange(
            {name:this.state.rawCountryItem.name,
             cca2:this.state.rawCountryItem.code,
             callingCode:this.state.rawCountryItem.dial_code.replace(/\D/g,'')});
    }

    onSelectCountry(rawCountryItem) {
        this.setState({modalVisible:false, rawCountryItem:rawCountryItem},
                      this.notifyChange.bind(this))
    }

    openModal = this.openModal.bind(this);

    openModal() {
        this.setState({ modalVisible: true, search: "" });
    }

    doSearch(text) {
        this.setState({search: text})
        this.scrollView.scrollTo({x:0, y:0, animated:true})
    }

    renderCountry(rawCountryItem) {
        let countryItem =
            <TouchableOpacity
            key={rawCountryItem.code}
            onPress={() => this.onSelectCountry(rawCountryItem)}s >

            <View style={[styles.containerRow, styles.viewBottomBorder, {height:50, justifyContent: 'space-between'}]}>
            <Text style={styles.TextCountryName}> {rawCountryItem.name} </Text>
            <Text style={styles.TextCountryName}> {rawCountryItem.dial_code} </Text>
            </View>
            </TouchableOpacity>

        return countryItem
    }

    renderScrollView() {
        const createItem = (rawCountryItem) => {
            let search = this.state.search
            if (search && search.length &&
                rawCountryItem.name.toLowerCase().indexOf(search.trim().toLowerCase()) === -1) {
                return
            }

            return (this.renderCountry(rawCountryItem))
        }

        return (
                <View>
                <TextInput
                style={styles.searchBar}
                placeholder='Type a country name...'
                onChangeText={this.doSearch.bind(this)}
                value={this.state.search}
                clearButtonMode="while-editing"
                />

                <ScrollView ref={scrollView => this.scrollView = scrollView}>
                {dataCountries.map(createItem)}
                </ScrollView>
                </View>
        );
    }

    render() {
        return (
                <Modal
                visible={this.state.modalVisible}
                onRequestClose={() => this.setState({ modalVisible: false })}>

                <View style={styles.modalContainer}>
                	<TouchableOpacity onPress={() => this.setState({ modalVisible: false })} style={{marginTop:30,marginLeft:20}}>
                         <Image
                         style={{width: 20, height: 20}}
                         source={require('./back.png')}/>
                	</TouchableOpacity>
                	{this.renderScrollView() }
                </View>

                </Modal>
    );
  }
}

export default CountryPicker
