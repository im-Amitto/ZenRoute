import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Home = () => {
  return (
    <View>
      <Text style={styles.textStyle}>Hello Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  textStyle: {
    color: 'black',
  },
});
