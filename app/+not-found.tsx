import { Link, Stack } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTheme } from '@/lib/theme';

const NotFoundScreen = () => {
  const { tw } = useTheme();
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={tw`flex-1 items-center justify-center p-5`}>
        <ThemedText type="title">This screen does not exist.</ThemedText>
        <Link href="/" style={tw`mt-4 py-4`}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

export default NotFoundScreen;

