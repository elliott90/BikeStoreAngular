/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
export default class SearchParamerization {
  // eslint-disable-next-line @typescript-eslint/ban-types
  static toQueryString(parameters: object): string {
    const params = new URLSearchParams();
    // eslint-disable-next-line guard-for-in
    for (const key in parameters) {
      params.set(key, parameters[key]);
    }

    return params.toString();
  }
}

// export class Utils {
//   static sum(items: any[], prop: string) {
//     return items.reduce(function (a, b) {
//       return a + b[prop];
//     }, 0);
//   }
// }
