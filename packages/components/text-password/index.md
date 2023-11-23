---
# 单独设置分组名称
group: 基础
# 同时设置分组名称和顺序，order 越小越靠前，默认为 0
group:
  title: TextPassword
  order: 1
---

# TextPassword

倒计时组件

```jsx
import { Form, Field } from '@alifd/next';
import { TextPassword } from './index';
const FormItem = Form.Item;

export default () => {
  const field = Field.useField();
  return (
      <TextPassword  />
  );
};
```
