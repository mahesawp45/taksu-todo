import { Colors } from 'constants/Colors';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';

interface InputTextProps {
  id?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  value: string;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  keyboardType?: KeyboardTypeOptions;
  prefix?: React.ReactElement<any, any>;
  suffix?: React.ReactElement<any, any>;
  error?: string;
  enable?: boolean;
  autoFocus?: boolean;
  outlined?: boolean;
  numberOfLine?: number;
  maxLength?: number;
}

const InputText: React.FC<InputTextProps> = ({
  id,
  label,
  placeholder,
  className,
  keyboardType,
  value,
  prefix,
  error,
  enable = true,
  autoFocus = false,
  onChange,
  outlined = false,
  numberOfLine,
  maxLength,
}) => {
  const { t } = useTranslation('global');

  return (
    <View className={'w-full  ' + className}>
      {label != null ? <Text className="mb-2 text-white">{t(label)}</Text> : null}
      <View
        style={{ borderWidth: outlined ? 1 : 0, backgroundColor: Colors.primary.card }}
        className={
          'flex flex-row items-center justify-between rounded-md p-3 px-3 py-1 ' +
          `${outlined ? 'border-gray-200' : ''}`
        }>
        {prefix}
        <TextInput
          id={id}
          className="flex-1 items-center p-4 text-white"
          cursorColor={Colors.light.text}
          placeholder={t(placeholder as string)}
          placeholderTextColor={Colors.dark.tabIconDefault}
          keyboardType={keyboardType}
          value={value}
          autoFocus={autoFocus}
          editable={enable}
          numberOfLines={numberOfLine}
          maxLength={maxLength}
          textAlignVertical={(numberOfLine ?? 0) >= 5 ? 'top' : 'center'}
          onChangeText={onChange as any}
          style={{ fontSize: 11 }}
        />
      </View>
      {error != null ? <Text className="mt-2 text-xs text-red-500">{t(error)}</Text> : null}
    </View>
  );
};

export default InputText;
