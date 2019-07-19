import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      output: 'I don\'t care what you type',
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      timer: false,
      watch: null,
      start: null,
      blink: false,
    };
    /* setInterval(() => (
      this.setState(previousState => (
        {blink: !previousState.blink}
      ))
    ), 1000); */
    this.stimer = this.stimer.bind(this);
    this.ctimer = this.ctimer.bind(this);
  }

  startimer() {
    this.setState({start: Date.now()});
    var self=this;
    var ms = this.state.milliseconds;
    var s = this.state.seconds;
    var m = this.state.minutes;
    let swatch = setInterval(() => {
      var delta = Date.now() - this.state.start;
      var mins = Math.floor(delta / 60000);
      delta -= mins*60000;
      var secs = Math.floor(delta / 1000);
      delta -= secs*1000;
      var millis = Math.floor(delta / 10);
      if(millis+ms > 99) {
        millis -= 100;
        secs++;
      }
      self.setState({minutes: mins + m, seconds: secs + s, milliseconds: millis + ms});
    }, 0);
    this.setState({watch: swatch, timer: true});
  }

  stoptimer() {
    clearInterval(this.state.watch);
    this.setState({timer: false});
  }

  stimer() {
    if(!this.state.timer) {
      this.startimer();
    }
    else this.stoptimer();
  }

  ctimer() {
    this.setState({minutes: 0, seconds: 0, milliseconds: 0});
  }

  render() {
    if(this.state.blink) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.container2}>
          <TextInput
            placeholder="Write some text!"
            onChangeText={(input) => this.setState({text: input})}
          />
          <Text style={'flex: 1'}>
            {"Output: " + this.state.output.substring(0, this.state.text.length)}
          </Text>
          <View style={styles.ButtonsRow}>
           <TouchableOpacity style={styles.button} onPress={this.stimer}>
              <Text style={styles.buttonText}>
                Start/Stop
              </Text>
              <Text style={styles.buttonText}>
                Timer
              </Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.button} onPress={this.ctimer}>
               <Text style={styles.buttonText}>
                 Clear
              </Text>
              <Text style={styles.buttonText}>
                Timer
              </Text>
           </TouchableOpacity>
         </View>
         <Text>
           {this.state.minutes.toString() + ":" + this.state.seconds.toString() + "." + this.state.milliseconds.toString()}
         </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  container2: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'yellow',
    height: '20%',
  },
  ButtonsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    width: '50%',
  },
  button: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  buttonText: {
    color: 'white',
    paddingHorizontal: 5,
  }
});
