import {
  Component,
  Element,
  Event,
  EventEmitter,
  Method,
  Prop,
  Watch
} from "@stencil/core";
import { BaseComponent } from "../common/base-component";
// tslint:disable-next-line
import bodymovin from "lottie-web/build/player/lottie_light";

@Component({
  shadow: false,
  styleUrl: "lottie.scss",
  tag: "gx-lottie"
})
export class Lottie extends BaseComponent {
  private animation: any;

  @Element() element: HTMLElement;

  /**
   * This attribute lets you specify a Lottie animation object
   *
   */
  @Prop() animationData: any;

  /**
   * This attribute lets you specify if the animation will start playing as soon as it is ready
   *
   */
  @Prop() autoPlay = true;

  /**
   * This attribute lets you specify how this element will behave when hidden.
   *
   * | Value        | Details                                                                     |
   * | ------------ | --------------------------------------------------------------------------- |
   * | `keep-space` | The element remains in the document flow, and it does occupy space.         |
   * | `collapse`   | The element is removed form the document flow, and it doesn't occupy space. |
   */
  @Prop() invisibleMode: "collapse" | "keep-space" = "collapse";

  /**
   * This attribute lets you specify if the element is disabled.
   * If disabled, it will not fire any user interaction related event
   * (for example, click event).
   */
  @Prop() disabled = false;

  /**
   * This attribute lets you specify if the animation will loop
   */
  @Prop() loop = true;

  /**
   * This attribute lets you specify  the relative path to the animation object. (`animationData` and `path` are mutually exclusive)
   */
  @Prop() path: string;

  /**
   * Emitted when the element is clicked.
   */
  @Event() onClick: EventEmitter;

  /**
   * Emitted when the animation is loaded in the DOM.
   */
  @Event() animationLoad: EventEmitter;

  @Watch("animationData")
  animationDataChanged() {
    this.animation.destroy();
    this.animation = null;
  }

  @Watch("path")
  pathChanged() {
    this.animation.destroy();
    this.animation = null;
  }

  /**
   * Start playing the animation
   */
  @Method()
  play() {
    this.animation.play();
  }

  /**
   * Stop the animation
   */
  @Method()
  stop() {
    this.animation.stop();
  }

  handleClick(event: UIEvent) {
    if (this.disabled) {
      return;
    }

    this.onClick.emit(event);
  }

  componentDidLoad() {
    this.setAnimation();
  }

  componentDidUpdate() {
    this.setAnimation();
  }

  componentDidUnload() {
    this.animation.destroy();
  }

  setAnimation() {
    if (this.animation) {
      return;
    }

    this.animation = bodymovin.loadAnimation({
      animationData: this.animationData,
      autoplay: this.autoPlay,
      container: this.element.querySelector(":scope > div"),
      loop: this.loop,
      path: this.path,
      renderer: "svg"
    });

    this.animation.addEventListener(
      "DOMLoaded",
      this.animationDomLoadedHandler.bind(this)
    );
  }

  private animationDomLoadedHandler(event: UIEvent) {
    this.animationLoad.emit(event);
  }

  render() {
    return <div />;
  }
}
