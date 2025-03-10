import { Ionicons } from '@expo/vector-icons';
import { FC } from 'react';
import { Pressable, Text } from 'react-native';

interface ButtonProps {
  label: string;
  color?: string;
  textColor?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  label,
  color = 'bg-green-500',
  textColor = 'text-white',
  icon,
  onPress,
  className,
}) => {
  return (
    <Pressable
      style={{ backgroundColor: color }}
      className={`flex-row items-center justify-center rounded-lg px-6 py-3 ${color} ${className}`}
      onPress={onPress}>
      <Text className={`text-lg font-semibold ${textColor}`}>{label}</Text>
      {icon && <Ionicons name={icon} size={20} className="ml-2" color="white" />}
    </Pressable>
  );
};

export default Button;
