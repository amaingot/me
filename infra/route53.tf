resource "aws_route53_record" "ui" {
  zone_id = data.aws_route53_zone.maingot_io.zone_id
  name    = local.ui_host
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.ui.domain_name
    zone_id                = aws_cloudfront_distribution.ui.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "ui_ipv6" {
  zone_id = data.aws_route53_zone.maingot_io.zone_id
  name    = local.ui_host
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.ui.domain_name
    zone_id                = aws_cloudfront_distribution.ui.hosted_zone_id
    evaluate_target_health = false
  }
}
