import * as Animatable from 'react-native-animatable';
import {Colors, FontSize} from 'Theme';
import {
  Dimensions,
  ScrollView,
  View,
  BackHandler,
  RefreshControl,
} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import styles from './styles';
import api from 'Services/api';
import * as TEXT from '@Atoms/Text';
import {Divider, Toolbar, FastImage} from '@Atoms';
import {CartItem, DriverDetails} from '@Molecules';
import StepIndicator from 'react-native-step-indicator';

const {height} = Dimensions.get('window');

export default class OrderTracking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fill: 100,
      currentState: 'Pending',
      TOTAL_TIME: props.route.params?.order?.partner?.max_time,
      newOrder: props.route.params?.newOrder,
      order: {},
      refreshing: false,
      isNewOrder: props.route.params.newOrder,
    };
    this.backHandler = null;
  }

  refreshControl = () => (
    <RefreshControl
      refreshing={this.state.refreshing}
      onRefresh={() => this.refreshData()}
    />
  );

  refreshData = () => {
    console.debug('Refreshing..');
    const {order} = this.props.route.params;
    this.setState({refreshing: true});
    this.fetchOrder(order);
  };

  componentDidMount() {
    const {order} = this.props.route.params;

    setTimeout(() => {
      this.setState({newOrder: false});
    }, 5000);

    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );

    this.setState({order: order, currentState: order.status});
    this.getOrderData();
  }

  componentWillUnmount() {
    this.setState({});
    this.backHandler.remove();
  }

  backAction = () => {
    if (this.state.isNewOrder) {
      this.props.navigation.navigate('Home');
    } else {
      this.props.navigation.navigate('Orders');
    }
    return true;
  };

  fetchOrder(order) {
    console.debug('Refetch order.');
    api.get(order.url).then((response) => {
      console.debug('Order Status: ' + response.data.status);

      this.setState({
        order: response.data,
        currentState: response.data.status,
        refreshing: false,
      });
    });
  }

  getOrderData() {
    const {isFocused} = this.props.navigation;
    const {order} = this.props.route.params;

    const currentState = this.state.currentState;

    this.fetchOrder(order);

    // Create a 5 second interval and keep fetching data

    const interval = setInterval(() => {
      if (
        currentState !== 'Completed' &&
        currentState !== 'Timed Out' &&
        currentState !== 'Vendor Cancelled' &&
        currentState !== 'Delivery Cancelled'
      ) {
        this.fetchOrder(order);
      }

      // Clear the interval if user leaves the screen
      if (!isFocused()) {
        console.log('Removing interval with ID ', interval);
        clearInterval(interval);
      }
    }, 5000);
  }

  renderAnimation(order) {
    return (
      <View style={styles.animation.animationChildrenContainerStyle}>
        <FastImage
          contain
          uri={order.image}
          style={{
            height: height * 0.2,
            width: height * 0.2,
          }}
        />
      </View>
    );
  }

  renderCard(item) {
    return <CartItem item={item} />;
  }

  render() {
    const {currentState, order, isNewOrder} = this.state;

    let surcharge = 0;

    order?.surcharges?.map((s) => (surcharge += parseFloat(s.incl_tax)));

    return (
      <View style={styles.rootViewStyle}>
        <Toolbar
          {...this.props}
          navigate={isNewOrder ? 'Home' : 'Orders'}
          title={'Order #' + order?.number}
        />
        <ScrollView
          refreshControl={this.refreshControl()}
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={styles.rootScrollViewContainerStyle}>
          {/* New order Section */}
          {this?.state.newOrder && (
            <View style={styles.topSectionContainerStyle}>
              <Icon
                name={'check-circle'}
                color={Colors.tintGrey}
                size={FontSize.title}
              />
              <TEXT.Normal myStyle={{marginLeft: 20}}>
                Thank you! Order received.
              </TEXT.Normal>
            </View>
          )}

          {/* Animation Root */}
          {[0].map((s) => {
            let fillValue =
              order?.remaining_time < 0
                ? 0
                : (order?.remaining_time / this.state.TOTAL_TIME) * 100;
            fillValue =
              currentState === 'Completed'
                ? 100
                : currentState === 'Timed Out' ||
                  currentState === 'Vendor Cancelled' ||
                  currentState === 'Delivery Cancelled'
                ? 0
                : fillValue;

            return (
              //  Progress bar
              <View style={styles.animation.rootContainerStyle}>
                <AnimatedCircularProgress
                  size={height * 0.35}
                  lineCap="round"
                  rotation={0}
                  width={height * 0.025}
                  fill={Number.isNaN(fillValue) ? 0 : fillValue}
                  tintColor={Colors.primary}
                  backgroundColor="#ccc"
                  prefill={Number.isNaN(fillValue) ? 0 : fillValue}
                  children={() => this.renderAnimation(order)}
                />
                <View style={styles.stepRoot}>
                  <View style={styles.stepContainer}>
                    <StepIndicator
                      stepCount={order?.total_stages}
                      renderStepIndicator={({stepStatus}) => {
                        const clr =
                          stepStatus === 'finished'
                            ? '#45bee255'
                            : stepStatus === 'current'
                            ? '#45bee2'
                            : Colors.background;

                        if (stepStatus === 'current') {
                          return (
                            <Animatable.View
                              style={{width: '90%'}}
                              animation="pulse"
                              iterationCount="infinite">
                              <View
                                style={{
                                  backgroundColor: clr,
                                  ...styles.stepChild,
                                }}
                              />
                            </Animatable.View>
                          );
                        } else {
                          return (
                            <View
                              style={{
                                backgroundColor: clr,
                                ...styles.stepChild,
                              }}
                            />
                          );
                        }
                      }}
                      customStyles={styles.step}
                      currentPosition={order?.stage - 1}
                    />
                  </View>
                  {/* Status View */}
                  <View style={styles.statusRoot}>
                    <Animatable.View
                      style={{width: '85%'}}
                      animation="bounceIn"
                      duration={2000}>
                      <TEXT.Heading>{order?.title}</TEXT.Heading>
                      <TEXT.Caption>{order?.subtitle}</TEXT.Caption>
                    </Animatable.View>
                    {currentState === 'Completed' ||
                    currentState === 'Timed Out' ||
                    currentState === 'Vendor Cancelled' ||
                    currentState === 'Delivery Cancelled' ? null : (
                      <View style={styles.remTimeRoot}>
                        <TEXT.Heading myStyle={styles.remTimeText}>
                          {order?.remaining_time < -1000
                            ? '--'
                            : order?.remaining_time?.toFixed(0)}
                        </TEXT.Heading>

                        <TEXT.Normal>MIN</TEXT.Normal>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
          <Divider />

          <DriverDetails order={order} rider={order?.rider} />

          {/* Order Detail View */}
          <View style={styles.orderNoRoot}>
            <TEXT.Title myStyle={styles.orderNoText}>
              Order #{order.number}
            </TEXT.Title>
          </View>

          {order?.lines?.map(this.renderCard.bind(this))}
          <Divider />

          <View style={styles.billingRoot}>
            <TEXT.Caption myStyle={styles.billingText}>
              {order.shippingCode === 'standard' ||
              order.shipping_code === 'standard'
                ? 'Delivery Fee'
                : 'Collection Fee'}
            </TEXT.Caption>
            <TEXT.Price>
              {order?.shippingInTax || order?.shipping_incl_tax}
            </TEXT.Price>
          </View>
          <View style={styles.billingRoot}>
            <TEXT.Caption myStyle={styles.billingText}>
              Service Fee
            </TEXT.Caption>
            <TEXT.Price>{surcharge?.toFixed(2)}</TEXT.Price>
          </View>
          <View style={styles.billingRoot}>
            <TEXT.Caption myStyle={styles.billingText}>Total</TEXT.Caption>
            <TEXT.Price>
              {order?.totalInTax || order?.total_incl_tax}
            </TEXT.Price>
          </View>
        </ScrollView>
      </View>
    );
  }
}
