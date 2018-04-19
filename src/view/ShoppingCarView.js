/**
 * User: puti.
 * Time: 2018/3/5 下午2:14.
 * GitHub:https://github.com/puti94
 * Email:1059592160@qq.com
 */

import React, {Component} from 'react';
import {
    Animated,
    Easing,
    Platform
} from 'react-native';

let singleView = null;
function Point(x, y) {
    this.x = x;
    this.y = y;
}
/**
 * 开启购物车添加动画
 * @param child  需要动画的组件如传入一个<Image/>
 * @param params 传入一些所需的参数,与值默认用值，没有传入值会测量组件位置获得开始和结束位置
 */
export function startAddShopAnim(child,
                                 params: {
                                     beforeValue: Object,//开始值如{x:0,y:0}
                                     beforeView: Object,//开始的组件如this.refs.xxx
                                     afterValue: Object,//结束值如{x:100,y:100}
                                     afterView: Object,//结束组件如this.refs.xxx
                                     duration: number,//时间 默认1000ms
                                     endScale: number,//结束缩放比例 默认0.1
                                     endRotateZ: number,//结束旋转角度 默认720
                                     topFix: number,//组件父布局顶部距离屏幕顶部的距离
                                     rightFix: number,//组件父布局右边距离屏幕右边的距离
                                     callBack: () => void//动画结束的回调
                                 }) {
    if (!singleView) {
        console.error(`请渲染ShoppingCarView组件`);
        return;
    }
    singleView.startAnim(child, params)
}


export class ShoppingCarView extends Component {

    constructor(props) {
        super(props);
        this.x = new Animated.Value(0);
        this.y = new Animated.Value(0);
        this.rotateZ = new Animated.Value(0);
        this.scale = new Animated.Value(1);
        this.translate = new Animated.ValueXY(0,0);
        this.state = {
            child: null,
            hide: true,
        }
    }

    componentDidMount() {
        singleView = this;
    }

    componentWillUnmount() {
        singleView = null;
    }

    /**
     *
     * @param child  进行动画的组件
     * @param params
     * @returns {Promise<void>}
     */
    async startAnim(child, params: {
        beforeValue: Object,
        beforeView: Object,
        afterValue: Object,
        afterView: Object,
        duration: number,
        endScale: number,
        endRotateZ: number,
        topFix: number,
        rightFix: number,
        callBack: () => void
    }) {
        let beforeX = 0;
        let beforeY = 0;
        let afterX = 0;
        let afterY = 0;
        let childWidth = (child.props.style && child.props.style.width) ? child.props.style.width : 0;
        let childHeight = (child.props.style && child.props.style.height) ? child.props.style.height : 0;
        let rightFix = params.rightFix ? params.rightFix : 0;
        let topFix = params.topFix ? params.topFix : 64;
        let endScale = params.endScale ? params.endScale : 0.1;

        if (params.beforeValue) {
            beforeX = params.beforeValue.x;
            beforeY = params.beforeValue.y;
        } else {
            let beforeValue = await this.measureView(params.beforeView);
            beforeX = beforeValue.x + beforeValue.width / 2 - childWidth / 2 - rightFix;
            beforeY = beforeValue.y + beforeValue.height / 2 - childHeight / 2 - topFix;
            console.log(beforeValue, childWidth, childHeight)
        }

        if (params.afterValue) {
            afterX = params.afterValue.x;
            afterY = params.afterValue.y;
        } else {
            let afterValue = await this.measureView(params.afterView);
            afterX = afterValue.x + afterValue.width / 2 - childWidth / 2 - rightFix;
            afterY = afterValue.y + afterValue.height / 2 - childHeight / 2 - topFix;
        }
        this._animStart(beforeX, beforeY, afterX, afterY,
            params.duration ? params.duration : 1000,
            endScale,
            params.endRotateZ ? params.endRotateZ : 720,
            params.callBack ? params.callBack : () => {
            });
        this.setState({
            child: child,
            hide: false
        });

    }

    _animStart(beforeX, beforeY, afterX, afterY, duration, endScale, endRotateZ, callBack) {
        this.translate.setValue(new  Point(beforeX, beforeY));
        this.rotateZ.setValue(0);
        this.scale.setValue(1);

        Animated.parallel([
            Animated.timing(this.translate, {
                toValue:new Point(afterX, afterY),
                duration: duration,
                easing: Easing.linear,
            }),
            Animated.timing(this.rotateZ, {
                toValue: endRotateZ,
                duration: duration,
                easing: Easing.linear,// 线性的渐变函数
            }),
            Animated.timing(this.scale, {
                toValue: endScale,
                duration: duration,
                easing: Easing.linear,// 线性的渐变函数
            })
        ]).start(() => {
            callBack();
            this.setState({
                hide: true,
                child: null,
            })
        });
    }

    measureView(view) {
        return new Promise((resolve) => {
            view.measureInWindow((x, y, width, height) => resolve({x, y, width, height}))
        });
    }

    render() {
        return !this.state.hide ? <Animated.View
            style={{
                position: 'absolute',
                transform: [
                    {
                        translateY: this.translate.y,
                    },{
                        translateX: this.translate.x,
                    }, {
                        rotateZ: this.rotateZ.interpolate({
                            inputRange: [0, 360],
                            outputRange: ['0deg', '360deg']
                        })
                    }, {
                        scale: this.scale
                    }]
            }}>
            {this.state.child}
        </Animated.View> : null
    }
}