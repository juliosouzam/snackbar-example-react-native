import React, {Component} from 'react';
import {StyleSheet, Text, Animated} from 'react-native';

class SnackBar extends Component {
  constructor() {
    super();

    this.animatedValue = new Animated.Value(50);
    this.ShowSnackBar = false;
    this.HideSnackBar = true;
    this.state = {
      SnackBarInsideMsgHolder: '',
    };
  }

  ShowSnackBarFunction(
    SnackBarInsideMsgHolder = 'Default SnackBar Message...',
    duration = 3000,
  ) {
    if (this.ShowSnackBar === false) {
      this.setState({SnackBarInsideMsgHolder: SnackBarInsideMsgHolder});

      this.ShowSnackBar = true;

      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start(this.hide(duration));
    }
  }

  hide = duration => {
    this.timerID = setTimeout(() => {
      if (this.HideSnackBar === true) {
        this.HideSnackBar = false;

        Animated.timing(this.animatedValue, {
          toValue: 50,
          duration: 100,
          useNativeDriver: true,
        }).start(() => {
          this.HideSnackBar = true;
          this.ShowSnackBar = false;
          clearTimeout(this.timerID);
        });
      }
    }, duration);
  };

  SnackBarCloseFunction = () => {
    if (this.HideSnackBar === true) {
      this.HideSnackBar = false;
      clearTimeout(this.timerID);

      Animated.timing(this.animatedValue, {
        toValue: 50,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {
        this.ShowSnackBar = false;
        this.HideSnackBar = true;
      });
    }
  };

  render() {
    return (
      <Animated.View
        style={[
          {transform: [{translateY: this.animatedValue}]},
          styles.SnackBarContainter,
        ]}>
        <Text numberOfLines={1} style={styles.SnackBarMessage}>
          {this.state.SnackBarInsideMsgHolder}
        </Text>

        <Text
          style={styles.SnackBarUndoText}
          onPress={this.SnackBarCloseFunction}>
          UNDO
        </Text>
      </Animated.View>
    );
  }
}

export default SnackBar;

const styles = StyleSheet.create({
  SnackBarContainter: {
    position: 'absolute',
    backgroundColor: '#7159c1',
    flexDirection: 'row',
    alignItems: 'center',
    left: 0,
    bottom: 0,
    right: 0,
    height: 50,
    paddingLeft: 10,
    paddingRight: 55,
  },

  SnackBarMessage: {
    color: '#fff',
    fontSize: 18,
  },

  SnackBarUndoText: {
    color: '#fff',
    fontSize: 16,
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
    padding: 5,
  },
});
