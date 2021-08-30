import * as React from 'react';
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from '@chakra-ui/react';
import { IoSunny, IoMoon } from 'react-icons/all';

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(IoMoon, IoSunny);
  return (
    <IconButton
      {...props}
      fontSize="20"
      variant="outline"
      icon={<SwitchIcon />}
      onClick={toggleColorMode}
      aria-label={`Switch to ${text} mode`}
    />
  );
};
