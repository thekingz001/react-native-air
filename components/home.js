import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import GetLocation from 'react-native-get-location';
import styles from '../public/css';

export default class Home extends Component {
  state = {
    location: null,
    loading: false,
  }

  _requestLocation = () => {
    this.setState({ loading: true, location: null });

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 150000,
    })
      .then(location => {
        console.log('DATA IS =' + JSON.stringify(location));
        // console.log('latitude IS =' + JSON.stringify(location.latitude));
        // console.log('latitude IS =' + JSON.stringify(location.longitude));
        this.setState({
          location,
          loading: false,
        });
      })
      .catch(ex => {
        const { code, message } = ex;
        console.warn(code, message);
        if (code === 'CANCELLED') {
          Alert.alert('Location cancelled by user or by another request');
        }
        if (code === 'UNAVAILABLE') {
          Alert.alert('Location service is disabled or unavailable');
        }
        if (code === 'TIMEOUT') {
          Alert.alert('Location request timed out');
        }
        if (code === 'UNAUTHORIZED') {
          Alert.alert('Authorization denied');
        }
        this.setState({
          location: null,
          loading: false,
        });
      });
  }

  render() {
    const { location, loading } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.main}>Home From</Text>
        </View>
        <Text style={styles.instructions}>Welcome : {JSON.stringify(navigation.getParam('name'))} </Text>
        <Text style={styles.instructions}>To get location, press the button:</Text>
        <View style={styles.button}>
          <Button
            disabled={loading}
            title="Get Location"
            onPress={this._requestLocation}
          />
        </View>
        {loading ? (
          <ActivityIndicator />
        ) : null}
        {location ? (
          <Text style={styles.location}>Latitude IS ={JSON.stringify(location.latitude)}</Text>
        ) : null}
        {location ? (
          <Text style={styles.location}>Longitude IS ={JSON.stringify(location.longitude)}</Text>
        ) : null}
      </View>
    );
  }
}