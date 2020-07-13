enum Profession{
  engineer = 1,
  doctor = 2,
  lawyer = 3,
  other = 4
}

export interface Contacts {
  id: number,
  name: string,
  email: string,
  cellphone: string,
  age: string,
  bestFriend: boolean,
  professions: number,
  birthday: Date
}
