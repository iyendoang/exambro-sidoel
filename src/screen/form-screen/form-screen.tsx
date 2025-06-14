import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import InputField from '../../components/custom/input-field';
import SubmitButton from '../../components/custom/submit-button';
import { useSnackbar } from '../../components/snackbar-provider';
import { RootStackParamList } from '../../types/navigation';
import styles from './style';


type Props = NativeStackScreenProps<RootStackParamList, 'Form'>;

export default function FormScreen({ navigation }: Props) {
  const [npsn, setNpsn] = useState('');
  const [loading, setLoading] = useState(false);
  const { showMessage } = useSnackbar();

  useEffect(() => {
    const checkStorage = async () => {
      const stored = await AsyncStorage.getItem('lembagaData');
      const storedNpsn = await AsyncStorage.getItem('npsn');
      if (stored && storedNpsn) {
        navigation.replace('Lembaga');
      }
    };
    checkStorage();
  }, [navigation]);

  const handleSubmit = async () => {
    if (npsn.trim().length !== 8) {
      showMessage('NPSN wajib diisi minimal 8 digit.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://dev.sidoel.id/api/v1/links/${npsn.trim()}`);
      const json = await res.json();

      if (!res.ok || json.status !== 'success') {
        showMessage(json.message || 'Terjadi kesalahan saat mengambil data.');
        return;
      }

      const { data } = json;
      await AsyncStorage.setItem('lembagaData', JSON.stringify(data));
      await AsyncStorage.setItem('npsn', npsn.trim());

      navigation.replace('Lembaga');
    } catch (error) {
      showMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>SIDOEL EXAMBRO</Text>

          <InputField
            label="Input NPSN"
            value={npsn}
            onChangeText={setNpsn}
            keyboardType="number-pad"
            maxLength={8}
            minLength={8}
          />

          <SubmitButton onPress={handleSubmit} loading={loading} title="Simpan dan Lanjut" />
        </View>

        <Text style={styles.footer}>© 2025 PT Artha Dinamika Buana</Text>
      </ScrollView>
    </View>
  );
}
