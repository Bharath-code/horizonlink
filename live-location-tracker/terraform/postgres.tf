resource "aws_db_instance" "main" {
  allocated_storage    = 20
  engine               = "postgres"
  instance_class       = "db.t3.micro"
  db_name              = "live_location_tracker"
  username             = "admin"
  password             = "password"
  parameter_group_name = "default.postgres14"
  skip_final_snapshot  = true
  publicly_accessible  = false
  multi_az             = false
  db_subnet_group_name = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.db.id]
  tags = {
    Name = "live-location-tracker-db"
  }
}

resource "aws_db_subnet_group" "main" {
  name       = "live-location-tracker-db-subnet-group"
  subnet_ids = [aws_subnet.private_a.id, aws_subnet.private_b.id]
}

resource "aws_subnet" "private_a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "us-east-1a"
}

resource "aws_subnet" "private_b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "us-east-1b"
}

resource "aws_security_group" "db" {
  name        = "live-location-tracker-db-sg"
  description = "Allow postgres inbound traffic"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

resource "null_resource" "install_timescaledb" {
  provisioner "local-exec" {
    command = "echo 'CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;' | PGPASSWORD=${aws_db_instance.main.password} psql --host=${aws_db_instance.main.address} --port=${aws_db_instance.main.port} --username=${aws_db_instance.main.username} --dbname=${aws_db_instance.main.db_name}"
  }

  depends_on = [aws_db_instance.main]
}
