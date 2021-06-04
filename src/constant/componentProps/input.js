import React from 'react'
import { StyleSheet, Pressable, Image } from 'react-native'
import Theme from '../../../native-base-theme/variables/commonColor'
import typography from './typography'

const RN_PICKER_SELECT_STYLE = {
  flex: 1,
  height: Theme.inputHeightBase,
  color: Theme.inputColor,
  paddingHorizontal: Theme.inputPaddingHorizontal,
  fontSize: Theme.inputFontSize,
  borderWidth: 0,
  borderColor: Theme.inputBorderColor,
}

export default {
  // native-base Input
  ...StyleSheet.create({
    inputLabel: {
      ...typography.fontBody1,
      marginBottom: 4,
    },
    inputEndAdornment: {
      paddingHorizontal: 12,
    },
    inputHelperText: {
      ...typography.fontBody1,
      marginTop: 4,
    },
  }),
  // react-native-picker-select
  selectorProps: {
    notNativeAndroidPickerStyle: {
      useNativeAndroidPickerStyle: false,
      touchableWrapperProps: { style: { width: '100%' } },
    },
    style: {
      viewContainer: {
        flex: 1,
      },
      inputAndroid: RN_PICKER_SELECT_STYLE,
      inputIOS: RN_PICKER_SELECT_STYLE,
      ...StyleSheet.create({
        iconContainer: {
          top: 16,
        },
      }),
    },
  },
  selectorIcon: (isFocused = false) => {
    return (
      <Pressable style={[{ paddingHorizontal: 12 }]} onPress={() => {}}>
        {isFocused ? (
          <Image source={require('../../assets/icon/arrowDropDownBlack.png')} />
        ) : (
          <Image source={require('../../assets/icon/arrowDropDownGray.png')} />
        )}
      </Pressable>
    )
  },
}
