# 表单组件

表单组件是一个用于数据收集和验证的组件系统，包括表单容器、表单项和各种表单字段。

## 引入方式

```jsx
import { Form, FormItem, TextField, TextArea, Select, Checkbox, Radio, RadioGroup, Switch } from 'speccapitals-common';
```

## 组件概览

### Form

表单容器组件，用于包裹表单项和处理表单提交。

```jsx
<Form
  initialValues={{ username: 'admin' }}
  onSubmit={(values) => console.log(values)}
  onValuesChange={(changedValues, allValues) => console.log(changedValues, allValues)}
>
  {/* 表单内容 */}
</Form>
```

### FormItem

表单项组件，用于包裹表单字段并提供标签、验证等功能。

```jsx
<FormItem
  label="用户名"
  name="username"
  rules={[{ required: true, message: '请输入用户名' }]}
>
  <TextField />
</FormItem>
```

### TextField

文本输入框组件。

```jsx
<TextField
  placeholder="请输入"
  disabled={false}
  onChange={(e) => console.log(e.target.value)}
/>
```

### TextArea

多行文本输入框组件。

```jsx
<TextArea
  placeholder="请输入"
  rows={4}
  onChange={(e) => console.log(e.target.value)}
/>
```

### Select

选择框组件。

```jsx
<Select
  placeholder="请选择"
  options={[
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2' }
  ]}
  onChange={(value) => console.log(value)}
/>
```

### Checkbox

复选框组件。

```jsx
<Checkbox
  checked={true}
  onChange={(e) => console.log(e.target.checked)}
>
  同意条款
</Checkbox>
```

### Radio

单选框组件。

```jsx
<Radio
  checked={true}
  onChange={(e) => console.log(e.target.checked)}
>
  选项1
</Radio>
```

### RadioGroup

单选框组组件。

```jsx
<RadioGroup
  value="1"
  options={[
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2' }
  ]}
  onChange={(value) => console.log(value)}
/>
```

### Switch

开关组件。

```jsx
<Switch
  checked={true}
  onChange={(checked) => console.log(checked)}
/>
```

## 表单验证

表单组件支持多种验证规则：

```jsx
<FormItem
  label="用户名"
  name="username"
  rules={[
    { required: true, message: '请输入用户名' },
    { min: 3, max: 20, message: '长度必须在3-20个字符之间' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '只能包含字母、数字和下划线' }
  ]}
>
  <TextField />
</FormItem>
```

## 表单布局

表单支持多种布局方式：

```jsx
// 垂直布局（默认）
<Form layout="vertical">
  {/* 表单内容 */}
</Form>

// 水平布局
<Form layout="horizontal">
  {/* 表单内容 */}
</Form>

// 行内布局
<Form layout="inline">
  {/* 表单内容 */}
</Form>
```

## 完整示例

```jsx
import { Form, FormItem, TextField, Select, Button } from 'speccapitals-common';

function LoginForm() {
  const handleSubmit = (values) => {
    console.log('登录信息:', values);
  };

  return (
    <Form
      initialValues={{ remember: true }}
      onSubmit={handleSubmit}
    >
      <FormItem
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <TextField placeholder="请输入用户名" />
      </FormItem>

      <FormItem
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <TextField type="password" placeholder="请输入密码" />
      </FormItem>

      <FormItem
        label="角色"
        name="role"
      >
        <Select
          placeholder="请选择角色"
          options={[
            { label: '管理员', value: 'admin' },
            { label: '用户', value: 'user' }
          ]}
        />
      </FormItem>

      <FormItem>
        <Button buttonType="primary" htmlType="submit">
          登录
        </Button>
      </FormItem>
    </Form>
  );
}
```

## API

### Form

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| initialValues | 表单初始值 | object | - |
| onSubmit | 提交表单且数据验证成功后回调事件 | function(values) | - |
| onValuesChange | 字段值更新时触发回调事件 | function(changedValues, allValues) | - |
| layout | 表单布局 | 'vertical' \| 'horizontal' \| 'inline' | 'vertical' |
| disabled | 是否禁用所有表单控件 | boolean | false |
| className | 自定义类名 | string | - |
| style | 自定义样式 | CSSProperties | - |

### FormItem

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 标签文本 | ReactNode | - |
| name | 字段名 | string | - |
| rules | 校验规则 | Rule[] | - |
| required | 是否必填 | boolean | false |
| valuePropName | 子节点的值的属性 | string | 'value' |
| trigger | 收集子节点的值的时机 | string | 'onChange' |
| validateTrigger | 校验子节点值的时机 | string \| string[] | 'onChange' |
| className | 自定义类名 | string | - |
| style | 自定义样式 | CSSProperties | - |

更多详细API请参考[表单API文档](../api/form.md)。 