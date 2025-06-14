import { ViewStyle } from "react-native";

// Tambahan props untuk error message
export type ExamFABGroupProps = {
  fabOpen: boolean;
  setFabOpen: (open: boolean) => void;
  onReload: () => void;
  onSubmitPassword: (password: string) => Promise<boolean>; // sekarang mengembalikan apakah benar
  containerStyle?: ViewStyle;
};
