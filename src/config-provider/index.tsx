import React, { FC, createContext, useMemo } from 'react';
import localeConfig from './locale';
export * from './locale';
export enum TypeLanguage {
  'zh_CN' = 'zh_CN',
  'en_US' = 'en_US',
}

const DEFAULT_LANGUAGE = TypeLanguage.zh_CN;
const DEFAULT_PREFIX_CLS = 'aenext';

export interface IContext {
  currentLanguage?: TypeLanguage;
  locale?: Record<TypeLanguage, Record<string, Record<string, string>>>;
  DEFAULT_PREFIX_CLS: string;
}

export const ConfigContext = createContext<IContext>({
  locale: localeConfig,
  currentLanguage: DEFAULT_LANGUAGE,
  DEFAULT_PREFIX_CLS,
});

export const ConfigProvider: FC<
  {
    children: React.ReactNode;
  } & IContext
> = function ({ children, locale, currentLanguage = DEFAULT_LANGUAGE }) {
  const memorizedValue = useMemo(() => {
    return {
      locale: Object.assign(localeConfig, locale || {}),
      currentLanguage: DEFAULT_LANGUAGE,
      DEFAULT_PREFIX_CLS,
    };
  }, [currentLanguage]);

  return (
    <ConfigContext.Provider value={memorizedValue}>
      {children}
    </ConfigContext.Provider>
  );
};
