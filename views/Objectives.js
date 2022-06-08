import React, { useState } from "react";
import { View, Text, Button, TouchableHighlight, Alert, TouchableOpacity } from "react-native";
import styles from "./styles";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Slider from "@react-native-community/slider";
import { doc, setDoc, Timestamp, getDoc, updateDoc, query, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import moment from "moment";

const Objectives = (props) => {
  const [data, setSliderData] = useState(1);
  const [heures, setHeures] = useState(1);
  const [heuresMoyennes, setHeuresMoyennes] = useState(1);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const getUserTime = async () => {
    const docName = auth.currentUser.email + " " + moment().format("YYYY-MM-DD");
    const docRef = doc(db, "Heures", docName);
    const docSnap = await getDoc(docRef);
    if(docSnap){
    setHeures(docSnap.data().HeuresAujourdhui)
    }
  };

  const getUserAverage = async () => {
  const q = query(collection(db, "Heures"));
  let heures = 0
  let count = 0

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    if(doc.data().user_email == auth.currentUser.email)
    heures += doc.data().HeuresAujourdhui;
    count ++;
  });
  setHeuresMoyennes(heures/count)
  }

  getUserTime()
  getUserAverage()

  return (
    <View style={styles.braceContainer}>
      <View style={styles.titles}>
        <Text style={styles.title}>Objectifs</Text>
        <Text style={styles.subtitle}>Lache pas!</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{ display: "flex", flexDirection: "column", marginLeft: 50 }}
        >
          <Text
            style={{
              color: "white",
              marginTop: 30,
              marginLeft: 30,
              fontSize: 18,
            }}
          >
            {heures} heures
          </Text>
          <AnimatedCircularProgress
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
            }}
            size={150}
            width={15}
            fill={heures/24*100}
            tintColor="lightblue"
            backgroundColor="grey"
            onAnimationComplete={() => console.log("onAnimationComplete")}
          >
            {(fill) => (
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                }}
              >
              {Math.round(heures/24*100)}%
              </Text>
            )}
          </AnimatedCircularProgress>
        </View>
        <View
          style={{ display: "flex", flexDirection: "column", marginRight: 50 }}
        >
          <Text
            style={{
              color: "white",
              marginTop: 30,
              marginLeft: 40,
              fontSize: 18,
            }}
          >
            Moyenne:{" "}
          </Text>
          <AnimatedCircularProgress
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
            }}
            size={150}
            width={15}
            fill={Math.round(heuresMoyennes/24*100)}
            tintColor="lightblue"
            backgroundColor="grey"
            onAnimationComplete={() => console.log("onAnimationComplete")}
          >
            {(fill) => (
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                }}
              >
                {Math.round(heuresMoyennes/24*100)}%
              </Text>
            )}
          </AnimatedCircularProgress>
        </View>
      </View>
      <Text style={{ color: "white", marginTop: 70, fontSize: 18 }}>
        Combien de temps as-tu porte ton corset? (heures){" "}
      </Text>
      <View style={{ display: "flex", flexDirection: "row", marginTop: 30 }}>
        <Slider
          style={{ width: 300, marginLeft: 45 }}
          minimumValue={0.5}
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
      <TouchableHighlight
        style={{
          height: 40,
          width: 160,
          borderRadius: 10,
          backgroundColor: "grey",
          marginTop: 30,
          marginLeft: 130,
        }}
      >
        <Button  onPress={() => {updateUser(data); forceUpdate()}} title="Envoyer" color="white" />
      </TouchableHighlight>
    </View>
  );
};

const updateUser = async (d) => {
  const docName = auth.currentUser.email + " " + moment().format("YYYY-MM-DD");
  const docRef = doc(db, "Heures", docName);
  const docSnap = await getDoc(docRef);


  if (docSnap.exists()) {
    if(docSnap.data().HeuresAujourdhui + d > 24) {
      Alert.alert("Vous ne pouvez pas depasser 24h.")
    }
    else {
    await updateDoc(docRef, {
      HeuresAujourdhui: docSnap.data().HeuresAujourdhui + d
    });
    Alert.alert("Bien envoye. Tes heures ont ete mises a jour")
  }
  } else {
    // doc.data() will be undefined in this case
    setDoc(
      doc(
        db,
        "Heures",
        auth.currentUser?.email + " " + moment().format("YYYY-MM-DD")
      ),
      {
        user: auth.currentUser?.uid,
        user_email: auth.currentUser?.email,
        date: moment().format("lll"),
        HeuresAujourdhui: d,
        // HeuresMoyenne: data,
      }
    ).then(Alert.alert("Bien envoye. Merci pour ton temps!"));
  }
};

export default Objectives;
