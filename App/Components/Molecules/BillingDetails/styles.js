import {Colors, Layout} from 'Theme';

const styles = {
  billingSectionContainerStyle: {
    ...Layout.colHCenter,
    backgroundColor: Colors.foreground,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  voucherPrice: {
    fontFamily: 'SofiaPro',
    color: Colors.primary,
    fontSize: 17,
    lineHeight: 17,
  },
};

export default styles;
