data "aws_acm_certificate" "domain" {
  domain = var.domain
  types  = ["AMAZON_ISSUED"]
}

data "aws_route53_zone" "domain" {
  name = "${var.domain}."
}

resource "aws_cloudfront_distribution" "ui" {
  enabled             = true
  is_ipv6_enabled     = true
  aliases             = [var.domain]
  default_root_object = "/index.html"
  price_class         = "PriceClass_100"
  comment             = var.domain
  tags                = var.tags

  origin {
    domain_name = var.s3_website_endpoint
    origin_id   = var.s3_target_origin_id

    custom_origin_config {
      http_port                = 80
      https_port               = 443
      origin_keepalive_timeout = 5
      origin_protocol_policy   = "http-only"
      origin_read_timeout      = 30
      origin_ssl_protocols = [
        "TLSv1.2",
      ]
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = false
    acm_certificate_arn            = data.aws_acm_certificate.domain.arn
    minimum_protocol_version       = "TLSv1.2_2021"
    ssl_support_method             = "sni-only"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  default_cache_behavior {
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = var.s3_target_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  custom_error_response {
    error_caching_min_ttl = 10
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }
}

resource "aws_route53_record" "ui" {
  zone_id = data.aws_route53_zone.domain.zone_id
  name    = var.domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.ui.domain_name
    zone_id                = aws_cloudfront_distribution.ui.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "ui_ipv6" {
  zone_id = data.aws_route53_zone.domain.zone_id
  name    = var.domain
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.ui.domain_name
    zone_id                = aws_cloudfront_distribution.ui.hosted_zone_id
    evaluate_target_health = false
  }
}
