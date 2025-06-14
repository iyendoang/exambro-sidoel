import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, View } from 'react-native';
import {
  Avatar,
  Card,
  IconButton,
  ProgressBar,
  Text,
} from 'react-native-paper';

import LembagaFABGroup from '../../components/custom/lembaga-fab-group';
import { useSnackbar } from '../../components/snackbar-provider';
import { RootStackParamList } from '../../types/navigation';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Lembaga'>;

export default function LembagaScreen({ navigation }: Props) {
  const [loading, setLoading] = useState(true);
  const [lembagaData, setLembagaData] = useState<any>(null);
  const [npsn, setNpsn] = useState<string>('');
  const { showMessage } = useSnackbar();

  const fetchAndStoreData = useCallback(
    async (currentNpsn: string) => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://dev.sidoel.id/api/v1/links/${currentNpsn}`,
        );
        const json = await res.json();
        if (res.ok && json.status === 'success') {
          const newData = json.data;
          setLembagaData(newData);
          await AsyncStorage.setItem('lembagaData', JSON.stringify(newData));
        } else {
          showMessage(json.message || 'Gagal mengambil data lembaga.');
          navigation.replace('Form');
        }
      } catch (error) {
        showMessage((error as Error).message);
        navigation.replace('Form');
      } finally {
        setLoading(false);
      }
    },
    [navigation, showMessage],
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedNpsn = await AsyncStorage.getItem('npsn');
        if (!storedNpsn) {
          showMessage('NPSN tidak ditemukan di penyimpanan.');
          navigation.replace('Form');
          return;
        }
        setNpsn(storedNpsn);

        const storedData = await AsyncStorage.getItem('lembagaData');
        if (storedData) {
          setLembagaData(JSON.parse(storedData));
          setLoading(false);
        } else {
          await fetchAndStoreData(storedNpsn);
        }
      } catch (error) {
        showMessage((error as Error).message);
        navigation.replace('Form');
      }
    };
    loadData();
  }, [fetchAndStoreData, navigation, showMessage]);

  const updateStorage = async () => {
    if (!npsn) return;
    setLoading(true);
    try {
      await fetchAndStoreData(npsn);
      showMessage('Data lembaga berhasil diperbarui.');
    } finally {
      setLoading(false);
    }
  };

  const resetStorage = async () => {
    Alert.alert('Konfirmasi', 'Apakah Anda yakin ingin reset data?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Ya',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('lembagaData');
          await AsyncStorage.removeItem('npsn');
          navigation.replace('Form');
        },
      },
    ]);
  };

  const [fabOpen, setFabOpen] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setFabOpen(false);
      return () => setFabOpen(false);
    }, []),
  );

  if (loading || !lembagaData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Memuat...</Text>
        <ProgressBar indeterminate color="#6200ee" style={styles.progressBar} />
      </View>
    );
  }

  const isValidUrl = (url?: string) =>
    !!url && typeof url === 'string' && url.startsWith('http');

  const avatarUri = isValidUrl(lembagaData.avatar)
    ? lembagaData.avatar
    : 'https://via.placeholder.com/150';

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.centerContent}>
          <Avatar.Image
            size={75}
            source={{ uri: avatarUri }}
            style={styles.avatarLogo}
          />
          <Text style={styles.title}>{lembagaData.display_name}</Text>
          <Text style={styles.subtitle}>{lembagaData.bio}</Text>
        </View>

        {lembagaData.links?.length > 0 && (
          <View style={styles.linksContainer}>
            {lembagaData.links.map((link: any) => (
              <Card key={link.id} style={styles.cardAcction}>
                <Card.Title
                  title={link.title}
                  subtitle={link.description || 'Tautan Ujian'}
                  left={props => (
                    <Avatar.Icon
                      {...props}
                      icon="folder"
                      style={styles.avatarIcon}
                    />
                  )}
                  right={props => (
                    <IconButton
                      {...props}
                      icon="open-in-new"
                      onPress={() =>
                        navigation.navigate('Exam', { url: link.url })
                      }
                      accessibilityLabel="Buka Tautan"
                    />
                  )}
                />
              </Card>
            ))}
          </View>
        )}
      </ScrollView>

      {/* FAB hanya muncul di LembagaScreen, jadi tidak perlu cek route lagi */}
      <LembagaFABGroup
        fabOpen={fabOpen}
        setFabOpen={setFabOpen}
        updateStorage={updateStorage}
        resetStorage={resetStorage}
        containerStyle={styles.container}
      />
    </View>
  );
}
