import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Image
} from 'react-native';

import styles from '../public/css';

const userinfo = { email: 'admin@admin', password: 'admin' };

export default class Login extends Component {
    loginfuntion = async () => {
        console.log("This Email = " + this.state.email);
        if (userinfo.email === this.state.email && userinfo.password === this.state.password) {
            alert('Login');
            await AsyncStorage.setItem('islogin', "1")
            this.props.navigation.navigate('home')
        }
        else {
            alert('No Login');
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    checkBoxTest()
    {
        this.setState({
            check:!this.state.check
        })
        alert("now value is "+ this.state.check)
    }

    render() {
        return (
            <View style={[styles.box, styles.container]}>
                <View style={styles.container}>
                    <Text style={[styles.main, styles.textShadow]}>LOGIN</Text>
                </View>

                {/*<View style={styles.container}>
                <Image style={styles.img}
                    source={require('../public/images/logo2.png')} />
                </View>*/}

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Email"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Password"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password} />
                </View>

                <View>
                    <Text style={styles.forgetp}>Forget Password?</Text>
                </View>

                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton, styles.shadow]} onPress={() => this.loginfuntion()}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
                
                <View>
                    <Text style={styles.signup}>Don't have an account? <Text style={styles.signupp} onPress={() => this.props.navigation.navigate('register')}> Sign up here!</Text></Text>
                </View>
            </View>
        );
    }
}

