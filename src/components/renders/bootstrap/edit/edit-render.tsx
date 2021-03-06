import { EventEmitter } from "@stencil/core";

type Constructor<T> = new (...args: any[]) => T;
export function EditRender<T extends Constructor<{}>>(Base: T) {
  return class extends Base {
    element: HTMLElement;
    autocapitalize: string;
    autocomplete: string;
    autocorrect: string;
    disabled = false;
    id: string;
    invisibleMode: string;
    multiline: boolean;
    placeholder: string;
    readonly: boolean;
    showTrigger: boolean;
    triggerText: string;
    type = "text";
    value: string;

    protected nativeInput: HTMLInputElement;
    private inputId: string;

    onChange: EventEmitter;
    onInput: EventEmitter;
    gxTriggerClick: EventEmitter;

    getNativeInputId() {
      return this.nativeInput.id;
    }

    private getCssClasses() {
      const classList = [];

      if (this.readonly) {
        classList.push("form-control-plaintext");
      } else {
        if (this.type === "file") {
          classList.push("form-control-file");
        } else {
          classList.push("form-control");
        }
      }

      return classList.join(" ");
    }

    private getTriggerCssClasses() {
      const classList = [];
      classList.push("btn");
      classList.push("btn-outline-secondary");
      return classList.join(" ");
    }

    private getValueFromEvent(event: UIEvent): string {
      return event.target && (event.target as HTMLInputElement).value;
    }

    handleChange(event: UIEvent) {
      this.value = this.getValueFromEvent(event);
      this.onChange.emit(event);
    }

    handleValueChanging(event: UIEvent) {
      this.value = this.getValueFromEvent(event);
      this.onInput.emit(event);
    }

    handleTriggerClick(event: UIEvent) {
      this.gxTriggerClick.emit(event);
    }

    /**
     * Update the native input element when the value changes
     */
    protected valueChanged() {
      const inputEl = this.nativeInput;
      if (inputEl && inputEl.value !== this.value) {
        inputEl.value = this.value;
      }
    }

    componentDidUnload() {
      this.nativeInput = null;
    }

    render() {
      const valueChangingHandler = this.handleValueChanging.bind(this);
      if (!this.inputId) {
        this.inputId = this.id
          ? `${this.id}__edit`
          : `gx-edit-auto-id-${autoEditId++}`;
      }

      const attris = {
        "aria-disabled": this.disabled ? "true" : undefined,
        autocapitalize: this.autocapitalize,
        autocomplete: this.autocomplete,
        autocorrect: this.autocorrect,
        class: this.getCssClasses(),
        disabled: this.disabled,
        id: this.inputId,
        onChange: this.handleChange.bind(this),
        onInput: valueChangingHandler,
        placeholder: this.placeholder,
        readonly: this.readonly,
        ref: input => (this.nativeInput = input as any)
      };

      if (this.multiline) {
        return <textarea {...attris}>{this.value}</textarea>;
      } else {
        const input = <input {...attris} type={this.type} value={this.value} />;

        if (this.showTrigger && !this.readonly) {
          return (
            <div class="input-group">
              {input}
              <div class="input-group-append">
                <button
                  class={this.getTriggerCssClasses()}
                  onClick={this.handleTriggerClick.bind(this)}
                  type="button"
                  disabled={this.disabled}
                  aria-label={this.triggerText}
                >
                  <slot name="trigger-content" />
                </button>
              </div>
            </div>
          );
        } else {
          return input;
        }
      }
    }
  };
}

let autoEditId = 0;
