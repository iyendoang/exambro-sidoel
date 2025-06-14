import { Avatar, IconButton } from "react-native-paper";

const LeftIcon = (props: any) => <Avatar.Icon {...props} icon="folder" />;
const RightIcon = ({ onPress }: { onPress: () => void }) => (
  <IconButton icon="open-in-new" onPress={onPress} />
);

export { LeftIcon, RightIcon };
