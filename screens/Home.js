import React from 'react';
import {
    Dimensions,
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    AlertIOS,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { Haptic } from 'expo';
import { getData, setData, getLimit, setLimit } from '../lib/storageFunctions';

const screenWidth = Dimensions.get('window').width;
const mainColor = '#333333';
const highlightColor = '#c054ff';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            number: '0',
            limit: '10000'
        }

        this.loader();
    }

    async loader() {
        let date = this.currentDate();
        let data = await getData(date);

        let limit = await getLimit();
        
        this.setState({
            number: data === null ? '0' : data,
            limit: limit === null ? '10000' : limit
        });
    }

    currentDate() {
        let date = new Date();
        let offsetInHours = date.getTimezoneOffset() / 60;
        date.setHours(date.getHours() - offsetInHours);
        let dateShort = date.toJSON().slice(0, 10);
        return dateShort;
    }

    async undoPress() {
        Haptic.selection();
        let date = this.currentDate();
        let data = {
            date: date,
            number: '0'
        }

        await setData(data);
        this.loader();
    }

    addPress() {
        Haptic.selection();
        AlertIOS.prompt(
            'Log Calories',
            'How many calories do you want to log?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                },
                {
                    text: 'Add',
                    onPress: (number) => {
                        this.updateData(number);
                    }
                },
            ],
            'plain-text',
            '',
            'numeric'
        );
    }

    limitPress () {
        Haptic.selection();
        AlertIOS.prompt(
            'Set Limit',
            'What do you want to set your limit at?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                },
                {
                    text: 'Set',
                    onPress: (number) => {
                        this.updateLimit(number);
                    }
                },
            ],
            'plain-text',
            '',
            'numeric'
        );
    }

    async updateData(number) {
        let date = this.currentDate();
        let newNumber = Math.round(+this.state.number + +number);
        let data = {
            date: date,
            number: newNumber > 10000 ? '10000' : newNumber.toString()
        }

        await setData(data);
        this.loader();
    }

    async updateLimit(limit) {
        await setLimit(+limit > 10000 ? '10000' : limit);
        this.loader();
    }

    render() {
        return (
            <SafeAreaView style={styles.screenContainer}>
                <View style={styles.infoContainer}>
                    {+this.state.number > +this.state.limit ? <Text style={styles.mainTextRed} allowFontScaling={false}>{this.state.number}</Text> : <Text style={styles.mainText} allowFontScaling={false}>{this.state.number}</Text>}
                    <Text style={styles.subText} allowFontScaling={false}>calories today</Text>
                </View>

                <View style={styles.graphsContainer}>
                    <View style={[styles.graph, styles.dropShadow]}>
                        <Text style={styles.graphTitle} allowFontScaling={false}>This Week</Text>
                    </View>
                </View>

                <View style={styles.barContainer}>
                    <Icon name='undo' type='font-awesome' size={35} onPress={this.undoPress.bind(this)} />
                    <Icon name='plus' type='font-awesome' size={35} color={highlightColor} reverse onPress={this.addPress.bind(this)} />
                    <Icon name='flag' type='font-awesome' size={35} onPress={this.limitPress.bind(this)} />
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
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
    mainTextRed: {
        fontSize: 96,
        fontWeight: 'bold',
        color: '#f00',
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