output "ui_s3_bucket" {
  value = aws_s3_bucket.ui_assets.bucket
}
output "cloudfront_distribution_ids" {
  value = join(",", [for cdn in module.cdns : cdn.cloudfront_distribution_id])
}
