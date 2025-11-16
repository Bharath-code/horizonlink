resource "aws_apigatewayv2_api" "main" {
  name          = "live-location-tracker-api"
  protocol_type = "HTTP"
}
