variable "domain" {
  type = string
  description = "Domain for UI CDN"
}

variable "tags" {
  type = map(string)
  description = "Tags for UI CDN"
}

variable "bucket_regional_domain_name" {
  type = string
  description = "S3 bucket regional domain name"
}

variable "website_endpoint" {
  type = string
  description = "S3 website endpoint"
}
