import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {design} from './styles/styles';

export default function Home() {
  const initialState = {total: 5000, period: 3};
  const [sliderValue, setsliderValue] = useState(initialState);

  const sliderHandler = (total, period) => {
    let newTotal = Math.trunc(total);
    let newPeriod = Math.trunc(period);
    setsliderValue({...sliderValue, total: newTotal, period: newPeriod});
  };

  const totalInputHandler = total => {
    let newTotal = Number(total.nativeEvent.text);
    if (newTotal >= 5000 && newTotal <= 50000) {
      setsliderValue({...sliderValue, total: newTotal});
    } else {
      Alert.alert(
        'Error en el monto ingresado',
        'Debes introducir un valor entre  $ 5.000 y $ 50.000',
        [
          {
            style: 'cancel',
          },
          {text: 'OK'},
        ],
      );
    }
  };

  const periodInputHandler = period => {
    let newPeriod = Number(period.nativeEvent.text);
    if (newPeriod >= 3 && newPeriod <= 24) {
      setsliderValue({...sliderValue, period: newPeriod});
    } else {
      Alert.alert(
        'Error en el periodo ingresado',
        'Debes introducir un valor entre 3 y 24',
        [
          {
            style: 'cancel',
          },
          {text: 'OK'},
        ],
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Simulá tu crédito</Text>

        <View style={styles.slidersContent}>
          <View style={styles.sliders}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.highlightedText}>monto total</Text>
              <TextInput
                style={styles.inputs}
                keyboardType="numeric"
                defaultValue={sliderValue.total.toString()}
                onEndEditing={total => totalInputHandler(total)}
              />
            </View>

            <Slider
              style={styles.slider}
              minimumValue={5000}
              maximumValue={50000}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#FFFFFF"
              thumbTintColor="#FFFFFF"
              step={100}
              value={sliderValue.total}
              onValueChange={total => sliderHandler(total, sliderValue.period)}
            />

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.highlightedText}>$ 5.000</Text>
              <Text style={styles.highlightedText}>$ 50.000</Text>
            </View>
          </View>
          <View style={styles.sliders}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.highlightedText}>monto total</Text>
              <TextInput
                style={styles.inputs}
                keyboardType="numeric"
                defaultValue={sliderValue.period.toString()}
                onEndEditing={period => periodInputHandler(period)}
              />
            </View>

            <Slider
              style={styles.slider}
              minimumValue={3}
              maximumValue={24}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#FFFFFF"
              thumbTintColor="#FFFFFF"
              step={1}
              value={sliderValue.period}
              onValueChange={period => sliderHandler(sliderValue.total, period)}
            />

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.highlightedText}>3</Text>
              <Text style={styles.highlightedText}>24</Text>
            </View>
          </View>
        </View>

        <View>
          <View style={styles.v1}>
            <Text style={[styles.highlightedText, {fontWeight: 'bold'}]}>
              cuota fija por mes
            </Text>
            <Text style={[styles.title, {fontSize: 28}]}>
              $ {Math.trunc(sliderValue.total / sliderValue.period)}
            </Text>
          </View>

          <View style={styles.v2}>
            <TouchableOpacity
              onPress={() =>
                Alert.alert('', 'Crédito Otorgado', [{text: 'OK'}])
              }
              style={styles.v3}>
              <View>
                <Text style={styles.highlightedText}>obtené crédito</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Alert.alert('', 'Detalle de cuotas', [{text: 'OK'}])
              }
              style={styles.v4}>
              <View>
                <Text style={styles.highlightedText}>
                  ver detalle de cuotas
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create(design);
