import { forwardRef, useEffect, useRef, useCallback, useState, memo } from 'react';
import type { StatefulInputProps } from './types';
import debounce from 'lodash/debounce';
import { Input, InputContainer } from './styles';

export const StatefulInput = memo(forwardRef<HTMLInputElement, StatefulInputProps>(({
  value,
  delay = 300,
  onChange,
  defaultValue,
  ...rest
}, ref) => {
  const [draftValue, setDraftValue] = useState(defaultValue ?? value ?? '');
  const shouldSkipNextUpdate = useRef(false);

  const debouncedSaveValue = useCallback(debounce((newValue: string) => {
    shouldSkipNextUpdate.current = true;
    onChange?.(newValue);
  }, delay), [delay, onChange]);

  useEffect(() => {
    if (shouldSkipNextUpdate.current) {
      shouldSkipNextUpdate.current = false;
    } else {
      setDraftValue(value ?? '');
    }
  }, [value]);

  useEffect(() => {
    debouncedSaveValue(draftValue);
  }, [draftValue, debouncedSaveValue]);

  return (
    <InputContainer>
      <Input
        ref={ref}
        value={draftValue}
        onChange={e => setDraftValue(e.target.value)}
        {...rest}
      />
    </InputContainer>
  );
}));