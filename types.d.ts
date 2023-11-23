// 全局通用类型
// @AUTHOR CAIHUAZHI <huazhi.chz@alibaba-inc.com>
// @CREATE 2022/04/12 16:57

declare module '*.css';
declare module '*.scss';
declare module '*.less' {
  const resource: Record<string, string>;
  export = resource;
}
declare module '*.png';
declare module '*.gif';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

declare type PartialRecord<Key extends keyof any, Value> = Partial<
  Record<Key, Value>
>;

declare type ValueOf<T> = T[keyof T];

declare type Maybe<T> = T | undefined;

/** 路由配置 */
interface IRouteItem {
  path: string;
  component?: string;
  exact?: boolean;
  redirect?: string;
  icon?: string;
  wrappers?: string[];
  title?: string;
  routes?: IRouteItem[];
}
