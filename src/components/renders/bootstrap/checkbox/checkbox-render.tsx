import { EventEmitter } from "@stencil/core";

type Constructor<T> = new (...args: any[]) => T;
export function CheckBoxRender<T extends Constructor<{}>>(Base: T) {
  return class extends Base {
    element: HTMLElement;

    caption: string;
    cssClass: string;
    disabled = false;
    id: string;
    invisibleMode: string;
    checked: boolean;

    protected nativeInput: HTMLInputElement;
    private inputId: string;

    onChange: EventEmitter;

    getNativeInputId() {
      return this.nativeInput.id;
    }

    private getCssClasses() {
      const classList = [];

      classList.push("custom-control-input");

      if (this.cssClass) {
        classList.push(this.cssClass);
      }

      if (!this.caption) {
        classList.push("position-static");
      }

      return classList.join(" ");
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
          ? `${this.id}__checkbox`
          : `gx-checkbox-auto-id-${autoCheckBoxId++}`;
      }

      const attris = {
        "aria-disabled": this.disabled ? "true" : undefined,
        class: this.getCssClasses(),
        disabled: this.disabled,
        id: this.inputId,
        onChange: this.handleChange.bind(this),
        ref: input => (this.nativeInput = input as any)
      };

      const forAttris = {
        for: attris.id
      };

      return (
        <div class="custom-control custom-checkbox">
          <input {...attris} type="checkbox" checked={this.checked} />
          <label
            class="custom-control-label"
            {...forAttris}
            aria-hidden={!this.caption}
          >
            {this.caption}
          </label>
        </div>
      );
    }
  };
}

let autoCheckBoxId = 0;
