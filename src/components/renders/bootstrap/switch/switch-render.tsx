import { EventEmitter } from "@stencil/core";
type Constructor<T> = new (...args: any[]) => T;
export function SwitchRender<T extends Constructor<{}>>(Base: T) {
  return class extends Base {
    caption: string;
    checked = false;
    disabled = false;
    element: HTMLElement;
    id: string;

    protected nativeInput: HTMLInputElement;
    private inputId: string;

    onChange: EventEmitter;

    getNativeInputId() {
      return this.nativeInput.id;
    }

    private getValueFromEvent(event: UIEvent): boolean {
      return event.target && (event.target as HTMLInputElement).checked;
    }

    handleChange(event: UIEvent) {
      this.checked = this.getValueFromEvent(event);
      this.onChange.emit(event);
    }

    /**
     * Update the native input element when the value changes
     */
    protected checkedChanged() {
      const inputEl = this.nativeInput;
      if (inputEl && inputEl.checked !== this.checked) {
        inputEl.checked = this.checked;
      }
    }

    componentDidUnload() {
      this.nativeInput = null;
    }

    render() {
      if (!this.inputId) {
        this.inputId = this.id
          ? `${this.id}_checkbox`
          : `gx-checkbox-auto-id-${autoCheckBoxId++}`;
      }

      const inputAttrs = {
        "aria-checked": this.checked ? "true" : "false",
        "aria-disabled": this.disabled ? "true" : "false",
        checked: this.checked,
        class: "switch",
        disabled: this.disabled,
        id: this.inputId,
        onChange: this.handleChange.bind(this),
        ref: input => (this.nativeInput = input as any),
        type: "checkbox"
      };

      return (
        <span class="switch switch-sm">
          <input {...inputAttrs} />
          <label htmlFor={this.inputId}>{this.caption}</label>
        </span>
      );
    }
  };
}

let autoCheckBoxId = 0;
