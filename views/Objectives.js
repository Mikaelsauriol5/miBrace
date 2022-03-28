import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import styles from './styles'

const Objectives = (props) => {
	return (
		<View style={styles.braceContainer}>
			<ImageBackground 
                source={require('../assets/images/goals.jpg')}
                style={styles.image}
            />
        	<View style={styles.titles}>
            <Text style={styles.title}>Objectifs</Text>
            <Text style={styles.subtitle}>Lache pas!</Text>
            </View>
        </View>
	);
};

export default Objectives;