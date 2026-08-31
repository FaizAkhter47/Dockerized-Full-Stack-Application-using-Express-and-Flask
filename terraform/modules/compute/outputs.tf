output "load_balancer_dns" {
  value = aws_lb.app.dns_name
}

output "load_balancer_arn" {
  value = aws_lb.app.arn
}

output "autoscaling_group_name" {
  value = aws_autoscaling_group.app.name
}