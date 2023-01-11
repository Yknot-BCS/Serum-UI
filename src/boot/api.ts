/* eslint-disable @typescript-eslint/no-explicit-any */

import { Api } from 'src/boot/axios';

export default class api {
  static async getCollection(col: string): Promise<any> {
    let x;
    await Api.get(col).then((response) => {
      x = response.data;
    });
    return x;
  }

  static async getUsersNotValidated(): Promise<any> {
    let x;
    await Api.get('/usersNotValidated').then((response) => {
      x = response.data;
    });
    return x;
  }

  static async getDevicesAndMeters(): Promise<any> {
    let x;
    await Api.get('/devicesAndMeters').then((response) => {
      x = response.data;
    });
    return x;
  }

  static async getRECs(): Promise<any> {
    let x;
    await Api.get('/recs').then((response) => {
      x = response.data;
    });
    return x;
  }

  static async getUserSignupData(): Promise<any> {
    let x;
    await Api.get('/getUserSignupData').then((response) => {
      x = response.data;
    });
    return x;
  }

  static async getRECRequestData(): Promise<any> {
    let x;
    await Api.get('/getRECRequestData').then((response) => {
      x = response.data;
    });
    return x;
  }


  static async login(_login: any): Promise<any> {
    let x;
    await Api.post('/login', _login).then((response) => {
      x = response.data;
    });
    return x;
  }

  static async getUserSalt(_info: { email : string }): Promise<any> {
    let x;
    await Api.post('/getUserSalt', _info).then((response) => {
      x = response.data;
    });
    return x;
  }
}
