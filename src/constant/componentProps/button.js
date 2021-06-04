import { StyleSheet } from 'react-native'
import Colors from '../../../native-base-theme/variables/commonColor'
import typography from './typography'

export default {
  // component props, not styleSheet
  switch: {
    barHeight: 32,
    backgroundActive: Colors.brandPrimary,
    backgroundInactive: Colors.brandSecondary20,
    circleSize: 28,
    circleBorderWidth: 0.5,
    circleActiveColor: '#fff',
    circleInActiveColor: '#fff',
    changeValueImmediately: true,
    changeValueImmediately: true, // if rendering inside circle, change state immediately or wait for animation to complete
    innerCircleStyle: {
      alignItems: 'center',
      justifyContent: 'center',
    }, // style for inner animated circle for what you (may) be rendering inside the circle
    outerCircleStyle: {}, // style for outer animated circle
    switchLeftPx: 2.6, // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
    switchRightPx: 2.6, // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
    switchWidthMultiplier: 52 / 28, // multipled by the `circleSize` prop to calculate total width of the Switch
    switchBorderRadius: 28, // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
    renderActiveText: false,
    renderInActiveText: false,
    activeText: '',
    inActiveText: '',
  },
  radioButtonInput: (isSelected = false) => ({
    borderWidth: 1,
    buttonInnerColor: Colors.brandPrimary,
    buttonOuterColor: isSelected ? Colors.brandPrimary : Colors.brandSecondary,
    buttonSize: 14,
    buttonOuterSize: 24,
    ...StyleSheet.create({
      buttonStyle: {},
      buttonWrapStyle: {},
    }),
  }),
  radioButtonLabel: {
    ...StyleSheet.create({
      labelStyle: {
        ...typography.fontBody1,
      },
      buttonWrapStyle: {},
    }),
  },
}
