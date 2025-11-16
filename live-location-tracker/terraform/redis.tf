resource "aws_elasticache_cluster" "main" {
  cluster_id           = "live-location-tracker-redis"
  engine               = "redis"
  node_type            = "cache.t2.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  port                 = 6379
}
