import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Easing,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';
import { FAB, useTheme } from 'react-native-paper';
import InputField from './input-field';

export type ExamFABGroupProps = {
  fabOpen: boolean;
  setFabOpen: (open: boolean) => void;
  onReload: () => void;
  onSubmitPassword: (password: string) => Promise<boolean>;
  containerStyle?: ViewStyle;
};

export default function ExamFABGroup({
  fabOpen,
  setFabOpen,
  onReload,
  onSubmitPassword,
  containerStyle,
}: ExamFABGroupProps) {
  const theme = useTheme();
  const colors = theme.dark ? darkColors : lightColors;
  const isDarkInput = theme.dark ? true : false;
  const modalStyles = getModalStyles(theme.dark);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: fabOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [fabOpen, fadeAnim]);

  const openModal = () => {
    setModalVisible(true);
    setFabOpen(false);
  };

  const handlePasswordSubmit = async () => {
    const success = await onSubmitPassword(password);
    if (!success) {
      setErrorMessage('Kode yang Anda masukkan salah.');
    } else {
      setPassword('');
      setErrorMessage('');
      setModalVisible(false);
    }
  };

  return (
    <>
      {fabOpen && (
        <TouchableWithoutFeedback onPress={() => setFabOpen(false)}>
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: colors.backdrop,
                opacity: fadeAnim,
              },
            ]}
          />
        </TouchableWithoutFeedback>
      )}

      <View style={[styles.fabContainer, containerStyle]}>
        {fabOpen && (
          <Animated.View style={[styles.actionsWrapper, { opacity: fadeAnim }]}>
            <View style={styles.actionItem}>
              <Text style={[styles.label, { color: colors.labelText }]}>
                Reload
              </Text>
              <FAB
                small
                icon="reload"
                onPress={onReload}
                style={[styles.fabAction, { backgroundColor: colors.actionBg }]}
                color={colors.actionIcon}
              />
            </View>
            <View style={styles.actionItem}>
              <Text style={[styles.label, { color: colors.labelText }]}>
                Selesai
              </Text>
              <FAB
                small
                icon="lock"
                onPress={openModal}
                style={[styles.fabAction, { backgroundColor: colors.actionBg }]}
                color={colors.actionIcon}
              />
            </View>
          </Animated.View>
        )}

        <FAB
          icon={fabOpen ? 'close' : 'plus'}
          onPress={() => setFabOpen(!fabOpen)}
          style={[styles.fabMain, { backgroundColor: colors.fabBg }]}
          color={colors.fabIcon}
        />
      </View>

      {/* Modal Password */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.centeredView}>
          <View
            style={[
              modalStyles.modalView,
              { backgroundColor: colors.actionBg },
            ]}
          >
            <Text style={[modalStyles.modalTitle, { color: colors.labelText }]}>
              Konfirmasi Keluar Ujian
            </Text>

            <Text style={[modalStyles.modalText, { color: colors.labelText }]}>
              Untuk menyelesaikan dan keluar dari ruang ujian, ketik{' '}
              <Text style={modalStyles.modalTextAurora}>"EXIT SIDOEL"</Text>{' '}
              pada kolom di bawah.
            </Text>

            <InputField
              label="Password"
              value={password}
              onChangeText={text => {
                setPassword(text);
                setErrorMessage('');
              }}
              secureTextEntry
              minLength={1}
              isDark={isDarkInput}
            />

            {errorMessage ? (
              <Text style={modalStyles.modalErrorText}>{errorMessage}</Text>
            ) : null}

            <View style={modalStyles.buttonsRow}>
              <Pressable
                style={[modalStyles.button, modalStyles.buttonCancel]}
                onPress={() => {
                  setModalVisible(false);
                  setPassword('');
                  setErrorMessage('');
                }}
              >
                <Text style={modalStyles.textStyleCancel}>Batal</Text>
              </Pressable>
              <Pressable
                style={[modalStyles.button, modalStyles.buttonSubmit]}
                onPress={handlePasswordSubmit}
                disabled={password.length === 0}
              >
                <Text style={modalStyles.textStyle}>Selesai</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const darkColors = {
  fabBg: '#fafafa',
  fabIcon: '#18181b',
  actionBg: '#1f1f1f',
  actionIcon: '#e4e4e7',
  labelText: '#e4e4e7',
  backdrop: 'rgba(0, 0, 0, 0.3)',
};

const lightColors = {
  fabBg: '#18181b',
  fabIcon: '#fafafa',
  actionBg: '#f4f4f5',
  actionIcon: '#3f3f46',
  labelText: '#18181b',
  backdrop: 'rgba(255, 255, 255, 0.1)',
};

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    alignItems: 'center',
  },
  actionsWrapper: {
    marginBottom: 10,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginRight: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  fabMain: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  fabAction: {
    elevation: 3,
  },
});
export const getModalStyles = (isDark: boolean) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.3)',
    },
    modalView: {
      margin: 20,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: isDark ? '#3f3f46' : '#d4d4d8',
      padding: 20,
      width: '85%',
      elevation: 5,
      backgroundColor: isDark ? '#27272a' : '#f4f4f5', // zinc-800 / zinc-50
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 15,
      textAlign: 'center',
      color: isDark ? '#e4e4e7' : '#18181b', // zinc-200 / zinc-900
    },
    modalText: {
      fontSize: 16,
      marginBottom: 15,
      fontWeight: '400',
      textAlign: 'center',
      color: isDark ? '#e4e4e7' : '#18181b', // zinc-200 / zinc-900
    },
    modalTextAurora: {
      fontSize: 16,
      marginBottom: 15,
      fontWeight: '600',
      textAlign: 'center',
      color: isDark ? '#dc2626' : '#ef4444', // zinc-200 / zinc-900
    },
    modalErrorText: {
      marginBottom: 15,
      fontWeight: '300',
      color: isDark ? '#fca5a5' : '#ef4444', 
      textShadowColor: isDark ? '#dc2626' : '#b91c1c',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    input: {
      borderWidth: 1,
      borderRadius: 6,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      marginBottom: 15,
      color: isDark ? '#e4e4e7' : '#18181b',
      borderColor: isDark ? '#3f3f46' : '#d4d4d8', // zinc-700 / zinc-300
      backgroundColor: isDark ? '#1f1f1f' : '#fff',
    },
    buttonsRow: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      borderRadius: 6,
      paddingVertical: 10,
      paddingHorizontal: 20,
      minWidth: 100,
      alignItems: 'center',
    },
    buttonCancel: {
      backgroundColor: isDark ? '#3f3f46' : '#d4d4d8', // zinc-700 / zinc-
    },
    buttonSubmit: {
      backgroundColor: isDark ? '#fafafa' : '#18181b', // zinc-50 / zinc-900
    },
    textStyle: {
      color: isDark ? '#18181b' : '#fafafa', // kontras
      fontWeight: '600',
    },
    textStyleCancel: {
      color: isDark ? '#e4e4e7' : '#18181b',
      fontWeight: '600',
    },
  });
