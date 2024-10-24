import React from "react";
import {
  Pressable,
  Text,
  PressableProps,
  View,
  TextStyle,
  ViewStyle,
  Image,
  ImageSourcePropType,
} from "react-native";

interface CustomButtonProps extends PressableProps {
  title?: string;
  buttonStyle?: string;
  textStyle?: string;
  loading?: boolean;
  leftIcon?: ImageSourcePropType;
  leftIconStyle?: string;
  rightIcon?: ImageSourcePropType;
  rightIconStyle?: string;
  txtStyle?: TextStyle;
  iconStyle?: object;
}

const AppButton: React.FC<CustomButtonProps> = ({
  title,
  buttonStyle,
  textStyle,
  loading,
  leftIcon,
  leftIconStyle,
  rightIcon,
  rightIconStyle,
  txtStyle,
  iconStyle,
  ...pressableProps
}) => {
  return (
    <Pressable
      {...pressableProps}
      className={`${buttonStyle} items-center justify-center flex-row`}
      disabled={loading}
    >
      {leftIcon ? (
        <Image
          source={leftIcon}
          className={`h-8 w-8${leftIconStyle}`}
          resizeMode="contain"
        />
      ) : null}
      <Text
        className={`${textStyle} `}
        allowFontScaling={false}
        style={txtStyle}
      >
        {title}
      </Text>
      {rightIcon ? (
        <Image
          source={rightIcon}
          className={`${rightIconStyle}`}
          style={iconStyle}
        />
      ) : null}
    </Pressable>
  );
};

export default AppButton;
