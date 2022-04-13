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
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from '../firebase';
import moment from 'moment';

//auth.currentUser?.email

const Rating = () => {
  const [data, setSliderData] = useState(1);
  const [data1, setSliderData1] = useState(1);
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
      <View style={{ marginTop: 100 }}>
        <Text style={styles.sub}>Es-tu comforatable?</Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Slider
            style={{ width: 350 }}
            minimumValue={1}
            maximumValue={5}
            step={0.5}
            minimumTrackTintColor="white"
            maximumTrackTintColor="white"
            value={data1}
            onValueChange={
              (sliderValue1) => setSliderData1(sliderValue1)
            }
          />
          <Text style={{ color: "white", marginLeft: 25, fontSize: 30, }}>
            {data1}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 50 }}>
        <Text style={styles.sub}>Es-tu satisfait?</Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Slider
            style={{ width: 350 }}
            minimumValue={1}
            maximumValue={5}
            step={0.5}
            minimumTrackTintColor="white"
            maximumTrackTintColor="white"
            value={data}
            onValueChange={
              (sliderValue) => setSliderData(sliderValue)
            }
          />
          <Text style={{ color: "white", marginLeft: 25, fontSize: 30, }}>
            {data}
          </Text>
        </View>
      </View>
      <TouchableHighlight
        style={{
          height: 40,
          width: 160,
          borderRadius: 10,
          backgroundColor: "grey",
          marginTop: 70
        }}>
        <Button
          onPress={() =>
            setDoc(doc(db, "Satisfaction", moment().format('lll')), {
              user: auth.currentUser?.uid,
              user_email: auth.currentUser?.email,
              date: moment().format('lll'),
              Comfort: data1,
              Satisfaction: data
            }).then(Alert.alert('Bien envoye. Merci pour ton temps!'))
          }
          title="Envoyer"
          color="white"
        />
      </TouchableHighlight>
    </View>
  );
};

export default Rating;


