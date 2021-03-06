import { BaseComponent } from "../common/base-component";
import {
  Component,
  Event,
  EventEmitter,
  Method,
  Prop,
  Watch
} from "@stencil/core";
import { SwitchRender } from "../renders/bootstrap/switch/switch-render";
@Component({
  host: {
    role: "switch"
  },
  shadow: false,
  styleUrl: "switch.scss",
  tag: "gx-switch"
})
export class Switch extends SwitchRender(BaseComponent) {
  /**
   * Attribute that provides the caption to the control.
   */
  @Prop() caption: string;
  /**
   * Indicates if switch control is checked by default.
   */
  @Prop({ mutable: true })
  checked: boolean;
  /**
   * This attribute allows you specify if the element is disabled.
   * If disabled, it will not trigger any user interaction related event
   * (for example, click event).
   */
  @Prop() disabled = false;

  /**
   * The control id. Must be unique per control!
   */
  @Prop() id: string;

  /**
   * The 'change' event is emitted when a change to the element's value is committed by the user.
   */
  @Event() onChange: EventEmitter;

  /**
   * Returns the id of the inner `input` element (if set).
   */
  @Method()
  getNativeInputId() {
    return super.getNativeInputId();
  }

  @Watch("checked")
  protected checkedChanged() {
    super.checkedChanged();
  }
}
