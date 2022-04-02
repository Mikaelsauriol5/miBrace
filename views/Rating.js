import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  Button,
  Alert,
  TouchableHighlight,
  
} from "react-native";
import styles from "./styles";
import Slider from "@react-native-community/slider";

const Rating = () => {
  return (
    <View style={styles.braceContainer}>
      <ImageBackground
        source={require("../assets/images/black.png")}
        style={styles.image}
      />
      <View style={styles.titles}>
        <Text style={styles.title}>Satisfaction</Text>
        <Text style={styles.subtitle}>Comment tu te sens?</Text>
      </View>
      <View style={{  marginTop: 100 }}>
      <Text style={styles.sub}>Es-tu comforatable?</Text>
      <Slider
        style={{  width: 400 }}
        minimumValue={1}
        maximumValue={5}
        minimumTrackTintColor="white"
        maximumTrackTintColor="white"
      />
      </View>
      <View style={{  marginTop: 100 }}>
    <Text style={styles.sub}>Es-tu satisfait?</Text>
      <Slider
        style={{  width: 400 }}
        minimumValue={1}
        maximumValue={5}
        minimumTrackTintColor="white"
        maximumTrackTintColor="white"
      />
      </View>
      <TouchableHighlight 
                style ={{
                    height: 40,
                    width:160,
                    borderRadius:10,
                    backgroundColor : "white",
                    marginLeft :130,
                    marginRight:50,
                    marginTop :100
                }}>
            <Button
            onPress={() => Alert.alert('Bien envoye. Merci pour ton temps!')}           
            title="Envoyer"
            color="black"
          /> 
          </TouchableHighlight> 
    </View>
  );
};

export default Rating;
