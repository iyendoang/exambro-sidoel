declare module 'react-native-vector-icons/FontAwesome' {
  import React from 'react';
    import { TextProps } from 'react-native';

  const FontAwesome: React.ComponentType<TextProps & {
    name: string;
    size?: number;
    color?: string;
  }>;

  export default FontAwesome;
}
