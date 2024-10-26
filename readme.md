## QuestionnarieApp

### Modules

#### Controller


作为上层控制模块负责协调调用其他组件. 同时作为Core的接口组件.

#### Poster

负责主进程到渲染进程的通信.

#### Bridge

中介者模式下的通信组件, 负责各个组件间通信.
被`@ToBridgeBindable`修饰且使用`bridge.register`注册的组件都可以直接相互调用, 对等通信.

#### QuestionnarieModel

在Controller确认"用户的动作是回答问题"的前提下, 负责处理用户的回答.
该组件有状态, 状态为"当前问题编号".

#### History

负责记录用户的回答和负责撤销.
该组件有状态.

#### Formatters

负责做协议上的转换, 具体参考[协议部分](./formatters/readme.md)
