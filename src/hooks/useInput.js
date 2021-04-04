import { useCallback, useState } from 'react';

const useInput = (settings) => {
  const {maxLength, minLength, initialValue, type} = settings
  const [value, setter] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState('');

  const handler = useCallback((e) => {
    setter(e.target.value);

    if (maxLength && maxLength < e.target.value.length) {
      setErrorMsg(`최대 ${maxLength}자까지 입력 가능합니다.`)
    } else {
      setErrorMsg('');
    }

    if (minLength && minLength > e.target.value.length) {
      setErrorMsg(`최소 ${minLength}자 이상 입력해주세요.`)
    }

  }, [type, maxLength, minLength]);

  const reset = useCallback(() => setter(initialValue), [initialValue]);
  return [value, setter, handler, errorMsg, reset];
};

export default useInput;
