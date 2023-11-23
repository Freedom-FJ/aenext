import { Icon, Input } from '@alifd/next';
import React, { forwardRef, useMemo, useState } from 'react';
import { useLocale } from '../../config-provider/useContext';
// 此组建用于防止处罚浏览器的自动填入密码和跳出保存密码，使用text模拟的password组建
interface TextPasswordProps extends React.ComponentProps<typeof Input> {
  onChange?: (v: string) => void;
  showToggle?: boolean;
  placeholder?: string;
}

export const TextPassword = forwardRef(
  (props: TextPasswordProps, ref: React.LegacyRef<Input>) => {
    const { showToggle = true, placeholder, onInput, onChange } = props;
    const [inputValue, setInputValue] = useState('');
    const locale = useLocale('text-password');
    const [rememberValue, setRememberValue] = useState('');
    const [eyesClose, setEyes] = useState(true);
    const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (!eyesClose) {
        setRememberValue(value);
        setInputValue(value);
        onInput?.(e);
        return;
      }
      const newStr = value.replace(/•/g, '');
      const valueLen = value.length;
      const curRemember = newStr
        ? rememberValue + newStr
        : rememberValue.slice(0, valueLen - 1);
      setRememberValue(curRemember);
      const showValue = ''.padEnd(valueLen, '•');
      setInputValue(showValue);
      e.target.value = curRemember;
      onInput?.(e);
    };

    const passChange = (e: string) => {
      onChange?.(e);
    };

    const afterIcon = useMemo(() => {
      return (
        showToggle && (
          <Icon
            type={eyesClose ? 'eye-close' : 'eye'}
            size={props.size}
            onClick={() => {
              setInputValue(
                eyesClose
                  ? rememberValue
                  : ''.padEnd(rememberValue.length, '•'),
              );
              setEyes(!eyesClose);
            }}
            style={{ marginRight: 8 }}
          />
        )
      );
    }, [eyesClose, rememberValue, showToggle]);

    return (
      <Input
        {...props}
        ref={ref}
        value={inputValue}
        type="text"
        placeholder={placeholder || locale.placeholder}
        className="password-input"
        onInput={inputData}
        onChange={passChange}
        style={{ position: 'relative', ...props.style }}
        innerAfter={afterIcon}
      />
    );
  },
);
