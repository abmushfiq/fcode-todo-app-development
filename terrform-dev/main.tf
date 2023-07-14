provider "aws" {
  region     = "us-east-1"
  access_key = var.access
  secret_key = var.secret
}


######################
# SSM PARAMETER STORE
######################

resource "aws_ssm_parameter" "api_key" {
  name        = "/FCODE/TODO_APP/REACT_APP_FIREBASE_API_KEY"
  description = "Todo App Firebase Api Key"
  type        = "String"
  value       = var.REACT_APP_FIREBASE_API_KEY

  tags = {
    environment = "production"
  }
}

resource "aws_ssm_parameter" "auth_domain" {
  name        = "/FCODE/TODO_APP/REACT_APP_FIREBASE_AUTH_DOMAIN"
  description = "Firebase AUth Domain"
  type        = "String"
  value       = var.REACT_APP_FIREBASE_AUTH_DOMAIN

  tags = {
    environment = "production"
  }
}

resource "aws_ssm_parameter" "project_id" {
  name        = "/FCODE/TODO_APP/REACT_APP_FIREBASE_PROJECT_ID"
  description = "Firebase project id"
  type        = "String"
  value       = var.REACT_APP_FIREBASE_PROJECT_ID

  tags = {
    environment = "production"
  }
}

resource "aws_ssm_parameter" "storage_bucket" {
  name        = "/FCODE/TODO_APP/REACT_APP_FIREBASE_STORAGE_BUCKET"
  description = "Firebase storage bucket name"
  type        = "String"
  value       = var.REACT_APP_FIREBASE_STORAGE_BUCKET

  tags = {
    environment = "production"
  }
}

resource "aws_ssm_parameter" "sender_id" {
  name        = "/FCODE/TODO_APP/REACT_APP_FIREBASE_MESSAGING_SENDER_ID"
  description = "Firebase sender id"
  type        = "String"
  value       = var.REACT_APP_FIREBASE_MESSAGING_SENDER_ID

  tags = {
    environment = "production"
  }
}

resource "aws_ssm_parameter" "app_id" {
  name        = "/FCODE/TODO_APP/REACT_APP_FIREBASE_APP_ID"
  description = "Firebase App id"
  type        = "String"
  value       = var.REACT_APP_FIREBASE_APP_ID

  tags = {
    environment = "production"
  }
}




####################
# S3
####################


resource "aws_s3_bucket" "s3_bucket" {
  bucket = var.domain_name
  tags   = var.tags
}

resource "aws_s3_bucket_website_configuration" "s3_bucket" {
  bucket = aws_s3_bucket.s3_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }

}

resource "aws_s3_bucket_ownership_controls" "s3_ownership_control" {
  bucket = aws_s3_bucket.s3_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "s3_public_acess" {
  bucket = aws_s3_bucket.s3_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "s3_bucket" {
  depends_on = [
    aws_s3_bucket_ownership_controls.s3_ownership_control,
    aws_s3_bucket_public_access_block.s3_public_acess,
  ]

  bucket = aws_s3_bucket.s3_bucket.id
  acl    = "private"


}

resource "aws_s3_bucket_policy" "s3_bucket" {
  bucket = aws_s3_bucket.s3_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource = [
          aws_s3_bucket.s3_bucket.arn,
          "${aws_s3_bucket.s3_bucket.arn}/*",
        ]
      },
    ]
  })
}

resource "aws_s3_object" "object_www" {
  depends_on   = [aws_s3_bucket.s3_bucket]
  for_each     = fileset("${path.root}", "www/*.html")
  bucket       = var.domain_name
  key          = basename(each.value)
  source       = each.value
  etag         = filemd5("${each.value}")
  content_type = "text/html"
  acl          = "public-read"
}

resource "aws_s3_object" "object_assets" {
  depends_on = [aws_s3_bucket.s3_bucket]
  for_each   = fileset(path.module, "assets/*")
  bucket     = var.domain_name
  key        = each.value
  source     = each.value
  etag       = filemd5("${each.value}")
  acl        = "public-read"
}





