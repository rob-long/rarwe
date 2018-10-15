import { helper } from '@ember/component/helper';

export function dec(params) {
  let [num] = params;
  num = num - 1;
  return num;
}

export default helper(dec);