export class Product_Vanilla {
  i_product: number;
  i_product_group: string;
  i_reseller_subscription: string;
  default_i_acl: number;
  iso_4217: string;
  end_user_name: string;
  shared: string;
  addon_priority: number;
  allowed_with_any_product: string;
  breakage: number;
  info_url: string;
  i_subscription: number;
  i_vd_plan: number;
  is_used: number;
  i_account_role: number;
  allowed_products: number[];
  service_flag_locks: string;
  name: string;
  description: string;
  included_services: number[];
  notepad: string;
  end_user_description: string;
  volume_discount_plan_name: string;
  managed_by_user: string;
  hidden: string;
  fraud_protection: string;
}

export class Product {
  id: number;
  name: string;
  status: number;
  stock: number;
  image_url: string;

  setProduct(product: any) {
    this.id = product.id;
    this.name = product.name || '';
    this.status = product.status;
    this.stock = product.stock;
    this.image_url = product.image_url || '';
  }
}