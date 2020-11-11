//jk
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './Components/Header';
import StartGameScreen from './Screens/StartGameScreen';
import GameScreen from './Screens/GameScreen';
import GameOverScreen from './Screens/GameOverScreen';

export default function App() {

  const [userNumber, setUserNumber] = useState(); //initialized as undefined.. so boolene valu is FALSE
  const [guessRounds, setGuessRounds] = useState(0);

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if (guessRounds > 0) {
    content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler} />
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="auto" />
      
      <Header title="Guess a Number"/>
      {/* <StartGameScreen /> */}
      {content}
      {/* <GameScreen /> */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});