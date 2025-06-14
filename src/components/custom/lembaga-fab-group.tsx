import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { FAB, useTheme } from 'react-native-paper';

export type LembagaFABGroupProps = {
  fabOpen: boolean;
  setFabOpen: (open: boolean) => void;
  updateStorage: () => void;
  resetStorage: () => void;
  containerStyle?: ViewStyle;
  // isDark?: boolean; // tidak perlu lagi kalau pakai theme context
};

export default function LembagaFABGroup({
  fabOpen,
  setFabOpen,
  updateStorage,
  resetStorage,
  containerStyle,
}: LembagaFABGroupProps) {
  const theme = useTheme();
  const colors = theme.dark ? darkColors : lightColors;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: fabOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [fabOpen, fadeAnim]);

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
                Update
              </Text>
              <FAB
                small
                icon="update"
                onPress={updateStorage}
                style={[styles.fabAction, { backgroundColor: colors.actionBg }]}
                color={colors.actionIcon}
              />
            </View>
            <View style={styles.actionItem}>
              <Text style={[styles.label, { color: colors.labelText }]}>
                Reset
              </Text>
              <FAB
                small
                icon="restore"
                onPress={resetStorage}
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
    </>
  );
}

// Warna Zinc seperti Tailwind/ShadCN (sama seperti milikmu)
const darkColors = {
  fabBg: '#fafafa',
  fabIcon: '#18181b',
  actionBg: '#f4f4f5',
  actionIcon: '#3f3f46',
  labelText: '#e4e4e7',
  backdrop: 'rgba(0, 0, 0, 0.1)',
};

const lightColors = {
  fabBg: '#18181b',
  fabIcon: '#fafafa',
  actionBg: '#27272a',
  actionIcon: '#d4d4d8',
  labelText: '#18181b',
  backdrop: 'rgba(255, 255, 255, 0.05)',
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
