import { helper } from '@ember/component/helper';

export function inc(params) {
  let [num] = params;
  return ++num;
}

export default helper(inc);