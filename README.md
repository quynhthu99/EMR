# BAĐT Component

## Structure

- public:
- src:
- types:
- tests:

## Router

### Danh sách router:

```Ghi chú:
* menu cấp
** menu cấp 2
*** menu cấp 3
```

## BAĐT Table

- Kế thừa tất cả các API của ant design
- Thêm 1 số các props như sau:
    + columnsTable: là columns của table và hỗ trợ thay đổi vị hoặc ẩn hiện các cột trong table `Type: Array`
    + fullscreen: Bật tắt tính năng mở rộng toàn màn hình  `Type: Boolean<default: False>`
    + setting: Bật tắt tính năng thay đổi vị trí và ẩn hiện các cột trên table  `Type: Boolean<default: False>`
- Thêm 1 số slot:
    + filter: Điều kiện filter
    + extraFilterAction: các action Search
    + extraMultiAction: các action cho việc thực hiện hàng loại

```vue

<va-table
    :columns-table="columns"
    :data-source="data"
    :selections="false"
    :loading="false"
    bordered
    :row-selection="null"
>
<template #filter>
  <va-select></va-select>
</template>
<template #extraFilterAction>
  <a-button class="mr-2">Click to Action</a-button>
</template>
<template #extraMultiAction>
  <a-button>Click to Action</a-button>
</template>
</va-table>
```

## BAĐT Select

- Kế thừa tất cả các API của ant design
- Hỗ trợ Call API globallist

+ ```global-list-code: 'code' // component sẽ tự động define rồi lấy danh sách trong API```

```vue

<va-select
    v-model:value="selectOption"
    class="w-1/5"
></va-select>
```

## BAĐT-Date-Picker

- Kế thừa tất cả các API của ant design
- Hỗ trợ Call API globallist

```vue

<va-date-picker
    v-model:value="selectOption"
    class="w-1/5"
></va-date-picker>
```

## BAĐT-Svg-Icon

- props
    + name: Tên file
    + width: Chiều dài
    + height: Chiều cao

```vue

<va-svg-icon
    name="tenfile"
></va-svg-icon>
```

## Breadcrumb

- props
    + Tên: extraBreadcrumbs
    + Kiểu: Array
      -default: Nếu không có props extraBreadCrumb thì sẽ lấy theo router

```vue

<va-breadcrumb
    :extraBreadcrumbs="extraBreadcrumbs"
></va-breadcrumb>
```


