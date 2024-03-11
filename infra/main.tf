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

data "aws_caller_identity" "current" {}

locals {
  ui_domains = [
    "alexmaingot.com",
    "alexmaingot.dev",
    "amaingot.com",
    "amaingot.dev",
    "esyncsolutions.net",
    "fruitfulstate.com",
    "hmm.dev",
    "maingot.dev",
    "maingot.io",
    "maingot.us",
  ]

  log_rention_days = 30

  tags = {
    Project     = "Personal Website"
    Environment = "prod"
    Repository  = "github.com/amaingot/me"
  }
}
