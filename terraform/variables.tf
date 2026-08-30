variable "aws_region" {
  type    = string
  default = "ap-south-1"
}

variable "project_name" {
  type    = string
  default = "devops-multi-tier"
}

variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"
}

variable "public_subnet_1_cidr" {
  type    = string
  default = "10.0.1.0/24"
}

variable "public_subnet_2_cidr" {
  type    = string
  default = "10.0.2.0/24"
}

variable "private_subnet_1_cidr" {
  type    = string
  default = "10.0.10.0/24"
}

variable "private_subnet_2_cidr" {
  type    = string
  default = "10.0.11.0/24"
}

variable "az_1" {
  type    = string
  default = "ap-south-1a"
}

variable "az_2" {
  type    = string
  default = "ap-south-1b"
}
