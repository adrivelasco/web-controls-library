# gx-switch

A switch/toggle control that enables you to select between options.

<!-- Auto Generated Below -->

## Properties

| Property   | Attribute  | Description                                                                                                                                                   | Type      |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `caption`  | `caption`  | Attribute that provides the caption to the control.                                                                                                           | `string`  |
| `checked`  | `checked`  | Indicates if switch control is checked by default.                                                                                                            | `boolean` |
| `disabled` | `disabled` | This attribute allows you specify if the element is disabled. If disabled, it will not trigger any user interaction related event (for example, click event). | `boolean` |
| `id`       | `id`       | The control id. Must be unique per control!                                                                                                                   | `string`  |

## Events

| Event      | Description                                                                                  |
| ---------- | -------------------------------------------------------------------------------------------- |
| `onChange` | The 'change' event is emitted when a change to the element's value is committed by the user. |

## Methods

| Method             | Description                                           |
| ------------------ | ----------------------------------------------------- |
| `getNativeInputId` | Returns the id of the inner `input` element (if set). |

---

_Built with [StencilJS](https://stenciljs.com/)_
