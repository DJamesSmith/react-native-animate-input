import { TextInput } from 'react-native';
import React, { useEffect, useState, FC } from 'react';
import Animated, {
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { Fonts } from './fonts';

interface InputType {
    value: string;
    onChangeText: (text: string) => void;
    marginVertical?: number;
    onKeyPress?: () => void;
    keyboardType?: 'numeric' | 'email-address' | 'default';
    returnKeyType?: 'default' | 'done' | 'next';
    secureTextEntry?: boolean;
    maxLength?: number;
    autoFocus?: boolean;
    editable?: boolean;
    onSubmitEditing?: () => void;
    ref?: any;
    textAlign?: 'left' | 'center' | 'right' | undefined;
    onFocus?: () => void;
    onBlur?: () => void;
    width?: any;
    height?: any;
    backgroundColor?: string;
    borderRadius?: number;
    borderWidth?: number;
    borderColor?: string;
    borderBottomColor?: string;
    borderBottomEndRadius?: number;
    borderBottomLeftRadius?: number;
    borderBottomRightRadius?: number;
    borderBottomStartRadius?: number;
    borderBottomWidth?: number;
    fontSize?: number;
    placeholder?: string;
    paddingHorizontal?: number;
    color?: string;
    placeholderTextColor?: string;
    placeholderBackgroundColor?: string;
    activeColor?: string;
    fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
    fontFamily?: string;
}

const TextInputAnim: FC<InputType> = ({
    value,
    onChangeText,
    marginVertical,
    onKeyPress,
    keyboardType,
    secureTextEntry,
    returnKeyType,
    maxLength,
    autoFocus,
    editable,
    onSubmitEditing,
    ref,
    textAlign,
    onFocus,
    onBlur,
    width = '90%',
    height = 48,
    backgroundColor = 'white',
    borderRadius = 8,
    borderWidth,
    borderColor = 'transparent',
    borderBottomColor = 'transparent',
    borderBottomEndRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderBottomStartRadius,
    borderBottomWidth,
    fontSize = 15,
    placeholder = '',
    paddingHorizontal = 8,
    color = 'black',
    placeholderTextColor = 'grey',
    placeholderBackgroundColor = 'transparent',
    activeColor = 'green',
    fontWeight,
    fontFamily,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const translateX = useSharedValue(15);
    const translateY = useSharedValue(0);
    const paddingX = useSharedValue(0);
    const isActive = useSharedValue(0);

    const animationConfig = {
        mass: 1,
        damping: 18,
        stiffness: 120,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
            ],
            padding: paddingX.value,
        };
    });

    const animationBasic = useAnimatedStyle(() => {
        const _size = interpolate(translateX.value, [5, 30], [fontSize, 12]);

        return {
            fontSize: _size,
            backgroundColor: placeholderBackgroundColor,
        };
    });

    useEffect(() => {
        if (isFocused) {
            translateX.value = withSpring(0, animationConfig);
            translateY.value = withSpring(-24, animationConfig);
            paddingX.value = withSpring(5, animationConfig);
        } else if (value == '') {
            translateX.value = withSpring(15, animationConfig);
            translateY.value = withSpring(0, animationConfig);
            paddingX.value = withSpring(0, animationConfig);
        }
    }, [isFocused, value]);

    const animationColor = useAnimatedStyle(() => {
        const _color = interpolateColor(
            isActive.value,
            [0, 1],
            [placeholderTextColor, activeColor],
        );
        return {
            color: _color,
        };
    });

    const animationContainer = useAnimatedStyle(() => {
        const _color = interpolateColor(
            isActive.value,
            [0, 1],
            [borderColor, activeColor],
        );
        return {
            borderColor: _color,
        };
    });

    const animationBottomContainer = useAnimatedStyle(() => {
        const _color = interpolateColor(
            isActive.value,
            [0, 1],
            [borderBottomColor, activeColor],
        );
        return {
            borderBottomColor: _color,
        };
    });

    function onChangeInputText(value: string) {
        if (onChangeText) {
            onChangeText(value);
        }
    }

    function onInputBlur() {
        if (onBlur) {
            onBlur();
        }
    }

    function onInputFocus() {
        if (onFocus) {
            onFocus();
        }
    }

    return (
        <Animated.View
            style={[
                {
                    width: width,
                    height: height,
                    backgroundColor: backgroundColor,
                    borderRadius: borderRadius,
                    borderColor: borderColor,
                    borderWidth: borderWidth,
                    borderBottomColor: borderBottomColor,
                    borderBottomEndRadius: borderBottomEndRadius,
                    borderBottomLeftRadius: borderBottomLeftRadius,
                    borderBottomRightRadius: borderBottomRightRadius,
                    borderBottomStartRadius: borderBottomStartRadius,
                    borderBottomWidth: borderBottomWidth,
                    justifyContent: 'center',
                    marginVertical: marginVertical,
                },
                animationContainer,
                animationBottomContainer
            ]}>
            <Animated.Text
                style={[
                    {
                        fontSize: fontSize,
                        position: 'absolute',
                        color: placeholderTextColor,
                        borderRadius: 4,
                        // paddingHorizontal: 8,
                        fontFamily: Fonts.OutfitBold,
                    },
                    animatedStyle,
                    animationBasic,
                    animationColor,
                ]}>
                {placeholder}
            </Animated.Text>

            <TextInput
                value={value}
                onChangeText={(txt: string) => onChangeInputText(txt)}
                style={{
                    flex: 1,
                    paddingHorizontal: paddingHorizontal,
                    fontSize: fontSize,
                    color: color,
                    fontWeight: fontWeight,
                    fontFamily: fontFamily,
                }}
                onKeyPress={onKeyPress}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                returnKeyType={returnKeyType}
                maxLength={maxLength}
                autoFocus={autoFocus}
                editable={editable}
                onSubmitEditing={onSubmitEditing}
                ref={ref}
                textAlign={textAlign}
                onFocus={() => {
                    onInputFocus();
                    setIsFocused(true);
                    isActive.value = withSpring(1, animationConfig);
                }}
                onBlur={() => {
                    onInputBlur();
                    setIsFocused(false);
                    isActive.value = withSpring(0, animationConfig);
                }}
            />
        </Animated.View>
    )
}

export default TextInputAnim