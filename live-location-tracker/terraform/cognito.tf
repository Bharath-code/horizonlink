resource "aws_cognito_user_pool" "main" {
  name = "live-location-tracker-user-pool"
}

resource "aws_cognito_user_pool_client" "main" {
  name         = "live-location-tracker-user-pool-client"
  user_pool_id = aws_cognito_user_pool.main.id
}
