import React, { createContext, useContext, useState } from 'react';
import { Snackbar } from 'react-native-paper';

type SnackbarContextType = {
  showMessage: (msg: string) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showMessage = (msg: string) => {
    setMessage(msg);
    setVisible(true);
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}
        action={{
          label: 'Tutup',
          onPress: () => setVisible(false),
        }}
      >
        {message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

// Custom hook agar gampang panggil dari komponen lain
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
