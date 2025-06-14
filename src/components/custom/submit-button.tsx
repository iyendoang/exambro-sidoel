import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

interface SubmitButtonProps {
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  title?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  onPress,
  loading = false,
  disabled = false,
  title = 'Submit',
}) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      loading={loading}
      disabled={disabled || loading}
      style={styles.button}
      textColor="#f9fafb" // zinc-50
      buttonColor="#111827" // zinc-950
      contentStyle={styles.content}
      labelStyle={styles.label}
    >
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 10,
    marginTop: 12,
  },
  content: {
    paddingVertical: 2,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
  },
});

export default SubmitButton;
