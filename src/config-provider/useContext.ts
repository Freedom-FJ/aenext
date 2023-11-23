import { useContext } from 'react';
import { ConfigContext } from './index';
import localeJSON from './locale';

export const useLocale = (
  componentName: string,
  defaultLocale?: Record<string, string>,
) => {
  const { locale, currentLanguage } = useContext(ConfigContext) || {};
  if (currentLanguage)
    return localeJSON.zh_CN[componentName as keyof typeof localeJSON.zh_CN];
  const localeConfig =
    locale?.[currentLanguage || 'zh_CN']?.[componentName] || {};
  return Object.assign(localeConfig, defaultLocale);
};
