import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import ExamFABGroup from '../components/custom/exam-fab-group';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Exam'>;

export default function ExamScreen({ navigation, route }: Props) {
  const { url } = route.params;
  const [fabOpen, setFabOpen] = useState(false);
  const webviewRef = useRef<WebView>(null);

  const reloadWebView = () => {
    webviewRef.current?.reload();
  };

  const handleSubmitPassword = async (password: string): Promise<boolean> => {
  const normalized = password.replace(/\s+/g, '').toLowerCase();

  if (normalized === 'exitsidoel') {
    try {
      // Hanya hapus data selain lembagaData
      const keys = await AsyncStorage.getAllKeys();
      const keysToDelete = keys.filter(key => key !== 'lembagaData' && key !== 'npsn');

      await AsyncStorage.multiRemove(keysToDelete);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Lembaga' }],
      });

      return true;
    } catch (error) {
      Alert.alert('Error', 'Gagal keluar ujian. Coba lagi.');
      console.error(error);
      return false;
    }
  }

  return false;
};


  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        source={{ uri: url }}
        style={styles.webview}
        userAgent="MyCustomUserAgent/1.0 (ReactNativeExamApp)"
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />

      <ExamFABGroup
        fabOpen={fabOpen}
        setFabOpen={setFabOpen}
        onReload={reloadWebView}
        onSubmitPassword={handleSubmitPassword}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
