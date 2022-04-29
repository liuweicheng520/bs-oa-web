export class SubmitCallback {

  start!: () => any;

  close!: () => any;

  submit!: (res?: any) => any;

  constructor(start: () => any, close: () => any, submit: (res?: any) => any) {
    this.start = start;
    this.close = close;
    this.submit = submit;
  }
}