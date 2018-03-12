# modal

## 简介

原生弹框插件，默认支持了两种弹框，可自定义弹框。

## 用法


```javascript
var setModal=initModal({
    type:'alert',
    title:'标题名称',
    message:'这是一段内容',
    confirmButtonText:'确定',
    confirmCallback:function () {
        alert("这是一段内容");
    }
});
setModal.create();
```

##  API

### initModal(options)

#### `type` 

`String`

弹框类型

* alert:消息通知类弹框，只有确认按钮
* confirm：含确认取消按钮的弹框
* manual：自定义弹框

1. 当type类型不为`manual` 时,以下参数为必填：

    #### `title` 

    `String`  

    弹框标题

    #### `message`
    `String` 

    弹框内容

    #### `confirmButtonText`
    `String`

    按钮内容

    #### `cancelButtonText`

    `String`

    左侧按钮内容

    #### `confirmCallback`
    `Funciton`

    点击右侧确认按钮调用的函数

    #### `cancelCallback`
    `Funciton`

    点击左侧取消按钮调用的函数

2. 当type类型为`manual` 时,以下参数为必填：

    #### `id`
    `String`

    自定义的弹框DOM的id

    #### `html`
    `String`

    自定义的弹框DOM

## Method

#### `create`

创建并显示弹框

#### `delete`

关闭并从body中移除DOM








