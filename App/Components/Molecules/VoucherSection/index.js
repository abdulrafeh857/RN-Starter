import styles from './styles';
import React, {useState, useEffect} from 'react';
import {Input, Feedback} from '@Atoms';
import {View} from 'react-native';
import {TouchableRipple, Button, IconButton} from 'react-native-paper';
import * as TEXT from '@Atoms/Text';
import {useDispatch} from 'react-redux';
import addVoucherService from 'Services/Voucher';
import deleteVoucherService from 'Services/VoucherDelete';
import {Colors} from 'Theme';
import getBasket from '../../../Store/Actions/Basket';

const VoucherSection = (props) => {
  const {vouchers} = props;

  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);
  const [voucher, setVoucher] = useState('');

  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [voucherError, setVoucherError] = useState(null);
  const [voucherSuccess, setVoucherSuccess] = useState(null);

  const addVoucher = () => {
    setAdding(true);
    console.log('🚀 ~ Checking Voucher', voucher);
    addVoucherService({vouchercode: voucher}).then((res) => {
      setAdding(false);

      if (res.id && res.name && res.code) {
        Feedback.success('Voucher added successfully!', 'OK');
        setVoucherSuccess(true);
        setVoucherError(null);
        dispatch(getBasket());
      } else {
        setVoucherError(res?.response?.data);
        setVoucherSuccess(false);
      }
    });
  };

  const deleteVoucher = () => {
    setDeleting(true);
    console.log('🚀 ~ Deleting Voucher', voucher);
    deleteVoucherService({vouchercode: voucher}).then((res) => {
      setDeleting(false);

      if (res.status === 200) {
        Feedback.success('Voucher removed successfully!', 'OK');
        setVoucherSuccess(false);
        setVoucherError(null);
        dispatch(getBasket());
      } else {
        setVoucherError(res?.response?.data);
      }
    });
  };

  useEffect(() => {
    if (vouchers && vouchers.length > 0) {
      setVoucher(vouchers[0].voucher.code);
    }
  }, [vouchers]);

  return (
    <TouchableRipple
      onPress={() => setExpanded(!expanded)}
      style={styles.input}>
      <>
        <View style={styles.header}>
          <TEXT.Heading myStyle={styles.inputText}>
            Got a voucher code?
          </TEXT.Heading>
          <IconButton
            icon={expanded ? 'chevron-up' : 'chevron-down'}
            color={Colors.primary}
            size={20}
          />
        </View>

        {expanded && (
          <>
            <Input
              placeholder="Enter Code"
              label="Voucher Code"
              leftIcon={null}
              value={voucher}
              rightIcon={voucherSuccess ? 'check-decagram' : undefined}
              keyboardType="default"
              style={styles.inputChild}
              error={
                (voucherError?.non_field_errors &&
                  '* ' + voucherError?.non_field_errors[0]) ||
                (voucherError?.reason && '* ' + voucherError?.reason) ||
                (voucherError?.vouchercode && '* ' + voucherError?.vouchercode)
              }
              onChangeText={setVoucher}
            />
            <View style={styles.button.root}>
              <Button
                style={styles.button.delete}
                mode="outlined"
                loading={deleting}
                labelStyle={{color: Colors.error}}
                onPress={deleteVoucher}>
                Delete
              </Button>
              <Button
                style={styles.button.apply}
                mode="contained"
                loading={adding}
                labelStyle={{color: 'white'}}
                onPress={addVoucher}>
                Apply
              </Button>
            </View>
          </>
        )}
      </>
    </TouchableRipple>
  );
};

export default VoucherSection;
