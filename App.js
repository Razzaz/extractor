import React from 'react';
import Camera, {Constants} from './src/components/camera';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {showCamera: false, recogonizedText: null};
  }

  onOCRCapture(recogonizedText) {
    console.log('onCapture', recogonizedText);
    this.setState({showCamera: false, recogonizedText: recogonizedText});
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.page}>
          <TouchableOpacity
            onPress={() => {
              this.setState({showCamera: true});
            }}>
            <Icon name="camera-outline" size={50} color="#FFFFFF" />
          </TouchableOpacity>
        </SafeAreaView>

        {this.state.showCamera && (
          <Camera
            cameraType={Constants.Type.back}
            flashMode={Constants.FlashMode.off}
            autoFocus={Constants.AutoFocus.on}
            whiteBalance={Constants.WhiteBalance.auto}
            ratio={'4:3'}
            quality={0.5}
            imageWidth={800}
            enabledOCR={true}
            onCapture={(data, recogonizedText) =>
              this.onOCRCapture(recogonizedText)
            }
            onClose={(_) => {
              this.setState({showCamera: false});
            }}
          />
        )}
      </>
    );
  }
}

export default Search;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
