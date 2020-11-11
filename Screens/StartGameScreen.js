import React, { useState } from 'react';
import { View, 
    Text, 
    StyleSheet, 
    Button, 
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';

import Cards from '../Components/Cards';
import Colors from '../constants/colors';
import Input from '../Components/Input';
import NumberContainer from '../Components/NumberContainer';

const StartGameScreen = (props) => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = (inputText) => {
        //user should be allowed to enter only numbers NOT commas, dot, hipen
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if ( isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99 ) {
            Alert.alert(
                'Invalid number!', 
                'Number has to be between 1 and 99.', 
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
                );
            return;
        }

        //all the 3 usesate function willbe batched together
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue(''); // it willbe queued by react and only be proceesd the next time component is rendered thereafter.....
        Keyboard.dismiss();
    }

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = 
            <Cards style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)} />
            </Cards>
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text>Start a New Game!</Text>
                {/* <View style={styles.inputContainer}> */}
                <Cards style={styles.inputContainer}>
                    <Text style={styles.title}>Select a Number</Text>
                    <Input 
                        style={styles.input} 
                        blurOnSubmit
                        autoCapitalize='none' 
                        autoCorrect={false} 
                        keyboardType="number-pad" 
                        maxLength={2} 
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                        />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button 
                                title="Reset" 
                                onPress={resetInputHandler} 
                                color={Colors.accent} />
                        </View>
                        <View style={styles.button}>
                            <Button 
                                title="Confirm" 
                                onPress={confirmInputHandler} 
                                color={Colors.primary} />
                        </View>
                    </View>
                {/* </View> */}
                </Cards>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15

    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    button: {
        width: '40%'
    },
    input: {
        width: 50,
        textAlign: "center"
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: "center"
    }
});

export default StartGameScreen;