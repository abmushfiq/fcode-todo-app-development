variable "access" {
  type    = string
  default = ""
}

variable "secret" {
  type    = string
  default = ""
}

variable "REACT_APP_FIREBASE_API_KEY" {
  type    = string
  default = "ab"
}

variable "REACT_APP_FIREBASE_AUTH_DOMAIN" {
  type    = string
  default = "ab"
}

variable "REACT_APP_FIREBASE_PROJECT_ID" {
  type    = string
  default = "ab"
}

variable "REACT_APP_FIREBASE_STORAGE_BUCKET" {
  type    = string
  default = "ab"
}

variable "REACT_APP_FIREBASE_MESSAGING_SENDER_ID" {
  type    = string
  default = "ab"
}

variable "REACT_APP_FIREBASE_APP_ID" {
  type    = string
  default = "ab"
}

variable "domain_name" {
  type    = string
  default = "mushfiq-todoapp-fcode-com"
}

variable "tags" {
  description = "Tags to set on the bucket."
  type        = map(string)
  default     = {}
}


