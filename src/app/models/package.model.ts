import { Channel } from '../models/channel.model';

export class Package {
  id: number;
  Group: number;
  Package: string; 
  createdAt: Date;
  updatedAt: Date;
  setPackage(Package: any) {
    this.id = Package.id;
    this.Group = Package.Group;
    this.Package = Package.Package;
    this.createdAt = Package.createdAt;
    this.updatedAt = Package.updatedAt;
  }
}

export class TempPackage {
  Package: string; 
  channels: Channel[];
}