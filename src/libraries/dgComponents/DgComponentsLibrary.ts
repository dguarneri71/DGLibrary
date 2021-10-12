import { isFunc } from "@pnp/common";
import {
  Logger,
  ConsoleListener,
  LogLevel
} from "@pnp/logging";

export class DgComponentsLibrary {
  private timer: number = 0;
  private delay: number = 200;
  private prevent: boolean = false;

  constructor(delay?: number) {
    // subscribe a listener
    Logger.subscribe(new ConsoleListener());

    // set the active log level
    Logger.activeLogLevel = LogLevel.Info;

    if (delay) {
      this.delay = delay;
    }

    this.handleClick.bind(this);
    this.handleDoubleClick.bind(this);
  }

  /**
   * Empty function.
   */
  public noop = () => { Logger.write("noop - dummy function"); };

  /**
   * Method to handle click button callback
   */
  public handleClick(event: any, callbackClick: Function): void {
    Logger.log({
      data: { prevent: this.prevent, delay: this.delay },
      level: LogLevel.Verbose,
      message: "handleClick - info"
    });

    event.persist();
    this._handleClick.bind(this);

    this.timer = setTimeout(this._handleClick(event, callbackClick), this.delay);
  }

  /**
   * Method to handle double click button callback
   */
  public handleDoubleClick(event: any, callbackDoubleClick: Function): void {
    Logger.log({
      data: { prevent: this.prevent, delay: this.delay },
      level: LogLevel.Verbose,
      message: "handleDoubleClick - info"
    });

    event.persist();
    clearTimeout(this.timer);
    this.prevent = true;

    if (isFunc(callbackDoubleClick)) {
      Logger.write("handleDoubleClick - call callback function");
      callbackDoubleClick(event);
    }
    else {
      Logger.write("handleDoubleClick - call noop function");
      this.noop();
    }
  }

  private _handleClick(event: any, callbackClick: Function): any {
    event.persist();

    if (!this.prevent) {
      if (isFunc(callbackClick)) {
        Logger.write("_handleClick - call callback function");
        callbackClick(event);
      }
      else {
        Logger.write("_handleClick - call noop function");
        this.noop();
      }
    } else {
      Logger.write("_handleClick - skip callback function");
    }

    this.prevent = false;
  }
}
