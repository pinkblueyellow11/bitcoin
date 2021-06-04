import typography from './typography'
import button from './button'
import input from './input'
import modal from './modal'

const PADDING_HORIZONTAL = 40
const DEFAULT_BORDERRADIUS = 13

export default {
  ...typography,
  ...button,
  ...input,
  ...modal,
  contentPadding: PADDING_HORIZONTAL,
  defaultPadding: 8,
  mediumPadding: 16,
  borderRadius: DEFAULT_BORDERRADIUS,
  col: { flex: 1 },
  colAuto: { flexGrow: 0, flexShrink: 0, flexBasis: 'auto' },
  // react-native-datepicker
  RNDatePicker: {
    // style: {
    //   width: '100%',
    //   height: Theme.inputHeightBase,
    //   justifyContent: 'center',
    // },
    customStyles: {
      //   dateInput: {
      //     borderColor: 'transparent',
      //     paddingHorizontal: Theme.inputPaddingHorizontal,
      //     alignItems: 'flex-start',
      //   },
      //   dateText: {
      //     fontSize: Theme.inputFontSize,
      //     color: Theme.inputColor,
      //   },
      //   placeholderText: {
      //     fontSize: Theme.inputFontSize,
      //   },
      // Fix iOS 14 UI Bug
      datePicker: {
        backgroundColor: '#d1d3d8',
        justifyContent: 'center',
      },
    },
  },
}
