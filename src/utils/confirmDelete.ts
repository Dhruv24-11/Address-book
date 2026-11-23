import { Alert } from 'react-native';

export const confirmDelete = (onConfirm: () => void) => {
  Alert.alert(
    'Delete address?',
    'Are you sure you want to delete this address? This action cannot be undone.',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: onConfirm,
      },
    ],
    { cancelable: true }
  );
};
