/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { VehicleStatus } from './VehicleStatus';

export type VehicleModel = {
    site: number;
    itemId: string;
    price: number;
    make: string;
    makeEn: string;
    picture: Array<string>;
    mileage: number;
    model: string;
    planA: number;
    planB: number;
    repairHistory: string;
    specification: Array<string>;
    title: string;
    offerPrice: string;
    salePrice: number;
    status: VehicleStatus;
    url: string;
    inspectionMonth: number;
    inspectionYear: number;
    modelYear: number;
    pageNo: number;
    mfgData: string;
    mfgYear: number;
    regYear: number;
    regMonth: number;
    chassisNo: string;
    width: string;
    height: string;
    length: string;
    m3: string;
    doors: string;
    seatCapacity: number;
    location: string;
    fuel: string;
    color: string;
    wheelDrive: string;
    bodyType: string;
    engineType: string;
    transmission: string;
    wheelbase: string;
    vehicleWeight: string;
    indoor: string;
    JC08FuelEconomy: string;
    WLTCFuelEconomy: string;
    minimumTurningRadius: string;
    numberOfSheetRows: string;
    steering: string;
    condition: string;
};