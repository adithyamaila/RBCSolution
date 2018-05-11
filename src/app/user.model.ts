export class User {

  constructor(
    public address?:Address,
    public name?: string,
    public email?: string
    ) {
  }
}

export class Address{
  constructor(
    public city?:string,
    ) {
  }
}
