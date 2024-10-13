type TUserAddress = {
  city: string,
  street: string,
  suite: string,
  zipcode: string,
  geo: {
    lat: string,
    lng: string
  }
}

type TUserCompany = {
  bg: string,
  catchPhrase: string,
  name: string
}

export type TUser = {
  id: number,
  email: string,
  name: string,
  phone: string,
  username: string,
  website: string,
  address: TUserAddress,
  company: TUserCompany,
  comment?: string
}