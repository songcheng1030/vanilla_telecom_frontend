import { TempPackage } from '../models/package.model';
export class PackageGroup {
  id: number;
  name: string;
  
  setPackage(PackageGroup: any) {
    this.id = PackageGroup.id || '';
    this.name = PackageGroup.name || '';
  }
}

export class ArrangePackageGroup {
  groupName: string;
  package: TempPackage[]
}