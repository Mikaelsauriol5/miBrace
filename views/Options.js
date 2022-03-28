import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import styles from './styles'


const Options = (props) => {
	return (
	    <View>
          <View style={styles.braceContainer}>
			<ImageBackground 
                source={require('../assets/images/settings.jpg')}
                style={styles.image}
            />
        	<View style={styles.titles}>
            <Text style={styles.title}>Options</Text>
            <Text style={styles.subtitle}>Connecte toi!</Text>
            </View>
        </View>
        </View>
	);
};

export default Options;