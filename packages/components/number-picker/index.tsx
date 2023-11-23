import { Input } from '@alifd/next';
import React, {
  forwardRef,
  LegacyRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface INumberPickerProps {
  style: React.CSSProperties;
  value: number;
  readOnly: boolean;
  disabled: boolean;
  hasClear: boolean;
  onChange: any;
  onFocus: any;
  onInputChange: any;
  formatInteger: boolean | ((integer: number | string) => string);
  onBlur: any;
  placeholder: string;
  pattern: any;
  currencyLabel: string;
  maxDecimalPlaces: number;
  min: number;
  max: number;
  className: string;
}

export const NumberPicker = forwardRef(
  (props: Partial<INumberPickerProps>, ref: LegacyRef<Input> | undefined) => {
    const {
      style,
      readOnly,
      disabled,
      currencyLabel,
      hasClear,
      placeholder,
      min,
      max,
      onChange,
      onBlur,
      onFocus,
      onInputChange,
      value: defaultValue,
      className = '',
      maxDecimalPlaces = 2,
      pattern = new RegExp(`^-?\\d*(\\.\\d{0,${maxDecimalPlaces}})?$`),
      formatInteger = false,
    } = props;
    const [value, setValue] = useState<string>(String(defaultValue || ''));
    const [isFocus, setFocus] = useState(false);
    const patternRef = useRef(pattern);

    const generatePattern = useCallback(() => {
      if (pattern instanceof RegExp || typeof pattern === 'string') {
        // 不论用户传的 pattern 有没有首尾限制，组件都主动加上
        const formattedPattern = pattern
          .toString()
          .replace(/^\/|\/$/g, '')
          .replace(/^\^|\$\/$/, '');
        patternRef.current = new RegExp(`^${formattedPattern}$`);
      } else {
        patternRef.current = new RegExp(
          `^-?\\d*(\\.\\d{0,${maxDecimalPlaces}})?$`,
        );
      }
    }, []);

    const formatValue = (val?: string, forceShowDecimal = false) => {
      if (!val) {
        return '';
      }
      const defaultFormat = (v: string) => Number(v).toLocaleString('US');
      let format: any = formatInteger || defaultFormat;
      if (typeof formatInteger === 'boolean') {
        if (formatInteger === false) {
          format = (v: string) => v;
        } else {
          format = defaultFormat;
        }
      }

      const [integer, decimal = ''] = val.split('.');

      if (forceShowDecimal) {
        const decimalStr = `${decimal}${'0'.repeat(maxDecimalPlaces)}`.slice(
          0,
          maxDecimalPlaces,
        );
        return `${format(integer)}.${decimalStr}`;
      }

      if (val.indexOf('.') === -1) {
        return format(integer);
      }
      return `${format(integer)}.${decimal}`;
    };

    useEffect(() => {
      generatePattern();
      setValue(formatValue(String(defaultValue ?? ''), true));
    }, []);

    useEffect(() => {
      if (defaultValue && isNaN(defaultValue)) {
        throw new Error(`Number: value(${value}) is not a number`);
      }
      generatePattern();
      !isFocus && setValue(formatValue(String(defaultValue ?? ''), true));
    }, [defaultValue]);

    const handleBlur = () => {
      setFocus(false);
      let val =
        value || typeof value === 'number'
          ? Number(String(value || '').replace(/,/g, ''))
          : undefined;

      if (val !== defaultValue) {
        onChange?.(val);
      }
      if (val) {
        if (min && val < min) {
          val = min;
        }

        if (max && val > max) {
          val = max;
        }
      }
      onBlur?.(val);
      setValue(formatValue(String(val ?? ''), true));
    };
    const handleChange = (val: string) => {
      let nextValue = `${val ?? ''}`;
      if (~String(nextValue).indexOf('。')) {
        nextValue = nextValue.replace('。', '.');
      }
      if (typeof min === 'number' && min >= 0) {
        if (nextValue.startsWith('-')) nextValue = '';
        else nextValue = nextValue.replace('-', '');
      }
      nextValue = nextValue.replace(/,/g, '');
      if (nextValue !== '-' && isNaN(Number(nextValue))) {
        return;
      }

      if (!nextValue) {
        setValue('');
        onInputChange?.(undefined);
        return;
      }

      let num = Number(nextValue);
      if (typeof max === 'number' && num > max) {
        num = max;
        nextValue = String(num);
      }

      if (!nextValue || patternRef.current.test(nextValue)) {
        setValue(String(nextValue || ''));
        onInputChange?.(num);
      }
    };

    const handleFocus = () => {
      setFocus(true);
      setValue(value.replace(/,/g, ''));
      onFocus?.();
    };

    return (
      <Input
        style={style}
        className={className}
        readOnly={readOnly}
        disabled={disabled}
        value={value}
        type="number"
        ref={ref}
        onInput={(e: any) => handleChange(e && (e.value || e.target.value))}
        onFocus={handleFocus}
        addonTextBefore={currencyLabel ? <span>{currencyLabel}</span> : null}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        hasClear={hasClear}
      />
    );
  },
);
