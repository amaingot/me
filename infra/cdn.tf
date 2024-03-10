module "cdns" {
  source   = "./cdn"
  for_each = toset(local.ui_domains)

  domain              = each.value
  tags                = local.tags
  s3_target_origin_id = aws_s3_bucket.ui_assets.bucket_regional_domain_name
  s3_website_endpoint = aws_s3_bucket.ui_assets.website_endpoint
}

