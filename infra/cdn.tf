module "cdns" {
  source   = "./cdn"
  for_each = toset(local.ui_domains)

  domain                      = each.value
  tags                        = local.tags
  bucket_regional_domain_name = aws_s3_bucket.ui_assets.bucket_regional_domain_name
  website_endpoint            = aws_s3_bucket_website_configuration.ui_assets.website_endpoint
}

