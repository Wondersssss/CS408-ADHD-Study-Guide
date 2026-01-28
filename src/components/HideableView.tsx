import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native"

type Props = {
    visible: boolean
    inputText: string
    style: StyleProp<ViewStyle>
    textStyle: StyleProp<TextStyle>
}

const HideableView: React.FC<Props> = ({visible, inputText, style, textStyle}) => {
    if (!visible) return null

    return (
        <View style={style}>
            <Text style={textStyle}>{inputText}</Text>
        </View>
    )
}

export default HideableView