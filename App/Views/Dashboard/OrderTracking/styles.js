import {Colors, FontSize, Layout} from 'Theme';

import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = {
  rootViewStyle: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  rootScrollViewContainerStyle: {
    paddingBottom: '3%',
    backgroundColor: Colors.background,
  },
  topSectionContainerStyle: {
    ...Layout.colHCenter,
    backgroundColor: Colors.foreground,
    height: height * 0.05,
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 8,
  },
  animation: {
    rootContainerStyle: {
      ...Layout.center,
      backgroundColor: Colors.foreground,
      paddingTop: 18,
      paddingBottom: 12,
      width: '100%',
    },
    animationChildrenContainerStyle: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  stepRoot: {
    marginTop: -10,
    width: '100%',
  },
  stepContainer: {
    height: height * 0.033,
    paddingHorizontal: 10,
  },
  step: {
    stepIndicatorSize: width * 0.15,
    currentStepIndicatorSize: width * 0.15,
    separatorStrokeWidth: 0,
    currentStepStrokeWidth: 0,
    stepStrokeWidth: 0,
    stepIndicatorFinishedColor: 'transparent',
    stepIndicatorUnFinishedColor: 'transparent',
    stepIndicatorCurrentColor: 'transparent',
  },
  stepChild: {
    borderRadius: 10,
    height: 6,
    width: '100%',
  },
  statusRoot: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  remTimeRoot: {
    alignItems: 'center',
  },
  remTimeText: {
    fontSize: 24,
    lineHeight: 24,
  },
  orderNoRoot: {
    backgroundColor: Colors.foreground,
    padding: 8,
  },
  orderNoText: {
    textDecorationLine: 'underline',
  },
  billingRoot: {
    paddingVertical: 10,
    ...Layout.colHCenter,
    width: '100%',
    backgroundColor: Colors.foreground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  billingText: {
    fontSize: 15,
    lineHeight: 15,
  },
};

export default styles;
