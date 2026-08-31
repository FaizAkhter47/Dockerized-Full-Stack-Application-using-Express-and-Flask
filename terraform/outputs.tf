output "vpc_id" {
  value = module.network.vpc_id
}

output "public_subnet_ids" {
  value = module.network.public_subnet_ids
}

output "private_subnet_ids" {
  value = module.network.private_subnet_ids
}

output "load_balancer_dns" {
  value = module.compute.load_balancer_dns
}

output "rds_endpoint" {
  value     = module.database.rds_endpoint
  sensitive = true
}