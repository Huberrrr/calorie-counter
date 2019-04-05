import React from 'react';
import {
    Dimensions,
    StyleSheet,
    SafeAreaView,
    View,
    Text,
} from 'react-native';
import { getData, setData } from '../lib/storageFunctions';

const screenWidth = Dimensions.get('window').width;
const mainColor = '#333333';
const highlightColor = '#c054ff';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            number: 0
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.screenContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.mainText} allowFontScaling={false}>{this.state.number}</Text>
                    <Text style={styles.subText} allowFontScaling={false}>calories today</Text>
                </View>

                <View style={styles.graphsContainer}>
                    <View style={[styles.graph, styles.dropShadow]}>
                        <Text style={styles.graphTitle} allowFontScaling={false}>This Week</Text>
                    </View>
                </View>

                <View style={styles.barContainer}>

                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        width: screenWidth,
        backgroundColor: '#fff',  
    },
    infoContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    graphsContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
    },
    barContainer: {
        flex: 1,
    },
    dropShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: .4,
        shadowRadius: 3,
    },

    mainText: {
        fontSize: 96,
        fontWeight: 'bold',
        color: mainColor,
    },
    subText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: highlightColor,
    },

    graph: {
        width: '90%',
        height: '90%',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    graphTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: mainColor,
    },
});