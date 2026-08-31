output "rds_endpoint" {
  value     = aws_db_instance.main.endpoint
  sensitive = true
}

output "rds_address" {
  value     = aws_db_instance.main.address
  sensitive = true
}

output "rds_port" {
  value = aws_db_instance.main.port
}