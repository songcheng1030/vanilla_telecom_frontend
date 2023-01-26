export class ResidentialModel {
  name: string;
  address1: string;
  address2: string;
  postcode: string;
  passport: string;
  contactNumber: string;
  email: string;
  identityCard: string;
  updatedAt: Date;
  createdAt: Date;

  setUser(user: any) {
    this.name = user.name;
    this.address1 = user.address1;
    this.address2 = user.address2;
    this.postcode = user.postcode;
    this.email = user.email;
    this.passport = user.passport;
    this.contactNumber = user.contactNumber;
    this.identityCard = user.identityCard;
  }
}
