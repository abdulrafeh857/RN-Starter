/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit';
import Users from './Users';
import DashboardDetails from './DashboardDetails';
import IsLoggedIn from './IsLoggedIn';
import PusherInstance from './PusherInstance';
import GensetId from './GensetId';
import DriverId from './DriverData';
import Location from './Location';
import PushFlag from './PushFlag';
import Warnings from './Warnings';
import PusherFlag from './PusherFlag';
import CurLocationData from './CurLocationData';
import GenStatus from './GenStatus';

export const store = configureStore({
  reducer: {
    Users,
    DashboardDetails,
    IsLoggedIn,
    PusherInstance,
    GensetId,
    Location,
    PushFlag,
    Warnings,
    PusherFlag,
    CurLocationData,
    DriverId,
    GenStatus
  }
});
