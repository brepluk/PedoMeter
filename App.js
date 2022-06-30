import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, } from 'react-native';
import { Pedometer } from 'expo-sensors';
import CircularProgress from 'react-native-circular-progress-indicator';

export default function App() {

  const [PedometerAvailability, setPedometerAvailability] = useState("");
  const [stepCount, setStepCount] = useState(0);

  var WindowHeight = Dimensions.get("window").height;

  var Dist = stepCount /1300;
  var DistanceCovered = Dist.toFixed(4);
  var cal = DistanceCovered * 60;
  var caloriesBurnt = cal.toFixed(4);

  React.useEffect(() => {
    subscribe();
  },[])
 
  
subscribe = () => {
  const subscription = Pedometer.watchStepCount((result) => {
    setStepCount(result.steps);
  });

  Pedometer.isAvailableAsync().then(
    (result) => {
      setPedometerAvailability(String(result));
    },
    (error) => {
      setPedometerAvailability(error);
    }
  );
}


  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        resizeMode="cover"
        source={require('./assets/stepsun3.jpg')}>
      <View style={styles.text}>
     
     {/* <Text style={styles.heading}>Is Pedometer available on device : {PedometerAvailability}</Text> */}

      <View style={styles.circle}>
        <CircularProgress
        value={stepCount}
        maxValue={6500}
        radius={210}
        textColor={"#ecf0f1"}
        activeStrokeColor={"#000"}
        inActiveStrokeColor={"#29465B"}
        inActiveStrokeOpacity={0.5}
        inActiveStrokeWidth={40}
        activeStrokeWidth={40}
        title={"Step Count"}
        titleColor={"#000"}
        titleStyle={{ fontWeight: "bold" }}
        />
      </View>

    
      <View style={styles.goals}>
        <Text style={styles.textGoals}>
          Target : 6500 Steps (5kms)
        </Text>
        </View>

        <View style={styles.goals}>
        <Text style={[styles.textGoals, { width: "93%" },
]}
>
          Distance Covered : {DistanceCovered} km
        </Text>
      </View>

      <View style={styles.goals}>
        <Text style={styles.textGoals}>
          Calories Burnt : {caloriesBurnt}
        </Text>
      </View>
  
      </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
  },
  text: {
    flex: 1,
    justifyContent: 'center',
  },
  heading:{
    color: '#fff',
    backgroundColor: 'rgba(112,132,151,0.63)',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold', 
  },
  textGoals:{
    height: 30,
    width : '85%',
    borderColor: '#cecece',
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
    fontSize: 20,
    color: '#cecece',
    fontWeight: "bold",
    paddingVertical: 5,
    paddingHorizontal: 5,
    paddingLeft: 20,
    },
    circle: {
      justifyContent: 'center',
      flex: 8
    },
  goals: {
    flex: 1
},


});
