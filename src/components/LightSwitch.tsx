import {LayoutChangeEvent, Pressable, View, StyleSheet} from "react-native"
import {useEffect, useState} from "react"
import { themes, useTheme } from "../theme/theme"
import Animated, {useSharedValue, withTiming, Easing, useAnimatedStyle, interpolate} from "react-native-reanimated"
import {Moon, Sun} from "lucide-react-native"

type Props = {on: boolean, onToggle: () => void}

const KNOB = 34
const TRACK_H = 40
const TRACK_W_DEFAULT = 76
const PADDING = 3

const AView = Animated.createAnimatedComponent(View)

export default function LightSwitch({on, onToggle}: Props) {
    const {theme} = useTheme()
    const t = useSharedValue(on ? 1 : 0)
    const [trackW, setTrackW] = useState(TRACK_W_DEFAULT)

    useEffect(() => {
        t.value = withTiming(on ? 1 : 0, {
            duration: 280,
            easing: Easing.out(Easing.cubic),
        })
    }, [on])

    const onTrackLayout = (e: LayoutChangeEvent) => {
        setTrackW(e.nativeEvent.layout.width)
    }

    const innerWidth = Math.max(0, trackW - PADDING * 2)
    const travel = Math.max(0, innerWidth - KNOB)

    const knobStyle = useAnimatedStyle(() => {
        const x = interpolate(t.value, [0, 1,], [0, travel])
        return {transform: [{translateX: x}]}
    })

    return (
        <Pressable onPress={onToggle} hitSlop={8} style={styles.press}>
            <View
            onLayout={onTrackLayout}
            style={[
                styles.track,
                {
                    backgroundColor: theme.isDark ? '#1a1b21' : '#f2f2f6',
                    borderColor: theme.outline,
                    paddingHorizontal: PADDING
                }
            ]}>
                <AView
                style={[
                    styles.knob,
                    knobStyle, 
                    {
                        backgroundColor: theme.card
                    }
                ]}>
                    {on ? (
                        <Moon size={18} color={themes.common.orange}/>
                    ): (
                        <Sun size={18} color={themes.common.orange}/>
                    )}

                </AView>

            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    press: {padding: 2},
    track: {
        width: TRACK_W_DEFAULT,
        height: TRACK_H,
        borderRadius: TRACK_H / 2,
        borderWidth: 1,
        justifyContent: "center"
    },
    knob: {
        position: 'absolute',
        left: PADDING,
        width: KNOB,
        height: KNOB,
        borderRadius: KNOB / 2,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.22,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 3
    }

})