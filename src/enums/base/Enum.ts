export class Enum {

  public static valueOf(enumCls: any, name?: string): EnumItem | undefined {
    if (!name) {
      return;
    }
    return (enumCls as any)[name];
  }

  public static values(enumCls: any): EnumItem[] {

    const values: EnumItem[] = [];
    for (let key of Object.keys(enumCls)) {
      const item = this.valueOf(enumCls, key);
      if (item) {
        values.push(item);
      }
    }
    return values;
  }
}

export class EnumItem {

  private readonly _name !: string;

  private readonly _code!: any;

  private readonly _message!: string;

  constructor(name: string, code: any, message: string) {
    this._name = name;
    this._code = code;
    this._message = message;
  }

  get name(): string {
    return this._name;
  }

  get code(): any {
    return this._code;
  }

  get message(): string {
    return this._message;
  }
}