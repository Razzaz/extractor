import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class Selector extends Component {
  state = {
    selectedWordIdx: -1,
    wordList: null,
  };

  componentDidMount() {
    let wordList = [];

    // Break down all the words detected by the camera
    if (
      this.props.wordBlock &&
      this.props.wordBlock.textBlocks &&
      this.props.wordBlock.textBlocks.length > 0
    ) {
      for (let idx = 0; idx < this.props.wordBlock.textBlocks.length; idx++) {
        let text = this.props.wordBlock.textBlocks[idx].value;
        if (text && text.trim().length > 0) {
          text = text.replace(':', '');
          let words = text.split('\n');
          if (words && words.length > 0) {
            for (let idx2 = 0; idx2 < words.length; idx2++) {
              if (words[idx2].length > 0) {
                wordList.push(words[idx2]);
              }
            }
          }
        }
      }
      this.setState({wordList: wordList});
      console.log('word : ', wordList);
    }
  }

  populateWords() {
    const wordViews = [];
    if (this.state.wordList && this.state.wordList.length > 0) {
      for (let i = 0; i < this.state.wordList.length; i++) {
        wordViews.push(
          <Text>
            {this.state.wordList[i]}
            {'\n'}
          </Text>,
        );
      }
    }

    return wordViews;
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.populateWords()}
      </View>
    );
  }
}

Selector.propTypes = {
  wordBlock: PropTypes.object,
};

Selector.defaultProps = {
  wordBlock: null,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 20,
  },
});
