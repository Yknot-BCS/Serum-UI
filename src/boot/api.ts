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


}
