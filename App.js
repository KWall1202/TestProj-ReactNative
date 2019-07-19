import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      speedX: new Animated.Value(0),
      playerX: (Dimensions.get('window').width / 2) - 28,
    };
    this.SLOW_TIME = 500;
    this.MAX_SPEED = 4;
    this.FPS = 60;
  }

  componentDidMount() {
    setInterval(() => {
      var x = (this.state.playerX + this.state.speedX._value) % Dimensions.get('window').width;
      if(x < -28) x = Dimensions.get('window').width;
      this.setState({playerX: x})
    }, 1000/this.FPS);
  }

  slowDown = () => {
    Animated.timing(this.state.speedX, {
      toValue: 0,
      duration: this.SLOW_TIME,
    }).start();
  }

  speedLeft = () => {
    Animated.timing(this.state.speedX, {
      toValue: -this.MAX_SPEED,
      duration: this.SLOW_TIME * (-this.MAX_SPEED - this.state.speed)/(-this.MAX_SPEED),
    }).start();
  }

  speedRight = () => {
    Animated.timing(this.state.speedX, {
      toValue: this.MAX_SPEED,
      duration: this.SLOW_TIME * (this.MAX_SPEED - this.state.speed)/(this.MAX_SPEED),
    }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.gameContainer}>
          <Text style={styles.scoreboard}>
            Score: {this.state.score}
          </Text>
          <Animated.View style={[styles.player, {left: this.state.playerX}]}></Animated.View>
        </View>
        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.controlButtons}
            onPressOut={this.slowDown}
            onPressIn={this.speedLeft}>
            <Text style={styles.buttonText}>
              Left
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controlButtons]}
            onPressOut={this.slowDown}
            onPressIn={this.speedRight}>
            <Text style={styles.buttonText}>
              Right
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gameContainer: {
    flex: 6,
    backgroundColor: 'skyblue',
    // alignItems: 'center',
  },
  controlsContainer: {
    flex: 1,
    backgroundColor: 'grey',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-around',
  },
  controlButtons: {
    height: "70%",
    width: "25%",
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 32,
    color: 'white',
  },
  player: {
    height: 50,
    width: 50,
    backgroundColor: 'red',
    top: '40%',
    borderWidth: 5,
    borderColor: 'black',
  },
  scoreboard: {
    top: '5%',
    left: '2%',
    alignSelf: 'flex-start',
    color: 'white',
    fontSize: 32,
  },

})
