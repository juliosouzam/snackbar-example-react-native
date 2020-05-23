import React, {useRef} from 'react';
import {View, Button} from 'react-native';

import SnackBar from './components/Snackbar';

export default function App() {
  const snackbarRef = useRef(null);

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Button
        title="Snacked"
        onPress={() =>
          snackbarRef.current.ShowSnackBarFunction('Snackbar example')
        }
      />

      <SnackBar ref={snackbarRef} />
    </View>
  );
}
