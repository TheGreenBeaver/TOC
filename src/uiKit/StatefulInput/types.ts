import type { InputHTMLAttributes } from 'react';

type BaseProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'defaultValue'>;
export type StatefulInputProps = BaseProps & Partial<{
  value: string,
  onChange: (newValue: string) => void,
  delay: number,
  defaultValue: string,
}>;