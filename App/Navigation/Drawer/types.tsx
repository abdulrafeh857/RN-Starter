import {
  DrawerScreenProps as RNDrawerProps,
  DrawerContentComponentProps
} from '@react-navigation/drawer';

export type RootDrawerParamList = {
  Drawer: undefined;
  Home: undefined;
  Invoice: undefined;
  Payments: undefined;
  Settings: undefined;
  Refunds: undefined;
  Report: undefined;
  Payouts: undefined;
  Customers: undefined;
  SBDashboard: undefined;
  AppSettings: undefined;
  QrCodes: undefined;
  SPDashboard: undefined;
  SPVehicles: undefined;
  SPBluetooth: undefined;
  SuppDashboard: undefined;
  WorkSpace: undefined;
  WorkSpaceTasks: undefined;
  Agent: undefined;
  SupSettings: undefined;
  NewInvoice: undefined;
  Collections: undefined;
  EditCollection: undefined;
  CollectionInfo: undefined;
  ColPayments: undefined;
  SettingsProfile: undefined;
  SettingsAccounts: undefined;
  NewCollection: undefined;
  SettingsMeter: undefined;
  QrDetailView: undefined;
  SettingsTab: undefined;
  InvoiceDetailView: undefined;
  CustomerDetailView: undefined;
  Rider: undefined;
  Vehicles: undefined;
  VehicleDetails: undefined;
  BoardScreen: undefined;
  BoardSelect: undefined;
  EditInvoice: undefined;
  NewCustomer: undefined;
  EditCustomer: undefined;
  Profile: undefined;
  EposInvoice: undefined;
  AccServices: undefined;

  PayInvoice: undefined;
};

export type DrawerScreenProps = RNDrawerProps<RootDrawerParamList>;

export type { DrawerContentComponentProps };
