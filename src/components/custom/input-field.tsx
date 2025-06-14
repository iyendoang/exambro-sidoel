import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'number-pad' | 'email-address';
  maxLength?: number;
  minLength?: number;
  secureTextEntry?: boolean;
  onValidChange?: (isValid: boolean) => void;
  isDark?: boolean; // untuk mode dark
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  maxLength,
  minLength,
  onValidChange,
  isDark = false,
}) => {
  React.useEffect(() => {
    if (typeof minLength === 'number' && onValidChange) {
      onValidChange(value.length >= minLength);
    }
  }, [value, minLength, onValidChange]);

  const colors = isDark
    ? {
        background: '#18181b', // zinc-900
        text: '#f4f4f5', // zinc-100
        placeholder: '#a1a1aa', // zinc-400
        border: '#3f3f46', // zinc-700
        active: '#f9fafb', // zinc-50 (cukup terang untuk aksen di dark mode)
      }
    : {
        background: '#ffffff', // white
        text: '#18181b', // zinc-900
        placeholder: '#71717a', // zinc-500
        border: '#d4d4d8', // zinc-300
        active: '#52525b', // zinc-600 (netral gelap di light mode)
      };

  return (
    <View style={styles.container}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        mode="outlined"
        style={[
          styles.input,
          { backgroundColor: colors.background, color: colors.text },
        ]}
        outlineColor={colors.border}
        secureTextEntry={secureTextEntry}
        activeOutlineColor={colors.active}
        outlineStyle={styles.outline}
        textColor={colors.text}
        maxLength={maxLength}
        theme={{
          colors: {
            primary: colors.active,
            text: colors.text,
            placeholder: colors.placeholder,
            background: colors.background,
          },
          roundness: 8,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: '100%',
  },
  input: {
    fontSize: 16,
  },
  outline: {
    borderWidth: 0.75,
  },
});

export default InputField;
