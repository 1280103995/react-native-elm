import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
  ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    cardItemTimeRemainTxt: {
        fontSize: 20,
        color: '#ee394b'
    },
    text: {
        fontSize: 30,
        color: '#FFF',
        marginLeft: 7,
    },
    container: {
        flexDirection: 'row',
    },
    //时间文字
    defaultTime: {
        paddingHorizontal: 3,
        backgroundColor: 'rgba(85, 85, 85, 1)',
        fontSize: 12,
        color: 'white',
        marginHorizontal: 3,
        borderRadius: 2,
    },
    //冒号
    defaultColon: {
        fontSize: 12, color: 'rgba(85, 85, 85, 1)'
    }
});

export default class CountDownView extends Component {
    static displayName = 'CountDownView';

    static propTypes = {
        endTime: PropTypes.number,
        days: PropTypes.objectOf(PropTypes.string),
        hours: PropTypes.string,
        mins: PropTypes.string,
        secs: PropTypes.string,
        daysEnable: PropTypes.bool, //是否显示天数
        hourEnable: PropTypes.bool, //是否显示小时
        millisecEnable: PropTypes.bool, //是否显示毫秒
        onEnd: PropTypes.func,

        containerStyle: ViewPropTypes.style,
        daysStyle: Text.propTypes.style,
        hoursStyle: Text.propTypes.style,
        minsStyle: Text.propTypes.style,
        secsStyle: Text.propTypes.style,
        firstColonStyle: Text.propTypes.style,
        secondColonStyle: Text.propTypes.style,

    };
    static defaultProps = {
        endTime: 0,
        days: {
            plural: '天', // 复数
            singular: '天', //单数
        },
        hours: ':',
        mins: ':',
        secs: ':',
        daysEnable: true,
        hourEnable: true,
        millisecEnable: false,
        onEnd: () => null,

        containerStyle: styles.container,//container 的style
        daysStyle: styles.defaultTime,//天数 字体的style
        hoursStyle: styles.defaultTime,//小时 字体的style
        minsStyle: styles.defaultTime,//分钟 字体的style
        secsStyle: styles.defaultTime,//秒数 字体的style
        firstColonStyle: styles.defaultColon,//从左向右 第一个冒号 字体的style
        secondColonStyle: styles.defaultColon,//从左向右 第2个冒号 字体的style
    };
    state = {
        days: 0,
        hours: 0,
        min: 0,
        sec: 0,
        millisec: 0,
    };

    componentWillMount() {
        const date = this.getDateData(this.props.endTime);
        if (date) {
            this.setState(date);
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            const date = this.getDateData(this.props.endTime);
            if (date) {
                this.setState(date);
            } else if(date === false){
                this.props.onEnd();
                this.stop();
            }
        }, 50);
    }

    componentWillUnmount() {
        this.stop();
    }

    getDateData(endTime) {
        let diff = endTime - new Date().getTime();
        if (diff <= 100) { //不用0是因为会出现UI异常显示
            this.rest();
            return false;
        }

        const timeLeft = {
            years: 0,
            days: 0,
            hours: 0,
            min: 0,
            sec: 0,
            millisec: 0, //毫秒
        };

        // timeLeft.years = parseInt(diff/ 1000 / 60 / 60 / 24 / 365); //总毫秒数除以一年的毫秒 得到相差的年数
        timeLeft.days = parseInt(diff / 1000 / 60 / 60 / 24); //总毫秒除以一天的毫秒 得到相差的天数
        timeLeft.hours = parseInt(diff / 1000 / 60 / 60 - (24 * timeLeft.days)); //然后取完天数之后的余下的毫秒数再除以每小时的毫秒数得到小时
        timeLeft.min = parseInt(diff / 1000 / 60 - (24 * 60 * timeLeft.days) - (60 * timeLeft.hours)); //减去天数和小时数的毫秒数剩下的毫秒，再除以每分钟的毫秒数，得到分钟数
        timeLeft.sec = parseInt(diff / 1000 - (24 * 60 * 60 * timeLeft.days) - (60 * 60 * timeLeft.hours) - (60 * timeLeft.min)); //得到最后剩下的毫秒数除以1000 就是秒数，再剩下的毫秒自动忽略即可
        timeLeft.millisec = Math.floor((diff - (24 * 60 * 60 * 1000 * timeLeft.days) - (60 * 60 * 1000 * timeLeft.hours) - (60 * 1000 * timeLeft.min) - (timeLeft.sec * 1000)) / 10);
        if (timeLeft.millisec < 10) {
            timeLeft.millisec = "0" + timeLeft.millisec;
        }
        if (timeLeft.sec < 10) {
            timeLeft.sec = "0" + timeLeft.sec;
        }
        if (timeLeft.min < 10) {
            timeLeft.min = "0" + timeLeft.min;
        }
        if (timeLeft.hours < 10) {
            timeLeft.hours = "0" + timeLeft.hours;
        }
        return timeLeft;
    }

    render() {
        const countDown = this.state;
        let days;
        if (countDown.days === 1) {
            days = this.props.days.singular;
        } else {
            days = this.props.days.plural;
        }
        return (
            <View style={[this.props.containerStyle,{justifyContent:'center',alignItems:'center'}]}>
                {this.props.daysEnable ? countDown.days > 0 ?
                    <Text style={this.props.daysStyle}>{countDown.days + days}</Text> : null : null}
                {this.props.hourEnable ?
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={this.props.hoursStyle}>{countDown.hours}</Text>
                        <Text style={this.props.firstColonStyle}>{this.props.hours}</Text>
                    </View> : null}
                <Text style={this.props.minsStyle}>{countDown.min}</Text>
                <Text style={this.props.secondColonStyle}>{this.props.mins}</Text>
                <Text style={this.props.secsStyle}>{countDown.sec}</Text>
                {this.props.millisecEnable ?
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={this.props.secondColonStyle}>{this.props.secs}</Text>
                        <Text style={this.props.secsStyle}>{countDown.millisec}</Text>
                    </View> : null}
            </View>
        );
    }

    rest = () => {
        this.setState({
            days: '00',
            hours: '00',
            min: '00',
            sec: '00',
            millisec: '00',
        })
    };

    stop() {
        clearInterval(this.interval);
    }
}