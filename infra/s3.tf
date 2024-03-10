resource "aws_s3_bucket" "ui_assets" {
  bucket = "amaingot-personal-website"
  tags   = local.tags
}

resource "aws_s3_bucket_ownership_controls" "ui_assets" {
  bucket = aws_s3_bucket.ui_assets.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "ui_assets" {
  depends_on = [aws_s3_bucket_ownership_controls.ui_assets]
  bucket     = aws_s3_bucket.ui_assets.id
  acl        = "private"
}

resource "aws_s3_bucket_public_access_block" "ui_assets" {
  bucket                  = aws_s3_bucket.ui_assets.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "ui_assets" {
  depends_on = [aws_s3_bucket_public_access_block.ui_assets]
  bucket     = aws_s3_bucket.ui_assets.id
  policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Sid" : "PublicReadGetObject",
          "Effect" : "Allow",
          "Principal" : "*",
          "Action" : "s3:GetObject",
          "Resource" : "arn:aws:s3:::${aws_s3_bucket.ui_assets.id}/*"
        }
      ]
    }
  )
}

resource "aws_s3_bucket_website_configuration" "ui_assets" {
  bucket = aws_s3_bucket.ui_assets.id
  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "index.html"
  }
}
