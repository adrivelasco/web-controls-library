# gx-layout-editor

A WYSIWYG editor for GeneXus abstract forms.

## Control resolvers

Each control supported by the layout editor must have a resolver that maps the metadata into a web-controls-library control.

To add a new control resolver, create a new control resolver under `./control-resolvers`.
After creating the control resolver, add it to [layout-editor-control-resolver.tsx](./layout-editor-control-resolver.tsx)

## Used data-\* attributes

A set of special attributes are used to annotate container web components and its direct child items where it will be able to drag and drop controls.

| Data attribute name        | Details                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data-gx-le-container`     | Used to mark an element as a container                                                                                                                                                                                                                                                                                                                                                 |
| `data-gx-le-drop-area`     | Used to mark an element as container item that accepts drag&drop of controls. Its value specifies the placeholder position when a dragged control is hovered on the container item. If the value is `'vertical'`, the placeholder will be shown above or bellow the container item. If the value is `'horizontal'`, the placeholder will be shown right or left of the container item. |
| `data-gx-le-cell-id`       | Used to store the identifier of a container item. Typically obtained from the abstract form model "@id" property of the row cell                                                                                                                                                                                                                                                       |
| `data-gx-le-row-id`        | Used to store the identifier of a container item's row. Typically obtained from the abstract form model "@id" property of the parent row of the cell                                                                                                                                                                                                                                   |
| `data-gx-le-selected`      | Used to mark a container item as selected                                                                                                                                                                                                                                                                                                                                              |
| `data-gx-le-next-row-id`   | Used to store the identifier of a container item's next row (if it isn't located in the last row). Typically obtained from the abstract form model "@id" property of the row that is next to the parent row of the cell                                                                                                                                                                |
| `data-gx-le-active-target` | Used to mark a container item as an active drop target                                                                                                                                                                                                                                                                                                                                 |  |
| `data-gx-le-dragging`      | Used to mark the layout editor as in dragging state                                                                                                                                                                                                                                                                                                                                    |
| `data-gx-le-control-id`    | Used to store the identifier of the control in the control element.                                                                                                                                                                                                                                                                                                                    |

## CSS variables

| CSS variable name                          | Details                                                             |
| ------------------------------------------ | ------------------------------------------------------------------- |
| `--gx-le-table-cell-border`                | Container item border                                               |
| `--gx-le-table-min-height`                 | Container minimum height                                            |
| `--gx-le-table-placeholder-width`          | Width of drop placeholder (when a vertical placeholder is shown)    |
| `--gx-le-table-placeholder-height`         | Height of drop placeholder (when a horizontal placeholder is shown) |
| `--gx-le-table-placeholder-color`          | Drop placeholder color                                              |
| `--gx-le-table-selected-cell-border-color` | Selected container item border color                                |
| `--gx-le-table-selected-cell-border-width` | Selected container item border width                                |
| `--gx-le-table-cell-gap`                   | Gap between a container cells                                       |

<!-- Auto Generated Below -->

## Properties

#### model

any

The abstract form model object

#### selectedCells

Array with the identifiers of the selected controls. If empty the whole layout-editor is marked as selected.

## Attributes

#### model

any

The abstract form model object

#### selected-cells

Array with the identifiers of the selected controls. If empty the whole layout-editor is marked as selected.

## Events

#### controlAdded

Fired when a control (that wasn't already inside the layout editor) has been dropped on
a valid drop target (for example, a control from a toolbox or an object from the knowledge base navigator)

##### Dragging a control

If a control is being dragged, the dataTransfer property of the event must have the following format:

`"GX_DASHBOARD_ADDELEMENT,[GeneXus type of control]"`

where:

* `GX_DASHBOARD_ADDELEMENT` is the type of action
* `[GeneXus type of control]` is the type of control that's been added. This value can have any value and will be passed as part of the information sent as part of the event.

##### Dragging a KB object

If a KB object is being dragged, the dataTransfer property of the event must contain the name of the KB object.

##### Dropped control information

An object containing information of the add operation is sent in the `detail` property of the event object.

If a KB object was dropped, the following properties are set:

| Property       | Details                    |
| -------------- | -------------------------- |
| `kbObjectName` | Name of the GeneXus object |

If control was dropped, the following properties are set.

| Property      | Details                                                                                                                                 |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `elementType` | The type of the control that's been added and was received as the `[GeneXus type of control]` in the dataTransfer of the drop operation |

Depending on where the control was dropped, additional information will be provided and different properties will be set. There are four possible cases:

1.  Dropped on an empty container or in the last row of a container
2.  Dropped on a new row of a non empty container
3.  Dropped on an existing empty cell
4.  Dropped on an existing row

###### 1. Dropped on an empty container or on a new row that will be the last row of a container

| Property      | Details                                                   |
| ------------- | --------------------------------------------------------- |
| `containerId` | Identifier of the container where the control was dropped |

###### 2. Dropped on a new row of a non empty container

| Property      | Details                                                                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `beforeRowId` | Identifier of the row next to the row where the control was dropped. An empty string if dropped in the last row or on an empty container. |

###### 3. Dropped on an existing empty cell

| Property       | Details                                              |
| -------------- | ---------------------------------------------------- |
| `targetCellId` | Identifier of the cell where the control was dropped |

###### 4. Dropped on an existing row

| Property          | Details                                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `beforeControlId` | Identifier of the cell that, after the drop operation, ends located after the dropped control. An empty string if dropped as the last cell. |
| `targetRowId`     | Identifier of the row where the control was dropped                                                                                         |

#### controlRemoved

Fired when a control has been removed from the layout

An object containing information of the add operation is sent in the `detail` property of the event object

| Property    | Details                                 |
| ----------- | --------------------------------------- |
| `controlId` | Identifier of the cell that was removed |

#### controlSelected

Fired when the selection has been changed

An object containing information of the select operation is sent in the `detail` property of the event object

| Property    | Details                         |
| ----------- | ------------------------------- |
| `controlId` | Identifier of the selected cell |

#### moveCompleted

Fired when a control is moved inside the layout editor to a new location

An object containing information of the move operation is sent in the `detail` property of the event object

Regardless where the control was dropped, the detail object will contain information about the source row and the id of the dropped control:

| Property      | Details                       |
| ------------- | ----------------------------- |
| `controlId`   | Identifier of the source cell |
| `sourceRowId` | Identifier of the source row  |

Depending on where the control was dropped, additional information will be provided and different properties will be set. There are four possible cases:

1.  Dropped on an empty container or on a new row that will be the last row of a container
2.  Dropped on a new row of a non empty container
3.  Dropped on an existing empty cell
4.  Dropped on an existing row

###### 1. Dropped on an empty container or on a new row that will be the last row of a container

| Property      | Details                                                   |
| ------------- | --------------------------------------------------------- |
| `containerId` | Identifier of the container where the control was dropped |

###### 2. Dropped on a new row of a non empty container

| Property      | Details                                                                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `beforeRowId` | Identifier of the row next to the row where the control was dropped. An empty string if dropped in the last row or on an empty container. |

###### 3. Dropped on an existing empty cell

| Property       | Details                                              |
| -------------- | ---------------------------------------------------- |
| `targetCellId` | Identifier of the cell where the control was dropped |

###### 4. Dropped on an existing row

| Property          | Details                                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `beforeControlId` | Identifier of the cell that, after the drop operation, ends located after the dropped control. An empty string if dropped as the last cell. |
| `targetRowId`     | Identifier of the row where the control was dropped                                                                                         |

---

_Built with [StencilJS](https://stenciljs.com/)_