variable "domain" {
  type = string
  description = "Domain for UI CDN"
}

variable "tags" {
  type = map(string)
  description = "Tags for UI CDN"
}

variable "s3_target_origin_id" {
  type = string
  description = "S3 bucket regional domain name"
}

variable "s3_website_endpoint" {
  type = string
  description = "S3 website endpoint"
}
