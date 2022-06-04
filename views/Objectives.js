import React, { useState } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Slider from "@react-native-community/slider";

const Objectives = (props) => {
  const [data, setSliderData] = useState(1);
  return (
    <View style={styles.braceContainer}>
      <View style={styles.titles}>
        <Text style={styles.title}>Objectifs</Text>
        <Text style={styles.subtitle}>Lache pas!</Text>
      </View>
      <AnimatedCircularProgress
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 60,
        }}
        size={100}
        width={15}
        fill={30}
        tintColor="lightblue"
        backgroundColor="grey"
        onAnimationComplete={() => console.log("onAnimationComplete")}
      /><Text style={{color:'white'}}>Temps porte aujourd'hui: </Text>
        <AnimatedCircularProgress
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 60,
        }}
        size={100}
        width={15}
        fill={65}
        tintColor="lightblue"
        backgroundColor="grey"
        onAnimationComplete={() => console.log("onAnimationComplete")}
      /><Text style={{color:'white'}}>Ta moyenne: </Text>
      <Text style={{color:'white', marginTop: 20}}>Combien de temps as-tu porte ton corset? </Text>
           <View style={{ display: "flex", flexDirection: "row", marginTop: 30 }}>
          <Slider
            style={{ width: 300 }}
            minimumValue={1}
            maximumValue={23}
            step={0.5}
            minimumTrackTintColor="lightblue"
            maximumTrackTintColor="lightblue"
            value={data}
            onValueChange={(sliderValue) => setSliderData(sliderValue)}
          />
          <Text style={{ color: "lightblue", marginLeft: 25, fontSize: 30 }}>
            {data}
          </Text>
        </View>
    </View>
  );

  
};

export default Objectives;
