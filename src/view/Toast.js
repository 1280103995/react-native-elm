import Toaster from "react-native-root-toast"

export default class Toast {
    static show(msg: string, config?) {
        if (msg !== '') {
          Toaster.show(msg, !config ? {
                position: 0, //TOP: 20, BOTTOM: -20, CENTER: 0
                duration: 400,
                shadow: false,
                animation: true
            } : config)
        }
    }
}
