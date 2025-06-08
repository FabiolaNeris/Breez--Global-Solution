import { Slot, usePathname } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import Header from '../components/header';
import BottomTabBar from '../components/bottonTabBar';

export default function Layout() {
  const pathname = usePathname();

  // Define quais páginas NÃO devem mostrar header e tab bar
  const esconderComponentes = pathname === '/' || pathname === '/cadastrarUsuario';

  return (
    <View style={styles.container}>
      {!esconderComponentes && <Header />}

      <View style={styles.content}>
        <Slot />
      </View>

      {!esconderComponentes && <BottomTabBar />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4d4d4',
  },
  content: {
    flex: 1,
    paddingBottom: 60,
  },
});