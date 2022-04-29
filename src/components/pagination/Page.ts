import {PageResultBean} from "@/beans/base/PageResultBean";

export class Page {

  public current: number = 1;
  public size: number = 15;
  public total: number = 0;

  constructor(current: number, size: number, total: number) {
    this.current = current;
    this.size = size;
    this.total = total;
  }

  public static init(size = 15) {
    return new Page(1, size, 0);
  }

  public static from<T>(res: PageResultBean<T>): Page {
    return new Page(res.current, res.size, res.total);
  }

  public static list<T>(res: PageResultBean<T>): T[] {
    return res.list;
  }

  public setCurrent(current: number) {
    this.current = current;
    this.scrollToTop();
  }

  private scrollToTop() {
    const el = document.documentElement;
    if (!el) {
      return;
    }
    const beginTime = Date.now();
    const beginValue = el.scrollTop;
    const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16));
    const frameFunc = () => {
      const progress = (Date.now() - beginTime) / 500;
      if (progress < 1) {
        el.scrollTop = beginValue * (1 - Page.easeInOutCubic(progress));
        rAF(frameFunc);
      } else {
        el.scrollTop = 0;
      }
    };
    rAF(frameFunc);
  }

  private static easeInOutCubic(value: number) {
    return value < 0.5
      ? Page.cubic(value * 2) / 2
      : 1 - Page.cubic((1 - value) * 2) / 2;
  }

  private static cubic(value: number) {
    return Math.pow(value, 3)
  }
}