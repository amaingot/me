terraform {
  backend "s3" {
    bucket = "maingot-infra"
    key    = "terraform-me"
    region = "us-east-1"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.31.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

data "aws_region" "current" {}

locals {
  ui_host = "maingot.io"

  log_rention_days = 30

  tags = {
    Application = "Personal Website"
    Repository  = "github.com/amaingot/me"
  }
}

data "aws_acm_certificate" "maingot_io" {
  domain = local.ui_host
  types  = ["AMAZON_ISSUED"]
}

data "aws_route53_zone" "maingot_io" {
  name = "${local.ui_host}."
}
