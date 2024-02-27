output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.ui.id
}

output "ui_s3_bucket" {
  value = aws_s3_bucket.ui.bucket
}

output "deployment_url" {
  value = "https://${local.ui_host}"
}
