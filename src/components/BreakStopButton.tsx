import {View, StyleSheet, Pressable, Text} from "react-native"
import { useTheme } from "../theme/theme"
type Props = {
    visible: boolean
    onBreakStop: () => void 
}

// just a copy of TimerControls but only visible once break is initiated

const BreakControls: React.FC<Props> = ({visible, onBreakStop}) => {
    const {theme} = useTheme()
    if (!visible) return null

    return  (
        <View style={styles.row}>
            <Pressable
            onPress={onBreakStop}
            style={({pressed}) => [
                styles.btn,
                {
                    backgroundColor: theme.card,
                    opacity: pressed ? 0.9 : 1
                }
            ]}
            >
                <Text style={[styles.label, {color: "#121217"}]}>End Break</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        marginTop: 10,
        flexDirection: 'row',
        gap: 12
    },
    btn: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: 6},
        elevation: 4
    },
    label: {
        fontWeight: '700',
        letterSpacing: 0.5,
        fontSize: 14
    }
})

export default BreakControls