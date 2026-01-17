import { Pause, Play } from "lucide-react-native"
import { Pressable, StyleSheet, View } from "react-native"
import Animated, { Easing, useAnimatedProps, useDerivedValue, withTiming } from "react-native-reanimated"
import Svg, { Circle } from "react-native-svg"

type Props = {
    size: number
    progress: number
    glowColor: string
    background: string
    running: boolean
    onPress: () => void
    onLongPress: () => void
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export default function ProgressButton({
    size, 
    progress,
    glowColor,
    background,
    running,
    onPress,
    onLongPress  
}: Props) {
    const stroke = 6
    const radius = (size - stroke * 2) / 2
    const circumference = 2 * Math.PI * radius

    const animatedProgress = useDerivedValue(() => 
    withTiming(progress, { duration:300, easing: Easing.out(Easing.cubic)})
)

    const circleProps = useAnimatedProps(() => ({
        strokeDashoffset: circumference * (1 - animatedProgress.value),
    }))

    return (
        <View
        style={{
            width: size,
            height: size,
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Svg
                width={size}
                height={size}
                style={{position: "absolute", transform: [{rotate: "-90deg"}]}}
            >
                <AnimatedCircle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={glowColor}
                strokeWidth={stroke}
                strokeLinecap="round"
                fill="none"
                strokeDasharray={`${circumference} ${circumference}`}
                animatedProps={circleProps}
                opacity={0.9}
                />
            </Svg>
            <Pressable
                onPress={onPress}
                onLongPress={onLongPress}
                style={({pressed}) => [
                    styles.btn,
                    {
                        backgroundColor: background,
                        transform: [{scale: pressed ? 0.96 : 1}]
                    }
                ]}
            >
                {running ? (
                    <Pause color="#121217" size={28} />
                ) : (
                    <Play color="#121217" size={28}/>
                )}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: 150,
        height: 150,
        borderRadius: 75,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        elevation: 6
    }
})