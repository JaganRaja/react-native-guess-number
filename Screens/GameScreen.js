import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';

import NumberContainer from '../Components/NumberContainer';
import Cards from '../Components/Cards';



//If we dont rely on state or props of the component (So it wont be recreated when component re-renders),
// we can create a function, outside of function component
const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max-min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min,max,exclude);
    } else {
        return rndNum;
    }
};

const GameScreen = (props) => {
    const [currentGuess, setCurrentGuess] = useState(
        generateRandomBetween(1, 100, props.userChoice)
        );
    const [rounds, setRounds] = useState(0);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(rounds);
        }
    }, [currentGuess,userChoice,onGameOver]);

    const nextGuessHandler = (direction) => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || 
        (direction === 'greater' && currentGuess > props.userChoice)
        ) {
            Alert.alert("Don\t lie", "You know that this is wrong...", 
            [{ text: 'Sorry', style: 'cancel'}
        ]);
        return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
       const nextNumber =  generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
       setCurrentGuess(nextNumber);
       setRounds(curRounds => curRounds + 1);
    };
    
    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Cards style={styles.buttonContainer}>
                <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
                <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')} />
            </Cards>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
});

export default GameScreen;