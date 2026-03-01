import {View, StyleSheet, Pressable, Text} from "react-native"
import { useTheme } from "../theme/theme"
type Props = {
    onStop: () => void
}

const Controls: React.FC<Props> = ({onStop}) => {
    const {theme} = useTheme()

    return  (
        <View style={styles.row}>
            <Pressable
            onPress={onStop}
            style={({pressed}) => [
                styles.btn,
                {
                    backgroundColor: theme.card,
                    opacity: pressed ? 0.9 : 1
                }
            ]}
            >
                <Text style={[styles.label, {color: "#121217"}]}>Stop (back to selection)</Text>
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

export default Controls