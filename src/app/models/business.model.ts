export class BusinessModel {
  id: number;
  companyName: string;
  billingAddress1: string;
  billingAddress2: string;
  installationAddress: string;
  postcode: string;
  passport: string;
  companyEntity: string;
  regNo: string;
  contactNumber: string;
  vatNo: string;
  email: string;
  invoiceEmail: string;
  companyRegCertificate: string;
  phoneNumber: string;
  certificateFile: string;
  updatedAt: Date;
  createdAt: Date;

  setUser(user: any) {
    this.id = user.id;
    this.companyName = user.companyName || '';
    this.billingAddress1 = user.billingAddress1 || '';
    this.billingAddress2 = user.billingAddress2 || '';
    this.installationAddress = user.installationAddress || '';
    this.postcode = user.postcode || '';
    this.passport = user.passport || '';
    this.companyEntity = user.companyEntity || '';
    this.regNo = user.regNo || '';
    this.contactNumber = user.contactNumber || '';
    this.email = user.email || '';
    this.invoiceEmail = user.invoiceEmail || '';
    this.companyRegCertificate = user.companyRegCertificate || './assets/media/users/default.jpg';
    this.phoneNumber = user.phoneNumber || '';
    this.certificateFile = user.certificateFile || '';
    this.vatNo = user.vatNo || '';
  }
}